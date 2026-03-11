<template>
	<view class="container">
		<!-- <image class="container-bg" mode="aspectFill" 
			:src="`${baseImgUrl}/cloudstorage/5e018505-deb1-467f-905a-d4e067d780e8.png`"></image> -->
		<image v-if="background" class="container-bg" mode="aspectFill" 
			:src="`${baseImgUrl}${background}`"></image>
		<view class="avatar-container" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
			<!-- <view class="border"></view> -->
			<view class="avatar-bg-border">
				<image @touchstart="touchAvatarBg" class="avatar-bg" id="avatar-bg" :src="avatarPath"></image>
			</view>
			<image
				v-if="currentMaskId > -1"
				class="mask"
				:class="{ 'mask-with-border': showBorder }"
				id="mask"
				:src="maskPic"
				:style="{ top: maskCenterY - maskSize / 2 - 2 + 'px', left: maskCenterX - maskSize / 2 - 2 + 'px', transform: 'rotate(' + rotate + 'deg)' + 'scale(' + scale + ')' + 'rotateY(' + rotateY + 'deg)' }"
			></image>
			<view class="handle" :class="{ 'hide-handle': !showBorder }" :style="{ top: handleCenterY - 10 + 'px', left: handleCenterX - 10 + 'px' }">
				<image class="handle-img" id="handle" :src="dragImg"></image>
			</view>
		</view>
		<view class="cans">
			<canvas class="cans-id-mask" canvas-id="cans-id-mask" />
		</view>
		<view class="action-wrapper">
			<!-- #ifdef MP-WEIXIN -->
			<view class="action">
				<button class="action-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					选择头像
				</button> 
			</view>
			<!-- #endif -->
			
			<view class="action">
				<button class="action-btn" @click="chooseImage">上传头像</button>
			</view>
			<view class="action">
				<button class="action-btn" @click="draw">保存头像</button>
			</view>
			<view class="action">
				<button class="action-btn" open-type="share">分享朋友</button>
			</view>
			<!-- <view class="action">
				<button class="action-btn" @click="moreShow = true">更多工具</button>
			</view> -->
		</view>
		<view class="ad-wraper">
			<!-- <ad unit-id="adunit-b95751ab1a875ac0"></ad> -->
		</view>
		<view class="type-tabs">
			<view class="left">
				<image class="left-img" :src="leftImg"></image>
			</view>
			<scroll-view class="type-tabs-scroll" scroll-x="true" scroll-with-animation="true">
				<button class="tab" :class="{'active':index==activeIndex}"  v-for="(item, index) in list" :key="index" @click="changeType(index)">{{item.name}}</button>
			</scroll-view>
			<view class="right">
				<image class="right-img" :src="rightImg"></image>
			</view>
		</view>
		<view class="ornaments-tabs">
			<scroll-view class="ornaments-scroll-view" scroll-x="true" :scroll-left="scrollLeft" @scroll="scroll">
				<view class="img-wrap" v-for="(item, index) in imgList" :key="index">
					<image class="img-list" :src="`${baseImgUrl}${item}`" @click="changeMask(`${baseImgUrl}${item}`)"></image>
				</view>
			</scroll-view>
		</view>
		<view class="pageLoading" v-show="loading">
			<full-loading :bgColor="loadingBgColor" />
		</view>
		<u-action-sheet :list="moreList" v-model="moreShow" @click="jump"></u-action-sheet>
	</view>
</template>
<script>
import fullLoading from "@/components/full-loading.vue"
import { baseImgUrl, indexData } from "@/config/config.js"
let interstitialAd = null
let showInterstitialAd = true
const dragImg = require("@/static/drag.svg")
const leftImg = require("../../static/left.png")
const rightImg = require("../../static/right.png")

export default {
	components: {
		fullLoading
	},
	data() {
		return {
			activeIndex:0,
			dragImg,
			leftImg,
			rightImg,
			cansWidth: 260, // 宽度 px
			cansHeight: 260, // 高度 px
			maskCenterX: wx.getSystemInfoSync().windowWidth / 2,
			maskCenterY: 250,
			cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
			cancelCenterY: 200,
			handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
			handleCenterY: 300,
			maskSize: 100,
			scale: 1,
			rotate: 0,
			rotateY: 0,
			mask_center_x: wx.getSystemInfoSync().windowWidth / 2,
			mask_center_y: 250,
			cancel_center_x: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
			cancel_center_y: 200,
			handle_center_x: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
			handle_center_y: 300,
			scaleCurrent: 1,
			rotateCurrent: 0,
			touch_target: "",
			start_x: 0,
			start_y: 0,
			shareObj: {},
			type: "",
			background: "",
			isSetAvatar: false,
			scrollLeft: 0,
			old: {
				scrollLeft: 0
			},
			loading: true,
			loadingBgColor: "transparent",
			imgList: [],
			avatarPath: "",
			maskPic: "",
			currentMaskId: -1,
			showBorder: false,
			list: null,
			baseImgUrl,
			name: "",
			moreList: [
				{
					text: '节日头像',
					color: '#108ee9',
					fontSize: 32,
					subText: '更多更好玩的节日头像'
				},
				{
					text: '视频去水印',
					color: '#108ee9',
					fontSize: 32,
					subText: '抖音/快手全网短视频免费使用'
				}
			],
			moreShow: false
		}
	},
	onLoad(option) {
		this.getList()
		this.initAd()
	},
	onShareAppMessage() {
		return {
			...this.shareObj,
			imageUrl: baseImgUrl + this.shareObj.imageUrl,
			success: function (res) {}
		}
	},
	onShareTimeline: function() {
		return {
			...this.shareObj,
			imageUrl: baseImgUrl + this.shareObj.imageUrl,
			success: function(e) {}
		};
	},
	methods: {
		// 获取挂件
		getList() {
			// 需要云开发(把下面注释解开，不需要云开发逻辑注释)
			// const that = this
			// uniCloud.callFunction({
			// 	name: 'avatar-diy',
			// 	data: {
			// 		action: "getList"
			// 	}
			// }).then(res => {
			// 	that.list = res.result.data.sort((a, b) => a.order > b.order ? 1 : -1)
			// 	that.changeType(0)
			// })
			// 无需云开发(把下面注释解开，需要云开发逻辑注释)
			const that = this
			that.list = indexData.sort((a, b) => a.order > b.order ? 1 : -1)
			that.changeType(0)
		},
		onChooseAvatar(e){
			var that = this;
			console.log(e);
			// var path = e.detail.avatarUrl;
			that.avatarPath = e.detail.avatarUrl;
			that.isSetAvatar = true;
		},
		// 获取用户信息
		getUserInfo() {
			const that = this
			uni.getUserProfile({
				desc: "获取头像",
				success(result) {
					let userInfo = result.userInfo
					userInfo.avatarUrl = userInfo.avatarUrl.replace("132", "0")
					that.loading = true
					uni.downloadFile({
						url: userInfo.avatarUrl,
						success: function (res) {
							console.log(res)
							that.loading = false
							that.avatarPath = res.tempFilePath
							that.isSetAvatar = true
						},
						fail: function (e) {
							that.loading = false
							uni.showToast({
								title: "图片加载超时",
								content: "网络异常，请稍后重试"
							})
						},
					})
				},
				fail(err) {
					console.log(err)
					uni.showModal({
						title: "获取用户头像失败",
						content: "亲，需要您授权访问头像才能给您的头像佩戴饰品哦",
						showCancel: false
					})
				}
			})
		},
		// 初始化广告
		initAd() {
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ["shareAppMessage", "shareTimeline"],
				success(res) {},
				fail(e) {}
			})
			if (wx.createInterstitialAd && showInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-d77759cde0ba64cf'
				})
				interstitialAd.onLoad(() => {})
				interstitialAd.onError((err) => {})
				interstitialAd.onClose(() => {})
			}
			// #endif
		},
		// 选择图片
		chooseImage() {
			let that = this
			uni.chooseImage({
				count: 1,
				sizeType: ["compressed"],
				sourceType: ["album", "camera"],
				success: function (res) {
					that.avatarPath = res.tempFilePaths[0]
					that.isSetAvatar = true
				}
			})
		},
		// 滚动
		scroll: function(e) {
			this.old.scrollLeft = e.detail.scrollLeft
		},
		// 更换类型
		changeType(val) {
			this.activeIndex = val;
			const that = this
			if (this.type === val) {
				return
			}
			this.scrollLeft = this.old.scrollLeft
			this.$nextTick(function() {
				this.scrollLeft = 0
			})
			this.currentMaskId = -1
			this.showBorder = false
			this.type = val
			this.shareObj = { ...that.list[val].share }
			console.log(this.shareObj)
			this.name = that.list[val].name
			this.background = that.list[val].bg;
			this.imgList = that.list[val].imgList
			if(!this.isSetAvatar) {
				that.loading = true
				uni.downloadFile({
					url: that.baseImgUrl + that.list[val].avatar,
					success: function (res) {
						that.loading = false
						that.avatarPath = res.tempFilePath
					},
					fail: function (e) {
						that.loading = false
						uni.showToast({
							title: "图片加载超时",
							content: "网络异常，请稍后重试"
						})
					}
				})
			}
		},
		// 选择挂件
		changeMask(item) {
			const that = this
			that.showBorder = true
			that.loading = true
			uni.downloadFile({
				url: item,
				success: function (res) {
					that.loading = false
					that.maskPic = res.tempFilePath
					that.currentMaskId = 1
				},
				fail: function (e) {
					that.loading = false
					uni.showToast({
						title: "图片加载超时",
						content: "网络异常，请稍后重试"
					})
				}
			})
		},
		// 设置挂件位置
		touchStart(e) {
			if (e.target.id == "mask") {
				this.touch_target = "mask"
				this.showBorder = true
			} else if (e.target.id == "handle") {
				this.touch_target = "handle"
			} else {
				this.touch_target = ""
			}

			if (this.touch_target != "") {
				this.start_x = e.touches[0].clientX
				this.start_y = e.touches[0].clientY
			}
		},
		touchMove(e) {
			var current_x = e.touches[0].clientX
			var current_y = e.touches[0].clientY
			var moved_x = current_x - this.start_x
			var moved_y = current_y - this.start_y
			if (this.touch_target == "mask") {
				this.maskCenterX = this.maskCenterX + moved_x
				if (this.maskCenterX < 110) {
					this.maskCenterX = 110
				} else if (this.maskCenterX > 264) {
					this.maskCenterX = 264
				}
				this.maskCenterY = this.maskCenterY + moved_y
				if (this.maskCenterY < 138) {
					this.maskCenterY = 138
				} else if (this.maskCenterY > 292) {
					this.maskCenterY = 292
				}
				this.cancelCenterX = this.cancelCenterX + moved_x
				this.cancelCenterY = this.cancelCenterY + moved_y
				this.handleCenterX = this.handleCenterX + moved_x
				if (this.handleCenterX < 158) {
					this.handleCenterX = 158
				} else if (this.handleCenterX > 312) {
					this.handleCenterX = 312
				}
				this.handleCenterY = this.handleCenterY + moved_y
				if (this.handleCenterY < 188) {
					this.handleCenterY = 188
				} else if (this.handleCenterY > 341) {
					this.handleCenterY = 341
				}
			}
			if (this.touch_target == "handle") {
				this.handleCenterX = this.handleCenterX + moved_x
				this.handleCenterY = this.handleCenterY + moved_y
				this.cancelCenterX = 2 * this.maskCenterX - this.handleCenterX
				this.cancelCenterY = 2 * this.maskCenterY - this.handleCenterY
				let diff_x_before = this.handle_center_x - this.mask_center_x
				let diff_y_before = this.handle_center_y - this.mask_center_y
				let diff_x_after = this.handleCenterX - this.mask_center_x
				let diff_y_after = this.handleCenterY - this.mask_center_y
				let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before)
				let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after)
				let angle_before = (Math.atan2(diff_y_before, diff_x_before) / Math.PI) * 180
				let angle_after = (Math.atan2(diff_y_after, diff_x_after) / Math.PI) * 180
				this.scale = (distance_after / distance_before) * this.scaleCurrent
				this.rotate = angle_after - angle_before + this.rotateCurrent
			}
			this.start_x = current_x
			this.start_y = current_y
		},
		touchEnd(e) {
			this.mask_center_x = this.maskCenterX
			this.mask_center_y = this.maskCenterY
			this.cancel_center_x = this.cancelCenterX
			this.cancel_center_y = this.cancelCenterY
			this.handle_center_x = this.handleCenterX
			this.handle_center_y = this.handleCenterY
			this.touch_target = ""
			this.scaleCurrent = this.scale
			this.rotateCurrent = this.rotate
		},
		// 不显示border
		touchAvatarBg() {
			this.showBorder = false
		},
		// 绘制头像
		draw() {
			const that = this
			if (this.currentMaskId == -1) {
				uni.showToast({
					title: "您还没选择挂件哦",
					duration: 2000,
					icon: "none"
				})
				return
			}
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
			let scale = this.scale
			let rotate = this.rotate
			let mask_center_x = this.mask_center_x
			let mask_center_y = this.mask_center_y
			var query = wx.createSelectorQuery()
			query.select("#avatar-bg").boundingClientRect()
			query.exec(function (res) {
				mask_center_x = mask_center_x - res[0].left
				mask_center_y = mask_center_y - res[0].top
				const context = wx.createCanvasContext("cans-id-mask")
				const mask_size = 100 * scale

				context.clearRect(0, 0, that.cansWidth, that.cansHeight)
				context.drawImage(that.avatarPath, 0, 0, that.cansWidth, that.cansHeight)
				context.translate(mask_center_x, mask_center_y)
				context.rotate((rotate * Math.PI) / 180)
				context.drawImage(that.maskPic, -mask_size / 2, -mask_size / 2, mask_size, mask_size)
				context.draw(false, () => {
					that.saveCansToTemp()
				})
			})
		},
		// 保存临时路径
		saveCansToTemp() {
			let that = this
			that.loading = true
			that.loadingBgColor = "rgba(255, 255, 255, 0.5)"
			uni.canvasToTempFilePath(
				{
					x: 0,
					y: 0,
					height: this.cansWidth,
					width: this.cansHeight,
					destWidth: this.cansWidth * 3,
					destHeight: this.cansHeight * 3,
					canvasId: "cans-id-mask",
					success: function (res) {
						that.saveImgToLocal(res.tempFilePath)
					},
					fail(res) {
						that.loading = false
					}
				},
				this
			)
		},
		// 保存图片到本地
		saveImgToLocal(filePath) {
			const that = this
			uni.saveImageToPhotosAlbum({
				filePath: filePath,
				success: function (res) {
					that.loading = false
					that.loadingBgColor = "transparent"
					uni.showModal({
						title: "保存成功",
						content: "头像已经在您的相册里啦",
						showCancel: false
					})
				},
				fail(res) {
					that.loading = false
					that.loadingBgColor = "transparent"
					if (res.errMsg.indexOf("fail")) {
						uni.showModal({
							title: "您需要授权相册权限",
							content: "头像已经在您的个人中心, 您可以直接去个人中心下载",
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(res) {},
										fail(res) {}
									})
								}
							},
						})
					}
				},
			})
		},
		// 查看更多
		jump(index) {
			console.log(index)
			let url = index == 0 ? "/pages/frame/index" : "/pages/watermark/index"
			this.$u.route({ url })
		}
	}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

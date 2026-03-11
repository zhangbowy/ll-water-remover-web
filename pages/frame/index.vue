<template>
	<view class="content">
		<image :src="background" class="all-back"></image>
		<view class="top-content">
			<scroll-view scroll-x :show-scrollbar="false" class="scroll-view">
				<view class="top-title">
					<view class="title-unit" :class="{ 'title-select': item.selected }" v-for="(item, index) in list" :key="item.key" @click="itemClick(item)">
						{{ item.title }}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-x :show-scrollbar="false" class="scroll-view">
				<view class="image-div">
					<image
						:class="{ 'image-margin': index !== 0 }"
						@click="imageClick(item, index)"
						v-for="(item, index) in imageList"
						:src="baseImgUrl + item.src"
						:key="item.key"
					></image>
				</view>
			</scroll-view>
		</view>

		<view class="image-card">
			<view class="photo-main-view">
				<!--  -->
				<view class="avatar-div " id="avatar-container">
					<image class="img" id="avatar-img" :src="avatarImage"></image>

					<view class="empty-view " v-if="!avatarImage"></view>

					<image class="avatar-default " :src="currentFrame" v-if="currentFrame"></image>
				</view>

				<view class="ctlbtn">
					<view class="icon-div btn-margin">
						<view class="icon-zuo iconfont" v-if="showSwitch(-1)" @click="switchAvatar(-1)"></view>
						<view class="icon-you iconfont" v-if="showSwitch(1)" @click="switchAvatar(1)"></view>
					</view>
					<!-- <view v-if="userInfo" class="action-btn btn-margin" @click="getUserProfile()">获取头像</view>
					<button class="action-btn btn-margin" v-else open-type="getUserInfo" @click="getUserProfile()">获取头像</button> -->
					<button class="action-btn btn-margin" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						选择头像
					</button> 
					<view class="action-btn btn-primary" @click="shareFc()">保存头像</view>
				</view>
			</view>
		</view>
		
		<view class="ad-wraper">
			<!-- <ad unit-id="adunit-e52230f6b15b325a"></ad> -->
		</view>

		<view class="hideCanvasView">
			<canvas
				class="hideCanvas"
				id="default_PosterCanvasId"
				canvas-id="default_PosterCanvasId"
				:style="{ width: (poster.width || 10) + 'px', height: (poster.height || 10) + 'px' }"
			></canvas>
		</view>
		<view class="pageLoading" v-show="loading">
			<full-loading :bgColor="loadingBgColor" />
		</view>
	</view>
</template>

<script>
import fullLoading from "@/components/full-loading.vue"
import _app from '@/util/QS-SharePoster/app.js';
import { getSharePoster } from '@/util/QS-SharePoster/QS-SharePoster.js';
import { baseImgUrl, frameData } from "@/config/config.js"

export default {
	components: {
		fullLoading
	},
	data() {
		return {
			poster: {},
			posterImage: '',
			canvasId: 'default_PosterCanvasId',
			avatarImage: '',
			currentFrame: '',
			currentIndex: 0,
			list: [],
			imageList: [],
			baseImgUrl,
			shareObj: {},
			background: "",
			loading: true
		};
	},
	onLoad() {
		this.getList()
	},
	onShareAppMessage: function() {
		return {
			...this.shareObj,
			imageUrl: baseImgUrl + this.shareObj.imageUrl,
			success: function(e) {}
		};
	},
	onShareTimeline: function() {
		return {
			...this.shareObj,
			imageUrl: baseImgUrl + this.shareObj.imageUrl,
			success: function(e) {}
		};
	},
	methods: {
		getList() {
			// 需要云开发(把下面注释解开，不需要云开发逻辑注释)
			// const that = this
			// uniCloud.callFunction({
			// 	name: 'avatar-frame',
			// 	data: {
			// 		action: "getList"
			// 	}
			// }).then(res => {
			// 	this.loading = false
			// 	that.list = res.result.data.sort((a, b) => a.key > b.key ? 1 : -1)
			// 	this.itemClick(this.list[0])
			// })
			// 无需云开发(把下面注释解开，需要云开发逻辑注释)
			const that = this
			that.loading = false
			that.list = frameData.sort((a, b) => a.order > b.order ? 1 : -1)
			this.itemClick(this.list[0])
		},
		switchAvatar(num) {
			let currentType = this.list.findIndex(data => data.selected);
			if (num > 0) {
				if (this.currentIndex == this.imageList.length - 1) {
					this.imageList = this.list[currentType + 1].imgList
					this.list.forEach(data => {
						data.selected = false;
					});
					this.list[currentType + 1].selected = true
					this.currentIndex = 0
					this.currentFrame = baseImgUrl + this.imageList[this.currentIndex].src
					this.shareObj = this.list[currentType + 1].share
					this.background = baseImgUrl + this.list[currentType + 1].bg;
				} else {
					this.currentIndex++
					this.currentFrame = baseImgUrl + this.imageList[this.currentIndex].src
				}
			} else {
				if (this.currentIndex > 0) {
					this.currentIndex--
					this.currentFrame = baseImgUrl + this.imageList[this.currentIndex].src
				} else {
					this.imageList = this.list[currentType - 1].imgList
					this.list.forEach(data => {
						data.selected = false;
					});
					this.list[currentType - 1].selected = true
					this.currentIndex = this.imageList.length -1
					this.currentFrame = baseImgUrl + this.imageList[this.currentIndex].src
					this.shareObj = this.list[currentType - 1].share
					this.background = baseImgUrl + this.list[currentType - 1].bg;
				}
			}
		},
		showSwitch(val) {
			if (this.list.length > 0) {
				let currentType = this.list.findIndex(data => data.selected);
				let res =
					(val < 0 && currentType <= 0 && this.currentIndex <= 0) ||
					(val > 0 && currentType >= this.list.length - 1 && this.currentIndex >= this.imageList.length - 1);
				return !res;
			} else {
				return false
			}
		},
		async shareFc() {
			if (!this.avatarImage) {
				uni.showToast({
					title: '请先获取头像',
					icon: 'none'
				});
				return;
			}
			try {
				uni.showLoading({
					title: '加载中'
				});
				_app.log('准备生成:' + new Date());
				const d = await getSharePoster({
					_this: this, //若在组件中使用 必传
					type: 'testShareType',
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					backgroundImage: this.avatarImage,
					posterCanvasId: this.canvasId, //canvasId
					delayTimeScale: 20, //延时系数
					drawArray: ({ bgObj, type, bgScale }) => {
						//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
						return new Promise((rs, rj) => {
							rs([
								{
									type: 'image',
									url: this.currentFrame,
									dx: 0,
									dy: 0,
									infoCallBack(imageInfo) {
										return {
											dWidth: bgObj.width, // 因为设置了圆形图片 所以要乘以2
											dHeight: bgObj.height
										};
									}
								}
							]);
						});
					},
					setCanvasWH: ({ bgObj, type, bgScale }) => {
						// 为动态设置画布宽高的方法，
						this.poster = bgObj;
					}
				});
				_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
				this.posterImage = d.poster.tempFilePath;
				this.savefile();
			} catch (e) {
				uni.hideLoading();
				_app.hideLoading();
				_app.showToast(JSON.stringify(e));
			}
		},
		saveImage() {
			// #ifndef H5
			uni.saveImageToPhotosAlbum({
				filePath: this.poster.finalPath,
				success(res) {
					uni.showToast({
						title: '保存成功'
					});
				}
			});
			// #endif
		},
		savefile() {
			//获取相册授权
			let _self = this;
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								//这里是用户同意授权后的回调
								_self.saveImgToLocal();
							},
							fail(e) {
								uni.hideLoading();
								wx.showModal({
									content: '检测到您没打开下载图片功能权限，是否去设置打开？',
									confirmText: '确认',
									cancelText: '取消',
									success: function(res) {
										//点击“确认”时打开设置页面
										if (res.confirm) {
											wx.openSetting();
										}
									}
								});
							}
						});
					} else {
						//用户已经授权过了
						_self.saveImgToLocal();
					}
				}
			});
		},
		saveImgToLocal(e) {
			let _self = this;
			uni.saveImageToPhotosAlbum({
				filePath: _self.posterImage,
				success: function() {
					uni.hideLoading();
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					});
				},
				fail: function(AAAA) {
					uni.hideLoading();
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				}
			});
		},
		getNetworkImage(url) {
			return new Promise((resolve, reject) => {
				uni.downloadFile({
					url,
					success: e => {
						const p = e.tempFilePath; //这个就是jpg地址
						this.pic0 = p;
						if (p.indexOf('json') > -1) {
							reject(p);
							return false;
						}
						resolve(p);
					},
					fail: r => {
						reject(r);
					}
				});
			});
		},
		imageClick(item, index) {
			this.currentIndex = index;
			this.currentFrame = baseImgUrl + item.src;
		},
		itemClick(item) {
			this.currentIndex = 0;
			this.list.forEach(data => {
				data.selected = false;
			});
			item.selected = true;
			this.imageList = item.imgList
			this.currentFrame = baseImgUrl + this.imageList[0].src
			this.shareObj = item.share
			this.background = baseImgUrl + item.bg;
		},
		onChooseAvatar(e){
			console.log(e);
			this.avatarImage = e.detail.avatarUrl;
		},
		getUserProfile(e) {
			let _this = this;
			uni.getUserProfile({
				desc: '获取您的头像信息',
				success(result) {
					let info = result.userInfo.avatarUrl;
					_this.avatarImage = info.substring(0, info.lastIndexOf('/') + 1) + '0';
				},
				fail(fall) {}
			});
		}
	}
};
</script>

<style lang="scss">
@import "./index.scss";
</style>

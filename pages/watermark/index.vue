<template>
	<view class="container more">
		<image :src="baseImgUrl +'/cloudstorage/f98d2682-dfd0-41ff-ba56-7314f755030a.jpg'" class="all-back"></image>
		<!-- <image :src="baseImgUrl + '/VKCEYUGU-aa407feb-6c9e-46ce-9252-7d2145b8d504/03252fc7-c579-4bea-91a4-b7cd0e7b3ace.png'" class="all-back"></image> -->
		<view class="wrapper">
			<u-input v-model="pasteValue" type="text" :border="true" placeholder="先复制地址,再粘贴链接,然后点击去除水印" />
			<view class="btn-wrap">
				<u-button type="primary" size="medium" @click="paste">粘贴链接</u-button>
				<u-button type="success" size="medium" @click="clearWatermark">去除水印</u-button>
			</view>
			<view v-if="showVideo">
				<u-gap height="4" bg-color="#eee"></u-gap>
				<view class="btn-wrap">
					
					<u-button type="warning" size="medium" @click="save">保存视频</u-button>
					
					<u-button type="error" size="medium" @click="copy">复制地址</u-button>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="btn-wrap">
					温馨提示:视频较大建议复制地址去浏览器下载
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-QQ -->
				<view class="btn-wrap">
					温馨提示:请点击复制地址去百度或者浏览器粘贴地址下载
				</view>
				<!-- #endif -->
				
				<view class="video-wrap">
					<video object-fit="contain" id="myVideo" :src="videoUrl" controls></video>
				</view>
			</view>
			<view class="btn-wrap">
				<u-button type="primary" size="medium" open-type="share">分享朋友</u-button>
				<u-button type="warning" size="medium" @click="NavigateTos('/pages/mine/instructions')">使用说明</u-button>
			</view>
			<!-- <view class="btn-share">
				<u-button type="primary" open-type="share">分享朋友</u-button>
				<u-button type="primary" open-type="share">使用说明</u-button>
			</view> -->
			<view class="ad-wraper">
				<!-- <ad unit-id="adunit-e52230f6b15b325a"></ad> -->
			</view>
		</view>
		<view class="pageLoading" v-show="loading">
			<full-loading bgColor="rgba(255, 255, 255, .7)" />
		</view>
	</view>
</template>
<script>
import fullLoading from "@/components/full-loading.vue"
import { baseImgUrl, waterMarkUrl } from "@/config/config.js"
export default {
	components: {
		fullLoading
	},
	data() {
		return {
			loading: false,
			baseImgUrl,
			pasteValue: "",
			videoUrl: "",
			video_title: "",
			showVideo: false,
			tempFilePath: ""
		}
	},
	onLoad() {
		// this.getList()
	},
	onShareAppMessage: function() {
		return {
			title: "我在这里发现了一个免费的短视频去水印工具，你也来看下吧",
			path: "/pages/watermark/index",
			imageUrl:"https://mp-1762534d-d845-4ba7-9f17-148c8640d422.cdn.bspapp.com/cloudstorage/3c7d2271-0d90-482c-9c89-9e1f4c7fcd3d.png",
			success: function(e) {}
		};
	},
	onShareTimeline: function() {
		return {
			title: "我在这里发现了一个免费的短视频去水印工具，你也来看下吧",
			path: "/pages/watermark/index",
			imageUrl:"https://mp-1762534d-d845-4ba7-9f17-148c8640d422.cdn.bspapp.com/cloudstorage/3c7d2271-0d90-482c-9c89-9e1f4c7fcd3d.png",
			success: function(e) {}
		};
	},
	methods: {
		NavigateTos(urls) {
			uni.navigateTo({
				url: urls
			})
		},
		paste() {
			const that = this
			uni.getClipboardData({
				success(e) {
					if (e.errMsg == "getClipboardData:ok") {
						that.pasteValue = e.data;
						setTimeout(function() {
							uni.hideToast()
						}, 1000);
					}
				}
			})
		},
		clearWatermark() {
			const that = this
			const { pasteValue } = this
			if (pasteValue.length <=0) {
				uni.showToast({
					title: '需要粘贴链接地址',
					icon: 'none'
				})
				return
			}
			const index = pasteValue.indexOf('https://')
			if (index < 0) {
				uni.showToast({
					title: '分享地址不太对哦',
					icon: 'none'
				})
				return
			}
			// const url = `${waterMarkUrl}${this._parseUrl(pasteValue)}`
			const url = `${this._parseUrl(pasteValue)}`
			this.loading = true
			uni.request({
				url: waterMarkUrl,
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				data: {url},
				success(e) {
					console.log(e);
					that.loading = false
					// console.log(JSON.parse(e.data));
					// console.log(e.data);
					// let aurl = encodeURIComponent(JSON.stringify(e.data));
					// let video = JSON.parse(decodeURIComponent(aurl));
					// console.log(video);
					if (e.statusCode == 200 && e.data.code == 200) {
						that.videoUrl = e.data.data.down;
						that.videoShowUrl = e.data.data.video;
						that.video_title = e.data.data.title;
						that.showVideo = true;
					} else {
						that.showVideo = false;
						uni.showToast({
							title: '不支持您输入的链接',
							icon: 'none'
						})
					}
				}
			})
		},
		copy() {
			const that = this
			uni.setClipboardData({
				data: that.videoUrl,
				showToast: true,
				success() {}
			})
		},
		save() {
			const that = this
			uni.showModal({
				title: "温馨提示",
				content: "您确定要保存视频到您的相册吗",
				success(e) {
					if (e.cancel) {
						return
					}
					that.loading = true
					uni.downloadFile({
						url: that.videoUrl,
						success(res) {
							console.log(res);
							that.tempFilePath = res.tempFilePath
							uni.authorize({
								scope: "scope.writePhotosAlbum",
								success() {
									uni.saveVideoToPhotosAlbum({
										filePath: that.tempFilePath,
										success() {
											that.loading = false
											uni.showToast({
												title: '保存成功',
												icon: 'none'
											})
										},
										fail(){
											that.loading = false
										}
									})
								},
								fail() {
									that.loading = false
									uni.showModal({
										title: "温馨提示",
										content: "请前往小程序设置允许添加到相册",
										showCancel: false
									})
								}
							})
						},
						fail(err){
							uni.showModal({
								title:'请复制地址去浏览器粘贴下载' ,
								content: err.errMsg,
								showCancel: false
							})
							that.loading = false
							console.log(err);
						}
					})
				}
			})
		},
		_parseUrl(text) {
		  let startIndex = text.lastIndexOf('http://')
		  startIndex = startIndex === -1 ? text.lastIndexOf('https://') : startIndex
		  if (startIndex === -1) {
		    console.log('请输入正确的视频链接')
		    return
		  }
		  //去掉前面的中文
		  let link = text.substr(startIndex)
		  const endIndex = link.indexOf(' ')
		  if (endIndex !== -1) {
		    link = link.substring(0, endIndex)
		  }
		  return link
		}
	}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

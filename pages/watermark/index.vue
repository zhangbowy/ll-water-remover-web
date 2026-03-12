<template>
	<view class="container more">
		<image src="https://picsum.photos/750/360" class="all-back" mode="aspectFill"></image>
		<view class="wrapper">
			<u-input v-model="pasteValue" type="text" :border="true" placeholder="粘贴小红书链接，提取无水印图片" />
			<view class="btn-wrap">
				<u-button type="primary" size="medium" @click="paste">粘贴链接</u-button>
				<u-button type="success" size="medium" @click="fetchImages">提取图片</u-button>
			</view>

			<!-- 图片结果区域 -->
			<view v-if="imageList.length > 0">
				<u-gap height="4" bg-color="#eee"></u-gap>
				<view class="btn-wrap">
					<u-button type="warning" size="medium" @click="saveAll">保存全部图片</u-button>
					<u-button type="error" size="medium" @click="copyAll">复制全部链接</u-button>
				</view>
				<view class="result-tip">共 {{imageList.length}} 张图片</view>
				<view class="image-grid">
					<view class="image-item" v-for="(img, idx) in imageList" :key="idx" @click="previewImage(idx)">
						<image :src="img" mode="aspectFill" class="thumb"></image>
						<view class="save-btn" @click.stop="saveOne(img, idx)">保存</view>
					</view>
				</view>
			</view>

			<!-- 视频结果区域（保留原有功能） -->
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
			<view class="ad-wraper"></view>
		</view>
		<view class="pageLoading" v-show="loading">
			<full-loading bgColor="rgba(255, 255, 255, .7)" />
		</view>
	</view>
</template>
<script>
import fullLoading from "@/components/full-loading.vue"
import { baseImgUrl, waterMarkUrl } from "@/config/config.js"

const XHS_API = "http://122.51.6.129:8360/xhs/images"

export default {
	components: {
		fullLoading
	},
	data() {
		return {
			loading: false,
			baseImgUrl,
			pasteValue: "",
			imageList: [],
			videoUrl: "",
			video_title: "",
			showVideo: false,
			tempFilePath: "",
			saveProgress: 0
		}
	},
	onLoad() {},
	onShareAppMessage: function() {
		return {
			title: "琳琳去水印 - 一键提取小红书无水印图片，快来试试！",
			path: "/pages/watermark/index",
			success: function(e) {}
		};
	},
	onShareTimeline: function() {
		return {
			title: "琳琳去水印 - 一键提取小红书无水印图片，快来试试！",
			path: "/pages/watermark/index",
			success: function(e) {}
		};
	},
	methods: {
		NavigateTos(urls) {
			uni.navigateTo({ url: urls })
		},
		paste() {
			const that = this
			uni.getClipboardData({
				success(e) {
					if (e.errMsg == "getClipboardData:ok") {
						that.pasteValue = e.data;
						setTimeout(() => uni.hideToast(), 1000);
					}
				}
			})
		},
		fetchImages() {
			const { pasteValue } = this
			if (!pasteValue) {
				uni.showToast({ title: '请先粘贴链接', icon: 'none' })
				return
			}
			// 判断是否小红书链接
			const isXhs = pasteValue.includes('xiaohongshu.com') || pasteValue.includes('xhslink.com') || pasteValue.includes('小红书')
			if (isXhs) {
				this.fetchXhsImages()
			} else {
				this.clearWatermark()
			}
		},
		fetchXhsImages() {
			const that = this
			this.loading = true
			this.imageList = []
			this.showVideo = false

			uni.request({
				url: XHS_API,
				method: 'GET',
				data: { url: this.pasteValue },
				success(e) {
					that.loading = false
					if (e.statusCode === 200 && e.data.errno === 0) {
						that.imageList = e.data.data.images || []
						if (that.imageList.length === 0) {
							uni.showToast({ title: '未找到图片', icon: 'none' })
						}
					} else {
						uni.showToast({ title: e.data.errmsg || '提取失败', icon: 'none' })
					}
				},
				fail() {
					that.loading = false
					uni.showToast({ title: '网络请求失败', icon: 'none' })
				}
			})
		},
		clearWatermark() {
			const that = this
			const url = this._parseUrl(this.pasteValue)
			if (!url) {
				uni.showToast({ title: '分享地址不太对哦', icon: 'none' })
				return
			}
			this.loading = true
			this.imageList = []
			uni.request({
				url: waterMarkUrl,
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				data: { url },
				success(e) {
					that.loading = false
					if (e.statusCode == 200 && e.data.code == 200) {
						that.videoUrl = e.data.data.down;
						that.videoShowUrl = e.data.data.video;
						that.video_title = e.data.data.title;
						that.showVideo = true;
					} else {
						that.showVideo = false;
						uni.showToast({ title: '不支持您输入的链接', icon: 'none' })
					}
				}
			})
		},
		previewImage(idx) {
			uni.previewImage({
				urls: this.imageList,
				current: idx
			})
		},
		saveOne(url, idx) {
			// #ifdef H5
			this.h5Download(url, `xhs_${idx + 1}.jpg`)
			// #endif
			// #ifndef H5
			uni.showLoading({ title: '保存中...' })
			uni.downloadFile({
				url,
				success(res) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success() {
							uni.showToast({ title: `第${idx + 1}张已保存`, icon: 'success' })
						},
						fail() {
							uni.showToast({ title: '保存失败，请检查权限', icon: 'none' })
						}
					})
				},
				fail() {
					uni.hideLoading()
					uni.showToast({ title: '下载失败', icon: 'none' })
				}
			})
			// #endif
		},
		saveAll() {
			const that = this
			if (this.imageList.length === 0) return
			// #ifdef H5
			this.imageList.forEach((url, idx) => {
				setTimeout(() => this.h5Download(url, `xhs_${idx + 1}.jpg`), idx * 500)
			})
			uni.showToast({ title: `开始下载${this.imageList.length}张图片`, icon: 'success' })
			// #endif
			// #ifndef H5
			uni.showModal({
				title: "温馨提示",
				content: `确定保存全部 ${this.imageList.length} 张图片到相册吗？`,
				success(e) {
					if (e.cancel) return
					that.loading = true
					let done = 0
					const total = that.imageList.length
					that.imageList.forEach((url) => {
						uni.downloadFile({
							url,
							success(res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									complete() {
										done++
										if (done >= total) {
											that.loading = false
											uni.showToast({ title: `已保存${done}张图片`, icon: 'success' })
										}
									}
								})
							},
							fail() {
								done++
								if (done >= total) {
									that.loading = false
									uni.showToast({ title: `已保存${done}张图片`, icon: 'success' })
								}
							}
						})
					})
				}
			})
			// #endif
		},
		h5Download(url, filename) {
			fetch(url)
				.then(res => res.blob())
				.then(blob => {
					const a = document.createElement('a')
					a.href = URL.createObjectURL(blob)
					a.download = filename
					a.click()
					URL.revokeObjectURL(a.href)
				})
				.catch(() => {
					// fetch 跨域失败时直接用 a 标签打开
					const a = document.createElement('a')
					a.href = url
					a.target = '_blank'
					a.download = filename
					a.click()
				})
		},
		copyAll() {
			uni.setClipboardData({
				data: this.imageList.join('\n'),
				showToast: true
			})
		},
		copy() {
			uni.setClipboardData({
				data: this.videoUrl,
				showToast: true
			})
		},
		save() {
			const that = this
			uni.showModal({
				title: "温馨提示",
				content: "您确定要保存视频到您的相册吗",
				success(e) {
					if (e.cancel) return
					that.loading = true
					uni.downloadFile({
						url: that.videoUrl,
						success(res) {
							that.tempFilePath = res.tempFilePath
							uni.authorize({
								scope: "scope.writePhotosAlbum",
								success() {
									uni.saveVideoToPhotosAlbum({
										filePath: that.tempFilePath,
										success() {
											that.loading = false
											uni.showToast({ title: '保存成功', icon: 'none' })
										},
										fail() { that.loading = false }
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
						fail(err) {
							uni.showModal({
								title: '请复制地址去浏览器粘贴下载',
								content: err.errMsg,
								showCancel: false
							})
							that.loading = false
						}
					})
				}
			})
		},
		_parseUrl(text) {
			let startIndex = text.lastIndexOf('http://')
			startIndex = startIndex === -1 ? text.lastIndexOf('https://') : startIndex
			if (startIndex === -1) return null
			let link = text.substr(startIndex)
			const endIndex = link.indexOf(' ')
			if (endIndex !== -1) link = link.substring(0, endIndex)
			return link
		}
	}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

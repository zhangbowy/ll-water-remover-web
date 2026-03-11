<template>
	<view>
		<view class="padding-lg">
			<view class="zhu">01&nbsp;/&nbsp;如何复制视频链接</view>
			<view class="fu margin-top-xl">
				打开您的短视频APP，然后点击分享，就会出现一个复制链接的选项，点击复制链接，然后来到小程序去水印页面，
				粘贴链接再点去除水印就可以去水印了。
			</view>
			<image class="margin-top shadow-shop" mode="widthFix"
				:src="`${baseImgUrl}/cloudstorage/a5342c8c-905b-4303-a4af-06f972ccbdfb.jpg`" >
			</image>
			<image class="margin-top shadow-shop" mode="widthFix" 
				:src="`${baseImgUrl}/cloudstorage/9edbb4dd-57c1-4d1c-9ff1-a7c6649197a6.jpg`" >
			</image>
			<view class="zhu margin-top-xl">02&nbsp;/&nbsp;为什么下载失败</view>
			<view class="fu margin-top-xl">
				由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，
				需要解析成功后，复制无水印链接到浏览器下载
			</view>
			<view class="fu margin-top">1、如果您是安卓手机，直接复制无水印链接，然后任意一个浏览器打开即可。</view>
			<view class="fu margin-top">2、如果您是苹果手机，需要下载软件 documents 才能在浏览器中进行下载视频。</view>
		</view>
	</view>
</template>

<script>
	import { baseImgUrl } from "@/config/config.js"
	export default {
		data() {
			return {
				baseImgUrl,
			}
		},
		methods: {

		}
	}
</script>

<style>
	.zhu {
		font-size: 36rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.fu {
		font-size: 28rpx;
		color: #565656;
		letter-spacing: 2rpx;
		line-height: 50rpx;
	}

	image {
		width: 100%;
		border-radius: 4rpx;
	}
</style>

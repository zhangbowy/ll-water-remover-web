<template>
	<view>
		<view class="userHome">
			<!-- <view  style="width: 100%;text-align: center;">
				<text class="text-gray text-xl text-center">关于作者</text>
			</view> -->
			<view class="margin-top-lg">
				<text class="title">Hi! 欢迎使用视频去水印工具plus！</text>
			</view>
			<view class="margin-top lianxi">
					<view>
						如果喜欢本小程序，可以联系我们代为搭建！
					</view>
					<view>
						微信号
					</view>
					<view>
						或者长按二维码添加
					</view>
					<image  mode="widthFix" :show-menu-by-longpress="true"
						src=""></image>
			</view>
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
		onLoad() {},
		methods: {}
	}
</script>
<style>
	.userHome{
		min-height: 100vh !important;
		background-color: #FFFFFF;
		padding: 50rpx;
		border-radius: 10rpx;
	}
	.title{
		font-size: 40rpx;
		font-weight: 600;
		color: #000;
	}
	.lianxi{
		font-size: 30rpx;
		line-height: 60rpx;
	}
	image{
		margin-top: 20rpx;
	}
</style>

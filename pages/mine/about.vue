<template>
	<view>
		<view class="userHome">
			<view class="margin-top-lg">
				<text class="title">Hi! 欢迎使用琳琳去水印！</text>
			</view>
			<view class="margin-top lianxi">
				<view>
					小红书无水印图片提取工具，粘贴链接即可一键保存高清图片。
				</view>
				<view class="margin-top">
					支持小红书各类链接格式，包括分享链接、短链接等。
				</view>
				<view class="margin-top">
					如有问题或建议，欢迎联系我们反馈！
				</view>
				<view class="version margin-top-lg">
					版本：v1.0.0
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>
<style>
.userHome {
	min-height: 100vh !important;
	background-color: #FFFFFF;
	padding: 50rpx;
	border-radius: 10rpx;
}

.title {
	font-size: 40rpx;
	font-weight: 600;
	color: #000;
}

.lianxi {
	font-size: 30rpx;
	line-height: 60rpx;
	color: #565656;
}

.version {
	color: #999;
	font-size: 26rpx;
}
</style>

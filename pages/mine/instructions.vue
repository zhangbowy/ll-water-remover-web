<template>
	<view>
		<view class="padding-lg">
			<view class="zhu">01&nbsp;/&nbsp;如何提取小红书图片</view>
			<view class="fu margin-top-xl">
				打开小红书APP，找到您想保存的笔记，点击右上角「分享」按钮，选择「复制链接」。
				然后回到本小程序，点击「粘贴链接」，再点击「提取图片」即可获取无水印图片。
			</view>
			<view class="step-list margin-top-xl">
				<view class="step-item">
					<view class="step-num">1</view>
					<view class="step-text">打开小红书，找到要保存的笔记</view>
				</view>
				<view class="step-item">
					<view class="step-num">2</view>
					<view class="step-text">点击右上角分享 → 复制链接</view>
				</view>
				<view class="step-item">
					<view class="step-num">3</view>
					<view class="step-text">回到本程序，粘贴链接 → 提取图片</view>
				</view>
				<view class="step-item">
					<view class="step-num">4</view>
					<view class="step-text">点击图片可预览大图，点击「保存」下载到相册</view>
				</view>
			</view>

			<view class="zhu margin-top-xl">02&nbsp;/&nbsp;支持哪些链接格式</view>
			<view class="fu margin-top-xl">支持以下几种小红书链接格式：</view>
			<view class="fu margin-top">1、直接链接：https://www.xiaohongshu.com/explore/xxx</view>
			<view class="fu margin-top">2、分享链接：https://www.xiaohongshu.com/discovery/item/xxx</view>
			<view class="fu margin-top">3、短链接：http://xhslink.com/xxx</view>
			<view class="fu margin-top">4、分享文本：直接粘贴从小红书复制的整段分享内容即可，程序会自动识别其中的链接。</view>

			<view class="zhu margin-top-xl">03&nbsp;/&nbsp;图片保存失败怎么办</view>
			<view class="fu margin-top-xl">
				如果点击保存后提示失败，请检查以下情况：
			</view>
			<view class="fu margin-top">1、请确认已授权相册/存储权限，可在系统设置中开启。</view>
			<view class="fu margin-top">2、H5 网页端会自动触发浏览器下载，注意浏览器是否拦截了下载弹窗。</view>
			<view class="fu margin-top">3、也可以点击「复制全部链接」，在浏览器中打开图片地址手动保存。</view>

			<view class="zhu margin-top-xl">04&nbsp;/&nbsp;为什么提取不到图片</view>
			<view class="fu margin-top-xl">
				部分笔记为视频类型，不包含图片，此类笔记暂时无法提取。
				如果确认是图文笔记仍无法提取，可能是链接格式不正确，请重新复制链接后再试。
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

.step-list {
	padding: 0 10rpx;
}

.step-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 24rpx;
}

.step-num {
	width: 48rpx;
	height: 48rpx;
	line-height: 48rpx;
	text-align: center;
	border-radius: 50%;
	background: #ff2442;
	color: #fff;
	font-size: 26rpx;
	font-weight: bold;
	flex-shrink: 0;
	margin-right: 20rpx;
}

.step-text {
	font-size: 28rpx;
	color: #333;
	line-height: 48rpx;
	letter-spacing: 2rpx;
}
</style>

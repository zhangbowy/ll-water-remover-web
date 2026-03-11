<style lang="scss">
	@import "ui/uview-ui/index.scss";
	@import url("./static/icon/icon.css");
	@import url("./static/icon/main.css");
</style>
<script>
export default {
	onLaunch: function() {
		// #ifdef MP
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			console.log(res);
		});
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				confirmColor: '#fcc600',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
		// #endif
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>


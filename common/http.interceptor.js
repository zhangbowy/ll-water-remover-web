import { baseUrl } from "../config/config"

const install = (Vue, vm) => {
	
	Vue.prototype.$u.http.setConfig({
		baseUrl,
		showLoading: true,
		loadingText: '加载中',
		loadingTime: 800,
		loadingMask: true
	})
	
	Vue.prototype.$u.http.interceptor.request = (config) => {
		return config
	}
	
	Vue.prototype.$u.http.interceptor.response = (res) => {
		return res
	}
}

export default {
	install
}
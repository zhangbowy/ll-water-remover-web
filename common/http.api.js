import { prePayUrl } from "./url/pay.js"

const install = (Vue, vm) => {
	let prePay = ({ loading, ...data }) => vm.$u.post({ url: prePayUrl, data, loading })

	vm.$u.api = {
		prePay
	}
}

export default {
	install
}

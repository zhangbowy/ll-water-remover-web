const baseImgUrl = 'https://mp-452ddc1c-b2e9-44ad-bf8b-3a086868af65.cdn.bspapp.com'

const waterMarkUrl = ""
//需要接口可加微信Y298318（备注视频去水印）
const indexData = [
	{
		key: "china",
		name: "小红旗",
		order: 1,
		avatar: "/cloudstorage/dfa952af-91a1-43ea-9f01-26ccb2409e5a.png",
		bg: "/cloudstorage/497171e5-41d7-4810-ad45-5902a70bdea6.jpg",
		imgList: [
			"/cloudstorage/61c7a029-f4c2-415d-89e0-e64de599a02a.png"
		],
		share: {
			desc: "国旗永远在心中",
			imageUrl: "/cloudstorage/dfa952af-91a1-43ea-9f01-26ccb2409e5a.png",
			path: "/pages/index/index",
			title: "国旗永远在心中"
		}
	},
	{
		key: "newyear",
		name:  "中国年",
		order: 2,
		avatar: "/cloudstorage/d6471fd1-d15c-4ef2-b8bb-52997dd2fcf2.png",
		bg: "/cloudstorage/b749a133-d249-4fcb-8ffd-c15581dff28b.jpg",
		imgList: [
			 "/cloudstorage/03215d87-93b4-413d-8ef3-bce4234d8810.png"
		],
		share: {
			desc: "爆竹声中一岁除,春风送暖入屠苏。 千门万户曈曈日,总把新桃换旧符。",
			imageUrl: "/cloudstorage/d6471fd1-d15c-4ef2-b8bb-52997dd2fcf2.png",
			path: "/pages/index/index",
			title: "爆竹声中一岁除,春风送暖入屠苏。 千门万户曈曈日,总把新桃换旧符。"
		}
	},
	{
		key:  "mask",
		name: "戴口罩",
		order: 3,
		avatar: "/cloudstorage/24afc2e2-5dee-451f-9dc8-4ed3448ad401.png",
		bg: "/cloudstorage/bac3a255-cd9c-4a31-9d4f-133cb179c36f.jpg",
		imgList: [
			"/cloudstorage/074e1d76-e1b5-41f5-83dc-036d04c58dde.png"
		],
		share: {
			desc: "戴口罩,防病毒",
			imageUrl: "/cloudstorage/24afc2e2-5dee-451f-9dc8-4ed3448ad401.png",
			path: "/pages/index/index",
			title: "戴口罩,防病毒"
		}
	},
	{
		key: "christmas",
		name: "圣诞帽",
		order: 4,
		avatar: "/cloudstorage/81d53120-af0f-449b-8bc8-18d238547e53.jpg",
		bg: "/cloudstorage/a36a1440-63e2-453f-a91b-dca108414f77.jpg",
		imgList: [
			"/cloudstorage/5d784f51-e40e-4f5f-a470-b383609be30b.png"
		],
		share: {
			desc: "来打雪仗吧，圣诞快乐",
			imageUrl: "/cloudstorage/81d53120-af0f-449b-8bc8-18d238547e53.jpg",
			path: "/pages/index/index",
			title: "来打雪仗吧，圣诞快乐"
		}
	}
]

const frameData = [
	{
		key: 1,
		title: "万圣节",
		order: 1,
		selected: true,
		avatar: "/cloudstorage/81d53120-af0f-449b-8bc8-18d238547e53.jpg",
		bg: "/cloudstorage/bac3a255-cd9c-4a31-9d4f-133cb179c36f.jpg",
		imgList: [
			{
				key: "1.1",
				src: "/cloudstorage/7a6cd292-15dd-4e19-91c5-99e5911bdd84.png"
			}
		],
		share: {
			desc: "🎃 万圣节一起来扮鬼，换个头像做票圈最靓的仔",
			imageUrl: "/cloudstorage/81d53120-af0f-449b-8bc8-18d238547e53.jpg",
			path: "/pages/frame/index",
			title: "🎃 万圣节一起来扮鬼，换个头像做票圈最靓的仔"
		}
	},
	{
		key: 2,
		title: "国庆节",
		order: 2,
		selected: false,
		avatar: "/cloudstorage/dfa952af-91a1-43ea-9f01-26ccb2409e5a.png",
		bg: "/cloudstorage/497171e5-41d7-4810-ad45-5902a70bdea6.jpg",
		imgList: [
			{
				key: "2.1",
				src: "/cloudstorage/5d8bb897-2676-4830-9a11-85d80729671d.png"
			}
		],
		share: {
			desc: "不忘初心，牢记使命，愿祖国繁荣昌盛",
			imageUrl: "/cloudstorage/dfa952af-91a1-43ea-9f01-26ccb2409e5a.png",
			path: "/pages/frame/index",
			title: "不忘初心，牢记使命，愿祖国繁荣昌盛"
		}
	}
]

export {
	baseImgUrl,
	indexData,
	frameData,
	waterMarkUrl
}
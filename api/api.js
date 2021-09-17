import api from './request.js'

export default {
	// 获取首页数据
	getIndexData(){
		return api.get("/mobile/index")
	},
	// 获取可用秒杀列表
	getFlashsale(params = {}){
		return api.get("/mobile/flashsale",params)
	},
	// 获取可用拼团列表
	getGroup(params = {}){
		return api.get("/mobile/group",params)
	},
	// 注册
	reg(data){
		return api.post("/mobile/reg",data)
	},
	// 登录
	login(data){
		return api.post("/mobile/login",data)
	},
	// 获取手机验证码
	getCaptcha(data){
		return api.post("/mobile/get_captcha",data)
	},
	// 绑定手机号
	bindMobile(data){
		return api.post("/mobile/bind_mobile",data)
	},
	// 找回密码
	forget(data){
		return api.post("/mobile/forget",data)
	},
	// 退出登录
	logout(){
		return api.post("/mobile/logout")
	},
	// 修改密码
	updatePassword(data){
		return api.post("/mobile/update_password",data)
	},
	// 上传图片
	upload(filePath,onProgress = null){
		api.upload("/mobile/upload",{
			filePath
		},{
			onProgress
		})
	}
}
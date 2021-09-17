import store from 'store/index.js'
export default {
	config: {
		baseURL: "http://ceshi8.dishaxy.com",
		appid: "bd9d01ecc75dbbaaefce",
		// 请求拦截器
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				// 公共参数处理
				options.url = this.baseURL + options.url
				options.method = options.method || 'GET'
				options.header = {
					appid: this.appid,
					token: store.state.token
				}

				// 权限相关验证

				resolve(options)
			})
		},
		// 响应拦截器
		handleResponse([error, res]) {
			return new Promise((resolve, reject) => {
				// 错误提示处理
				if (res.statusCode != 200 || res.data.msg == 'fail') {
					let msg = res.data.data || '请求失败'
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return reject(msg)
				}
				resolve(res.data.data)
			})
		}
	},
	request(options = {}) {
		return this.config.beforeRequest(options).then(opt => uni.request(opt)).then(this.config.handleResponse)
	},
	// GET请求
	get(url, params = null, options = {}) {
		options.url = url

		options.url += params ? ('?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')) : ''

		options.method = 'GET'
		return this.request(options)
	},
	// POST请求
	post(url, data = {}, options = {}) {
		options.url = url
		options.method = 'POST'
		options.data = data
		return this.request(options)
	},
	// 上传文件
	upload(url, data = {}, options = {}) {
		options.url = url
		return this.config.beforeRequest(options).then(opt => {
			return new Promise((resolve, reject) => {
				let uploadTask =  uni.uploadFile({
					url: opt.url, //仅为示例，非真实的接口地址
					filePath: data.filePath,
					name: data.name || 'files',
					header:opt.header,
					success: (res) => {
						if(res.statusCode !=200){
							reject('上传失败')
							return uni.showToast({
								title:'上传失败',
								icon:'none'
							})
						}
						let message = JSON.parse(res.data)
						console.log('message',message)
						resolve(message.data)
					},
					fail:(err)=>{
						console.log('err',err)
						reject(err.message)
					}
				})
				uploadTask.onProgressUpdate((res) => {
					if(options.onProgress && typeof options.onProgress == 'function'){
						options.onProgress(res.progress)
					}
				});
			})
		})
	}
}

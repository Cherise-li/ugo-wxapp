// 单独封装vue插件,然后导出,通过vue.use()进行调用
export default function (Vue) {
    // 配置基地址
    const baseUrl = 'https://api-ugo-web.itheima.net'
    // 未来会传入接口路径,请求方式,请求体等,所以要传入一个对象
    Vue.prototype.request = async function (options) {
  
      // 在发出请求之前showLoading
      uni.showLoading({
        title: '加载中...'
      })
      const [err,res] = await uni.request({
        url: baseUrl + options.url,
        header: options.header,
        data: options.data,
          method: options.method
      })
      // 请求成功后hideLoading
      uni.hideLoading()
       // 关闭下拉效果
       uni.stopPullDownRefresh()
      // 简化返回数据
      return res.data
    }
  }
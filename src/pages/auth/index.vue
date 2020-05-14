<template>
  <view>
     <button type="primary" open-type="getUserInfo" @getuserinfo="btn_userInfo">微信登录</button>
  </view>
</template>

<script>
  export default {
    onLoad () {
      this.getUserinfo()
    },
    methods: {
      async getUserinfo () {
        // 通过api在页面初始化获取用户信息
        const [err,res] = await uni.getUserInfo()
        console.log(res);
        // 如果有用户信息,则调用登录请求函数,把用户信息当做参数传入
        if (res) {
          this.getToken(res)
        }
      },
      // 如果初始化没有用户信息,则手动点击获取
      btn_userInfo (e) {
        // 传入事件对象,获取用户信息
        // 获取成功后,作为参数传入获取token的请求中
        this.getToken(e.detail)
      },
      async getToken (data) {
        // code：JS api 直接进行获取  uni.login() 异步
        const [err,res] = await uni.login()
        // 发请求
        const {message} = await this.request({
          url:"/api/public/v1/users/wxlogin",
          method:"POST",
          data:{
            encryptedData:data.encryptedData,
            iv:data.iv,
            rawData:data.rawData,
            signature:data.signature,
            code:res.code,
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  button {
    width: 600rpx;
    margin: 200rpx auto 0;
  }
</style>
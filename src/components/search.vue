<template lang="wxml">
  <!-- 搜索区域 -->
  <!-- 顶部搜索栏 -->
		<view class="nav" :class="{'focus':isFocus}">
			<view class="top">
                <input type="text" @focus="addClass" :placeholder='placeholder'>
                <view class="cancel" @tap="blur" v-show="isFocus">取消</view>
                <view class="icon_1" v-if="!isFocus">搜索</view>
                <view class="icon_2" v-else ></view>
            </view>
            <view class="btm" v-show="isFocus">历史记录</view>
		</view>
</template>

<script>
export default {
    data() {
        return {
            isFocus: false,
            placeholder: ''
        }
    },
    methods: {
        addClass () {
            this.isFocus = true
            this.placeholder='请输入您想要的商品'
            const info = uni.getSystemInfoSync()
            this.$emit('send',info.windowHeight+'px')
        },
        blur () {
            this.isFocus = false;
            this.placeholder=''
            this.$emit('send','auto')
        }
    }
}
</script>

<style scoped lang='less'>
	
		.nav {
            .top {
                position: relative;
                box-sizing: border-box;
                padding: 20rpx 16rpx;
                background-color: red;

                input {
                    height: 60rpx;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 6rpx;
                }
                .icon_1 {
                    display: block;
                    background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
                    background-size: 32rpx;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    font-size: 24rpx;
                    // content区 是包括 padding区域,背景图要出现在content区域；
                    padding-left: 50rpx;
                    color:#ccc;
                }
            }
        }
        .focus {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            .top {
                    background-color: rgb(239, 239, 239);
                    display: flex;
                    input {
                        flex: 1;
                        padding-left: 55rpx;
                        font-size: 24rpx;
                        color: #ccc;
                    }
                    .cancel {
                        display: block;
                        width: 150rpx;
                        border:1px solid #ccc;
                        line-height: 60rpx;
                        box-sizing: border-box;
                        text-align: center;
                        font-size: 24rpx;
                        border-radius: 10rpx;
                        margin-left: 20rpx;
                    }
                    .icon_2 {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 30rpx;
                        transform: translateY(-50%);
                        width: 32rpx;
                        height: 32rpx;
                        background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
                        background-size: 32rpx;
                    }
               }
              
            
            .btm {
                display: block;
                position: absolute;
                top: 100rpx;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: pink;
               }

           
           }
		
</style>
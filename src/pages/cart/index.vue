<template>
  <view class="wrapper">
    <!-- 收货信息 -->
   <!-- 判断有没有收货地址？没有地址，下面信息框 不显示 -->
  <block v-if="addr">
        <view class="dt">收货人: </view>
        <view class="dd meta">
          <text class="name">{{addr.userName}}</text>
          <text class="phone">{{addr.telNumber}}</text>
        </view>
        <view class="dt">收货地址:</view>
        <view class="dd">{{addr.detail}}</view>
  </block>


<!-- 按钮：点击获取地址 -->
  <button
  v-else
  type="primary"
  @tap='getAddr'>收货地址</button>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view
        class="goods"
        v-for="(item,i) in list"
        :key="item.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_small_logo"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @tap='cNum(-1,i)'>-</text>
              <input type="number" :value="item.goods_number" class="number">
              <text class="plus" @tap='cNum(1,i)'>+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon
            type="success"
            size="20"
            :color="item.checked?'#ea4451':'#ccc'"
            @tap='changeCk(i)'></icon>
          </view>
        </view>
       
        
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
       <icon
            type="success"
            size="20"
            :color="is?'#ea4451':'#ccc'"
            @tap='checkAll'>
        全选
        </icon>
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{sum}}</label><text>.00</text>
      </view>
      <view class="pay" @tap='goPay'>结算(3)</view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        list: [],
        addr: null
      }
    },
    onShow () {
      this.list = uni.getStorageSync("cc")||[]
    },
     computed: {
        buyCar: function () {
          const arr = []
          // 遍历购物车,查看购物车商品的状态
          this.list.forEach((item,i)=> {
            // 如果是选中状态,则添加到选中的列表中
            if (item.checked) {
              arr.push(item)
            }
          })
        // 返回数据
        return arr
        },

        is: function () {
          return this.list.length === this.buyCar.length
        },
        sum () {
          var total = 0
          this.buyCar.forEach((item,i)=> {
            
            total += item.goods_number * item.goods_price
          })
          // 返回总价
          return total
        }
     },
    methods: {
      async goPay () {
        // 1. 判断是否有收货地址,没有提醒输入收获地址
        if (!this.addr) {
          uni.showToast({title:"没有收货地址！",icon:"none"});
          return;
        }
        //2. 判断购物车是否有商品
        if(!this.buyCar.length) {
          uni.showToast({title: '没有选中任何商品',icon:'none'})
          return
        }
        // 3. 判断是否有token
        if (!uni.getStorageSync('token')) {
          uni.navigateTo({
            url: "/pages/auth/index"
          })
        }
        const {message,meta} = await this.request({
          url: '',
          header: {
            Authorization:uni.getStorageSync("token")
          },
          methods: 'POST',
          data: {
            order_price:this.sum,
            consignee_addr:this.addr.detail,
            goods:this.buyCar
          }
        })
        if (meta.status === 200) {
          // 清除本地购物车商品数据
          uni.removeStorageSync('cc')
          // 跳转到订单页面
          uni.navigateTo({
            url: '/pages/order/index'
          })
        }
      },
      getAddr () {
        uni.chooseAddress({
        success:(res)=>{
        this.addr = res;
        // 详细地址
        this.addr.details = res.provinceName+res.cityName+res.countyName+res.detailInfo;
    }
});
      },
      checkAll () {
        //  Computed property "is" was assigned to but it has no setter
        // 不能这样写  只能获取 不能设置 this.is = !this.is
        const key = !this.is
        // 设置给所有的数据的状态
        // 遍历数组
        this.list.forEach (item=> {
          item.checked = key
        })
        // 保存到本地
        uni.setStorageSync('cc',this.list)
      },
      changeCk (i) {
    
         // 取反：
        this.list[i].checked = !this.list[i].checked;

        // 代码？存入本地？为什么要存入本地？修改了数据 
        uni.setStorageSync("cc",this.list);
      
      },
      cNum (n,i) {
        // 如果是-1,判断商品数量是否等于1,等于1的话则不能再减
        if (n===-1&&this.list[i].goods_number===1){ return }

        // 如果是+1,判断商品数量是否到达库存,达到就不能再加
        if (n===1 && this.list[i].goods_number===10) { return }
        // js中改变商品数量值
        this.list[i].goods_number+=n
        // 将改变的值存入本地
        uni.setStorageSync('cc',this.list)
      }
    }
  }
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        text {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>


<template>
	<view class="content" :style="{'height':height,'overflow':'hidden'}">
		<!-- 搜索区域 -->
		<search @send = 'send' ></search>
		<!-- 轮播区域 -->
		<swiper indicator-dots autoplay duration='200' circular>
			<!-- 轮播一 -->
			<swiper-item>
				<navigator>
					<image src="../../static/uploads/banner1.png"></image>
				</navigator>
			</swiper-item>
			<!-- 轮播图二 -->
			<swiper-item>
				<navigator>
					<image src="../../static/uploads/banner2.png"></image>
				</navigator>
			</swiper-item>
			<!-- 轮播图三 -->
			<swiper-item>
				<navigator>
					<image src="../../static/uploads/banner3.png"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- tab栏区域 -->
		<view class="tab">
			<navigator>
				<image src="../../static/uploads/icon_index_nav_1@2x.png"></image>
			</navigator>
			<navigator>
				<image src="../../static/uploads/icon_index_nav_2@2x.png"></image>
			</navigator>
			<navigator>
				<image src="../../static/uploads/icon_index_nav_3@2x.png"></image>
			</navigator>
			<navigator>
				<image src="../../static/uploads/icon_index_nav_4@2x.png"></image>
			</navigator>
		</view>

		<!-- 楼层区域 -->
		<view class="floors">
			<!-- 第一楼层 -->
			<view class="floor">
				<view class="header">					
						<image src="../../static/uploads/pic_floor01_title.png" > 
				</view>
				<view class="images">
					<navigator>
						<image src="../../static/uploads/pic_floor01_1@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor01_2@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor01_3@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor01_4@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor01_5@2x.png" >
					</navigator>
				</view>
			</view>

			<!-- 第二楼层 -->
			<view class="floor">
				<view class="header">					
						<image src="../../static/uploads/pic_floor02_title.png" > 
				</view>
				<view class="images">
					<navigator>
						<image src="../../static/uploads/pic_floor02_1@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor02_2@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor02_3@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor02_4@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor02_5@2x.png" >
					</navigator>
				</view>
			</view>
			<!-- 第三楼层 -->
			<view class="floor">
				<view class="header">					
						<image src="../../static/uploads/pic_floor03_title.png" > 
				</view>
				<view class="images">
					<navigator>
						<image src="../../static/uploads/pic_floor03_1@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor03_2@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor03_3@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor03_4@2x.png" >
					</navigator>
					<navigator>
						<image src="../../static/uploads/pic_floor03_5@2x.png" >
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/search.vue'
	export default {
		data() {
			return {
				height: 'auto'
			}
		},
		components: {
			search
		},
		methods: {
			send (e) {
				this.height = e
			}
		}
	}
</script>

<style lang='less'>
	.content {
	
		swiper {
			height: 340rpx;
			image {
				width: 750rpx;
				height: 340rpx;
			}
		
		}
		.tab {
			display: flex;

			navigator {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 25rpx;
			}
				image {
					
					width: 128rpx;
					height: 128rpx;
				}

		}
		.floors {
			.floor {
				.header {
					box-sizing: border-box;
					padding: 26rpx 16rpx;
					background-color: #f4f4f4;

					image {
						width: 750rpx;
						height: 60rpx;
					}
					
						
					
						
				
					
				}
				.images {
						box-sizing: border-box;
						padding: 20rpx 12rpx;
						overflow: hidden;
						navigator {
							float: left;
							image {
							width: 100%;
							height: 100%;
							}
						}
						navigator:nth-child(1) {
							width: 232rpx;
							height: 386rpx;
						}
						navigator:nth-child(2),
						navigator:nth-child(5){
							width: 273rpx;
							height: 188rpx;
						}
						navigator:nth-child(3),
						navigator:nth-child(4) {
							width: 203rpx;
							height: 188rpx;
						}
						navigator:nth-child(n+2) {
							margin-left: 10rpx;
						}
						navigator:nth-child(2),
						navigator:nth-child(3) {
							margin-bottom: 10rpx;
						}

				}
			}
		}
		.floors {
			.floor:nth-child(1) {

			.images {
				navigator:nth-child(1){
					width: 232rpx;
					height: 386rpx;
				}
				navigator:nth-child(n+2){
					width: 236rpx;
					height: 188rpx;
				}
			}
				
			}
		}
	}

	
</style>

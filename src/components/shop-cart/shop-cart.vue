<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart highlight"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              <bubble :num="totalCount"></bubble>
            </div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop="pay">
          <div class="pay not-enough" :class="{'enough':totalPrice>=minPrice}">
            {{payDesc}}
          </div>
        </div>
      </div>

      <div class="ball-container">
        <!--<div class="ball" v-for="(ball,index) in showList" :key="index">{{ball}}</div>-->
        <!--<div v-for="(ball,index) in balls" :key="index">-->
        <!--<transition-->
        <!--@before-enter="beforeDrop"-->
        <!--@enter="dropping"-->
        <!--@after-enter="afterDrop">-->
        <!--<div class="ball" v-show="ball.show">-->
        <!--<div class="inner inner-hook"></div>-->
        <!--</div>-->
        <!--</transition>-->
        <!--</div>-->
      </div>
    </div>
    <!--<div v-for="(ball,index) in selectFoods" :key="index">{{ball.name}}  {{ball.price*ball.count}}-->
    <!--<cartControl :food="ball"></cartControl>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'


  export default {
    name: "shop-cart",
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isHide: true
      }
    },
    methods: {

      //购物车折叠
      toggleList() {
        if (this.isHide) {
          if (!this.totalCount) {
            return
          }
          this.isHide = false
          this._showShopCartList()
        } else {
          this._hideShopCartList()
          this.isHide = true
        }
      },
      _showShopCartList() {
        //用createAPI(拿到HeaderDetail的实例对象)
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          //解决点击蒙层关闭后，要点击两下才显示的bug(相当于父组件向子组件传递一个自定义hide方法)
          $events: {
            hide: () => {
              this.isHide = true
            }
          }
        })
        this.shopCartListComp.show()
      },
      _hideShopCartList() {
        this.shopCartListComp.hide()
      },

      //去支付
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        this.$createDialog({
          title: '支付',
          content: `您需要支付${this.totalPrice}元`
        }).show()
      }
    },
    computed: {
      //商品总数
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },

      //商品总价格
      totalPrice() {
        let price = 0
        this.selectFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },

      //支付判断
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return `去支付`
        }
      }
    },
    components: {
      Bubble
    }

  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .shopcart
    height: 100%
    .content
      display: flex
      background: $color-background
      font-size: 0
      color: $color-light-grey
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: $color-dark-grey
            &.highlight
              background: $color-blue
            .icon-shopping_cart
              line-height: 44px
              font-size: $fontsize-large-xxx
              color: $color-light-grey
              &.highlight
                color: $color-white
          .num
            position: absolute
            top: 0
            right: 0
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: $fontsize-large
          &.highlight
            color: $color-white
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $fontsize-small-s
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          &.not-enough
            background: $color-dark-grey
          &.enough
            background: $color-green
            color: $color-white
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: $color-blue
          transition: all 0.4s linear
</style>

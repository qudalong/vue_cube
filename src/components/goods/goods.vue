<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
              :side="true"
              :data="goods"
              :options="scrollOptions"
      >
        <!--左边-->
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
                  direction="vertical"
                  :labels="props.labels"
                  :txts="barTxts"
                  :current="props.current">
            <!--自定义导航-->
            <template slot-scope="props">
              <div class="text">
                <support-ico
                        v-if="props.txt.type>=1"
                        :size=3
                        :type="props.txt.type"
                ></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <!--右边-->
        <cube-scroll-nav-panel
                v-for="item in goods"
                :key="item.name"
                :label="item.name"
                :title="item.name">
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!--加减号-->
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      {{seller}}
      <shopCart
          :select-foods="selectFoods"
          :min-price="20"
          :delivery-price="4">
      </shopCart>
    </div>

  </div>
</template>

<script>
  import {getGoods} from 'api'
  import SupportIco from 'components/support-ico/support-ico'
  import Bubble from 'components/bubble/bubble'
  import cartControl from 'components/cart-control/cart-control'
  import shopCart from 'components/shop-cart/shop-cart'

  export default {
    name: "goods",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        goods: [],//如果从props里面去值 刷新页面时会有问题，因为开始就没goods数据
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller(){
        return this.data.seller
      },
      //购物车选择商品
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      //自定义导航栏
      barTxts() {
        const att = []
        this.goods.forEach((good) => {
          const {type, name, foods} = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          att.push({
            type,
            name,
            count
          })
        })
        return att
      }
    },
    created() {
      this._getGoods()
    },

    methods: {
      _getGoods() {
        getGoods().then((goods) => {
          this.goods = goods
        })
      },
      //添加商品
      onAdd() {
        console.log('点击了加号')
      }
    },
    components: {
      SupportIco,
      Bubble,
      cartControl,
      shopCart
    }


  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position: absolute
        right: -8px
        top: -10px
      .support-ico
        display: inline-block
        vertical-align: top
        margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>

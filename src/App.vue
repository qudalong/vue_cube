<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <Tab :tabs='tabs'></Tab>
  </div>
</template>

<script>
  import VHeader from './components/v-header/v-header'
  import Tab from './components/tab/tab'
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'
  import {getSeller} from 'api'


  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    computed: {
      tabs() {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              goods: this.seller
            }
          },
          {
            label: '评论',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
    },
    created() {
      this._getSeller()
    },
    methods: {
      _getSeller() {
        getSeller().then((seller) => {
          this.seller = seller
        })
      }
    },
    components: {
      VHeader,
      Tab
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    display: flex
    flex-direction: column
    height: 100%
</style>

import {createAPI} from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/index'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
//会在main.js主入口引入
createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
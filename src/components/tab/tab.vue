<template>
  <div class="tab">
    <cube-tab-bar
            :showSlider=true
            v-model="selectedLabel"
            :data="tabs"
            ref="tabBar"
            :useTransition=false
            class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
              ref="slide"
              :loop=false
              :auto-play=false
              :show-dots=false
              :initial-index="index"
              :options="options"
              @change="changePage"
              @scroll="scroll">
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab",
    props: {
      tabs: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        options: {
          probeType: 3,
          listenScroll: true,
          directionLockThreshold: 0//横向滚动,,
        },
        index: 0
      }
    },
    methods: {
      changePage(current) {
        this.index = current
      },
      scroll({x}) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
      height: 100%
</style>
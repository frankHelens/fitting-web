<template>
  <top-menu-item
    :badge="badge">
    <span slot="title">
      <i slot="title" class="fa fa-bell-o"></i>
      报警
    </span>
    <ul class="top-menu-alarms" slot="list">
      <li v-for="item in list">
        {{item.label}}
        {{' 安全存量'}}
        <span class="text-danger">{{item.safeQuantity}}</span>
        {{item.unit}}
        {{', 现有'}}
        <span class="text-danger">{{item.actualNum}}</span>
        {{item.unit}}
      </li>
    </ul>
  </top-menu-item>
</template>

<script>
import TopMenuItem from './TopMenuItem'
import { fetchList } from '../../../utils/api'

export default {
  name: 'Alarms',
  components: {
    TopMenuItem
  },
  data () {
    return {
      list: [],
      relation: {},
      badge: 0
    }
  },
  created () {
    this.getRelation()
  },
  methods: {
    getRelation () {
      fetchList({
        resource: 'productStore/relation'
      })
      .then((data) => {
        this.relation = data
        this.getData()
      })
    },
    getData () {
      fetchList({
        resource: 'productStore/listSafeQuantity?pageSize=99999&pageIndex=1'
      })
      .then((data) => {
        this.list = data.data.map(item => {
          const unit = this.relation.unit.find(unit => unit.id === item.product.unit).label
          return {
            label: item.product.name + '-' + this.relation.size.find(size => size.id === item.product.size).label,
            safeQuantity: item.product.safeQuantity,
            actualNum: item.actualNum,
            unit
          }
        })
        this.badge = data.data.length
      })
    }
  }
}
</script>

<style scoped lang="sass">
.top-menu-alarms
  max-height: 300px
  overflow: auto
  list-style: none
  padding: 0
  >li
    padding: 8px 16px
    color: #999999
    text-decoration: none
    display: block
    clear: both
    font-weight: 300
    line-height: 18px
    white-space: nowrap
    &:hover
      text-decoration: none
      color: #262626
      background-color: #e1e5ec
    >i
      display: inline-block
      width: 24px
      text-align: center
.text-danger
  color: #fe6553
</style>

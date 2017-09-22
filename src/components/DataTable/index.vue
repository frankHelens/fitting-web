<template>
  <div
    class="data-table-wrapper"
    :style="tableWrapperStyle">
    <v-table
      class="data-table"
      :tableStyle="tableStyle"
      >
      <v-thead slot="header" name="header">
        <v-tr>
          <v-th
            v-for="columnName in tableList"
            :key="columnName"
            :columnName="columnName"
            :column="columns[columnName]"
            :columnStyle="columnName | columnStyle(columns, longColumnResult, longColumnWidth)"
            :sortDirection="columnName | sortDirection(orderBy)"
            @changeOrderBy="changeOrderBy"
          />
          <v-th
            v-if="operationList && operationList.length>0"
            :column="{label:'操作'}"
            :columnStyle="operationWidth | operationStyle"
          />
        </v-tr>
      </v-thead>
      <slot v-if="isLoading">
        <v-tbody
          v-loading="isLoading"
          element-loading-text="拼命加载中"
          class="loading">
        </v-tbody>
      </slot>
      <slot v-else-if="tableData.length===0">
        <v-tbody class="noData">
          <v-tr>
            <slot>暂时没有数据</slot>
          </v-tr>
        </v-tbody>
      </slot>
      <slot v-else>
        <v-tbody class="data-table-content">
          <template v-if="isTree">
            <tree-table-record
              v-for="(data,index) in resultData"
              :key="index"
              :recordIndex="index"
              :tableList="tableList"
              :columns="columns"
              :mainColumn="mainColumn"
              :longColumn="longColumnResult"
              :longColumnWidth="longColumnWidth"
              :operationList="operationList"
              :operationWidth="operationWidth"
              :style="recordStyle"
              :data="data">
            </tree-table-record>
          </template>
          <template v-else>
            <data-table-record
              v-for="(data,index) in resultData"
              :key="data.id"
              :recordIndex="index"
              :tableList="tableList"
              :columns="columns"
              :mainColumn="mainColumn"
              :longColumn="longColumnResult"
              :longColumnWidth="longColumnWidth"
              :operationList="operationList"
              :operationWidth="operationWidth"
              :style="recordStyle"
              :data="data">
            </data-table-record>
            <data-table-record
              v-if="isCount"
              :tableList="tableList"
              :columns="columns"
              :mainColumn="mainColumn"
              :longColumn="longColumnResult"
              :longColumnWidth="longColumnWidth"
              :operationList="operationList"
              :operationWidth="operationWidth"
              :style="recordStyle"
              :data="countData">
            </data-table-record>
          </template>
        </v-tbody>
      </slot>
    </v-table>
  </div>
</template>

<script>
import { findIndex, sumBy } from 'lodash'

import { treeFormat } from '@/utils/common'

import DataTableRecord from './DataTableRecord'
import TreeTableRecord from './TreeTableRecord'
import VTable from '@/components/VTable'
import VThead from '@/components/VTable/VThead'
import VTbody from '@/components/VTable/VTbody'
import VTr from '@/components/VTable/VTr'
import VTh from '@/components/VTable/VTh'
import VTd from '@/components/VTable/VTd'

export default {
  name: 'DataTable',
  components: {
    DataTableRecord,
    TreeTableRecord,
    VTable,
    VThead,
    VTbody,
    VTr,
    VTh,
    VTd
  },
  props: {
    cid: {
      type: String,
      default: 'id'
    }, /* 页面对话框标题 */
    pid: {
      type: String,
      default: 'pid'
    }, /* 页面对话框标题 */
    mainColumn: {
      type: String
    }, /* 标题英文名 */
    longColumn: {
      type: String
    }, /* 标题英文名 */
    columns: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isCount: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    operationList: Array,
    operationWidth: Number,
    tableWrapperWidth: {
      type: Number,
      default: 0
    },
    tableFullList: {
      type: Array,
      default: []
    },
    tableInitList: {
      type: Array,
      default: []
    },
    isTree: {
      type: Boolean,
      default: false
    },
    orderBy: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: []
    },
    isExpand: Function,
    pageStorage: Set
  },
  data () {
    return {
      tableList: this.tableInitList
    }
  },
  computed: {
    resultData () {
      if (this.isTree) {
        const tableData = this.tableData.map(item => {
          return {
            ...item,
            expand: this.pageStorage ? this.pageStorage.has(item.id) : this.isExpand ? this.isExpand(item) : false
          }
        })
        return treeFormat(tableData, this.cid, this.pid)
      } else {
        return this.tableData
      }
    },
    countData () {
      let countData = {}
      countData[this.mainColumn] = '合计'
      this.tableList.map(item => {
        if (this.columns[item].isCount) {
          countData[item] = sumBy(this.resultData, item)
        }
      })
      return countData
    },
    tableWidth () {
      const operationWidth = this.operationList && this.operationList.length > 0 ? this.operationWidth + 41 : 0
      return this.tableList.filter(item => item !== this.longColumnResult).reduce((acc, item) => {
        return acc + this.columns[item].width + 41
      }, -1) + operationWidth
    },
    longColumnResult () {
      if (this.tableList.indexOf(this.longColumn) >= 0) {
        return this.longColumn
      } else if (this.tableList.indexOf(this.mainColumn) >= 0) {
        return this.mainColumn
      } else {
        return this.tableList[0]
      }
    },
    longColumnWidth () {
      if (this.tableWidth + this.columns[this.longColumnResult].width + 41 >= this.tableWrapperWidth) {
        return this.columns[this.longColumnResult].width
      } else {
        return this.tableWrapperWidth - this.tableWidth - 43
      }
    },
    tableStyle () {
      return {
        width: this.tableWidth + this.longColumnWidth + 41 + 'px'
      }
    },
    recordStyle () {
      return {
        width: this.tableWidth + this.longColumnWidth + 41 + 'px'
      }
    },
    tableWrapperStyle () {
      return {
        width: this.tableWrapperWidth - 2 + 'px'
      }
    }
  },
  filters: {
    columnStyle (columnName, columns, longColumn, longColumnWidth) {
      const width = columnName === longColumn ? longColumnWidth : columns[columnName].width
      return {
        width: width + 'px'
      }
    },
    operationStyle (width) {
      return {
        width: width + 'px'
      }
    },
    sortDirection (columnName, orderBy) {
      const sortIndex = findIndex(orderBy, ['name', columnName])
      if (sortIndex >= 0) {
        return orderBy[sortIndex].sort
      }
      return 'sort'
    }
  },
  methods: {
    changeOrderBy (data) {
      this.$emit('changeOrderBy', data)
    }
  }
}
</script>

<style scoped lang="sass">
.loading
  height: 400px
.data-table-wrapper
  border: 1px solid #ddd
  display: flex
  flex-direction: column
  flex: 1
  overflow: auto
.data-table
  line-height: 24px
  display: flex
  flex-direction: column
  flex: 1
.data-table-content
  display: flex
  flex: 1
  flex-direction: column
  overflow: auto
  overflow-x: hidden
.noData
  text-align: center
  line-height: 5
</style>

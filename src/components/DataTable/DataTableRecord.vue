<template>
  <v-tr>
    <v-td
      v-for="columnName in tableList"
      :key="columnName"
      :columnStyle="columnName | columnWidth(columns, longColumn, longColumnWidth) | columnStyle(columns[columnName], data)"
    >
      <info-render
        :full="data"
        :recordIndex="recordIndex"
        :data="data[columnName]"
        :column="columns[columnName]"
        :minLength="columns[columnName].minLength"
        :width="columnName | columnWidth(columns, longColumn, longColumnWidth)"
      >
        <template scope="props">
          <div
            v-if="columns[columnName].innerInput">
            <el-input
              type="text"
              size="small"
              :value="props.content"
              @change="columns[columnName].innerFunc" />
          </div>
          <div
            v-else-if="columns[columnName].file && props.content !== '-'"
            class="columns-render">
            <el-button
              v-if="props.content.length"
              type="text"
              @click="dialogTableVisible = true"
            >查看文件</el-button>
            <el-dialog
              title="查看文件"
              size="small"
              :visible.sync="dialogTableVisible">
              <img v-for="img in props.content" :src="img" alt="">
            </el-dialog>
          </div>
          <div
            class="text-overflow"
            v-else-if="!columns[columnName].html">
            {{ props.content }}
          </div>
          <div
            v-else
            v-html="props.content">
          </div>
        </template>
      </info-render>
    </v-td>
    <v-td
      v-if="operationList && operationList.length>0"
      class="operationClass"
      :columnStyle="operationWidth | operationStyle">
      <v-operation
        :operationList="operationList"
        :data="data"
      />
    </v-td>
  </v-tr>
</template>

<script>
import InfoRender from '@/components/InfoRender'
import VTbody from '@/components/VTable/VTbody'
import VTr from '@/components/VTable/VTr'
import VTd from '@/components/VTable/VTd'
import VOperation from '@/components/VTable/VOperation'

export default {
  name: 'DataTableRecord',
  components: {
    InfoRender,
    VTbody,
    VTr,
    VTd,
    VOperation
  },
  props: {
    recordIndex: Number,
    mainColumn: String,
    longColumn: String,
    longColumnWidth: Number,
    operationList: Array,
    operationWidth: Number,
    columns: Object,
    level: {
      type: Number,
      default: 0
    },
    tableList: {
      type: Array,
      default: []
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    levelStyle () {
      return {
        'margin-left': this.level * 28 + 'px'
      }
    }
  },
  filters: {
    columnWidth (columnName, columns, longColumn, longColumnWidth) {
      return columnName === longColumn ? longColumnWidth : columns[columnName].width
    },
    columnStyle (width, column, data) {
      const style = column.style || {}
      const columnStyle = column.styleRender ? column.styleRender(data) : {}
      return {
        ...style,
        ...columnStyle,
        'max-width': width + 'px',
        'width': width + 'px'
      }
    },
    operationStyle (width) {
      return {
        'width': width + 'px'
      }
    }
  }
}
</script>

<style scoped lang="sass">
.text-overflow
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.operationClass
  height: 24px
.fa
  width: 10px
img
  display: block
  margin-bottom: 10px
  width: 100%
</style>

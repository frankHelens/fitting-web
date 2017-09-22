<template>
  <v-tr>
    <v-td
      v-for="columnName in tableList"
      :key="columnName"
      class="text-overflow"
      :columnStyle="columnName | columnWidth(columns, longColumn, longColumnWidth) | columnStyle"
    >
      <template v-if="columnName===mainColumn">
        <info-render
          :recordIndex="recordIndex"
          :full="data"
          :data="data[columnName]"
          :column="columns[columnName]"
          :minLength="columns[columnName].minLength"
          :width="columnName | columnWidth(columns, longColumn, longColumnWidth)"
        >
          <template scope="props">
            <div
              scope="props"
              :style="levelStyle"
              @click="nodeExpanded">
              <i
                v-if="data.children"
                :class="['fa', {'fa-caret-right': !expanded, 'fa-caret-down': expanded}]"
              />
              {{ props.content }}
            </div>
          </template>
        </info-render>
      </template>
      <template v-else>
        <info-render
          :recordIndex="recordIndex"
          :full="data"
          :data="data[columnName]"
          :column="columns[columnName]"
          :minLength="columns[columnName].minLength"
          :width="columnName | columnWidth(columns, longColumn, longColumnWidth)"
        >
          <template scope="props">
            {{ props.content }}
          </template>
        </info-render>
      </template>
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
    <v-tbody
      v-if="data.children"
      v-show="expanded"
      >
      <tree-table-record
        v-for="(data,index) in data.children"
        :key="index"
        :recordIndex="recordIndex"
        :tableList="tableList"
        :columns="columns"
        :mainColumn="mainColumn"
        :longColumn="longColumn"
        :level="level + 1"
        :longColumnWidth="longColumnWidth"
        :operationList="operationList"
        :operationWidth="operationWidth"
        :data="data">
      </tree-table-record>
    </v-tbody>
  </v-tr>
</template>

<script>
import { mapMutations } from 'vuex'
import VOperation from '@/components/VTable/VOperation'
import VTbody from '@/components/VTable/VTbody'
import VTr from '@/components/VTable/VTr'
import VTd from '@/components/VTable/VTd'
import InfoRender from '@/components/InfoRender'

export default {
  name: 'tree-table-record',
  components: {
    VTbody,
    VTr,
    VTd,
    InfoRender,
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
      expanded: this.data.expand
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
    columnStyle (width) {
      return {
        'max-width': width + 'px',
        width: width + 'px'
      }
    },
    operationStyle (width) {
      return {
        width: width + 'px'
      }
    }
  },
  methods: {
    ...mapMutations([
      'changeTreeStorage'
    ]),
    nodeExpanded () {
      this.changeTreeStorage({
        page: this.$route.path,
        id: this.data.id,
        expanded: !this.expanded
      })
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped lang="sass">
.operationClass
  height: 24px
.fa
  width: 10px
.text-overflow
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
.text-break
  word-break: break-all
  word-wrap: break-word
  max-width: 300px
</style>

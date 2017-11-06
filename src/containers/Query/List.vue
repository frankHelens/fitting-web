<template>
  <DataTablePage
    ref="table"
    mainColumn="name"
    longColumn="num"
    resource="/data"
    title="配件查询系统"
    label=""
    labelName="name"
    dialogSize="tiny"
    :relation="false"
    :toolbar="toolbar"    
    :tableFullList="tableFullList"
    :tableInitList="tableInitList"
    :filterFullList="filterFullList"
    :filterInitList="filterInitList"
    :createList="createList"
    :updateList="updateList"
    :operation="operation"
    :columns="columns"
    @getData="getData">
    <el-upload
      v-if="uploadOpen"
      slot="toolbar"
      name="file"
      accept=".xlsx"
      :action="action"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      style="width:100px;float:left;">
      <el-tooltip class="item" effect="dark" content="只能上传excel文件" placement="top">
        <el-button :loading="uploadLoading" type="primary">点击上传</el-button>
      </el-tooltip>
    </el-upload>
  </DataTablePage>
</template>

<script>
import DataTablePage from '@/containers/DataTablePage'
// import { toolbarCreate } from '@/containers/DataTablePage/toolbar'
// import { operationUpdate, operationDelete } from '@/containers/DataTablePage/operation'
import { getApi } from '@/utils/common'
import moment from 'moment'

/* globals localStorage */
export default {
  name: 'query',
  components: {
    DataTablePage
  },
  computed: {
    action () {
      return getApi() + 'upload'
    }
  },
  watch: {
    uploadOpen (val) {
      this.uploadOpen = val
    },
    $route (val) {
      const timestamp = Number(localStorage.timestamp)
      // 设置周期
      const period = timestamp + 7 * 24 * 3600 * 1000
      this.uploadOpen = timestamp && period >= Number(moment().format('x'))
    }
  },
  created () {
    this.$notify.info({
      title: '温馨提示',
      message: '公司通常发天天快递，若查询的单号含有速尔快递，则为速尔快递！',
      duration: 0
    })
  },
  data () {
    const timestamp = Number(localStorage.timestamp)
    // 设置周期
    const period = timestamp + 7 * 24 * 3600 * 1000
    return {
      uploadOpen: timestamp && period >= Number(moment().format('x')),
      uploadLoading: false,
      toolbar: [],
      operation: [],
      tableInitList: ['name', 'contact', 'updateTime', 'num'],
      tableFullList: ['name', 'contact', 'updateTime', 'num'],
      createList: ['name'],
      updateList: [],
      filterInitList: ['name', 'contact'],
      filterFullList: ['name', 'contact'],
      columns: {
        name: {
          label: '客户名称',
          filter: {
            type: 'input'
          },
          form: {
            type: 'input'
          }
        },
        contact: {
          label: '联系电话',
          filter: {
            type: 'input'
          }
        },
        num: {
          label: '单号'
        },
        updateTime: {
          dateType: 'YYYY-MM-DD',
          type: 'time',
          label: '时间'
        }
      }
    }
  },
  methods: {
    getData (data) {
      if (data.data.length === 0) {
        this.$notify.error({
          title: '提示',
          message: '您的信息小二可能漏记了，请联系徐巧滢！',
          duration: 5000
        })
      }
      if (data.data.length === 1 && data.data[0].num === '') {
        this.$notify({
          title: '提示',
          message: '您的货还没有发，请耐心等待！',
          type: 'warning',
          duration: 5000
        })
      }
    },
    beforeUpload () {
      this.uploadLoading = true
      return true
    },
    uploadSuccess (response, file) {
      this.uploadLoading = false
      if (response.code === 0) {
        this.$message({
          type: 'success',
          showClose: true,
          message: '导入数据成功！'
        })
        setTimeout(() => {
          this.$refs.table.getData()
        }, 500)
      } else {
        this.$message({
          type: 'error',
          showClose: true,
          message: response.message
        })
      }
    }
  }
}
</script>


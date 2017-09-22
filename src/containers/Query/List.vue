<template>
  <DataTablePage
    ref="table"
    mainColumn="name"
    longColumn="remark"
    resource="/data"
    title="查询"
    label="查询"
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
    :columns="columns">
    <el-upload
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
import { fetchUpdate } from '@/utils/api'

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
  data () {
    return {
      uploadLoading: false,
      toolbar: [],
      operation: [],
      tableInitList: ['name', 'contact', 'num', 'updateTime'],
      tableFullList: ['name', 'contact', 'num', 'updateTime'],
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
          dataType: 'YYYY-MM-DD',
          type: 'time',
          label: '时间'
        }
      }
    }
  },
  methods: {
    beforeUpload () {
      this.uploadLoading = true
      return true
    },
    uploadSuccess (response, file) {
      this.uploadLoading = false
      if (response.code === 0) {
        const name = response.data.filename
        this.setData(name)
        // this.showNotify(response.message, response.data)
      } else {
        this.message({
          type: 'error',
          showClose: true,
          message: response.message
        })
      }
    },
    setData (name) {
      fetchUpdate({
        resource: 'upload',
        id: name
      })
      .then(data => {
        this.message({
          type: 'success',
          showClose: true,
          message: '导出成功！'
        })
        this.$refs.table.getData()
      })
    }
  }
}
</script>

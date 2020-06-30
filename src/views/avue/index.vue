// 计费规则
<template>
  <div class="feerule">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :before-open="handleOpenBefore"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-update="rowUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
      >
        <!-- 区间计费 -->
        <template slot="intervalForm">
          <avue-crud
            ref="crudInterval"
            :option="intervalOption"
            :data="intervalData"
            @refresh-change="refreshChange"
            @row-update="handleUpdateInterval"
            @row-save="handleSaveInterval"
            @row-del="rowDelInterval"
          >
            <!-- 增加 -->
            <template slot="menuLeft">
              <el-button
                class="filter-item"
                type="primary"
                size="small"
                icon="el-icon-edit"
                :disabled="showDisabled"
                @click="handleCreateInterval"
              >
                添加
              </el-button>
            </template>
          </avue-crud>
        </template>

        <!-- 计费类别 -->
        <template
          slot="feeRuleType"
          slot-scope="scope"
        >
          <el-tag v-if="scope.row.feeRuleType === '0'">
            {{ scope.label }}
          </el-tag>
          <el-tag
            v-else
            type="warning"
          >
            {{ scope.label }}
          </el-tag>
        </template>

        <!-- 计费单价 -->
        <template
          slot="feeUnit"
          slot-scope="scope"
        >
          <template v-if="scope.row.feeRuleType === '0'">
            {{ scope.row.feeUnit }}
          </template>
          <template v-else>
            /
          </template>
        </template>

        <!-- 增加 -->
        <template slot="menuLeft">
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
          >
            添加
          </el-button>
        </template>

        <!-- 功能按钮 -->
        <template
          slot="menu"
          slot-scope="scope"
        >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-view"
            @click.native="handleShow(scope.row,scope.index)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click.native="handleUpdate(scope.row,scope.index)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click.native="handleDel(scope.row,scope.index)"
          >
            删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { addObj, delObj, putObj, fetchList } from '@/api/example/feerule'
import { tableOption, intervalOption, changeRadio } from '@/const/crud/example/feerule'

export default {
  name: 'Feerule',
  data() {
    return {
      form: {},
      searchForm: {},
      tableData: [],
      intervalData: [],
      showDisabled: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      intervalOption: intervalOption,
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getList(page, params) {
      /* this.tableLoading = true
      fetchList(
        Object.assign(
          {
            descs: 'create_time',
            current: page.currentPage,
            size: page.pageSize,
          },
          params,
          this.searchForm,
        ),
      ).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      }) */
      const data = {
        records: [
          {
            feeRuleId: 2,
            feeDesc: '八点至十点0.2每分钟，闲时0.1每分钟',
            feeRuleType: '1',
            feeUnit: 0,
            createTime: '2019-11-28 20:28:14',
            updateTime: '2019-11-28 20:28:14',
            delFlag: 0,
            tenantId: 1,
            tieredFeeRules: [
              {
                feeRuleId: 2,
                beginTime: '00:00:00',
                endTime: '08:00:00',
                feeUnit: 0.1,
              },
              {
                feeRuleId: 2,
                beginTime: '08:00:00',
                endTime: '10:00:00',
                feeUnit: 0.2,
              },
              {
                feeRuleId: 2,
                beginTime: '10:00:00',
                endTime: '23:59:59',
                feeUnit: 0.1,
              },
            ],
          },
          {
            feeRuleId: 1,
            feeDesc: '每分钟0.1元',
            feeRuleType: '0',
            feeUnit: 0.1,
            createTime: '2019-11-28 20:26:00',
            updateTime: '2019-11-28 20:26:00',
            delFlag: 0,
            tenantId: 1,
            tieredFeeRules: [],
          },
        ],
        total: 2,
        size: 20,
        current: 1,
        searchCount: true,
        pages: 1,
      }
      this.tableData = data.records
      this.page.total = data.total
    },
    handleOpenBefore(show, type) {
      this.showDisabled = false
      if (type === 'add') {
        this.intervalReset() // 重置操作
      }
      show()
    },
    handleShow(row, index) {
      this.intervalSet(row) // 设置区间计算
      this.$refs.crud.rowView(row, index)
      setTimeout(() => {
        // disabled操作按钮
        this.$refs.crudInterval.btnDisabled = true
        this.showDisabled = true
      }, 100)
    },
    handleCreate(row, index) {
      this.$refs.crud.rowAdd(row, index)
    },
    handleUpdate(row, index) {
      this.intervalSet(row) // 设置区间计算
      this.$refs.crud.rowEdit(row, index)
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    rowDel(row) {
      this.$confirm('是否确认删除"' + row.feeDesc + '"', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return delObj(row.feeRuleId)
        })
        .then(() => {
          this.getList(this.page)
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(() => {})
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    rowUpdate(row, index, done, loading) {
      putObj(row)
        .then(() => {
          this.tableData.splice(index, 1, Object.assign({}, row))
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
          done()
          this.getList(this.page)
        })
        .catch(error => {
          loading()
          console.log(error)
        })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave(row, done, loading) {
      const $row = row
      $row.tieredFeeRules = this.intervalData
      addObj($row)
        .then(() => {
          this.tableData.push(Object.assign({}, row))
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          done()
          this.getList(this.page)
        })
        .catch(error => {
          loading()
          console.log(error)
        })
    },
    /**
     * 搜索回调
     */
    searchChange(form, done) {
      this.searchForm = form
      this.getList(this.page, form)
      done()
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList(this.page)
    },
    /**
     * 区间计费------------------------------------------------
     */
    handleCreateInterval(row, index) {
      this.$refs.crudInterval.rowAdd(row, index)
    },
    rowDelInterval(row, index) {
      this.$confirm('是否确认删除此条规则？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.intervalData.splice(index, 1)
        })
        .then(() => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(() => {})
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdateInterval(row, index, done) {
      this.intervalData.splice(index, 1)
      this.intervalData.push(row)
      done()
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSaveInterval(row, done) {
      this.intervalData.push(row)
      done()
    },
    /* 更新区间计费等相关设置 */
    intervalSet(row) {
      this.intervalData = row.tieredFeeRules
      changeRadio(row.feeRuleType)
    },
    intervalReset() {
      this.intervalData = []
      changeRadio('0')
    },
  },
}
</script>

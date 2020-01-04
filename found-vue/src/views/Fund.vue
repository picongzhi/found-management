<template>
  <div class="fund-container">
    <div>
      <el-form :inline="true" ref="addProfile">
        <el-form-item class="add-btn">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        v-if="profileList.length > 0"
        :data="profileList"
        style="width: 100%"
        max-height="450"
        border
      >
        <el-table-column
          label="序号"
          width="70"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="日期" width="250" prop="date" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收支类型"
          width="150"
          prop="type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="收支描述"
          width="180"
          prop="desc"
          align="center"
        ></el-table-column>
        <el-table-column label="收入" width="150" prop="income" align="center">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="150" prop="expense" align="center">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expense }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账户现金"
          width="170"
          prop="cash"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          width="220"
          prop="remark"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          prop="operation"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <profile-dialog
      :dialog="dialog"
      :profile="profile"
      @refresh="getProfiles()"
    ></profile-dialog>
  </div>
</template>

<script>
import ProfileDialog from '@/components/ProfileDialog'

export default {
  name: 'Fund',
  components: { ProfileDialog },
  data () {
    return {
      profileList: [],
      dialog: {
        show: false,
        title: '',
        type: 'add'
      },
      profile: {
        id: '',
        type: '',
        desc: '',
        income: 0,
        expense: 0,
        cash: 0,
        remark: ''
      },
    }
  },
  methods: {
    getProfiles () {
      this.$axios.get('/api/profile')
        .then(res => {
          this.profileList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit (index, row) {
      this.dialog = {
        show: true,
        title: '修改资金信息',
        type: 'edit'
      }
      this.profile = {
        id: row._id,
        type: row.type,
        desc: row.desc,
        income: row.income,
        expense: row.expense,
        cash: row.cash,
        remark: row.remark
      }
    },
    handleDelete (index, row) {
      this.$axios.delete(`/api/profile/delete/${row._id}`)
        .then(res => {
          this.$message('删除成功')
          this.getProfiles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleAdd () {
      this.dialog = {
        show: true,
        title: '添加资金信息',
        type: 'add'
      }
      this.profile = {
        id: '',
        type: '',
        desc: '',
        income: 0,
        expense: 0,
        cash: 0,
        remark: ''
      }
    }
  },
  mounted () {
    this.getProfiles();
  }
}
</script>

<style scoped>
.fund-container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.add-btn {
  float: right;
}
</style>
<template>
  <el-table
    v-if="profileList.length > 0"
    :data="profileList"
    style="width: 100%"
    max-height="450"
    border
  >
    <el-table-column label="序号" width="70" type="index" align="center"></el-table-column>
    <el-table-column label="日期" width="250" prop="date" align="center"></el-table-column>
    <el-table-column label="收支类型" width="150" prop="type" align="center"></el-table-column>
    <el-table-column label="收支描述" width="180" prop="desc" align="center"></el-table-column>
    <el-table-column label="收入" width="150" prop="income" align="center"></el-table-column>
    <el-table-column label="支出" width="150" prop="expense" align="center"></el-table-column>
    <el-table-column label="账户现金" width="170" prop="cash" align="center"></el-table-column>
    <el-table-column label="备注" width="220" prop="remark" align="center"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Fund',
  data () {
    return {
      profileList: []
    }
  },
  methods: {
    getProfiles () {
      this.$axios.get('/api/profile')
        .then(res => {
          console.log(res.data)
          this.profileList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProfiles();
  }
}
</script>

<style scoped>
</style>
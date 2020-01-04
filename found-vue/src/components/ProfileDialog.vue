<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="profile"
        :rules="rules"
        label-width="120px"
        style="margin:10px; width: auto;"
      >
        <el-form-item label="收支类型">
          <el-select v-model="profile.type" placeholder="收支类型">
            <el-option
              v-for="(type, index) in typeList"
              :key="index"
              :label="type"
              :value="type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input v-model="profile.desc"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="收入">
          <el-input v-model="profile.income"></el-input>
        </el-form-item>
        <el-form-item prop="expense" label="支出">
          <el-input v-model="profile.expense"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="现金">
          <el-input v-model="profile.cash"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input v-model="profile.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    dialog: Object,
    profile: Object
  },
  data () {
    return {
      typeList: ['提现', '提现手续费', '充值', '优惠券', '充值礼券', '转账'],
      rules: {
        desc: [{ required: true, message: '收支描述不能为空', trigger: 'blur' }],
        income: [{ required: true, message: '收入不能为空', trigger: 'blur' }],
        expense: [{ required: true, message: '支出不能为空', trigger: 'blur' }],
        cash: [{ required: true, message: '现金不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.type === 'add' ? '/api/profile/add' : `/api/profile/edit/${this.profile.id}`
          this.$axios.post(url, this.profile)
            .then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })

              this.dialog.show = false
              this.$emit('refresh')
            }).catch(err => {
              this.$message({
                message: err.message,
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
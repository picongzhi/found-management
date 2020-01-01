<template>
  <div class="info">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="avatar">
          <img :src="user.avatar" alt />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user-info">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{
              user.identity === "manager" ? "管理员" : "普通原因"
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Info',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.row-bg {
  width: 100%;
  height: 100%;
}

.avatar {
  text-align: center;
  position: relative;
  top: 30%;
}

.avatar img {
  width: 150px;
  border-radius: 50%;
}

.user-info {
  height: 100%;
  background-color: #eee;
}

.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}

.user-item span {
  margin-left: 10px;
}
</style>
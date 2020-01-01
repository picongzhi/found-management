<template>
  <el-row class="menu-page">
    <el-col>
      <el-menu
        default-active="2"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409efff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(subItem, subIndex) in item.children"
              :to="subItem.path"
              :key="subIndex"
            >
              <el-menu-item :index="subItem.path">
                <span slot="title">{{ subItem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'LeftMenu',
  data () {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '资金管理',
          path: 'fund',
          children: [
            {
              path: 'foundList',
              name: '资金流水'
            }
          ]
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [
            {
              path: 'info',
              name: '个人信息'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu-page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}

.el-menu {
  border: none;
  width: 35px;
}

.fa-margin {
  margin-right: 5px;
}

.el-submenu .el-menu-item {
  min-width: 180px;
}

.el-menu:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}

a {
  text-decoration: none;
}
</style>
<template>
  <div
    class="component-header-top d-flex flex-row justify-content-between align-items-center"
  >
    <div class="d-flex logo-top" @click="nexHome()">
      <img class="down" src="@/static/icon/header-top/logo.svg" />
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <div class="noti-global">
        <img class="down" src="@/static/icon/header-top/noti.svg" />
        <span class="count">101</span>
      </div>
      <div
        class="dropdown-account"
        ref="dropdownProfile"
        @click="showMenuTop = !showMenuTop"
      >
        <img
          v-if="accountInfo.avatar"
          :src="accountInfo.avatar"
          class="avatar"
        />
        <span v-else><img src="@/static/icon/header-top/account.svg" /></span>
        <span class="name">
          {{ accountInfo.name }}
          <img class="down" src="@/static/icon/header-top/down.svg" />
        </span>
        <ul v-if="showMenuTop">
          <router-link
            :to="{ name: 'profile-user', params: {} }"
            @click.native.stop="showMenuTop = false"
          >
            <span>Thông tin tài khoản</span>
          </router-link>
          <a class="divider"></a>
          <a @click.stop.stop="confirmLogout">
            <span>Thoát tài khoản</span>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LayoutHeaderTop",
  data() {
    return {
      seach: "",
      showMenuTop: false,
    };
  },
  created() {
    document.addEventListener("click", this.documentClick);
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  methods: {
    ...mapActions("account", ["removeAccountInfo"]),
    mouseLeave() {
      this.showMenuTop = false;
    },
    documentClick(e) {
      let el = this.$refs.dropdownProfile;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.showMenuTop = false;
      }
    },
    confirmLogout() {
      this.$confirm("Xác nhận thoát tài khoản", "Warning", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.removeAccountInfo();
        })
        .catch(() => {});
    },
    nexHome() {
      this.$router.push({
        name: "home-index",
      });
    }
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  },
};
</script>

<style lang="css" scoped>
.component-header-top {
  height: 40px;
  padding: 0px 15px;
}

.dropdown-account {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  padding: 0px 3px 0px 10px;
  position: relative;
}
.dropdown-account img {
  margin-right: 8px;
  margin-top: 4px;
}
.dropdown-account .down {
  width: 10px;
  margin-right: 0px;
  margin-left: 5px;
}
.dropdown-account .name {
  color: #fff;
  font-size: 12px;
}
.dropdown-account ul {
  position: absolute;
  top: 50px;
  right: 0px;
  margin: 0px;
  width: 200px;
  background-color: #fff;
  padding: 5px 0px 5px 0px;
  z-index: 1000;
  border: 1px solid #f2f2f2;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
}
.dropdown-account ul a {
  list-style-type: none;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  text-decoration: none;
  color: #2c3e50;
}
.dropdown-account ul a:hover {
  background-color: #f2f2f2;
}
.dropdown-account ul a.divider {
  height: 1px;
  background-color: #ccc;
  margin-bottom: 5px;
}

.noti-global {
  padding-right: 30px;
  position: relative;
}
.noti-global .count {
  position: absolute;
  display: inline-block;
  padding: 2px 3px;
  background-color: #cd4b4b;
  font-size: 10px;
  color: #fff;
  border-radius: 3px;
  top: -5px;
  right: 12px;
}
.logo-top {
  padding-left: 30px;
  padding-left: 5px;
  cursor: pointer;
}
</style>
<style type="text/css">
.component-header-top input {
  border-radius: 25px;
  height: 28px;
  font-size: 12px;
  border: none;
}
.component-header-top .el-input__icon {
  line-height: 28px;
}
.avatar {
  max-width: 100%;
  border-radius: 50%;
  width: 35px;
  height: 35px;
}
</style>

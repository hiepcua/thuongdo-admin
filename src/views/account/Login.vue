<template>
  <div class="account-login d-flex justify-content-center align-items-center">
    <div class="form-login">
      <!-- <div class="title-wrap d-flex justify-content-center align-items-center">
        <span class="item active">Đăng nhập</span>
        <span class="line"></span>
        <span class="item">Đăng ký</span>
      </div> -->
      <div class="d-flex logo justify-content-center">
        <img src="@/static/icon/login/logo.svg" alt="" />
      </div>
      <div class="form-content">
        <div class="item-input d-flex align-items-center">
          <div class="image d-flex justify-content-center align-items-center">
            <img src="@/static/icon/login/email.png" alt="" />
          </div>
          <input
            type="text"
            v-model="userInfo.email"
            placeholder="Tên đăng nhập ..."
            autocomplete="off"
            ref="myInput"
          />
        </div>
        <div class="item-input d-flex align-items-center">
          <div
            class="image image-2 d-flex justify-content-center align-items-center"
          >
            <img src="@/static/icon/login/password2.png" alt="" />
          </div>
          <input
            type="password"
            autocomplete="off"
            v-model="userInfo.password"
            placeholder="Nhập mật khẩu ..."
          />
        </div>
        <!-- <div class="sologan">
          <span>Bạn được nhập sai mật khẩu tối đa 5 lần.</span>
        </div> -->
        <!-- <div class="forgot d-flex justify-content-between align-items-center">
          <el-checkbox v-model="checked">Duy trì đăng nhập</el-checkbox>
          <span>Quên mật khẩu?</span>
        </div> -->
        <div
          class="login-button d-flex justify-content-center align-items-center"
          @click="submitForm()"
        >
          <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
          <span v-else>ĐĂNG NHẬP</span>
        </div>
        <!-- <div class="login-more">
          <span>hoặc ĐĂNG NHẬP với</span>
        </div>
        <div
          class="social-wrap d-flex justify-content-center align-items-center"
        >
          <img
            class="item-social"
            src="@/static/icon/login/facebook.svg"
            alt=""
          />
          <img
            class="item-social"
            src="@/static/icon/login/google.svg"
            alt=""
          />
        </div> -->
        <!-- <div class="register-button d-flex justify-content-center">
          <span
            >Bạn chưa có tài khoản Thương Đô?
            <strong>Đăng ký ngay</strong></span
          >
        </div> -->
        <div
          class="forgot d-flex justify-content-center align-items-center"
          @click="toForgotPassword()"
        >
          <img src="@/static/icon/login/key.svg" alt="" />
          <span>Quên mật khẩu?</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountLogin",
  metaInfo() {
    return {
      title: "Đăng nhập",
    };
  },
  components: {},
  data() {
    return {
      canSubmit: true,
      userInfo: {
        email: "",
        password: "",
      },
      checked: true,
    };
  },
  computed: {
    ...mapGetters("account", ["logged", "accountInfo"]),
  },
  mounted() {
    this.$refs.myInput.focus();
    if (this.logged) {
      this.$router.push({ name: "home-index" });
    }
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    // Lưu dữ liệu
    submitForm() {
      if (this.canSubmit) {
        this.storeModel();
      }
    },
    storeModel() {
      this.canSubmit = false;
      axios.post("auth/sign-in", this.userInfo).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            ls("authen", response);
            this.$notify({
              title: "Thành công",
              message: "Đăng nhập thành công",
              type: "success",
            });
            this.getAccountInfo();
            break;
          case 400:
            this.$notify({
              title: "Đăng nhập thất bại",
              message: response.errors[0],
              type: "warning",
            });
            break;
          case 500:
            this.$notify({
              title: "Đăng nhập thất bại",
              message: response.message,
              type: "warning",
            });
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            break;
        }
      });
    },

    toRegister() {
      this.$router.push({ name: "account-register" });
    },
    toForgotPassword() {
      this.$router.push({ name: "forgot-password" });
    },
  },
  watch: {
    logged() {
      if (this.logged) {
        this.$router.push({ name: "home-index" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.account-login {
  height: 100vh;
  background-color: #f9f9f9;
  background-image: url("@/static/images/login/frame-min.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.form-login {
  width: 320px;
  height: 400px;
  background: #fff;
  border-radius: 33px;
  padding: 0px 45px;
  padding-top: 45px;
  padding-bottom: 45px;
}
.title-wrap .item {
  font-size: 18px;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
  color: #3f92d1;
  cursor: pointer;
  font-weight: 300;
  border-bottom: 2px solid #fff;
  padding: 0px 10px;
}
.title-wrap .item:hover {
  color: #054474;
}
.title-wrap .item.active {
  border-bottom: 2px solid #3f92d1;
}
.title-wrap .line {
  margin: 0px 10px 0px 15px;
  width: 1px;
  background-color: #3f92d1;
  height: 20px;
}

.form-content {
  padding-top: 25px;
}
.form-content .item-input {
  border-radius: 4px;
  border: 1px solid #207cdc;
  height: 32px;
  margin-top: 10px;
}
.form-content .item-input .image {
  width: 40px;
}
.form-content .item-input .image img {
  width: 15px;
}
.form-content .item-input .image-2 img {
  width: 14px;
}
.form-content .item-input input {
  width: 100%;
  height: 25px;
  border: none;
  font-size: 12px;
  color: #207cdc;
}
.form-content .item-input input:focus {
  outline: none;
}

.form-content .sologan span {
  color: #3f92d1;
  font-weight: 300;
  margin-top: 8px;
  margin-left: 12px;
  font-size: 11px;
  display: inline-block;
}

.forgot {
  margin-top: 22px;
}
.forgot img {
  margin-right: 5px;
}
.forgot span {
  color: #207cdc;
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
}
.forgot span:hover {
  color: #054474;
}

.login-button {
  margin-top: 20px;
  background: #095870;
  border-radius: 8px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.login-button:hover {
  background: #07475b;
}
.login-button:active {
  background: #042d3a;
}

.login-more {
  height: 1px;
  background: #3f92d1;
  margin: 0px 30px;
  margin-top: 30px;
  position: relative;
  margin-bottom: 15px;
}
.login-more span {
  position: absolute;
  top: -11px;
  left: 25%;
  background-color: #fff;
  padding: 0px 5px;
  color: #3f92d1;
  font-size: 13px;
}

.item-social {
  padding: 0px 5px;
}

.register-button {
  margin-top: 15px;
}
</style>

<style type="text/css">
.el-checkbox__label {
  color: #3f92d1;
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  margin-left: -2px;
}
.account-login .el-checkbox__input.is-checked .el-checkbox__inner,
.account-login .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #3f92d1;
}
</style>

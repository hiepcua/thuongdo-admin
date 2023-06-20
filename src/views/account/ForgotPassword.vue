<template>
  <div class="forgot-password d-flex justify-content-center align-items-center">
    <div class="form-get-token">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="d-flex icon" @click="toLoginPage()">
          <img src="@/static/icon/login/arrow-left.svg" alt="" />
        </div>
        <div class="d-flex logo justify-content-end" @click="toLoginPage()">
          <img src="@/static/icon/login/logo.svg" alt="" />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center title">
        <span>Quên mật khẩu</span>
      </div>
      <div class="form-content">
        <el-form :model="userInfo" :rules="rules" ref="forgot-password-form">
          <el-form-item prop="email">
            <el-input
              type="text"
              v-model="userInfo.email"
              placeholder="Nhập email"
            >
              <template slot="prefix">
                <img
                  src="@/static/icon/login/email.png"
                  alt=""
                  class="icon__input"
                />
              </template>
            </el-input>
          </el-form-item>
          <div
            class="get-token-button d-flex justify-content-center align-items-center"
            @click="submitForm()"
          >
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else>LẤY MÃ XÁC THỰC</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "@/store";
export default {
  name: "ForgotPassword",
  metaInfo() {
    return {
      title: "Quên mật khẩu",
    };
  },
  data() {
    return {
      canSubmit: true,
      userInfo: {
        email: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập email.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Làm ơn nhập đúng định dạng email.",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    submitForm() {
      this.$refs["forgot-password-form"].validate((valid) => {
        if (valid) {
          this.canSubmit = false;
          axios
            .get("auth/reset-password/" + this.userInfo.email)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Gửi mã thành công",
                    message: "Mã code đã được gửi tới email của bạn.",
                    type: "success",
                  });
                  this.canSubmit = true;
                  this.toChangePassword();
                  break;
                case 400:
                  this.$notify({
                    title: "Gửi mã thất bại",
                    message: response.errors[0],
                    type: "warning",
                  });
                  this.canSubmit = true;
                  break;
                case 500:
                  this.$notify({
                    title: "Gửi mã thất bại",
                    message: response.message,
                    type: "warning",
                  });
                  this.canSubmit = true;
                  break;
                default:
                  this.$notify.error({
                    title: "Error",
                    message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                  });
                  this.canSubmit = true;
                  break;
              }
            });
        }
      });
    },
    toChangePassword() {
      store.dispatch("setEmailResetPassword", this.userInfo.email);
      this.$router.push({ name: "change-password" });
    },
    toLoginPage() {
      this.$router.push({ name: "account-login" });
    },
  },
};
</script>
<style scoped>
.forgot-password {
  height: 100vh;
  background-color: #f9f9f9;
  background-image: url("@/static/images/login/frame-min.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.form-get-token {
  width: 320px;
  height: 400px;
  background: #fff;
  border-radius: 33px;
  padding: 0px 45px;
  padding-top: 15px;
  padding-bottom: 45px;
}

.forgot-password .logo {
  width: 100px;
  height: 39px;
}

.forgot-password .icon {
  width: 12px;
}

.forgot-password .title {
  margin-top: 45px;
  text-transform: uppercase;
  color: #075970;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
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

.form-content .item-input input::placeholder {
  color: #207cdc;
}

.get-token-button {
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
.get-token-button:hover {
  background: #07475b;
}
.get-token-button:active {
  background: #042d3a;
}
.icon__input {
  padding-right: 4px;
  padding-top: 12px;
}
</style>

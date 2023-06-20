<template>
  <div class="change-password d-flex justify-content-center align-items-center">
    <div class="form-change-password">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="d-flex icon" @click="toForgotPassword()">
          <img src="@/static/icon/login/arrow-left.svg" alt="" />
        </div>
        <div class="d-flex logo justify-content-end" @click="toLoginPage()">
          <img src="@/static/icon/login/logo.svg" alt="" />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center title">
        <span>Quên mật khẩu</span>
      </div>
      <div
        class="d-flex justify-content-center align-items-center py-2 title-text"
      >
        <span> Nhập mã xác thực được gửi đến Email đăng nhập</span>
      </div>
      <div class="form-content">
        <el-form
          :model="userInfo"
          :rules="rulesChangePasswordForm"
          ref="change-password-form"
        >
          <el-form-item prop="token">
            <el-input
              type="text"
              v-model="userInfo.token"
              placeholder="Nhập mã xác thực"
              autocomplete="old-token"
            >
              <template slot="prefix">
                <div
                  class="image d-flex justify-content-center align-items-center"
                >
                  <img src="@/static/icon/login/token.svg" alt="" />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="userInfo.password"
              autocomplete="new-password"
              placeholder="Nhập mật khẩu mới"
            >
              <template slot="prefix">
                <div
                  class="image d-flex justify-content-center align-items-center"
                >
                  <img src="@/static/icon/login/password2.png" alt="" />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input
              type="password"
              v-model="userInfo.newPassword"
              placeholder="Nhập mật khẩu mới"
              autocomplete="new-password"
            >
              <template slot="prefix">
                <div
                  class="image d-flex justify-content-center align-items-center"
                >
                  <img src="@/static/icon/login/password2.png" alt="" />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <div
            class="change-password-button d-flex justify-content-center align-items-center"
            @click="submitForm()"
          >
            <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
            <span v-else>Đổi mật khẩu</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "ChangePassword",
  metaInfo() {
    return {
      title: "Quên mật khẩu",
    };
  },
  data() {
    var customValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng điền mật khẩu."));
      } else {
        if (this.userInfo.password !== this.userInfo.newPassword) {
          callback(new Error("Mật khẩu không trùng khớp."));
        }
        callback();
      }
    };
    return {
      canSubmit: true,
      userInfo: {
        token: "",
        password: "",
        newPassword: "",
      },
      rulesChangePasswordForm: {
        token: [
          {
            required: true,
            message: "Vui lòng điền mã xác thực",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Vui lòng điền mật khẩu",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "Mật khẩu yêu cầu từ 6 đến 20 kí tự",
          },
        ],
        newPassword: [
          {
            validator: customValidate,
            trigger: ["blur", "change"],
          },
          {
            min: 6,
            max: 20,
            message: "Mật khẩu yêu cầu từ 6 đến 20 kí tự",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["email_reset_password"]),
  },
  components: {},
  methods: {
    submitForm() {
      this.$refs["change-password-form"].validate((valid) => {
        if (valid) {
          let data = {
            email: this.email_reset_password,
            verify_code: this.userInfo.token,
            password: this.userInfo.password,
          };
          this.canSubmit = false;
          axios.post("auth/change-password", data).then((response) => {
            switch (response.code) {
              case 200:
                this.toChangePasswordSuccess();
                this.canSubmit = true;
                break;
              case 400:
                this.$notify({
                  title: "Gửi mã thất bại",
                  message: response.errors[0],
                  type: "warning",
                });
                this.canSubmit = true;
                break;
              default:
                this.canSubmit = true;
                this.$notify.error({
                  title: "Error",
                  message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                });
                break;
            }
          });
        }
      });
    },
    toChangePasswordSuccess() {
      this.$router.push({ name: "change-password-success" });
    },
    toForgotPassword() {
      this.$router.push({ name: "forgot-password" });
    },
    toLoginPage() {
      this.$router.push({ name: "account-login" });
    },
  },
};
</script>
<style>
.change-password {
  height: 100vh;
  background-color: #f9f9f9;
  background-image: url("@/static/images/login/frame-min.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.form-change-password {
  width: 320px;
  height: 400px;
  background: #fff;
  border-radius: 33px;
  padding: 0px 45px;
  padding-top: 15px;
  padding-bottom: 45px;
}

.change-password .logo {
  width: 100px;
  height: 39px;
}

.change-password .icon {
  width: 12px;
}

.change-password .title {
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
  padding: 11px 3px;
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

.form-content .el-form-item__content .el-input .el-input__prefix img {
  padding: 11px 3px;
}
.change-password-button {
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
.change-password-button :hover {
  background: #07475b;
}
.change-password-button :active {
  background: #042d3a;
}
.title-text {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
}
</style>

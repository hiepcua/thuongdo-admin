<template>
  <div
    class="account-register d-flex justify-content-center align-items-center"
  >
    <div class="form-register">
      <div class="title d-flex flex-column text-center">
        <span class="title-1">Đăng ký</span>
      </div>
      <div class="form-content">
        <el-form
          label-position="top"
          :rules="rules"
          :model="userInfo"
          ref="createModel"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name">
                <span class="title">Họ tên</span>
                <el-input
                  v-model="userInfo.name"
                  class="input-register"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="userInfo.email"
                  class="input-register"
                  ref="myInput"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="phone">
                <span class="title">Số điện thoại</span>
                <el-input
                  v-model="userInfo.phone_number"
                  class="input-register"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Mật khẩu" prop="password">
                <el-input
                  v-model="userInfo.password"
                  class="input-register"
                  type="password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <span class="title">Chức vụ</span>
                <el-select
                  v-model="userInfo.role_id"
                  placeholder="Nhân viên"
                  class="input-register"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Nhập lại mật khẩu"
                prop="password_confirmation"
              >
                <el-input
                  v-model="userInfo.password_confirmation"
                  class="input-register"
                  type="password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-col :span="12">
              <el-checkbox v-model="checked" class="check"
                ><p>Đồng ý với các điều khoản của chúng tôi</p></el-checkbox
              >
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              :disable="!canSubmit"
              :loading="!canSubmit"
              @click="submitForm('createModel')"
              >Tạo tài khoản</el-button
            >
          </el-form-item>
          <el-form-item class="link">
            <el-link @click="back"><span>Trở về đăng nhập</span></el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountRegister",
  metaInfo() {
    return {
      title: "Đăng ký",
    };
  },
  components: {},
  data() {
    return {
      canSubmit: true,
      checked: true,
      userInfo: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        role_description: "",
      },
      rules: {
        name: [
          { required: true, message: "Vui lòng nhập đầy đủ họ tên" },
          {
            min: 3,
            max: 30,
            message: "Tên đăng nhập có chiều dài từ 3 tới 191 kí tự",
          },
        ],
        email: [
          { required: true, message: "Vui lòng nhập email" },
          {
            min: 4,
            max: 191,
            message: "Email có chiều dài từ 4 tới 191 kí tự",
          },
        ],
        password: [
          { required: true, message: "Vui lòng nhập mật khẩu" },
          {
            min: 6,
            max: 191,
            message: "Mật khẩu có chiều dài từ 6 tới 191 kí tự",
          },
        ],
        password_confirmation: [
          { required: true, message: "Vui lòng nhập lại mật khẩu" },
          {
            min: 6,
            max: 191,
            message: "Mật khẩu nhập lại có chiều dài từ 6 tới 191 kí tự",
          },
        ],
      },
      options: [
        {
          value: "Quản lý",
          label: "Quản lý",
        },
        {
          value: "Nhân viên",
          label: "Nhân viên",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("account", ["logged", "accountInfo"]),
  },
  mounted() {
    this.$refs.myInput.focus();
    if (this.logged) {
      this.$router.push({ name: "account-login" });
    }
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    // Nút back lại trang login
    back() {
      this.$router.push({ name: "account-login" });
    },
    // Lưu dữ liệu
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.storeModel();
        } else {
          this.$notify({
            title: "Lỗi dữ liệu nhập",
            message: "Vui lòng kiểm tra lại thông tin",
            type: "warning",
          });
          return false;
        }
      });
    },
    storeModel() {
      this.canSubmit = false;
      axios.post("auth/register-v1", this.userInfo).then((response) => {
        this.canSubmit = true;
        switch (response.status_code) {
          case 200:
            ls("authen", response);
            this.$notify({
              title: "Chúc Mừng",
              message: "Đăng ký thành công",
              type: "success",
            });
            this.getAccountInfo();
            break;
          case 400:
            this.$notify({
              title: "Đăng ký thất bại",
              message: response.errors[0],
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
  },
  watch: {
    logged() {
      if (this.logged) {
        this.$router.push({ name: "account-login" });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.account-register {
  height: 100vh;
  background-color: #f9f9f9;
  background-image: url("@/static/images/login/frame-min.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.form-register {
  background: rgba(113, 176, 222, 0.31);
  border-radius: 15px;
  width: 600px;
  height: 530px;
}
.form-register .title {
  padding: 25px 0px 7px 0px;
}
.form-register .title-1 {
  color: #037cc0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
}
.form-content {
  padding: 0px 30px 10px 30px;
}
.title {
  color: #858484;
  margin-bottom: 3px;
  font-size: 13px;
  display: inline-block;
  line-height: 10px;
}
.input-register {
  width: 95%;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
}
.el-form-item {
  margin-bottom: 0;
}

.check p {
  color: #858484;
  font-size: 10px;
  margin-top: 3em;
}
.el-button {
  background: #037cc0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  display: block;
  margin: 1em auto;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff;
  width: 340px;
  text-transform: uppercase;
}

.el-button:hover {
  background: #ffffff;
  color: #037cc0;
}
</style>

<style type="text/css">
.el-form-item__label {
  color: #858484;
  font-size: 13px;
  display: inline-block;
  line-height: 10px;
  margin-top: 2em;
}

.el-link--inner {
  text-decoration: none;
}

.el-link--inner span {
  color: #858484;
  font-size: 13px;
  line-height: 10px;
  text-align: center;
  display: block;
  margin-top: 2em;
}

.link {
  text-align: center;
}
</style>

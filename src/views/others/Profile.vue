<template>
  <div>
    <div class="profile">
      <div class="d-flex flex-column">
        <div class="d-flex flex-row">
          <div class="title-icon">
            <img src="@/static/images/title/human.png" alt="" />
          </div>
          <div class="title"><span>Tài khoản</span></div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="content d-flex flex-column">
            <div class="avatar">
              <img v-if="accountInfo.avatar" :src="accountInfo.avatar" alt="" />
              <img
                v-else
                src="@/static/images/avatar/default_avatar.png"
                alt=""
              />
              <div>
                <div
                  class="frame-btn-create-td-2022 btn-upload"
                  @click="$refs.input_upload_avatar.click()"
                >
                  Chọn ảnh
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style="display: none"
                  ref="input_upload_avatar"
                  @change="uploadAvatarProfile"
                />
              </div>
            </div>
            <div class="profile-detail d-flex flex-column">
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Tên tài khoản:</span>
                </div>
                <div class="profile-input-content">
                  <span>{{
                    this.accountInfo.name ? this.accountInfo.name : ""
                  }}</span>
                </div>
              </div>
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Số điện thoại:</span>
                </div>
                <div class="profile-input-content">
                  <span>{{
                    this.accountInfo.phone_number
                      ? this.accountInfo.phone_number
                      : ""
                  }}</span>
                </div>
              </div>
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Email:</span>
                </div>
                <div class="profile-input-content">
                  <span>{{
                    this.accountInfo.email ? this.accountInfo.email : ""
                  }}</span>
                </div>
              </div>
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Mật khẩu:</span>
                </div>
                <div class="profile-input-content">
                  <span>**********</span>
                  <span class="action" @click="showChangePassword">
                    Đổi mật khẩu
                  </span>
                </div>
              </div>
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Phòng Ban:</span>
                </div>
                <div class="profile-input-content">
                  <span>{{
                    this.accountInfo.department
                      ? this.accountInfo.department.name
                      : ""
                  }}</span>
                </div>
              </div>
              <div class="d-flex flex-row profile-row">
                <div class="profile-input-label">
                  <span>Vai trò:</span>
                </div>
                <div class="profile-input-content">
                  <span>{{ getRolesOfUser(this.accountInfo.roles) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-profile">
      <el-dialog
        :visible.sync="dialogChangePasswordVisible"
        width="35%"
        title="Đổi mật khẩu"
        center
      >
        <div>
          <el-form
            :model="ruleEditForm"
            :rules="rules"
            ref="change-password-form"
          >
            <el-form-item label="Mật khẩu cũ" prop="password">
              <el-input
                v-model="ruleEditForm.password"
                placeholder="Nhập mật khẩu cũ"
                autocomplete="old-password"
              ></el-input>
            </el-form-item>
            <el-form-item label="Mật khẩu mới" prop="new_password">
              <el-input
                type="password"
                v-model="ruleEditForm.new_password"
                placeholder="Nhập mật khẩu mới"
                v-if="!isShowNewPassword"
                autocomplete="new-password"
              >
                <template slot="suffix">
                  <span @click="showNewPassword()">
                    <img src="@/static/icon/action/eye.svg" alt="" />
                  </span>
                </template>
              </el-input>
              <el-input
                type="text"
                v-model="ruleEditForm.new_password"
                placeholder="Nhập mật khẩu mới"
                autocomplete="new-password"
                v-else
              >
                <template slot="suffix">
                  <span @click="showNewPassword()">
                    <img src="@/static/icon/action/eye.svg" alt="" />
                  </span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="Nhập lại mật khẩu" prop="repeat_password">
              <el-input
                v-model="ruleEditForm.repeat_password"
                placeholder="Nhập lại mật khẩu mới"
                type="password"
                v-if="!isShowRepeatPassword"
                autocomplete="new-repeat_password"
              >
                <template slot="suffix">
                  <span @click="showRepeatPassword()">
                    <img src="@/static/icon/action/eye.svg" alt="" />
                  </span>
                </template>
              </el-input>
              <el-input
                v-model="ruleEditForm.repeat_password"
                placeholder="Nhập lại mật khẩu mới"
                type="text"
                v-else
                autocomplete="new-repeat_password"
              >
                <template slot="suffix">
                  <span @click="showRepeatPassword()">
                    <img src="@/static/icon/action/eye.svg" alt="" />
                  </span>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div
            class="d-flex flex-row justify-content-end align-items-end padding-modal-button"
          >
            <div
              class="frame-btn-import-td-2022 d-flex justify-content-center align-items-center mr-2 btn-profile-cancel"
              @click="dialogChangePasswordVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center btn-profile"
              @click="changePassword"
            >
              <span>Đổi mật khẩu</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProfileUser",
  data() {
    var customValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập lại mật khẩu."));
      } else {
        if (
          this.ruleEditForm.new_password !== this.ruleEditForm.repeat_password
        ) {
          callback(new Error("Mật khẩu không trùng khớp."));
        }
        callback();
      }
    };
    return {
      dialogChangePasswordVisible: false,
      ruleEditForm: {
        password: "",
        new_password: "",
        repeat_password: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "Vui lòng điền mật khẩu cũ",
            trigger: ["blur", "change"],
          },
        ],
        new_password: [
          {
            required: true,
            message: "Vui lòng điền mật khẩu mới",
            trigger: ["blur", "change"],
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu yêu cầu từ 6 đến 14 kí tự",
          },
        ],
        repeat_password: [
          {
            required: true,
            validator: customValidate,
            trigger: ["blur", "change"],
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu yêu cầu từ 6 đến 14 kí tự",
          },
        ],
      },
      isShowNewPassword: false,
      isShowRepeatPassword: false,
    };
  },
  created() {
    this.getAccountInfo();
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    showChangePassword() {
      this.dialogChangePasswordVisible = true;
      this.ruleEditForm = {
        password: "",
        new_password: "",
        repeat_password: "",
      };
      if (this.$refs["change-password-form"]) {
        this.$refs["change-password-form"].resetFields();
      }
    },
    showNewPassword() {
      this.isShowNewPassword = !this.isShowNewPassword;
    },
    showRepeatPassword() {
      this.isShowRepeatPassword = !this.isShowRepeatPassword;
    },
    getRolesOfUser(roles) {
      let res = "";
      if (undefined !== roles && roles.length === 0) {
        return res;
      } else {
        roles?.forEach((e) => {
          res = res + e.display_name + ", ";
        });
        res = res.slice(0, -2);
        return res;
      }
    },
    uploadAvatarProfile(event) {
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      console.log(event.target.files[0]);
      if (!event.target.files[0].type.includes("image/")) {
        this.$notify({
          title: "Upload thất bại",
          message: "Chỉ được upload file ảnh",
          type: "warning",
        });
        return;
      }
      if (event.target.files[0].size > 2000000) {
        this.$notify({
          title: "Upload thất bại",
          message: "Dung lượng file tối đa là 2M.",
          type: "warning",
        });
        return;
      }
      axios
        .post("/user/avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Upload thành công.",
                message: "Bạn đã cập nhật thành công avatar.",
                type: "success",
              });
              this.getAccountInfo();
              break;
            default:
              this.$notify.error({
                title: "Error",
                message:
                  response.message !== undefined
                    ? response.message
                    : "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
              });
              break;
          }
        });
    },
    changePassword() {
      this.$refs["change-password-form"].validate((valid) => {
        if (valid) {
          axios
            .patch("user/change-password", this.ruleEditForm)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Thay đổi mật khẩu thành công.",
                    message: "Tài khoản đổi mật khẩu thành công.",
                    type: "success",
                  });
                  this.dialogChangePasswordVisible = false;
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Thay đổi mật khẩu thất bại",
                    message: response.data[mess[0]],
                    type: "warning",
                  });
                  break;
                case 500:
                  this.$notify({
                    title: "Thay đổi mật khẩu thất bại",
                    message: response.message,
                    type: "warning",
                  });
                  break;
                default:
                  this.$notify.error({
                    title: "Error",
                    message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                  });
                  this.dialogChangePasswordVisible = false;
                  break;
              }
            });
        }
      });
    },
  },
};
</script>
<style>
/* profile css*/
.profile .title-icon {
  background-color: #e8f3ff;
  border-radius: 5px;
  padding: 5px 7px;
  margin-right: 10px;
  margin-left: 10px;
}
.profile .title-icon img {
  width: 15px;
}
.profile .title {
  padding-top: 5px;
}
.profile .title span {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}
.profile .content {
  width: 487px;
  height: 380px;
  background: #fff;
  border-radius: 61px;
  position: relative;
  margin-top: 145px;
}
.profile .content .btn-upload {
  width: 60px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 75%;
  font-size: 14px !important;
}
.profile .content .avatar {
  width: 200px;
  height: 200px;
  position: absolute;
  top: -25%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #e8f3ff;
}
.profile .content .avatar img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
.profile .profile-detail {
  top: 35%;
  position: absolute;
  padding-left: 70px;
  padding-right: 70px;
  width: 100%;
}
.profile .profile-detail .profile-row {
  height: 40px;
}

.profile .profile-detail .profile-input-label {
  width: 30%;
}

.profile .profile-detail .profile-input-label span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.profile .profile-detail .profile-input-content {
  width: 70%;
}
.profile .profile-detail .profile-input-content span {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
}
.profile .profile-detail .profile-input-content .action {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
  padding-left: 10px;
  cursor: pointer;
  font-style: italic;
}

/* modal css*/
.modal-profile .el-dialog__header {
  background-color: #207cdc;
  height: 25px;
  text-align: initial;
}

.modal-profile .el-dialog__title {
  color: #fff !important;
  font-size: 16px !important;
}

.modal-profile .el-dialog__body {
  padding: 25px 25px 0 25px !important;
}
.modal-profile form .el-input--mini .el-input__inner {
  height: 32px;
  line-height: 28px;
  margin: 0 !important;
}

.modal-profile .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-profile .el-dialog {
  border-radius: 12px;
}
.modal-profile .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
}
.modal-profile .el-form-item__content {
  width: 67%;
  display: inline-block;
}
.modal-profile .el-form-item__content input {
  width: 100%;
  height: 32px;
  display: inline-block;
  border: 0.5px solid #3f92d1 !important;
  border-radius: 5px;
}

.modal-profile .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
  color: #000728;
  font-weight: 400;
}

/* style button modal */
.btn-profile-cancel {
  padding: 7px 15px;
}
.btn-profile {
  padding: 7px 15px;
}
.btn-profile-cancel span {
  font-size: 14px !important;
  font-weight: 400;
}
.btn-profile span {
  font-size: 14px !important;
  font-weight: 700;
}
.padding-modal-button {
  padding: 0 18px;
}
</style>

<template>
  <div class="change-password d-flex justify-content-center align-items-center">
    <div class="form-change-password">
      <div class="d-flex flex-row justify-content-end align-items-center">
        <div class="d-flex logo justify-content-end" @click="toLoginPage()">
          <img src="@/static/icon/login/logo.svg" alt="" />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center title">
        <span>Quên mật khẩu</span>
      </div>
      <div
        class="d-flex flex-column justify-content-center align-items-center content"
      >
        <img src="@/static/icon/action/success.svg" alt="" />
        <span>Thay đổi mật khẩu thành công</span>
      </div>
      <div
        class="change-password-button d-flex justify-content-center align-items-center"
        @click="toLoginPage()"
      >
        <span>Đăng nhập</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePasswordSuccess",
  data() {
    return {};
  },
  methods: {
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
.content span {
  padding: 10px 5px;
  color: #767676;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
}
.change-password .title {
  margin-top: 45px;
  text-transform: uppercase;
  color: #075970;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.change-password-button {
  margin-top: 20px;
  background: #095870;
  border-radius: 8px;
  color: #fff;
  padding: 10px;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;
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
</style>

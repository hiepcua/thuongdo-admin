<template>
  <div class="customer-common customer-list frame-content-common-2022 fineList">
    <div class="title d-flex align-items-center">
      <div class="d-flex justify-content-center align-items-center iconTop">
        <img src="@/static/icon/fines/icon.svg" alt="" />
      </div>
      <span>Thêm mới nộp phạt</span>
    </div>
    <div class="content-create-fines" id="containerDiv">
      <el-row>
        <el-col :span="6">
          <div class="title-createFines">
            <span class="title_1">Chọn loại nộp phạt</span>
            <!--  -->
            <div class="listStatusFines">
              <div
                class="list-fine-item d-flex align-items-center"
                v-for="item in listCommon"
                :key="item.value"
              >
                <img
                  src="@/static/icon/fines/checked.svg"
                  alt=""
                  v-if="item.value === listCreateFine.type"
                />
                <img
                  src="@/static/icon/fines/no-checked.svg"
                  alt=""
                  v-else
                  @click.stop="changeWareHouseId(item.value)"
                />
                <span
                  class="address"
                  @click.stop="changeWareHouseId(item.value)"
                  >{{ item.name }}</span
                >
              </div>
            </div>
            <!--  -->
          </div>
          <div class="title-createFines title-createFines-2022">
            <span class="title_1">Thông tin chi tiết</span>
            <div class="order-code-fines-create">
              <div class="title_2">Mã đơn hàng</div>
              <el-input
                class="frame-input-common-2022"
                placeholder="Nhập"
                clearable
                v-model="listCreateFine.order_code"
              ></el-input>
            </div>
            <div class="order-code-fines-create">
              <div class="title_2">Mã vận đơn</div>
              <el-input
                class="frame-input-common-2022"
                placeholder="Nhập"
                clearable
                v-model="listCreateFine.bill_code"
              ></el-input>
            </div>
            <div class="order-code-fines-create">
              <div class="d-flex">
                <div class="title_2">Số tiền</div>
                <span class="colorRed">*</span>
              </div>
              <el-input
                class="frame-input-common-2022"
                placeholder="Nhập"
                type="number"
                clearable
                v-model="listCreateFine.amount"
                :class="[listCreateFine.amount_err ? 'error-data-2022' : '']"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="title-createFines">
            <div class="d-flex">
              <span class="title_1">Nhân viên vi phạm</span>
              <span class="colorRed">*</span>
            </div>
            <div>
              <el-select
                placeholder="Nhân viên vi phạm"
                class="frame-input-common-2022"
                popper-class="frame-select-popper-customer-2022"
                v-model="listCreateFine.user_id"
                :class="[listCreateFine.user_id_err ? 'error-data-2022' : '']"
              >
                <el-option
                  v-for="item in listUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="content-2022-createFines">
            <div class="text-reason">
              <div class="d-flex">
                <span class="title_2">Nguyên nhân</span>
                <span class="colorRed">*</span>
              </div>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="Nhập"
                v-model="listCreateFine.reason"
                :class="[listCreateFine.reason_err ? 'error-data-2022' : '']"
              >
              </el-input>
            </div>
            <div class="text-reason text-reason-2">
              <div class="d-flex">
                <span class="title_2">Phương án giải quyết</span>
                <span class="colorRed">*</span>
              </div>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="Nhập"
                v-model="listCreateFine.solution"
                :class="[listCreateFine.solution_err ? 'error-data-2022' : '']"
              >
              </el-input>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="fines-create-add-item" @click="submitForm()">
              <span v-if="!canSubmit"><i class="el-icon-loading"></i></span>
              <span v-else>Thêm mới</span>
            </div>
            <div
              class="fines-create-add-item"
              id="cancelUpdate"
              @click="cancelUpdate()"
            >
              <span>Hủy</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeIndex",
  metaInfo() {
    return {
      title: "Thêm mới nộp phạt",
    };
  },
  components: {},
  data() {
    return {
      loading: true,
      canSubmit: true,
      //
      listCreateFine: {
        type: "",
        user_id: "",
        order_id: "",
        order_code: "",
        bill_code: "",
        reason: "",
        solution: "",
        amount: "",

        user_id_err: false,
        reason_err: false,
        solution_err: false,
        amount_err: false,
      },
      listUser: [],
      listCommon: [],
      listOrder: {},
    };
  },
  mounted() {
    this.fetchUser();
    this.fetchCommon();
    this.created();
  },
  methods: {
    // lấy ds nhan viên
    fetchUser() {
      axios.get("user/list").then((response) => {
        switch (response.code) {
          case 200:
            this.listUser = response.data;
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
    // lấy loại nộp phạt
    fetchCommon() {
      axios.get("common/fine").then((response) => {
        switch (response.code) {
          case 200:
            this.listCommon = response.data.types;
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
    changeWareHouseId(value) {
      this.listCreateFine.type = value;
      // this.$emit("changeWareHouseId", value);
    },
    created() {
      this.listCreateFine.order_code = this.$route.query.order_code;
      this.listCreateFine.order_id = this.$route.query.order_id;
    },
    // trở về màn ds nộp phạt
    cancelUpdate() {
      this.$router.push({
        name: "fines-lists",
      });
    },
    // check dữ liệu nhập
    checkDataPushError() {
      let flag = false;
      if (this.listCreateFine.user_id == "") {
        this.listCreateFine.user_id_err = true;
        flag = true;
      }
      if (this.listCreateFine.amount == "") {
        this.listCreateFine.amount_err = true;
        flag = true;
      }
      if (this.listCreateFine.reason == "") {
        this.listCreateFine.reason_err = true;
        flag = true;
      }
      if (this.listCreateFine.solution == "") {
        this.listCreateFine.solution_err = true;
        flag = true;
      }
      return flag;
    },
    // thêm mới
    submitForm() {
      if (this.checkDataPushError()) {
        // https://stackoverflow.com/questions/10744299/scroll-back-to-the-top-of-scrollable-div
        document.getElementById("containerDiv").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng điền đủ thông tin",
          type: "warning",
        });
        return;
      }
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;

      let data = this.listCreateFine;

      axios.post("fine", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Tạo nộp phạt thành công",
              type: "success",
            });
            this.$router.push({
              name: "fines-lists",
            });
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: Object.values(response.data)[0],
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
  watch: {},
};
</script>

<style lang="css" scoped>
.fineList {
  padding: 23px 40px 40px 40px;
}
.iconTop {
  width: 24px;
  height: 24px;
  background: #e8f3ff;
  border-radius: 4px;
  margin-right: 10px;
}
.fineList .title span {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #0688ee;
}
.input-seach-wrap-1 {
  padding: 20px 10px;
}
.content-create-fines {
  padding: 24px 0 100px 0;
}
.title-createFines .title_1 {
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: #000728;
}
.content-2022-createFines {
  margin: 30px 0;
}
.title_2 {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #000728;
}
.text-reason-2 {
  margin-top: 16px;
}
.fines-create-add-item {
  background: #0688ee;
  border-radius: 5px;
  width: 160px;
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.title-createFines-2022 {
  margin-top: 26px;
}
.order-code-fines-create {
  margin: 14px 0;
}
.order-code-fines-create .el-input {
  margin-top: 8px;
  width: 235px;
}
</style>
<style type="text/css">
.title-createFines .el-input__inner {
  width: 235px;
  height: 36px;
  border-radius: 5px;
}
.title-createFines .el-select {
  margin-top: 12px;
}
.text-reason .el-textarea {
  margin-top: 10px;
}
.text-reason textarea {
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
}
/* loại nộp phạt  */
.listStatusFines {
  margin-top: 16px;
}
.listStatusFines .el-radio-group {
  display: flex;
  flex-flow: column;
}
.listStatusFines .list-fine-item {
  margin-bottom: 16px;
}
.listStatusFines .list-fine-item span {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #000728;
  padding-left: 10px;
}
/* hiện thị lỗi đỏ */
.error-data-2022 input {
  border: 1px solid red !important;
}
.error-data-2022 textarea {
  border: 1px solid red !important;
}
.error-data-2022.a90 {
  border: 1px solid red !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield !important;
}
.colorRed {
  color: red;
  padding-left: 5px;
}
#cancelUpdate {
  margin-left: 10px;
  width: 90px;
}
</style>

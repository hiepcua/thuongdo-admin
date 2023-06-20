<template>
  <div class="fund-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title" @click="initDefault()">Chi tiết tồn quỹ</span>
      </div>
      <div class="fund-list-action">
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success  fund-list-action-item btn-transfer-fund"
          @click="addNew()">
          <img src="@/static/icon/fund/list/icon-1.svg" />
          <span>Chuyển quỹ</span>
        </span>
        <span
          class="btn-crud-2022 frame-hover-2022 btn-xanhlo fund-list-action-item btn-money-change"
          @click="goBack()">
          <img src="@/static/icon/fund/list/icon-2.svg" />
          <span>Đổi tiền</span>
        </span>
      </div>
      <div class="fund-list-table" v-loading="loading">
        <div class="table-common">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số dư ban đầu</th>
                <th>Tổng nạp</th>
                <th>Tổng thanh toán</th>
                <th>Số dư hiện tại</th>
              </tr>
            </thead>
            <tbody>
              <tr class="main-total">
                <td colspan="4" align="left">
                  <strong>Tiền Việt Nam</strong>
                </td>
                <td>
                  <strong>Tổng tiền: {{ tableData.total_VND | vnd }}</strong>
                </td>
              </tr>
              <tr v-for="i in tableData.arr_VND" :key="i.name">
                <td>{{ i.name }}</td>
                <td>{{ i.initial_balance | vnd }}</td>
                <td>{{ i.total_money_in | vnd }}</td>
                <td>{{ i.total_money_out | vnd }}</td>
                <td>{{ i.current_balance | vnd }}</td>
              </tr>
              <tr class="main-total">
                <td colspan="4" align="left">
                  <strong>Tiền Trung Quốc</strong>
                </td>
                <td>
                  <strong>Tổng tiền: {{ tableData.total_China | number }} ¥</strong>
                </td>
              </tr>
              <tr v-for="j in tableData.arr_China" :key="j.name">
                <td>{{ j.name }}</td>
                <td>{{ j.initial_balance | vnd3 }}</td>
                <td>{{ j.total_money_in | vnd3 }}</td>
                <td>{{ j.total_money_out | vnd3 }}</td>
                <td>{{ j.current_balance | vnd3 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Thêm mới giao dịch -->
      <div class="frame-dialog-no-close-1988 fund-transaction-add">
        <el-dialog
          top="150px"
          width="450px"
          :close-on-click-modal="false"
          :visible.sync="dialogAddFundTransaction"
          :show-close="false"
        >
          <div class="header-1988 header-1988-blue">
            <span>Thêm mới chuyển quỹ</span>
          </div>
          <div class="body-1988">
            <div class="form-item">
              <span class="title">Từ quỹ <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.fund_id_from"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  filterable
                >
                  <el-option
                    v-for="item in listCategory.arrFundAll"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Đến quỹ <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.fund_id_to"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  filterable
                >
                  <el-option
                    v-for="item in listCategory.arrFundAll"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Số tiền <span class="important">*</span></span>
              <div class="form-input">
                <el-input
                  placeholder="Số tiền"
                  v-model="modelAdd.money"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                  type="number"
                >
                  <template slot="append">{{ modelAdd.money | vnd }}</template>
                </el-input>
              </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="dialogAddFundTransaction = false"
                  >Hủy bỏ</span>
                <span
                  class="btn-common frame-hover-2022 btn-success"
                  :class="[!canSubmitAddFundTransaction ? 'disable' : '']"
                  @click="submitAddFundTransaction()"
                  >
                    <span v-if="!canSubmitAddFundTransaction">
                      <i class="el-icon-loading"></i>
                    </span>
                    <span>Xác nhận</span>
                </span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'FunList',
  metaInfo() {
    return {
      title: "Danh sách tồn quỹ",
    };
  },
  data () {
    return {
      loading: false,
      tableData: [],

      // Phần mới
      listCategory: {},
      listBank: [],

      // Thêm mới thanh toán
      dialogAddFundTransaction: false,
      canSubmitAddFundTransaction: true,
      modelAdd: {
        fund_id_from: "",
        fund_id_to: "",
        money: "",
      },
      listPay: [],
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchFund();
    this.fetchCategory();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },

    initDefault() {
      axios.post("fund/init-default").then((response) => {
        switch (response.code) {
          case 200:
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

    fetchFund() {
      this.loading = true;
      axios.get("fund/list").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data;
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

    fetchCategory() {
      axios.get("fund_transaction/get-category-vi").then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
            this.listBank = this.listCategory.arrFund;
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

    // Thêm mới
    addNew() {
      this.dialogAddFundTransaction = true;
      this.modelAdd.money = "";
      this.listPay = [];

      this.showEdit = false;
    },
    submitAddFundTransaction() {
      if (this.modelAdd.fund_id_from == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập từ quỹ",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fund_id_to == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập đến quỹ",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.money == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập số tiền",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fund_id_from == this.modelAdd.fund_id_to) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Hai quỹ đang giống nhau, ko thể chuyển quỹ",
          type: "warning",
        });
        return;
      }

      this.canSubmitAddFundTransaction = false;
      axios.post("fund_transaction/save-transfer-fund", this.modelAdd).then((response) => {
        this.canSubmitAddFundTransaction = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.dialogAddFundTransaction = false;
            this.modelAdd.fund_id_from = "";
            this.modelAdd.fund_id_to = "";
            this.modelAdd.money = "";
            this.fetchFund();
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

    // Xử lý
    goBack() {},
  },
  watch: {
    "modelAdd.money": function () {
      if (this.modelAdd.money < 0) {
        this.modelAdd.money = 1
      }
      if (this.modelAdd.money > 10000000000) {
        this.modelAdd.money = 10000000000;
        this.$message({
          message: 'Số tiền tối đa được nhập là 10 tỉ',
          type: 'warning'
        });
      }
    },
  }
}
</script>

<style lang="css" scoped>
.fund-list-action-item {
  padding: 6px 45px 6px 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-right: 10px;
  color: #fff;
}
.fund-list-action-item img {
  margin-right: 5px;
}

.fund-list-table {
  margin-top: 15px;
  min-height: 300px;
}

/* Dialog chuyển quỹ */
.fund-transaction-add .form-item {
  margin-bottom: 10px;
}
.fund-transaction-add .form-item .title {
  margin-bottom: 8px;
  color: #000728;
  display: inline-block;
}
.fund-transaction-add .form-item .important {
  color: #DF4747;
}
.fund-transaction-add .form-input {
  margin-bottom: 8px;
}
.fund-transaction-add .name-customer {
  color: green
}
.fund-transaction-add .no-customer {
  color: red;
}
</style>

<style lang="css" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  padding: 10px 2px;
  text-align: center;
  color: #000728;
  border: 1px solid;
}
td {
  padding: 10px 2px;
  text-align: left;
  color: #000728;
  padding-left: 15px;
}
th {
  background: #207CDC;
  color: #fff;
  padding: 10px 0px;
}
td {
  border: 1px solid #BDD6EE;
}
.main-total td {
  text-align: left;
  padding-left: 10px;
  background: #BDD6EE;
}
.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.fund-transaction-add textarea {
  border: 1px solid #3F92D1 !important;
}
</style>

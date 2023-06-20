<template>
  <div class="fund-transaction-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/fund-transaction/list/clarity_dollar-bill-solid.svg" />
        </span>
        <span class="title">Danh sách rút tiền</span>
      </div>
      <div class="table-element-custom-2022-v2 fund-transaction-list-table mt-3">
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column
            label="STT"
            type="index"
            width="50"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="Ngày"
            align="left"
            header-align="center"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Số rút"
            align="left"
            header-align="center"
            width="130"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.amount | vnd }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Số dư"
            align="left"
            header-align="center"
            width="110"
          >
            <template slot-scope="scope">
               <span>{{ scope.row.balance | vnd }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Khách hàng"
            align="left"
            header-align="center"
            width="180"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span>{{ scope.row.customer.name }}</span>
                <span>MKH: {{ scope.row.customer.code }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Số tài khoản"
            align="left"
            header-align="center"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.account_number }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Chủ tài khoản"
            align="left"
            header-align="center"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.account_holder }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Ngân hàng"
            align="left"
            header-align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.bank }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Chi nhánh"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.branch }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Trạng thái"
            align="left"
            header-align="center"
            width="170"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <el-select
                  :style="{ backgroundColor: scope.row.status.color }"
                  v-model="scope.row.status.value"
                  placeholder="chọn trạng thái"
                  class="frame-input-common-2022 status-withdrawal-2022"
                  popper-class="frame-select-popper-customer-2022"
                  @change="updateStatus(scope.row)"
                  :disabled="scope.row.status.value == 'status_cancel' || scope.row.status.value == 'status_done'"
                >
                  <el-option
                    v-for="item in listStatus"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thao tác"
            align="center"
            header-align="center"
            width="180"
            fixed="right"
          >
            <template slot-scope="scope">
              <div>
                <span
                  v-if="scope.row.status.value != 'status_done' && scope.row.status.value != 'status_cancel'"
                  class="btn-withdrawal-2022 frame-hover-2022 btn-success"
                  @click="showWithdraw(scope.row)"
                  >
                    <img src="@/static/icon/fund/withdrawal/icon1.svg" />
                    <span>Xác nhận</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="china-panigation-1988 d-flex justify-content-end pt-3">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagination.per_page"
          :total="pagination.total"
          :current-page="filter.page"
          @current-change="changeCurrentPage"
        >
        </el-pagination>
      </div>
      <!-- Thêm mới giao dịch -->
      <div class="frame-dialog-no-close-1988 fund-transaction-add">
        <el-dialog
          top="100px"
          width="550px"
          :close-on-click-modal="false"
          :visible.sync="dialogAddFundTransaction"
          :show-close="false"
        >
          <div class="header-1988 header-1988-blue">
            <img src="@/static/icon/fund-transaction/list/dola-popup.svg" />
            <span>Rút tiền</span>
          </div>
          <div class="body-1988">
            <div class="form-item info-withdraw" v-if="itemSelected">
              <span>Số tiền rút: <strong class="number">{{ itemSelected.amount | vnd }}</strong></span>
              <span>Khách hàng: <strong>{{ itemSelected.customer.name }}</strong></span>
              <span>MKH: <strong>{{ itemSelected.customer.code }}</strong></span>
            </div>
            <div class="form-item">
              <span class="title">Chuyển từ sổ quỹ <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.fund_id"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  filterable
                >
                  <el-option
                    v-for="item in listCategory.arrFund"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="dialogAddFundTransaction = false"
                  >Hủy bỏ</span>
                <span
                  class="btn-common frame-hover-2022"
                  :class="[!canSubmitAddFundTransaction ? 'disable' : '', showEdit ? 'btn-warning' : 'btn-success']"
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
  name: 'FundWithdrawal',
  metaInfo() {
    return {
      title: "Danh sách rút tiền",
    };
  },
  data () {
    return {
      loading: false,
      searching: false,
      filter: {
        date_from: null,
        date_to: null,
        status: "",
        page: 1,
        per_page: 1,
      },

      // Phần hiển thị
      tableData: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      listCategory: {},
      listBank: [],

      // Thêm mới thanh toán
      dialogAddFundTransaction: false,
      canSubmitAddFundTransaction: true,
      modelAdd: {
        customer_withdrawal_id: "",
        fund_id: "",
      },
      listPay: [],
      itemSelected: {
        customer: {}
      },

      // Seach khách hàng tự động
      searchingCustomer: false,
      timer: {},

      // Edit giao dịch
      showEdit: false,

      listStatus: [],

      showWithdrawCheck: false,
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchCategory();
    this.fetchFundTransacton();
    this.fetchCommon();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    fetchCommon() {
      this.loading = true;
      axios.get("common/withdrawal").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listStatus = response.data.statuses;
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
    // sửa trạng thái
    updateStatus(item) {
      if (item.status.value == 'status_done') {
        this.showWithdrawCheck = true;
        this.showWithdraw(item);
      } else {
        this.updateStatusActoin(item);
      }
    },
    updateStatusActoin(item) {
      let data = {
        status: item.status.value,
      };
      axios
        .patch("transaction/withdrawal/status/" + item.id, data)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Cập nhật trạng thái rút tiền thành công",
                type: "success",
              });
              this.fetchFundTransacton();
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
    fetchFundTransacton() {
      this.loading = true;
      let filter = {
        status: this.filter.status,
        page: this.filter.page,
        per_pages: this.filter.per_page,
      };

      // Ngày tạo
      filter.date = null;

      if (this.filter.date_from !== null) {
        filter.date = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.date = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.date = this.filter.date_from + "," + this.filter.date_to;
        const x = new Date(this.filter.date_from);
        const y = new Date(this.filter.date_to);
        if (x > y) {
          this.$message.error(
            "Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_from = null;
          }, 800);
        }
      }

      axios.get("transaction/withdrawal", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
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

    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchFundTransacton();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    // Thêm mới
    addNew() {
      this.dialogAddFundTransaction = true;
      this.modelAdd.type_object = "";
      this.modelAdd.type_pay = "";
      this.modelAdd.fund_type_pay_id = "";
      this.modelAdd.fund_id = "";
      this.modelAdd.customer_code = "";
      this.modelAdd.customer_phone = "";
      this.modelAdd.customer_name = "";
      this.modelAdd.customer_has = "";
      this.modelAdd.customer_search = "";
      this.modelAdd.money = "";
      this.modelAdd.note = "";
      this.listPay = [];

      this.showEdit = false;
    },
    submitAddFundTransaction() {
      if (this.modelAdd.fund_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập quỹ thanh toán",
          type: "warning",
        });
        return;
      }
      this.canSubmitAddFundTransaction = false;
      axios.post("fund_transaction/save-money-withdrawal", this.modelAdd).then((response) => {
        this.canSubmitAddFundTransaction = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.showWithdrawCheck = false;
            this.dialogAddFundTransaction = false;
            this.fetchFundTransacton();
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

    // Seach khách
    fetchCustomer() {
      this.modelAdd.customer_has = 0;
      let data = {
        customer_search: this.modelAdd.customer_search
      }
      axios.post("fund_transaction/get-customer", data).then((response) => {
        this.searchingCustomer = false;
        switch (response.code) {
          case 200:
            this.modelAdd.customer_has = response.data.customer_has;
            this.modelAdd.customer_phone = response.data.customer_phone;
            this.modelAdd.customer_code = response.data.customer_code;
            this.modelAdd.customer_name = response.data.customer_name;
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

    // Xóa giao hàng
    confirmDeleteModel(item) {
      this.$confirm("Xác nhận xóa ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(item);
        })
        .catch(() => {});
    },
    deleteModel(item) {
      axios.post("fund_transaction/hide/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchFundTransacton();
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

    addEdit(item) {
      this.addNew();
      this.showEdit = true;
      this.modelAdd =  JSON.parse(JSON.stringify(item));
    },

    submitUpdateFundTransaction() {
      if (this.modelAdd.type_object == 2) {
        if (this.modelAdd.customer_has == 0) {
          this.$notify({
            title: "Vui lòng kiểm tra lại thông tin",
            message: "Vui lòng nhập thông tin khách hàng",
            type: "warning",
          });
          return;
        }
      }
      if (this.modelAdd.fund_type_pay_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại thanh toán.",
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
      if (this.modelAdd.note == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập nội dung",
          type: "warning",
        });
        return;
      }

      this.canSubmitAddFundTransaction = false;
      axios.put("fund_transaction/" + this.modelAdd.id, this.modelAdd).then((response) => {
        this.canSubmitAddFundTransaction = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.dialogAddFundTransaction = false;
            this.fetchFundTransacton();
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

    // Rút tiền
    showWithdraw(item) {
      this.itemSelected = item;
      this.modelAdd.customer_withdrawal_id = item.id;
      this.dialogAddFundTransaction = true;
      this.modelAdd.fund_id = "";
    }
  },
  watch: {
    "filter.type_object": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },
    "filter.type_pay": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },
    "filter.fund_type_currency": function () {
      this.filter.page = 1;
      this.filter.fund_id = "";
      this.fetchFundTransacton();
      this.listBank = this.listCategory.arrFund;
      if (this.filter.fund_type_currency == 1) {
        this.listBank = this.listCategory.arrFundCash;
      }
      if (this.filter.fund_type_currency == 2) {
        this.listBank = this.listCategory.arrFundBank;
      }
    },
    "filter.fund_id": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },

    "modelAdd.type_pay": function () {
      if (this.showEdit == false) {
        this.modelAdd.fund_type_pay_id = "";
      }
      if (this.modelAdd.type_pay == 1) {
        this.listPay = this.listCategory.arrTypePayValue1;
      }
      if (this.modelAdd.type_pay == 2) {
        this.listPay = this.listCategory.arrTypePayValue2;
      }
    },
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

    "modelAdd.customer_search": function () {
      if (this.modelAdd.customer_search == "") {
        this.modelAdd.customer_has = 0;
      } else {
        this.searchingCustomer = true
        clearTimeout(this.timer)
        let _this = this
        this.timer = setTimeout(function () {
          _this.fetchCustomer()
        }, 800)
      }
    },

    dialogAddFundTransaction: function () {
      if (this.dialogAddFundTransaction == false) {
        if (this.showWithdrawCheck) {
          this.fetchFundTransacton();
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
/*Đè nút */
.fund-transaction-list .btn-search {
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
}

.fund-transaction-list-action {
  margin-top: 15px;
}
.fund-transaction-list-action-item {
  padding: 7px 45px 7px 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-right: 10px;
  color: #fff;
}
.fund-transaction-list-action-item img {
  margin-right: 5px;
}

.fund-transaction-list-table .line-item {
  margin-bottom: 1px;
  margin-top: 1px;
}
.fund-transaction-list-table .img-text {
  display: flex;
  align-items: center;
}
.fund-transaction-list-table .img-text img {
  margin-right: 5px;
  margin-bottom: 4px;
}

.fund-transaction-list-table .color-green {
  color: #26B01C;
}
.fund-transaction-list-table .color-red {
  color: #ED1C24;
}
.fund-transaction-list-table .item-action {
  margin-bottom: 4px;
  cursor: pointer;
}

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


/*// withdraw:*/
.btn-withdrawal-2022 {
  font-size: 12px;
  padding: 1px 11px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.btn-withdrawal-2022 img {
  margin-right: 5px;
}

.info-withdraw {
  display: flex;
  flex-direction: column;
  line-height: 25px;
  color: #000728;
}
.info-withdraw .number {
  color: #26B01C;
  font-size: 20px;
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

.status-withdrawal-2022 input {
  font-size: 12px;
  background: none;
  color: #fff;
  border: none !important;
}
.status-withdrawal-2022 .el-input--suffix .el-input__inner {
  height: 30px;
}
.status-withdrawal-2022 .el-input__icon {
  line-height: 30px !important;
}
.status-withdrawal-2022 .el-icon-arrow-up::before {
  color: #fff !important;
}
.status-withdrawal-2022 .el-icon-arrow-down::before {
  color: #fff !important;
}
.status-withdrawal-2022 .el-input.is-disabled .el-input__inner {
  background: none !important;
  color: #fff;
}
.status-withdrawal-2022 .el-input.is-disabled .el-input__suffix {
  display: none !important;
}
</style>

<template>
  <div class="fund-transaction-list list-supplier-order-details" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/fund-transaction/list/clarity_dollar-bill-solid.svg" />
        </span>
        <span class="title">Chi tiết thực tế đặt hàng nhà cung cấp</span>
      </div>
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Mã, SĐT khách hàng"
            v-model="filter.customer_code"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.code"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Chọn nhân viên"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.staffs.order"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <span
            class="btn-crud-2022 frame-hover-2022 btn-info btn-search"
            :class="loading ? 'disable' : ''"
            @click="fetchFundTransacton()"
            >
              <span v-if="loading">
                <i class="el-icon-loading"></i>
              </span>
              <span>Tìm kiếm</span>
          </span>
        </div>
      </div>
      <div class="fund-transaction-list-action">
        <div class="d-none">
          <span
            class="btn-crud-2022 frame-hover-2022 btn-danger  fund-transaction-list-action-item btn-transfer-fund"
            @click="addNew()">
            <img src="@/static/icon/fund/detail-ncc/exel.svg" />
            <span>Xuất excel</span>
          </span>
        </div>
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success  fund-transaction-list-action-item btn-transfer-fund"
          @click="orderConfirmation()">
          <img src="@/static/icon/fund/detail-ncc/icon2.svg" />
          <span>Xác nhận đặt hàng</span>
        </span>
      </div>
      <div class="table-element-custom-2022 fund-transaction-list-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          border
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            header-align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="STT"
            type="index"
            width="50"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="Ngày đặt hàng"
            align="left"
            header-align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.info.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Mã đặt hàng"
            align="left"
            header-align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.info.code_po }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Mã đơn hàng"
            align="left"
            header-align="center"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.info.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Tình trạng"
            align="left"
            header-align="center"
            width="180"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span
                  class="count-status-top-3388 v2"
                  :style="{backgroundColor: scope.row.info.status.color}"
                  >{{ scope.row.info.status.name }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Tiền hàng" header-align="center">
            <el-table-column label="Đã trả" header-align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.order_cost_old | vnd3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Thực tế" header-align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.order_cost | vnd3 }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="Phí ship TQ" header-align="center">
            <el-table-column label="Đã trả" header-align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.china_shipping_cost_old | vnd3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Thực tế" header-align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.china_shipping_cost | vnd3 }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="Tỉ giá"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.info.exchange_rate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Chênh lệch" header-align="center">
            <el-table-column label="CNY" header-align="center" width="100">
              <template slot-scope="scope">
                <span :class="[scope.row.diff_order_and_shipping_cost <= 0 ? 'color-green' : 'color-red']">{{ scope.row.diff_order_and_shipping_cost_abs | vnd3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="VND" header-align="center" width="150">
              <template slot-scope="scope">
                <span  :class="[scope.row.diff_order_and_shipping_cost <= 0 ? 'color-green' : 'color-red']">{{ (scope.row.diff_order_and_shipping_cost_abs * scope.row.exchange_rate) | vnd }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="NV đặt hàng"
            align="left"
            header-align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.staff.order">{{ scope.row.staff.order.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Thao tác"
            align="center"
            header-align="center"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Xác nhận đặt hàng" placement="top">
                  <img src="@/static/icon/fund/detail-ncc/icon3.svg" @click="confirmDeleteModel(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Báo lỗi" placement="top">
                  <img src="@/static/icon/fund/detail-ncc/icon4.svg" @click="addNew(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action d-none">
                <el-tooltip class="item" effect="dark" content="In" placement="top">
                  <img src="@/static/icon/fund/detail-ncc/ion_print.svg"/>
                </el-tooltip>
              </div>
              <div class="item-action d-none">
                <el-tooltip class="item" effect="dark" content="Xóa" placement="top">
                  <img src="@/static/icon/fund-transaction/list/delete.svg"/>
                </el-tooltip>
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
          top="150px"
          width="600px"
          :close-on-click-modal="false"
          :visible.sync="dialogAddFundTransaction"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/fund/detail-ncc/icon5.svg" />
            <span>Báo lỗi</span>
          </div>
          <div class="body-1988">
            <div class="form-item">
              <span class="title">Chọn lí do <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.reason_id"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                >
                  <el-option
                    v-for="item in listReason"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Ghi chú <span class="important">*</span></span>
              <div class="form-input">
                <el-input
                  placeholder="Nội dung"
                  v-model="modelAdd.note"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                  type="textarea"
                  :rows="5"
                >
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
                  class="btn-common frame-hover-2022"
                  :class="[!canSubmitAddFundTransaction ? 'disable' : '', showEdit ? 'btn-warning' : 'btn-success']"
                  @click="showEdit ? submitUpdateFundTransaction() : submitAddFundTransaction()"
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
  name: 'FundListNCC',
  metaInfo() {
    return {
      title: "Chi tiết đặt hàng thực tế nhà cung cấp",
    };
  },
  data () {
    return {
      loading: false,
      searching: false,
      filter: {
        code: "",
        customer_code: "",
        staff_order_id: "",
        page: 1,
        per_page: 15,
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

      listCategory: {
        staffs: {
          order: []
        }
      },
      listBank: [],

      // Thêm mới thanh toán
      dialogAddFundTransaction: false,
      canSubmitAddFundTransaction: true,
      modelAdd: {
        order_id: "",
        reason_id: "",
        note: "",
      },
      listPay: [],
      listReason: [
        {key: 1, value: 'Sai tiền'},
        {key: 2, value: 'Sai mã đặt hàng'}
      ],

      // Seach khách hàng tự động
      searchingCustomer: false,
      timer: {},

      // Edit giao dịch
      showEdit: false,

      arr_order_id: [],
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchCategory();
    this.fetchFundTransacton();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    fetchCategory() {
      axios.get("common/order").then((response) => {
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
        code: this.filter.code,
        customer_code: this.filter.customer_code,
        staff_order_id: this.filter.staff_order_id,

        page: this.filter.page,
        per_page: this.filter.per_page,
      };

      axios.get("fund_transaction/list-supplier-order-details", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = parseInt(response.data.pagination.per_page);
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
    addNew(item) {
      this.dialogAddFundTransaction = true;
      this.modelAdd.order_id = item.info.id;
      this.modelAdd.reason_id = 1;
      this.modelAdd.note = "";
    },
    submitAddFundTransaction() {
      this.canSubmitAddFundTransaction = false;
      axios.post("fund_transaction/order-error", this.modelAdd).then((response) => {
        this.canSubmitAddFundTransaction = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Báo lỗi thành công",
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
      console.log(item);
      this.$confirm("Xác nhận đặt hàng ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "success",
      })
        .then(() => {
          this.deleteModel(item);
        })
        .catch(() => {});
    },
    deleteModel(item) {
      this.loading = true;
      let data = {
        arr_order_id: [item.info.id],
      }
      axios.post("fund_transaction/order-confirmation", data).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xác nhận đặt hàng thành công",
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


    handleSelectionChange(val) {
      let temp_arr = [];
      val.forEach((item) => {
        temp_arr.push(item.info.id);
      })
      this.arr_order_id = temp_arr;
    },

    orderConfirmation() {
      if (this.arr_order_id.length == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ít nhất 1 đơn",
          type: "warning",
        });
        return;
      }

      let data = {
        arr_order_id: this.arr_order_id,
      }
      this.loading = true;
      axios.post("fund_transaction/order-confirmation", data).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xác nhận đặt hàng thành công",
              type: "success",
            });
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
    }
  },
  watch: {
    "filter.staff_order_id": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
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

.list-supplier-order-details .table-element-custom-2022 .el-table {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: .01em;
  color: #000728;
  word-break: break-word;
}
</style>

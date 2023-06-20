<template>
  <div class="fund-transaction-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/fund-transaction/list/clarity_dollar-bill-solid.svg" />
        </span>
        <span class="title">Lịch sử thu chi tiền Việt Nam</span>
      </div>
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Mã khách hàng"
            v-model="filter.customer_code"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Họ và tên"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.customer_phone"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
            type="number"
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.type_object"
            placeholder="Chọn đối tượng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.arrTypeObject"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.type_pay"
            placeholder="Chọn thu/chi"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.arrTypePay"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.fund_type_currency"
            placeholder="Chọn loại sổ"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.arrTypeCurrency"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.fund_id"
            placeholder="Chọn ngân hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listBank"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-date-picker
            v-model="filter.date_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_to"
            type="date"
            placeholder="Đến ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
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
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success  fund-transaction-list-action-item btn-transfer-fund"
          @click="addNew()">
          <img src="@/static/icon/fund-transaction/list/add.svg" />
          <span>Thêm mới</span>
        </span>
        <span @click="initDefault()">.....</span>
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
            label="Ngày tạo/Người tạo"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.create_at }}</span>
              <div class="line-item img-text">
                <img src="@/static/icon/fund-transaction/list/user.svg"/>
                <span>{{ scope.row.user_create_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Loại thanh toán"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span
                  class="count-status-top-3388 v2"
                  :style="{backgroundColor: scope.row.type_pay == 1 ? '#26B01C' : '#ED1C24'}"
                  >
                  {{ scope.row.type_pay_text }}
                </span>
              </div>
              <div class="line-item img-text" v-if="scope.row.fund_type_pay_txt">
                <img src="@/static/icon/fund-transaction/list/uiw_enter.svg"/>
                <span>{{ scope.row.fund_type_pay_txt }}</span>
              </div>
              <div class="line-item img-text">
                <img src="@/static/icon/fund-transaction/list/uiw_enter.svg"/>
                <span>{{ scope.row.fund_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Đối tượng"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.type_object_txt }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Loại sổ"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.fund_type_currency }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thông tin"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span>{{ scope.row.customer_name }}</span>
              </div>
              <div class="line-item">
                <span>{{ scope.row.customer_phone }}</span>
              </div>
              <div class="line-item" v-if="scope.row.customer_code">
                <span
                  class="count-status-top-3388 v2"
                  style="background-color: #383F57"
                  >
                  {{ scope.row.customer_code }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Số tiền"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span :class="scope.row.type_pay == 1 ? 'color-green' : 'color-red'">
                {{ scope.row.type_pay == 1 ? '+' : '-'}}{{ scope.row.money | vnd }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Số dư"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span class="color-green">
                {{ scope.row.balance | vnd }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Nội dung"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span>{{ scope.row.note }}</span>
              </div>
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
              <div class="item-action" v-if="scope.row.fund_type_pay_code == 1">
                <el-tooltip class="item" effect="dark" content="Sửa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/edit3.svg" @click="addEdit(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action" v-if="scope.row.lock == 0">
                <el-tooltip class="item" effect="dark" content="Xóa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/delete.svg" @click="confirmDeleteModel(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Lịch sử" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/ic_round-history.svg" />
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
          top="50px"
          width="600px"
          :close-on-click-modal="false"
          :visible.sync="dialogAddFundTransaction"
          :show-close="false"
        >
          <div class="header-1988 header-1988-blue">
            <img src="@/static/icon/fund-transaction/list/dola-popup.svg" />
            <span v-if="showEdit">Cập nhật thanh toán</span>
            <span v-else>Thêm mới thanh toán</span>
          </div>
          <div class="body-1988">
            <div class="form-item">
              <span class="title">Đối tượng <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.type_object"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  :disabled="showEdit"
                >
                  <el-option
                    v-for="item in listCategory.arrTypeObjectInForm"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item" v-if="modelAdd.type_object == 2">
              <span class="title">Khách hàng <span class="important">*</span></span>
              <div class="form-input">
                <el-input
                  placeholder="Nhập mã khách hàng hoặc số điện thoại"
                  v-model="modelAdd.customer_search"
                  :prefix-icon="searchingCustomer ? 'el-icon-loading' : 'el-icon-search'"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                >
                </el-input>
              </div>
              <div v-if="searchingCustomer == false && modelAdd.customer_search">
                <div v-if="modelAdd.customer_has == 1">
                  <span>Khách hàng: <strong class="name-customer">{{ modelAdd.customer_code }} - {{ modelAdd.customer_name }} - {{ modelAdd.customer_phone }}</strong></span>
                </div>
                <div v-if="modelAdd.customer_has == 0">
                  <span class="no-customer">Khách hàng không tồn tại trên hệ thống</span>
                </div>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Loại thanh toán <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.type_pay"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  :disabled="showEdit"
                >
                  <el-option
                    v-for="item in listCategory.arrTypePay"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.fund_type_pay_id"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                  filterable
                  :disabled="showEdit"
                >
                  <el-option
                    v-for="item in listPay"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Chọn quỹ <span class="important">*</span></span>
              <div class="form-input">
                <el-select
                  v-model="modelAdd.fund_id"
                  placeholder="Chọn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                  filterable
                  :disabled="showEdit"
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
                  :disabled="showEdit"
                >
                  <template slot="append">{{ modelAdd.money | vnd }}</template>
                </el-input>
              </div>
            </div>
            <div class="form-item">
              <span class="title">Nội dung <span class="important">*</span></span>
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
  name: 'FundTransactionListVN',
  metaInfo() {
    return {
      title: "Lịch sử thu chi tiền Việt Nam",
    };
  },
  data () {
    return {
      loading: false,
      searching: false,
      filter: {
        customer_code: "",
        customer_name: "",
        customer_phone: "",
        type_object: "", // Chọn đối tượng
        type_pay: "", // Chọn thu chi
        fund_type_currency: "", // Chọn loại sổ
        fund_id: "", //Chọn ngân hàng
        date_from: null,
        date_to: null,
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

      listCategory: {},
      listBank: [],

      // Thêm mới thanh toán
      dialogAddFundTransaction: false,
      canSubmitAddFundTransaction: true,
      modelAdd: {
        type_object: "",
        type_pay: "",
        fund_type_pay_id: "",
        fund_id: "",
        customer_code: "",
        customer_phone: "",
        customer_name: "",
        customer_has: "", // Có customer trên hệ thống
        customer_search: "",
        money: "",
        note: "",
      },
      listPay: [],

      // Seach khách hàng tự động
      searchingCustomer: false,
      timer: {},

      // Edit giao dịch
      showEdit: false
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

    initDefault() {
      axios.post("fund_transaction/fake-save").then((response) => {
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
    fetchFundTransacton() {
      this.loading = true;
      let filter = {
        customer_code: this.filter.customer_code,
        customer_name: this.filter.customer_name,
        customer_phone: this.filter.customer_phone,
        type_object: this.filter.type_object,
        type_pay: this.filter.type_pay,
        fund_type_currency: this.filter.fund_type_currency,
        fund_id: this.filter.fund_id,

        page: this.filter.page,
        per_page: this.filter.per_page,
        id_sort: 'desc',
        status: 1,
        fund_unit_currency: 1
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

      axios.get("fund_transaction", { params: filter }).then((response) => {
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
      if (this.modelAdd.type_object == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại đối tượng thanh toán",
          type: "warning",
        });
        return;
      }
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
      if (this.modelAdd.type_pay == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại thanh toán",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fund_type_pay_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại thanh toán.",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fund_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập quỹ thanh toán",
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
      axios.post("fund_transaction", this.modelAdd).then((response) => {
        this.canSubmitAddFundTransaction = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
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
      let message = 'Xác nhận xóa ?';

      let type_object        = item.type_object; // Loại là khách hàng
      let type_pay           = item.type_pay; // Hình thức là thu tiền
      let fund_type_pay_code = item.fund_type_pay_code;

      // Nếu là chyển quỹ
      if (type_object == 1 && fund_type_pay_code == 3) {
        console.log('zô 1');
        if (type_pay == 1) {
          message = 'Phiếu chi của giao dịch này cũng sẽ bị xóa. Bạn có đồng ý xóa?'
        }
        if (type_pay == 2) {
          message = 'Phiếu thu của giao dịch này cũng sẽ bị xóa. Bạn có đồng ý xóa?'
        }
      }

      // Nếu là Nạp tiền Trung Quốc
      if (type_object == 3 && fund_type_pay_code == 4) {
        console.log('zô 2');
        if (type_pay == 1) {
          message = 'Phiếu chi của giao dịch này cũng sẽ bị xóa. Bạn có đồng ý xóa?'
        }
        if (type_pay == 2) {
          message = 'Phiếu thu của giao dịch này cũng sẽ bị xóa. Bạn có đồng ý xóa?'
        }
      }

      this.$confirm(message, "Cảnh báo", {
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

    "modelAdd.fund_type_pay_id": function () {
      // this.modelAdd.note = 'Nạp tiền';
      this.modelAdd.note = '';
      let _this = this;
      this.listCategory.arrTypePayValue1.forEach((item) => {
        if (item.value == _this.modelAdd.fund_type_pay_id) {
          if (item.code == 1) {
            this.modelAdd.note = 'Nạp tiền';
          }
        }
      })
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
</style>

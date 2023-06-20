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
              <div class="line-item img-text">
                <img src="@/static/icon/fund-transaction/list/uiw_enter.svg"/>
                <span>{{ scope.row.fund_type_pay }}</span>
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
                <span>{{ scope.row.type_object }}</span>
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
              <div class="line-item">
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
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Sửa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/edit3.svg" @click="addNew(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Xóa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/delete.svg" @click="addNew(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip class="item" effect="dark" content="Lịch sử" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/ic_round-history.svg" @click="addNew(scope.row)" />
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
</style>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

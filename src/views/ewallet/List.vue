<template>
  <div class="ewallet-list-2022" id="ST2022">
    <div
      class="customer-common customer-list frame-content-common-2022 ewalletList"
    >
      <div class="title d-flex align-items-center">
        <div class="d-flex justify-content-center align-items-center iconTop">
          <img src="@/static/icon/fines/icon.svg" alt="" />
        </div>
        <span class="pl-2">danh sách rút tiền</span>
      </div>
      <div class="d-flex flex-wrap input-search-wrap-1 align-items-center">
        <div class="item-filter">
          <el-select
            placeholder="Chọn trạng thái"
            class="frame-input-common-2022"
            popper-class="frame-select-popper-customer-2022"
            clearable
            size="mini"
            v-model="filter.status"
          >
            <el-option
              v-for="item in listStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-search item-search-date">
          <el-date-picker
            v-model="filter.date_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022"
            size="mini"
            clearable
            popper-class="frame-date-popper-common"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="item-search item-search-date">
          <el-date-picker
            v-model="filter.date_to"
            type="date"
            placeholder="Đến ngày"
            class="frame-date-common-2022"
            size="mini"
            clearable
            popper-class="frame-date-popper-commmon-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div
          class="d-flex justify-content-center align-items-center btnSearch"
          @click="fetchData()"
        >
          <span>Tìm kiếm</span>
        </div>
      </div>
      <div class="customer-common-table">
        <el-table
          style="width: 100%"
          border=""
          :data="listWithdrawal"
          v-loading="loading"
        >
          <el-table-column
            label="STT"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column label="Ngày yêu cầu" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Thông tin khách hàng" width="250">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span>Họ và tên: {{ scope.row.customer.name }}</span>
                <span
                  >Số điện thoại: {{ scope.row.customer.phone_number }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thông tin giao dịch" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.info }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Tổng rút" width="150" align="center">
            <template slot-scope="scope">
              <span class="colorRed">{{ scope.row.amount | vnd }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="200" align="center">
            <template slot-scope="scope">
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                disabled
                v-if="scope.row.status.value == 'status_done'"
              >
                <el-option
                  v-for="item in listStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!--  -->
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                disabled
                v-else-if="scope.row.status.value == 'status_cancel'"
              >
                <el-option
                  v-for="item in listStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!--  -->
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                v-else
              >
                <el-option
                  v-for="item in listStatus"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" align="center" width="100">
            <template slot-scope="scope">
              <div
                class="customer-list-action d-flex flex-column align-items-center"
              >
                <el-tooltip placement="top" content="Xem chi tiết">
                  <img
                    @click="showDetail(scope.row)"
                    src="@/static/icon/action/detail.svg"
                    alt=""
                  />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <!--  -->
          <!--  -->
        </el-table>
        <div class="china-panigation-1988 d-flex justify-content-end pt-1">
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
        <!-- Xem chi tiết  -->
        <el-dialog
          width="40%"
          custom-class="list-fines-dialog-456"
          :visible.sync="dialogWithdrawalVisible"
        >
          <div class="headTitle d-flex align-items-center">
            <img src="@/static/icon/fines/icondetail.svg" alt="" />
            <span>Chi tiết yêu cầu rút tiền </span>
          </div>
          <div class="content-dialog-fines">
            <div
              class="box-dialog d-flex align-items-center"
              v-if="DetailWithdrawal.customer"
            >
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Họ và tên:
                <span class="colorTitle">{{
                  DetailWithdrawal.customer.name
                }}</span></span
              >
            </div>
            <div
              class="box-dialog d-flex align-items-center"
              v-if="DetailWithdrawal.customer"
            >
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Số điện thoại:
                <span class="colorTitle">{{
                  DetailWithdrawal.customer.phone_number
                }}</span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Ngân hàng:
                <span class="colorTitle">{{
                  DetailWithdrawal.bank
                }}</span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Số tài khoản:
                <span class="colorTitle">{{
                  DetailWithdrawal.account_number
                }}</span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Chủ tài khoản:
                <span class="colorTitle">{{
                  DetailWithdrawal.account_holder
                }}</span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Thời gian yêu cầu:
                <span class="colorTitle">{{
                  DetailWithdrawal.time
                }}</span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Số tiền rút:
                <span class="colorRed">{{
                  DetailWithdrawal.amount | vnd
                }}</span></span
              >
            </div>
            <div class="close-doalog-fines d-flex justify-content-end mt-2">
              <span
                @click="closeDetail()"
                class="d-flex justify-content-center align-items-center"
                >Đóng</span
              >
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
  name: "EwalletList",
  metaInfo() {
    return {
      title: "Quản lý rút tiền",
    };
  },
  components: {},
  data() {
    return {
      dialogWithdrawalVisible: false,
      loading: true,
      filter: {
        date_from: null,
        date_to: null,
        status: "",
        page: 1,
        per_page: 10,
      },
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },
      // list
      listWithdrawal: [],
      listStatus: [],
      DetailWithdrawal: {},
    };
  },
  mounted() {
    this.fetchData();
    this.fetchCommon();
  },
  methods: {
    // lấy dữ liệu
    fetchData() {
      this.loading = true;
      let filter = {
        status: this.filter.status,
        page: this.filter.page,
        per_pages: this.filter.per_page,
      };
      filter.created_at = null;

      if (this.filter.date_from !== null) {
        filter.created_at = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.created_at = "2022-01-01," + this.filter.date_to;
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
      axios
        .get("transaction/withdrawal", { params: filter })
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.listWithdrawal = response.data.items;
              this.pagination.total = response.data.pagination.total;
              this.pagination.per_page = response.data.pagination.per_pages;
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
      console.log("123", item);
      this.deleteModel(item);
    },
    deleteModel(item) {
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
              this.fetchData();
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
    // thông tin chi tiết
    showDetail(row) {
      this.dialogWithdrawalVisible = true;
      axios.get("transaction/withdrawal/" + row.id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.DetailWithdrawal = response.data;
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
    closeDetail() {
      this.dialogWithdrawalVisible = false;
    },
    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchData();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
  },
  watch: {
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchData();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchData();
    },
  },
};
</script>

<style lang="css" scoped>
.ewalletList {
  padding: 23px 20px 20px 20px;
}
.ewalletList .title {
  padding-left: 10px;
}
.ewalletList .title span {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #0688ee;
}
/* phần search  */
.input-search-wrap-1 {
  padding: 20px 10px 15px 10px;
}
.item-filter {
  margin-right: 5px;
}
/*  */
.colorRed {
  color: red;
}
/* Trạng thái  */
.fine-detail-icon-status-6868amg {
  background-color: #ccc;
  border-radius: 4px;
  padding: 3px 10px;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  user-select: none;
}
.fine-detail-icon-status-6868amg.poiter {
  cursor: pointer;
}
.customer-list-action img {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
<style type="text/css">
.customer-common-table .el-table th.el-table__cell {
  background: #207cdc;
  text-align: center;
}
.customer-common-table .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
/* Phần search */
.frame-input-common-2022 .el-icon-arrow-up::before {
  content: "\e78f";
  color: #000728;
}
.frame-input-common-2022 .el-icon-arrow-down::before {
  content: "\e790";
  color: #000728;
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
/* Xem chi tiết  */
.list-fines-dialog-456 {
  border-radius: 10px;
}
.list-fines-dialog-456 .el-dialog__header {
  display: none;
}
.list-fines-dialog-456 .el-dialog__body {
  padding: 0;
}
.headTitle {
  background: #0688ee;
  padding: 11px 0 10px 23px;
  border-radius: 10px 10px 0 0;
}
.headTitle span {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  padding-left: 10px;
}
.content-dialog-fines {
  padding: 13px 24px 25px 22px;
}
.content-dialog-fines {
  padding: 13px 24px 25px 22px;
}
.box-dialog {
  padding: 13px 0 16px 0;
}
.content-dialog-fines .title_1 {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.content-dialog-fines img {
  padding-right: 10px;
}
.content-dialog-fines .colorTitle {
  color: #0688ee;
}
.close-doalog-fines span {
  background: #26b01c;
  border-radius: 5px;
  width: 101px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.btnSearch {
  background: #0688ee;
  border-radius: 5px;
  width: 116px;
  height: 28px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>

<template>
  <div class="complain-list" id="ST2022">
    <div class="order-list-statistic" v-if="listCommon.report">
      <div
        class="order-list-statistic-item"
        v-for="item in listCommon.report.all"
        :key="item.value"
        @click="changeStatus(item)"
      >
        <span
          class="title"
          :style="{ color: item.value === filter.status ? item.color : '' }"
          >{{ item.name }}</span
        >
        <span
          class="count-status-top-3388"
          :style="{ backgroundColor: item.color }"
          >{{ item.quantity }}</span
        >
      </div>
    </div>
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thông tin khiếu nại</span>
      </div>
      <!--  -->
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.order_code"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Họ và tên"
            v-model="filter.customer_name"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.customer_phone"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <!-- <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.status"
            placeholder="Chọn trạng thái"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.statuses"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.complain_type_id"
            placeholder="Lựa chọn khiếu nại"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.complain_type"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.solution_id"
            placeholder="Chọn phương án"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.solution"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <!--  -->
      </div>
      <div class="d-flex flex-wrap mt-2">
        <div class="frame-item-filter-2022 filter-level" v-if="listCommon.staffs">
          <el-select
            v-model="filter.staff_care_id"
            placeholder="Chọn nhân viên chăm sóc"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.staffs.care"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level" v-if="listCommon.staffs">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Chọn nhân viên đặt hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.staffs.order"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level" v-if="listCommon.staffs">
          <el-select
            v-model="filter.staff_complain_id"
            placeholder="Chọn nhân viên khiếu nại"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCommon.staffs.complain"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022">
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
      </div>
      <div class="btnSearchComplain my-3" @click="fetchComplain">
        <span class="frame-btn-seach-2022">Tìm kiếm</span>
      </div>
      <!-- Table -->
      <div class="table-element-custom-2022 order-list-table">
        <el-table style="width: 1005" stripe border :data="listComplain">
          <el-table-column type="index" width="50" label="STT" align="center">
          </el-table-column>
          <el-table-column width="150" label="Mã đơn hàng" align="center">
            <template slot-scope="scope">
              <span class="colorBlue">{{ scope.row.order.code }}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" label="Ảnh">
            <template slot-scope="scope">
              <div class="img-table">
                <img :src="scope.row.image" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column width="170" label="Khách hàng" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.customer.name }}</span>
              <div class="d-flex align-items-center justify-content-center">
                <img
                  v-if="scope.row.customer.phone_number !== null"
                  src="@/static/icon/complain/list/phone.svg"
                  alt=""
                />
                <span class="pl-1">{{ scope.row.customer.phone_number }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="160" label="Loại khiếu nại" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" label="Ngày khiếu nại" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column width="140" label="Phương án" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.solution }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            label="Trạng thái khiếu nại"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-select
                  :style="{ backgroundColor: scope.row.status.color }"
                  v-model="scope.row.status.value"
                  placeholder="chọn trạng thái"
                  class="frame-input-common-2022 status-withdrawal-2022"
                  popper-class="frame-select-popper-customer-2022"
                  @change="updateStatus(scope.row)"
                >
                  <el-option
                    v-for="item in listCommon.statuses"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Nhân viên" header-align="center">
            <el-table-column label="Đặt hàng">
              <template slot-scope="scope" v-if="scope.row.staffs.order.info">
                <span>{{ scope.row.staffs.order.info.name }}</span>
                <div class="d-flex flex-column mt-2">
                  <div class="d-flex align-items-center">
                    <span class="quantityFBRed">{{
                      scope.row.staffs.order.feedback.quantity == null
                        ? 0
                        : scope.row.staffs.order.feedback.quantity
                    }}</span>
                    <span>Phản hồi</span>
                  </div>
                  <div class="d-flex align-items-center mt-2">
                    <span class="quantityFBBlue">{{
                      scope.row.staffs.order.feedback.seen == null
                        ? 0
                        : scope.row.staffs.order.feedback.seen
                    }}</span>
                    <span>Chưa xem</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Chăm sóc">
              <template slot-scope="scope" v-if="scope.row.staffs.care.info">
                <span>{{ scope.row.staffs.care.info.name }}</span>
                <div class="d-flex flex-column mt-2">
                  <div class="d-flex align-items-center">
                    <span class="quantityFBRed">{{
                      scope.row.staffs.care.feedback.quantity == null
                        ? 0
                        : scope.row.staffs.care.feedback.quantity
                    }}</span>
                    <span>Phản hồi</span>
                  </div>
                  <div class="d-flex align-items-center mt-2">
                    <span class="quantityFBBlue">{{
                      scope.row.staffs.care.feedback.seen == null
                        ? 0
                        : scope.row.staffs.care.feedback.seen
                    }}</span>
                    <span>Chưa xem</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Khiếu nại" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.staffs.complain.name }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="Thao tác" align="center" width="70" fixed="right">
            <template slot-scope="scope">
              <div class="action" @click="showDetail(scope.row)">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xem chi tiết"
                  placement="top"
                >
                  <img src="@/static/icon/complain/list/detail.svg" />
                </el-tooltip>
              </div>
              <!-- <div class="action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xóa"
                  placement="top"
                >
                  <img src="@/static/icon/complain/list/delete.svg" />
                </el-tooltip>
              </div> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComplainList",
  metaInfo() {
    return {
      title: "Khiếu nại",
    };
  },
  components: {},
  data() {
    return {
      loading: true,
      input: "",
      filter: {
        date_from: null,
        date_to: null,
        order_code: "", //mã đơn hàng
        customer_name: "", //họ và tên
        customer_phone: "", //Số điện thoại
        complain_type_id: "", //loại khiếu nại
        status: "", // trạng thái khiếu nại
        solution_id: "", //phương án giải quyết
        staff_complain_id: "", // nhân viên khiếu nại
        staff_order_id: "", // nv đặt hàng
        staff_care_id: "", //nv chăm sóc
        //
        page: 1,
        per_page: 15,
      },
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },
      // list
      listComplain: [],
      listCommon: [],
    };
  },
  mounted() {
    this.fetchComplain();
    this.fetchCommon();
  },
  methods: {
    // lấy dữ liệu
    fetchComplain() {
      let filter = {
        order_code: this.filter.order_code,
        customer_name: this.filter.customer_name,
        customer_phone: this.filter.customer_phone,
        staff_complain_id: this.filter.staff_complain_id,
        staff_order_id: this.filter.staff_order_id,
        staff_care_id: this.filter.staff_care_id,
        complain_type_id: this.filter.complain_type_id,
        solution_id: this.filter.solution_id,
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
      axios.get("complain", { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.listComplain = response.data.items;
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
    fetchCommon() {
      axios.get("common/complain").then((response) => {
        switch (response.code) {
          case 200:
            this.listCommon = response.data;
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
    // update Status
    updateStatus(item) {
      if(item.status.value == 'status_4') {
        this.$confirm("Xác nhận hủy khiếu nại", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(item);
        })
        .catch(() => {});
      } else {
        this.deleteModel(item);
      }
    },
    deleteModel(item) {
      let data = {
        status: item.status.value,
      };
      axios.patch("complain/" + item.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchComplain();
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
    // Click vào thanh status phí trên
    changeStatus(item) {
      this.filter.status = item.value;
      this.filter.page = 1;
      this.fetchCommon();
    },
    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchComplain();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
    // chuyển hướng
    showDetail(row) {
      this.$router.push({
        name: "complain-detail",
        params: { complain_id: row.id },
      });
    },
  },
  watch: {
    "filter.status": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchComplain();
    },
  },
};
</script>

<style lang="css" scoped>
/* lọc  */
.frame-item-filter-2022.filter-phone {
  width: 115px;
}
/* table */
.complain-list .img-table img {
  width: 100%;
}
.complain-list .action {
  cursor: pointer;
}
</style>
<style>
/* table  */
.complain-list .table-element-custom-2022 .el-table th.el-table__cell {
  background: #207cdc;
  text-align: center;
}
.complain-list .money {
  color: #ed1c24;
  text-align: center !important;
}
.complain-list .table-element-custom-2022 .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
/* phản hồi */
.complain-list .quantityFBRed {
  width: 22px;
  height: 22px;
  background: #d60b4a;
  margin-right: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.complain-list .quantityFBBlue {
  width: 22px;
  height: 22px;
  background: #075970;
  margin-right: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.complain-list .count-status-top-3388.v2 {
  font-size: 10px;
  padding: 3px 18px;
}
.complain-list .colorBlue {
  color: #207cdc;
}
.complain-list .status-withdrawal-2022 input {
  font-size: 12px;
  background: none;
  color: #fff;
  border: none !important;
}
.complain-list .status-withdrawal-2022 .el-input--suffix .el-input__inner {
  height: 30px;
}
.complain-list .status-withdrawal-2022 .el-input__icon {
  line-height: 30px !important;
}
.complain-list .status-withdrawal-2022 .el-icon-arrow-up::before {
  color: #fff !important;
}
.complain-list .status-withdrawal-2022 .el-icon-arrow-down::before {
  color: #fff !important;
}
</style>

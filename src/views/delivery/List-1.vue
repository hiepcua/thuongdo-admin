<template>
  <div class="delivery-list" id="ST2022">
    <div class="order-list-statistic" v-if="listCategory.report">
      <div
        class="order-list-statistic-item"
        v-for="item in listCategory.report.all"
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
      <div class="frame-content-title-2023">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thông tin giao hàng</span>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2023">
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Họ và tên"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Mã vận đơn"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Mã bưu điện"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Số điện thoại ship"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-shipping-method">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Phương thức vận chuyển"
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
        <div class="frame-item-filter-2023 filter-shipping-method">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Hình thức thanh toán"
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
          <el-date-picker
            v-model="filter.date_create_from"
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
            v-model="filter.date_create_to"
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
      <div class="frame-content-title-2023">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Tìm kiếm nâng cao</span>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2023">
        <div class="frame-item-filter-2023 filter-car">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Chọn nhà xe"
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
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Trạng thái"
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
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Tất cả"
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
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Trạng thái thanh toán"
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
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Chọn kho"
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
      </div>
      <div class="btn-seach-wrap pt-1">
        <span class="frame-btn-seach-2022" @click="fetchOrder()">Tìm kiếm</span>
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thống kê</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-wrap">
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Hôm nay</span>
            <span class="count">{{ listCategory.report.time.today }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tuần nay</span>
            <span class="count">{{ listCategory.report.time.week }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tháng nay</span>
            <span class="count">{{ listCategory.report.time.month }}</span>
          </div>
        </div>
      </div>

      <div class="table-element-custom-2022-v3 delivery-list-table mt-3">
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
            label="Ngảy tạo"
            width="150"
            align="center"
            header-align="center"
            min-width="150"
          >
            <div>
              <span>19/19/2022 18:05</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Khách hàng"
            align="left"
            header-align="center"
            min-width="200"
          >
            <div class="line-item">
              <span class="customer-name">Đoàn Xuân Kiên</span>
            </div>
            <div class="line-item">
              <span
                class="count-status-top-3388 v2"
                style="background-color: #207cdc"
                >HN-BG</span
              >
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/call.svg" />
              <span>0977222111</span>
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/money.svg" />
              <span>Số dư: 15.000.000 đ</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Tình trạng"
            align="left"
            header-align="center"
            min-width="150"
          >
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/checked.svg" />
              <span>Đã nhận hàng</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Thông tin giao hàng"
            align="left"
            header-align="center"
            min-width="300"
          >
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/car.svg" />
              <span>Hình thức: Viettel</span>
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/bill.svg" />
              <span>Thanh toán: Ví điện tử</span>
            </div>
            <div class="line-item d-flex align-items-start">
              <img class="address" src="@/static/icon/delivery/list/user.svg" />
              <span
                >0996586998 - Bé Kiên - Hà Nội, 298 Trần Điền, Định Công, Thanh
                Xuân, Hà Nội</span
              >
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span class="count-pack">1</span>
              <img src="@/static/icon/delivery/list/eye.svg" />
              <span class="show-pack" @click="showPack(1)">Xem kiện</span>
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/time.svg" />
              <span>Thời gian giao hàng: 26 - 12 - 2022</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Thanh toán"
            align="left"
            header-align="center"
            min-width="250"
          >
            <div class="line-item">
              <el-input
                placeholder="Số tiền"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="line-item">
              <el-select
                v-model="input2"
                placeholder="Lựa chọn trạng thái"
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
          </el-table-column>
          <el-table-column
            label="Ghi chú của khách hàng"
            align="left"
            header-align="center"
            min-width="250"
          >
            <div class="customer-note">
              <span>Đơn hàng về chậm, chưa phát hàng</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Nhân viên ghi chú"
            align="left"
            header-align="center"
            min-width="250"
          >
            <div class="customer-note">
              <span>Đơn hàng về chậm, chưa phát hàng</span>
            </div>
            <div class="line-item line-item-note d-flex">
              <img src="@/static/icon/delivery/list/note.svg" />
              <span class="show-pack">3 ghi chú</span>
            </div>
          </el-table-column>
          <el-table-column
            label="Mã bưu kiện / SĐT"
            align="left"
            header-align="center"
            min-width="250"
          >
            <div class="line-item">
              <el-input
                placeholder="Mã bưu kiện"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="line-item">
              <el-input
                placeholder="SĐT ship"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
          </el-table-column>
          <el-table-column
            label="Thao tác"
            align="center"
            header-align="center"
            min-width="80"
            fixed="right"
          >
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Sửa"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/edit.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="In"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/print.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Xóa"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/delete.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="In 2"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/subway_print.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Thêm kiện hàng vào đơn giao hàng"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/ion_add.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Truck"
                placement="top"
              >
                <img
                  src="@/static/icon/delivery/list/truck.svg"
                  @click="clickABC()"
                />
              </el-tooltip>
            </div>
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

      <div class="frame-dialog-no-close-1988 delivery-list-show-pack">
        <el-dialog
          top="50px"
          width="900px"
          :close-on-click-modal="false"
          :visible.sync="dialogShowPackVisible"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/delivery/list/box-2.svg" />
            <span>Kiện giao hàng</span>
          </div>
          <div class="body-1988" v-loading="dialogShowPackLoading">
            <div class="title-2022">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span>Kiện hàng</span>
            </div>
            <div class="table-element-custom-2022-v-history pb-4">
              <el-table :data="tableDataDetail" style="width: 100%" border>
                <el-table-column prop="date" label="Date" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Name" width="180">
                </el-table-column>
                <el-table-column prop="address" label="Address">
                </el-table-column>
              </el-table>
            </div>
            <div class="title-2022">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span>Lịch sử thay đổi trạng thái</span>
            </div>
            <div class="table-element-custom-2022-v-history pb-4">
              <el-table :data="tableDataDetail" style="width: 100%" border>
                <el-table-column prop="date" label="Date" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Name" width="180">
                </el-table-column>
                <el-table-column prop="address" label="Address">
                </el-table-column>
              </el-table>
            </div>
            <div class="title-2022">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span>Lịch sử thay đổi kiện hàng</span>
            </div>
            <div class="table-element-custom-2022-v-history pb-4">
              <el-table :data="tableDataDetail" style="width: 100%" border>
                <el-table-column prop="date" label="Date" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Name" width="180">
                </el-table-column>
                <el-table-column prop="address" label="Address">
                </el-table-column>
              </el-table>
            </div>
            <div class="d-flex justify-content-end align-items-center">
              <span
                class="btn-common frame-hover-2022 btn-cancel"
                @click="dialogShowPackVisible = false"
                >Hủy bỏ</span
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
  name: "DeliveryList",
  metaInfo() {
    return {
      title: "Quản lý giao hàng",
    };
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        // Lọc theo status:
        status: "",

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
        staffs: {},
        report: {
          time: {},
        },
      },

      // Demo
      input: "",
      input2: "",

      // Show Chi tiết kiện
      dialogShowPackVisible: false,
      dialogShowPackLoading: false,
      tableDataDetail: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  mounted() {
    this.fetchCategory();
    this.fetchDelivery();
    this.scrollTopST();
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
    fetchDelivery() {
      let filter = {};
      axios.get("order", { params: filter }).then((response) => {
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
      this.fetchDelivery();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    // Click vào thanh status phía trên
    changeStatus(item) {
      this.filter.status = item.value;
      this.filter.page = 1;
    },

    // Click ABC
    clickABC() {
      console.log("2321321");
    },

    // Xem kiện
    showPack(item) {
      console.log(item);
      this.dialogShowPackLoading = true;
      this.dialogShowPackVisible = true;

      setTimeout(() => {
        this.dialogShowPackLoading = false;
      }, 800);
    },
  },
};
</script>

<style lang="css" scoped>
/*Đè chiều dài các ô lọc*/
.frame-item-filter-2023.filter-name {
  width: 120px;
}
.frame-item-filter-2023.filter-shipping-method {
  width: 180px;
}
.frame-item-filter-2023.filter-car {
  width: 330px;
}
/*Khung cho nút tìm kiếm*/
.btn-seach-wrap {
  margin-bottom: 25px;
}

/*Table*/
.delivery-list-table .line-item {
  margin-bottom: 3px;
  margin-top: 3px;
}
.delivery-list-table .line-item-note {
  padding-left: 3px;
}
.delivery-list-table .line-item img {
  margin-right: 5px;
}
.delivery-list-table .line-item img.address {
  margin-top: 2px;
}

.delivery-list-table .customer-name {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.delivery-list-table .count-pack {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #075970;
  border: 1px solid #075970;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: 8px;
  margin-left: 3px;
  font-size: 12px;
}
.delivery-list-table .show-pack {
  cursor: pointer;
  color: #0688ee;
}
.delivery-list-table .customer-note {
  background: #ecf5ff;
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
}
.delivery-list-table .customer-note span {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #075970;
}
.delivery-list-table .item-action {
  margin-bottom: 5px;
  cursor: pointer;
}

/*Đè Dialog form*/
.delivery-list-show-pack .header-1988 {
  background-color: #0688ee;
}
.delivery-list-show-pack .title-2022 {
  margin-bottom: 15px;
  display: inline-flex;
  align-items: center;
}
.delivery-list-show-pack .title-2022 span {
  margin-left: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
</style>

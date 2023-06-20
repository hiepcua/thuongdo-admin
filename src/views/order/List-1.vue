<template>
  <div class="order-list" id="ST2022">
    <div class="order-list-statistic" v-if="listCategory.report">
      <div
        class="order-list-statistic-item"
        v-for="item in listCategory.report.all"
        :key="item.value"
      >
        <span class="title" :style="{ color: item.color }">{{
          item.name
        }}</span>
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
        <span>Đơn hàng</span>
      </div>
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2022 filter-name">
          <el-input
            placeholder="Email"
            v-model="filter.name"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.level"
            placeholder="Lựa chọn cấp độ"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Số diện thoại"
            v-model="filter.phone"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.code_order"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đặt hàng"
            v-model="filter.code_order2"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_order"
            placeholder="Chọn nhân viên đặt hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_quote"
            placeholder="Chọn nhân viên báo giá"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_care"
            placeholder="Chọn nhân viên chăm sóc"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.via"
            placeholder="Đặt qua"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2022">
        <div class="frame-item-filter-2022 filter-warehouse">
          <el-select
            v-model="filter.level"
            placeholder="Kho nhận hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.level"
            placeholder="Chọn hình thức"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.level"
            placeholder="Loại đơn"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.level"
            placeholder="Chọn kênh"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.level"
            placeholder="Chọn loại hình kinh doanh"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.level"
            placeholder="Chọn website"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Tìm kiếm nâng cao</span>
      </div>
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2022">
          <span class="title">Ngày tạo</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
        </div>

        <div class="frame-item-filter-2022">
          <span class="title">Ngày báo giá</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
        </div>

        <div class="frame-item-filter-2022">
          <span class="title">Ngày đặt hàng</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="d-flex flex-wrap" style="margin-top: 10px">
        <div class="frame-item-filter-2022">
          <span class="title">Ngày hoàn thành</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
        </div>

        <div class="frame-item-filter-2022">
          <span class="title">Ngày đặt cọc</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_create_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2022">
        <div class="frame-item-filter-2022">
          <span class="title">Sắp xếp theo</span>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.order_by"
            placeholder="Thời gian"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.order_by_value"
            placeholder="Giá trị"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn-seach-wrap">
        <span class="frame-btn-seach-2022">Tìm kiếm</span>
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thống kê</span>
      </div>
      <div
        class="d-flex justify-content-between align-items-center"
        v-if="listCategory.report"
      >
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
        <div class="order-list-total-money">
          <span class="title">Tổng tiền đặt hàng</span>
          <span class="number">{{ listCategory.report.amount | vnd }}</span>
          <sup class="sup">đ/Y</sup>
          <span class="number">{{ listCategory.report.amount_cny }}</span>
        </div>
      </div>

      <div
        class="table-element-custom-2022 order-list-table"
        v-loading="loading"
      >
        <el-table :data="tableData" style="width: 100%" stripe border>
          <el-table-column label="Đơn hàng" header-align="center">
            <el-table-column
              label="Mã đơn hàng"
              header-align="center"
              min-width="150"
            >
              <div class="item-line d-flex align-items-center">
                <span class="item-code">91823131321</span>
                <img src="@/static/icon/order/list/copy.svg" />
              </div>
              <div class="item-line d-flex align-items-center">
                <img src="@/static/icon/order/list/date-gray.svg" />
                <span class="item-date">09/11/2022 11:40</span>
              </div>
              <div class="item-line d-flex align-items-center">
                <img src="@/static/icon/order/list/date-gray.svg" />
                <span class="item-date">09/11/2022 11:40</span>
              </div>
              <div class="item-line d-flex align-items-center">
                <img src="@/static/icon/order/list/note.svg" />
                <span class="item-note">3 ghi chú</span>
              </div>
              <div class="item-line d-flex align-items-center">
                <img src="@/static/icon/order/list/fee.svg" />
                <span class="item-note">Phí dịch vụ: 3%</span>
              </div>
            </el-table-column>
            <el-table-column label="Tổng tiền" header-align="center">
              <div>
                <span class="item-number">9.000.000đ</span>
              </div>
            </el-table-column>
            <el-table-column label="Tạm ứng" header-align="center">
              <div>
                <span class="item-number">9.000.000đ</span>
              </div>
            </el-table-column>
            <el-table-column label="Thanh toán" header-align="center">
              <div>
                <span class="item-number">9.000.000đ</span>
              </div>
            </el-table-column>
            <el-table-column label="Tỉ giá" header-align="center">
              <div>
                <span class="item-number">9.000.000đ</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Tình trạng"
              header-align="center"
              min-width="100"
            >
              <div>
                <span class="count-status-top-3388 v2">Đã đặt hàng</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="Khách hàng"
            header-align="center"
            min-width="120"
          >
            <div class="item-line">
              <span class="item-name">Phạm Đức Trung</span>
            </div>
            <div class="item-line d-flex align-items-center">
              <img src="@/static/icon/order/list/phone.svg" />
              <span class="item-phone">0988828282</span>
            </div>
            <div class="item-line d-flex align-items-center">
              <div>
                <span class="count-status-top-3388 v3">Hà Nội</span>
              </div>
              <div>
                <span class="count-status-top-3388 v3">KH mới</span>
              </div>
            </div>
            <div class="item-line">
              <span class="item-add-note">Thêm ghi chú</span>
            </div>
          </el-table-column>
          <el-table-column label="Nhân viên" header-align="center">
            <el-table-column label="Báo giá" header-align="center">
              <div>
                <span class="item-staff">Vũ Thị Phan</span>
              </div>
            </el-table-column>
            <el-table-column label="Đặt hàng" header-align="center">
              <div>
                <span class="item-staff">Vũ Thị Phan</span>
              </div>
            </el-table-column>
            <el-table-column label="Chăm sóc" header-align="center">
              <div>
                <span class="item-staff">Vũ Thị Phan</span>
              </div>
            </el-table-column>
          </el-table-column>
          <el-table-column label="Tác vụ" header-align="center" align="center">
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Sửa báo giá/sửa đơn"
                placement="top"
              >
                <img src="@/static/icon/order/list/edit.svg" />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Kiện hàng"
                placement="top"
              >
                <img src="@/static/icon/order/list/box.svg" />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Thanh toán"
                placement="top"
              >
                <img src="@/static/icon/order/list/payment.svg" />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Thêm nộp phạt"
                placement="top"
              >
                <img src="@/static/icon/order/list/dola.svg" />
              </el-tooltip>
            </div>
            <div class="item-action">
              <el-tooltip
                class="item"
                effect="dark"
                content="Hủy"
                placement="top"
              >
                <img src="@/static/icon/order/list/delete.svg" />
              </el-tooltip>
            </div>
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
  name: "OrderList",
  metaInfo() {
    return {
      title: "Quản lý đơn hàng",
    };
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        name: "",
        level: "",
        phone: "",
        code_order: "",
        code_order2: "",
        staff_order: "",
        staff_quote: "",
        staff_care: "",
        via: "", // Đặt qua,
        warehouse_id: "",
        form: "", // Hình thức,
        type: "", // Loại đơn,
        channel: "", // Kênh

        business_type: "", // Loại hình kinh doanh
        website: "",

        // Tìm kiếm nâng cao:
        date_create_from: "",
        date_create_to: "",

        date_quote_from: "",
        date_quote_to: "",

        date_order_from: "",
        date_order_to: "",

        date_complete_from: "",
        date_complete_to: "",

        date_deposit_from: "",
        date_deposit_to: "",

        order_by: "",
        order_by_value: "",

        page: 1,
        per_page: 1,
      },

      options: [
        {
          value: "Cấp độ 1",
          label: "Cấp độ 1",
        },
        {
          value: "Cấp độ 2",
          label: "Cấp độ 2",
        },
      ],

      // Phần hiển thị
      tableData: [{}],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      listCategory: {},
    };
  },
  mounted() {
    this.fetchCategory();
    this.fetchOrder();
  },
  methods: {
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
    fetchOrder() {
      this.loading = true;
      let filter = {
        page: this.filter.page,
        per_page: this.filter.per_page,
      };

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
      this.fetchOrder();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="css" scoped>
.order-list-statistic {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-left: 50px;
  padding-right: 40px;
  background-color: #f6f8ff;
  border-bottom: 1px solid #bdd6ee;
}
.order-list-statistic-item {
  margin-right: 20px;
  cursor: pointer;
}
.order-list-statistic-item .title {
  margin-right: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
}

/*Đè chiều dài các ô lọc*/
.frame-item-filter-2022.filter-name {
  width: 150px;
}
.frame-item-filter-2022.filter-level {
  width: 140px;
}
.frame-item-filter-2022.filter-phone {
  width: 115px;
}
.frame-item-filter-2022.filter-staff {
  width: 180px;
}
.frame-item-filter-2022.filter-via {
  width: 120px;
}
.frame-item-filter-2022.filter-warehouse {
  width: 350px;
}

/*Khung cho nút tìm kiếm*/
.btn-seach-wrap {
  margin-bottom: 25px;
}

/*Tổng tiền hàng*/
.order-list-total-money .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  letter-spacing: 0.01em;
  color: #207cdc;
}
.order-list-total-money .number {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #ed1c24;
  margin-right: 5px;
  margin-left: 5px;
}
.order-list-total-money .sup {
  font-weight: 700;
}

/*// Đè các ô trong table*/
.order-list-table .item-line {
  margin-bottom: 6px;
}
.order-list-table .item-code {
  font-size: 15px;
  margin-right: 5px;
}
.order-list-table .item-date {
  margin-left: 5px;
  font-size: 10px;
  color: #767676;
}
.order-list-table .item-note {
  font-size: 12px;
  margin-left: 5px;
  color: #0688ee;
}
.order-list-table .item-number {
  color: #000728;
}
.order-list-table .item-name {
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.order-list-table .item-phone {
  margin-left: 5px;
}
.order-list-table .item-add-note {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #0688ee;
  padding: 4px 20px;
  margin-top: 3px;
  display: inline-block;
  cursor: pointer;
}
.order-list-table .item-staff {
  color: #000728;
}
.item-action {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>

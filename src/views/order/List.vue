<template>
  <div class="order-list" id="ST2022">
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
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Đơn hàng</span>
      </div>

      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2022 filter-name">
          <el-input
            placeholder="Tên khách hàng"
            v-model="filter.customer_name"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.customer_level"
            placeholder="Lựa chọn cấp độ"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.level"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Số diện thoại"
            v-model="filter.customer_phone"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.code"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đặt hàng"
            v-model="filter.code_po"
            @keyup.enter.native="fetchOrder"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_order_id"
            placeholder="Chọn nhân viên đặt hàng"
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
        <div class="frame-item-filter-2022 v2 filter-staff">
          <el-select
            v-model="filter.staff_quotation_id"
            placeholder="Chọn nhân viên báo giá"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.staffs.quote"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 v2 filter-staff">
          <el-select
            v-model="filter.staff_care_id"
            placeholder="Chọn nhân viên chăm sóc"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.staffs.care"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 v2 filter-via">
          <el-select
            v-model="filter.is_website"
            placeholder="Đặt qua"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.is_website"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="d-flex flex-wrap frame-line-filter-2022">
        <div class="frame-item-filter-2022 filter-warehouse">
          <el-select
            v-model="filter.warehouse_id"
            placeholder="Kho nhận hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.warehouses"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.is_tax"
            placeholder="Chọn hình thức"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.is_tax"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.is_purchase"
            placeholder="Loại đơn"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.is_purchase"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.customer_via"
            placeholder="Chọn kênh"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.via"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.customer_business_type"
            placeholder="Chọn loại hình kinh doanh"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.business_type"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 v2 filter-via">
          <el-select
            v-model="filter.ecommerce"
            placeholder="Chọn website"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.ecommerce"
              :key="item.value"
              :label="item.name"
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

        <div class="frame-item-filter-2022">
          <span class="title">Ngày báo giá</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_quote_from"
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
            v-model="filter.date_quote_to"
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

        <div class="frame-item-filter-2022 show-display-bigger-1024">
          <span class="title">Ngày đặt hàng</span>
        </div>
        <div class="frame-item-filter-2022 show-display-bigger-1024">
          <el-date-picker
            v-model="filter.date_order_from"
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
            v-model="filter.date_order_to"
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

      <div class="d-flex flex-wrap" style="margin-top: 10px">
        <div class="frame-item-filter-2022 show-display-less-1024">
          <span class="title">Ngày đặt hàng</span>
        </div>
        <div class="frame-item-filter-2022 show-display-less-1024">
          <el-date-picker
            v-model="filter.date_order_from"
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
            v-model="filter.date_order_to"
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

      <div class="d-flex flex-wrap" style="margin-top: 10px">
        <div class="frame-item-filter-2022">
          <span class="title">Ngày hoàn thành</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_complete_from"
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
            v-model="filter.date_complete_to"
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

        <div class="frame-item-filter-2022">
          <span class="title">Ngày đặt cọc</span>
        </div>
        <div class="frame-item-filter-2022">
          <el-date-picker
            v-model="filter.date_deposit_from"
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
            v-model="filter.date_deposit_to"
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

      <div class="d-flex flex-wrap frame-line-filter-2022">
        <div class="frame-item-filter-2022">
          <span class="title">Sắp xếp theo</span>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.created_at_sort"
            placeholder="Thời gian"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in filter.created_at_sort_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-via">
          <el-select
            v-model="filter.order_cost_sort"
            placeholder="Giá trị"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in filter.order_cost_sort_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="btn-seach-wrap">
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
        <div class="order-list-total-money">
          <span class="title">Tổng tiền chờ đặt hàng</span>
          <span class="number">{{ listCategory.report.amount | vnd }}</span>
          <sup class="sup">đ/¥</sup>
          <span class="number">{{
            listCategory.report.amount_cny | number
          }}</span>
        </div>
      </div>

      <div class="table-element-custom-2022 order-list-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column label="Đơn hàng" header-align="center">
            <el-table-column
              label="Mã đơn hàng"
              header-align="center"
              width="200"
            >
              <template slot-scope="scope">
                <div
                  class="item-line d-flex align-items-center copy-code-customer"
                >
                  <span
                    class="item-code"
                    @click="nextRouteDetailOrder(scope.row)"
                    >{{ scope.row.info.code }}</span
                  >
                  <img
                    v-clipboard="scope.row.info.code"
                    @success="handleSuccess"
                    @error="handleError"
                    src="@/static/icon/order/list/copy.svg"
                  />
                </div>
                <div class="item-line d-flex align-items-center">
                  <img src="@/static/icon/order/list/date-gray.svg" />
                  <span class="item-date">{{ scope.row.info.created_at }}</span>
                </div>
                <div class="item-line d-flex align-items-center">
                  <img src="@/static/icon/order/list/date-gray.svg" />
                  <span
                    class="item-date"
                    :style="{ color: scope.row.info.status.color }"
                    >{{ scope.row.info.status_at }}</span
                  >
                </div>
                <div class="item-line d-flex align-items-center">
                  <img src="@/static/icon/order/list/note.svg" />
                  <span class="item-note"
                    >{{ scope.row.info.notes }} ghi chú</span
                  >
                </div>
                <div class="item-line d-flex align-items-center">
                  <img src="@/static/icon/order/list/fee.svg" />
                  <span class="item-note"
                    >Phí dịch vụ: {{ scope.row.info.order_percent }}%</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Tổng tiền"
              header-align="center"
              width="100"
            >
              =<template slot-scope="scope">
                <div>
                  <span class="item-number">{{
                    scope.row.info.total_amount | vnd
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Tạm ứng" header-align="center" width="100">
              <template slot-scope="scope">
                <div>
                  <span class="item-number">{{
                    scope.row.info.deposit_amount | vnd
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Thanh toán"
              header-align="center"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  <span class="item-number"
                    >{{ scope.row.info.purchase_amount ? "-" : ""
                    }}{{ scope.row.info.purchase_amount | vnd }}</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Tỉ giá" header-align="center">
              <template slot-scope="scope">
                <div>
                  <span class="item-number">{{
                    scope.row.info.exchange_rate
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Số kiện" header-align="center">
              <template slot-scope="scope">
                <div>
                  <span class="item-number">{{
                    scope.row.info.packages_number
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Tình trạng"
              header-align="center"
              align="center"
              width="150"
            >
              <!-- <template slot-scope="scope">
                <div>
                  <span
                    class="count-status-top-3388 v2"
                    :style="{ backgroundColor: scope.row.info.status.color }"
                    >{{ scope.row.info.status.name }}</span
                  >
                </div>
              </template> -->
              <template slot-scope="scope">
                <div class="line-item">
                  <el-select
                    :style="{ backgroundColor: scope.row.info.status.color }"
                    v-model="scope.row.info.status.value"
                    placeholder="chọn trạng thái"
                    class="frame-input-common-2022 status-withdrawal-2022"
                    popper-class="frame-select-popper-customer-2022"
                    @change="updateStatus(scope.row)"
                    :disabled="scope.row.info.status.value == 'status_4' || scope.row.info.status.value == 'status_6'"
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
          </el-table-column>
          <el-table-column label="Khách hàng" header-align="center" width="165">
            <template slot-scope="scope">
              <div class="item-line">
                <span class="item-name">{{ scope.row.customer.name }}</span>
              </div>
              <div class="item-line d-flex align-items-center">
                <img src="@/static/icon/order/list/phone.svg" />
                <span class="item-phone">{{
                  scope.row.customer.phone_number
                }}</span>
              </div>
              <div class="item-line d-flex align-items-center">
                <div>
                  <span
                    class="count-status-top-3388 v3"
                    style="background-color: #f09920"
                    >{{ scope.row.customer.warehouse }}</span
                  >
                </div>
                <div v-if="scope.row.customer.level">
                  <span
                    class="count-status-top-3388 v3"
                    style="background-color: #207cdc"
                    >{{ scope.row.customer.level }}</span
                  >
                </div>
              </div>
              <div class="item-line">
                <span
                  class="item-add-note frame-hover-2022"
                  @click="showNoteItem(scope.row)"
                  >Thêm ghi chú</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Nhân viên" header-align="center">
            <el-table-column label="Báo giá" header-align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.staff.quotation">
                  <span class="item-staff">{{
                    scope.row.staff.quotation.name
                  }}</span>
                </div>
                <div
                  class="item-add-staff d-flex flex-column align-items-center"
                  @click="showQuotationOrder(scope.row)"
                >
                  <img src="@/static/icon/action/add-blue.svg" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Đặt hàng" header-align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.staff.order">
                  <span class="item-staff">{{
                    scope.row.staff.order.name
                  }}</span>
                </div>
                <div
                  class="item-add-staff d-flex flex-column align-items-center"
                  @click="showStaffOrder(scope.row)"
                >
                  <img src="@/static/icon/action/add-blue.svg" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Chăm sóc" header-align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.staff.care">
                  <span class="item-staff">{{
                    scope.row.staff.care.name
                  }}</span>
                </div>
                <div
                  class="item-add-staff d-flex flex-column align-items-center"
                  @click="showStaffCare(scope.row)"
                >
                  <img src="@/static/icon/action/add-blue.svg" />
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="Tác vụ"
            header-align="center"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Báo giá/sửa đơn"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/list/edit.svg"
                    @click="nextRouteUpdateOrder(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Kiện hàng"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/list/box.svg"
                    @click="nextRouteAddPackOrder(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action d-none">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Thanh toán"
                  placement="top"
                >
                  <img src="@/static/icon/order/list/payment.svg" />
                </el-tooltip>
              </div>
              <div
                class="item-action"
                v-if="scope.row.info.status.name !== 'Đã hủy'"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Thêm nộp phạt"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/list/dola.svg"
                    @click="nextRouteFine(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action" v-if="scope.row.is_cancel">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Hủy"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/list/delete.svg"
                    @click="showDeleteItem(scope.row)"
                  />
                </el-tooltip>
              </div>
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

      <div class="frame-dialog-no-close-1988 form-delete">
        <el-dialog
          top="150px"
          width="500px"
          :close-on-click-modal="false"
          :visible.sync="dialogDeleteVisible"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/order/list/form-delete/delete.svg" />
            <span>Hủy đơn hàng</span>
          </div>
          <div class="body-1988">
            <div class="d-flex">
              <img
                src="@/static/icon/order/list/form-delete/done-purchase.svg"
                class="mr-1"
              />
              <span class="text-confirm-detlete mr-1"
                >Mã đơn hàng / Mã vận đơn:
              </span>
              <span class="code-confirm-detlete" v-if="itemDelete.info">{{
                itemDelete.info.code
              }}</span>
            </div>
            <span class="text-confirm-detlete pt-2 d-flex"
              >Lý do hủy <span class="color-red ml-1">*</span></span
            >
            <div class="pt-2 pb-3">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="Nhập lý do"
                v-model="dialogDeleteContent"
              >
              </el-input>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <el-checkbox v-model="dialogDeleteConfirm"></el-checkbox>
                <span class="yes-confirm-detlete"
                  >Đồng ý hủy đơn hàng này ?</span
                >
              </div>
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="cancelDeleteItem()"
                  >Hủy bỏ</span
                >
                <span
                  class="btn-common frame-hover-2022 btn-danger"
                  :class="!dialogDeleteCanSubmit ? 'disable' : ''"
                  @click="actionDeleteItem()"
                >
                  <span v-if="!dialogDeleteCanSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Xác nhận</span>
                </span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <div class="frame-dialog-no-close-1988 form-note">
        <el-dialog
          top="150px"
          width="750px"
          :close-on-click-modal="false"
          :visible.sync="dialogNoteVisible"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/order/list/form-note/edit.svg" />
            <span>Ghi chú khách hàng</span>
          </div>
          <div class="body-1988">
            <div class="pt-2 pb-3">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="Ghi chú thông tin về khách hàng"
                v-model="dialogNoteContent"
              >
              </el-input>
            </div>
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="cancelNoteItem()"
                  >Hủy bỏ</span
                >
                <span
                  class="btn-common frame-hover-2022 btn-success"
                  :class="!dialogNoteCanSubmit ? 'disable' : ''"
                  @click="actionNoteItem()"
                >
                  <span v-if="!dialogNoteCanSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Xác nhận</span>
                </span>
              </div>
            </div>
            <div class="table-element-custom-2022-v2 pt-3">
              <el-table
                :data="itemNoteArr"
                style="width: 100%"
                border
                v-loading="dialogNoteLoading"
                element-loading-spinner="el-icon-loading"
              >
                <el-table-column prop="created_at" label="Ngày" width="160">
                </el-table-column>
                <el-table-column label="Nhân viên" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="Nội dung">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
      </div>

      <!-- // Thêm người chăm sóc -->
      <div class="dialog-frame-normal-2022">
        <el-dialog :visible.sync="dialogUserCareVisible" width="400px" center>
          <span
            slot="title"
            class="d-flex flex-row justify-content-start align-items-start"
          >
            <img src="@/static/icon/customer-list/AddUser.svg" alt="" />
            <span class="px-2 d-flex justify-content-center">
              Nhân viên chăm sóc
            </span>
          </span>
          <div class="d-flex">
            <select-search
              :items="listCategory.staffs.care"
              @change="setSelectedUser"
              :value="selectedUser"
            ></select-search>
          </div>
          <template #footer>
            <div class="d-flex flex-row justify-content-end align-items-end">
              <div
                class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
                @click="dialogUserCareVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
                @click="updateStaffCareForCustomer()"
              >
                <span>Thêm nhân viên</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- Thêm người đặt hàng -->
      <div class="dialog-frame-normal-2022">
        <el-dialog :visible.sync="dialogUserOrderVisible" width="400px" center>
          <span
            slot="title"
            class="d-flex flex-row justify-content-start align-items-start"
          >
            <img src="@/static/icon/customer-list/AddUser.svg" alt="" />
            <span class="px-2 d-flex justify-content-center">
              Nhân viên đặt hàng
            </span>
          </span>
          <div class="d-flex">
            <select-search
              :items="listCategory.staffs.order"
              @change="setSelectedUser"
              :value="selectedUser"
            ></select-search>
          </div>
          <template #footer>
            <div class="d-flex flex-row justify-content-end align-items-end">
              <div
                class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
                @click="dialogUserOrderVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
                @click="updateStaffOrderForCustomer()"
              >
                <span>Thêm nhân viên</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>

      <!-- Thêm người báo giá -->
      <div class="dialog-frame-normal-2022">
        <el-dialog
          :visible.sync="dialogUserQuotationVisible"
          width="400px"
          center
        >
          <span
            slot="title"
            class="d-flex flex-row justify-content-start align-items-start"
          >
            <img src="@/static/icon/customer-list/AddUser.svg" alt="" />
            <span class="px-2 d-flex justify-content-center">
              Nhân viên đặt hàng
            </span>
          </span>
          <div class="d-flex">
            <select-search
              :items="listCategory.staffs.quote"
              @change="setSelectedUser"
              :value="selectedUser"
            ></select-search>
          </div>
          <template #footer>
            <div class="d-flex flex-row justify-content-end align-items-end">
              <div
                class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
                @click="dialogUserQuotationVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
                @click="updateStaffQuoteForCustomer()"
              >
                <span>Thêm nhân viên</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SelectSearch from "@/components/UI/Selection/SelectSearch";
export default {
  name: "OrderList",
  metaInfo() {
    return {
      title: "Quản lý đơn hàng",
    };
  },
  components: {
    SelectSearch,
  },
  data() {
    return {
      // Phần search
      loading: true,
      searching: false,
      filter: {
        customer_name: "",
        customer_level: "",
        customer_phone: "",

        code: "", // Mã đơn hàng
        code_po: "", // Mã đặt hàng,

        staff_order_id: "",
        staff_quotation_id: "",
        staff_care_id: "",

        is_website: "", // Đặt qua

        warehouse_id: "",
        is_tax: "", // Hình thức khai thuế hay không khai thuế
        is_purchase: "", // Loại đơn chờ thanh toán hay không
        customer_via: "", // Chọn Kênh
        customer_business_type: "",
        ecommerce: "", // Web site nào

        // Tìm kiếm nâng cao:
        date_create_from: null,
        date_create_to: null,

        date_quote_from: null,
        date_quote_to: null,

        date_order_from: null,
        date_order_to: null,

        date_complete_from: null,
        date_complete_to: null,

        date_deposit_from: null,
        date_deposit_to: null,

        sort_key: "",
        sort_value: "",
        arr_sort_value: [], // Mảng lưu giá trị để chọn sort_value

        // Sort:
        created_at_sort: "",
        order_cost_sort: "",

        created_at_sort_arr: [],
        order_cost_sort_arr: [],

        // Lọc theo status:
        status: "",

        page: 1,
        per_page: 15,
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

      listStatus: [],
      // Phần các Form Delete
      dialogDeleteVisible: false,
      dialogDeleteCanSubmit: true,
      dialogDeleteConfirm: true,
      dialogDeleteContent: "",
      itemDelete: {},

      // Phần cho From thêm ghi chú
      dialogNoteVisible: false,
      dialogNoteCanSubmit: true,
      dialogNoteLoading: false, // Load dữ liệu thoại thoại
      dialogNoteContent: "",
      itemNote: {},
      itemNoteArr: [], // Mảng lưu các hội thoại của item

      // Thêm người chăm sóc, đặt hàng, báo giá
      dialogUserCareVisible: false,
      dialogUserOrderVisible: false,
      dialogUserQuotationVisible: false,
      selectedRow: {},
      selectedUser: {},
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
            this.listStatus = response.data.statuses
            this.listCategory.sorts.forEach((item) => {
              if (item.value == "created_at_sort") {
                this.filter.created_at_sort_arr = item.data;
              }
              if (item.value == "order_cost_sort") {
                this.filter.order_cost_sort_arr = item.data;
              }
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
    fetchOrder() {
      this.loading = true;
      let filter = {
        customer_name: this.filter.customer_name,
        customer_level: this.filter.customer_level,
        customer_phone: this.filter.customer_phone,

        code: this.filter.code,
        code_po: this.filter.code_po,

        staff_order_id: this.filter.staff_order_id,
        staff_quotation_id: this.filter.staff_quotation_id,
        staff_care_id: this.filter.staff_care_id,

        is_website: this.filter.is_website,

        warehouse_id: this.filter.warehouse_id,

        is_tax: this.filter.is_tax,
        is_purchase: this.filter.is_purchase,

        customer_via: this.filter.customer_via,
        customer_business_type: this.filter.customer_business_type,
        ecommerce: this.filter.ecommerce,

        page: this.filter.page,
        per_page: this.filter.per_page,
        created_at_sort: "desc",
        status: this.filter.status,
      };

      // Ngày tạo
      filter.created_at = null;

      if (this.filter.date_create_from !== null) {
        filter.created_at = this.filter.date_create_from + ",2050-01-01";
      }
      if (this.filter.date_create_to !== null) {
        filter.created_at = "2022-01-01," + this.filter.date_create_to;
      }
      if (
        this.filter.date_create_from !== null &&
        this.filter.date_create_to !== null
      ) {
        filter.created_at =
          this.filter.date_create_from + "," + this.filter.date_create_to;
        const x = new Date(this.filter.date_create_from);
        const y = new Date(this.filter.date_create_to);
        if (x > y) {
          this.$message.error(
            "Ngày tạo: Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_create_from = null;
          }, 800);
        }
      }

      // Ngày báo giá
      filter.date_quotation = null;

      if (this.filter.date_quote_from !== null) {
        filter.date_quotation = this.filter.date_quote_from + ",2050-01-01";
      }
      if (this.filter.date_quote_to !== null) {
        filter.date_quotation = "2022-01-01," + this.filter.date_quote_to;
      }
      if (
        this.filter.date_quote_from !== null &&
        this.filter.date_quote_to !== null
      ) {
        filter.date_quotation =
          this.filter.date_quote_from + "," + this.filter.date_quote_to;
        const x = new Date(this.filter.date_quote_from);
        const y = new Date(this.filter.date_quote_to);
        if (x > y) {
          this.$message.error(
            "Ngày báo giá: Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_quote_from = null;
          }, 800);
        }
      }

      // Ngày đặt hàng
      filter.date_ordered = null;

      if (this.filter.date_order_from !== null) {
        filter.date_ordered = this.filter.date_order_from + ",2050-01-01";
      }
      if (this.filter.date_order_to !== null) {
        filter.date_ordered = "2022-01-01," + this.filter.date_order_to;
      }
      if (
        this.filter.date_order_from !== null &&
        this.filter.date_order_to !== null
      ) {
        filter.date_ordered =
          this.filter.date_order_from + "," + this.filter.date_order_to;
        const x = new Date(this.filter.date_order_from);
        const y = new Date(this.filter.date_order_to);
        if (x > y) {
          this.$message.error(
            "Ngày đặt hàng: Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_order_from = null;
          }, 800);
        }
      }

      // Ngày hoàn thành
      filter.date_done = null;

      if (this.filter.date_complete_from !== null) {
        filter.date_done = this.filter.date_complete_from + ",2050-01-01";
      }
      if (this.filter.date_complete_to !== null) {
        filter.date_done = "2022-01-01," + this.filter.date_complete_to;
      }
      if (
        this.filter.date_complete_from !== null &&
        this.filter.date_complete_to !== null
      ) {
        filter.date_done =
          this.filter.date_complete_from + "," + this.filter.date_complete_to;
        const x = new Date(this.filter.date_complete_from);
        const y = new Date(this.filter.date_complete_to);
        if (x > y) {
          this.$message.error(
            "Ngày hoàn thành: Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_complete_from = null;
          }, 800);
        }
      }

      // Ngày đặt cọc
      filter.date_purchased = null;

      if (this.filter.date_deposit_from !== null) {
        filter.date_purchased = this.filter.date_deposit_from + ",2050-01-01";
      }
      if (this.filter.date_deposit_to !== null) {
        filter.date_purchased = "2022-01-01," + this.filter.date_deposit_to;
      }
      if (
        this.filter.date_deposit_from !== null &&
        this.filter.date_deposit_to !== null
      ) {
        filter.date_purchased =
          this.filter.date_deposit_from + "," + this.filter.date_deposit_to;
        const x = new Date(this.filter.date_deposit_from);
        const y = new Date(this.filter.date_deposit_to);
        if (x > y) {
          this.$message.error(
            "Ngày đặt cọc: Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_deposit_from = null;
          }, 800);
        }
      }

      // Nếu bộ sort có giá trị thì truyền đi lọc
      if (this.filter.sort_key !== "" && this.filter.sort_value !== "") {
        if (this.filter.sort_key == "created_at_sort") {
          filter.created_at_sort = this.filter.sort_value;
        }
        if (this.filter.sort_key == "order_cost_sort") {
          filter.order_cost_sort = this.filter.sort_value;
        }
      }

      if (this.filter.created_at_sort) {
        filter.created_at_sort = this.filter.created_at_sort;
        this.filter.order_cost_sort = "";
      }
      if (this.filter.order_cost_sort) {
        filter.order_cost_sort = this.filter.order_cost_sort;
        this.filter.created_at_sort = "";
        filter.created_at_sort = "";
      }

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

    // Copy
    handleSuccess() {
      this.$notify({
        title: "Thành công",
        message: "Copy nội dung thành công",
        type: "success",
        duration: 1000,
      });
    },
    handleError() {},

    // Hủy xóa item
    showDeleteItem(item) {
      this.itemDelete = item;
      this.dialogDeleteVisible = true;
    },
    cancelDeleteItem() {
      this.dialogDeleteVisible = false;
      this.dialogDeleteContent = "";
    },
    actionDeleteItem() {
      if (this.dialogDeleteContent == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập lý do",
          type: "warning",
        });
        return;
      }
      if (this.dialogDeleteConfirm == false) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng xác nhận hủy",
          type: "warning",
        });
        return;
      }
      this.dialogDeleteCanSubmit = false;

      let data = {
        reason_cancel: this.dialogDeleteContent,
      };

      axios
        .patch("order/cancel/" + this.itemDelete.info.id, data)
        .then((response) => {
          this.dialogDeleteCanSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Hủy đơn thành công",
                type: "success",
              });
              this.dialogDeleteContent = "";
              this.dialogDeleteVisible = false;
              this.itemDelete.info.status.name = "Đã hủy";
              this.itemDelete.info.status.color = "#022652";
              this.itemDelete.is_cancel = false;
              // this.actionDeleteItemRealtime();
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
    actionDeleteItemRealtime() {
      // Xóa cái bản ghi ý đi
      let indexDelete = -1;
      this.tableData.forEach((item, index) => {
        if (item.info.id === this.itemDelete.info.id) {
          indexDelete = index;
        }
      });
      if (indexDelete > -1) {
        this.tableData.splice(indexDelete, 1);
      }
    },

    // Ghi chú
    showNoteItem(item) {
      this.itemNoteArr = [];
      this.itemNote = item;
      this.dialogNoteVisible = true;
      this.fetchNoteItem();
    },
    cancelNoteItem() {
      this.dialogNoteVisible = false;
      this.dialogNoteContent = "";
    },
    actionNoteItem() {
      if (this.dialogNoteContent == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập ghi chú thông tin về khách hàng",
          type: "warning",
        });
        return;
      }
      this.dialogNoteCanSubmit = false;

      let data = {
        content: this.dialogNoteContent,
      };

      axios
        .post("order/note/" + this.itemNote.info.id, data)
        .then((response) => {
          this.dialogNoteCanSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Thêm ghi chú thành công",
                type: "success",
              });
              this.dialogNoteContent = "";
              this.dialogNoteVisible = false;
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

    fetchNoteItem() {
      this.dialogNoteLoading = true;
      axios.get("order/note/" + this.itemNote.info.id).then((response) => {
        this.dialogNoteLoading = false;
        switch (response.code) {
          case 200:
            this.itemNoteArr = response.data;
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

    // Chuyển sang màn hình nộp phạt
    nextRouteFine(item) {
      this.$router.push({
        name: "fines-create",
        query: { order_code: item.info.code, order_id: item.info.id },
      });
    },

    // Chuyển sang route update đơn
    nextRouteUpdateOrder(item) {
      this.$router.push({
        name: "order-update",
        params: { order_id: item.info.id },
      });
    },

    // Chuyển sang route chi tiết đơn
    nextRouteDetailOrder(item) {
      this.$router.push({
        name: "order-detail",
        params: { order_id: item.info.id },
      });
    },
    // Chuyển sang route thêm kiện
    nextRouteAddPackOrder(item) {
      this.$router.push({
        name: "order-add-pack",
        params: { order_id: item.info.id },
      });
    },

    // Thêm người chăm sóc
    setSelectedUser(item) {
      this.selectedUser = item;
    },

    showStaffCare(row) {
      this.selectedRow = row;
      if (undefined !== row.staff.care && row.staff.care !== null) {
        this.selectedUser = row.staff.care;
      } else {
        this.selectedUser = {};
      }
      this.dialogUserCareVisible = true;
    },

    updateStaffCareForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      let data = {
        staff_care_id: this.selectedUser.id,
      };
      this.updateStaff(data);
      this.dialogUserCareVisible = false;
    },

    // Thêm ông đặt hàng
    showStaffOrder(row) {
      this.selectedRow = row;
      if (undefined !== row.staff.order && row.staff.order !== null) {
        this.selectedUser = row.staff.order;
      } else {
        this.selectedUser = {};
      }
      this.dialogUserOrderVisible = true;
    },
    updateStaffOrderForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      let data = {
        staff_order_id: this.selectedUser.id,
      };
      this.updateStaff(data);
      this.dialogUserOrderVisible = false;
    },

    // Thêm ông báo giá
    showQuotationOrder(row) {
      this.selectedRow = row;
      if (undefined !== row.staff.quotation && row.staff.quotation !== null) {
        this.selectedUser = row.staff.quotation;
      } else {
        this.selectedUser = {};
      }
      this.dialogUserQuotationVisible = true;
    },
    updateStaffQuoteForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      let data = {
        staff_quotation_id: this.selectedUser.id,
      };
      this.updateStaff(data);
      this.dialogUserQuotationVisible = false;
    },

    // Update 3 ông nhân viên
    updateStaff(data) {
      axios
        .patch("order/change-staff/" + this.selectedRow.info.id, data)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Gán nhân viên thành công",
                type: "success",
              });
              this.fetchOrder();
              // this.selectedRow.staff.care.name = this.selectedUser.name;
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
      this.updateStatusActoin(item);
    },
    updateStatusActoin(item) {
      let data = {
        status: item.info.status.value,
      };
      axios
        .patch("order/status/" + item.info.id, data)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                type: "success",
              });
              this.fetchOrder();
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

    // Click vào thanh status phía trên
    changeStatus(item) {
      this.filter.status = item.value;
      this.filter.page = 1;
      this.fetchOrder();
    },
  },
  watch: {
    "filter.customer_level": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.staff_order_id": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.staff_quotation_id": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.staff_care_id": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.is_website": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.warehouse_id": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.is_tax": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.is_purchase": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.customer_via": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.customer_business_type": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.ecommerce": function () {
      this.filter.page = 1;
      this.fetchOrder();
    },
    "filter.sort_key": function () {
      this.filter.sort_value = "";

      if (this.filter.sort_key == "") {
        this.filter.arr_sort_value = [];
      }
      if (this.filter.sort_key) {
        this.listCategory.sorts.forEach((item) => {
          if (item.value == this.filter.sort_key) {
            this.filter.arr_sort_value = item.data;
          }
        });
      }
    },
  },
};
</script>

<style lang="css" scoped>
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
  color: #000728;
}
.order-list-table .item-code:hover {
  color: red;
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
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.order-list-table .item-action {
  margin-bottom: 10px;
  cursor: pointer;
}
.order-list-table .copy-code-customer {
  cursor: pointer;
}
.order-list-table .item-add-staff {
  cursor: pointer;
}

/*Đè Dialog ô xóa */
.form-delete .yes-confirm-detlete {
  margin-left: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #383f57;
}
.form-delete .text-confirm-detlete {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.form-delete .code-confirm-detlete {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}

/*/*Đè Dialog form ghi chú*/
.form-note .header-1988 {
  background-color: #0688ee;
}

/*Màu sắc mặc định*/
.color-red {
  color: #df4747;
}

/*// Ẩn hiện cái chọn ngày với kích thước màn hình phù hợp*/
.show-display-less-1024 {
  display: initial;
}
.show-display-bigger-1024 {
  display: none;
}
@media screen and (min-width: 1025px) {
  .show-display-less-1024 {
    display: none;
  }
  .show-display-bigger-1024 {
    display: initial;
  }
}
</style>

<style>
.form-note textarea::-webkit-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 14px;
}
.form-note textarea::-moz-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 14px;
}
.form-note textarea::-ms-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 14px;
}
/* Cập nhật trạng thái đơn hàng */
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

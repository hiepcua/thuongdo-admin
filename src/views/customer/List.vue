<template>
  <div class="customer-common customer-list frame-content-common-2022">
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Thông tin khách hàng</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-1">
      <div class="item-search">
        <el-select
          v-model="filter.level"
          placeholder="Lựa chọn cấp độ"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsLevel"
            :key="item.level"
            :label="item.name"
            :value="item.level"
          >
            <div class="d-flex flex-row justify-content-between">
              <div>{{ item.name }}</div>
              <div class="item-level-quantity">{{ item.quantity }}</div>
            </div>
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-select
          v-model="filter.warehouse_id"
          placeholder="Kho hàng"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsWareHouse"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Mã tài khoản"
          v-model="filter.code"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Email"
          v-model="filter.email"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Số điện thoại"
          v-model="filter.phone_number"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-select
          v-model="filter.province_id"
          placeholder="Chọn tỉnh/tp"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsProvince"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search item-search-date">
        <el-date-picker
          v-model="filter.from"
          type="date"
          placeholder="Từ ngày"
          class="frame-date-common-2022"
          size="mini"
          clearable
          popper-class="frame-date-popper-common-2022"
        >
        </el-date-picker>
      </div>
      <div class="item-search item-search-date">
        <el-date-picker
          v-model="filter.to"
          type="date"
          placeholder="Đến ngày"
          class="frame-date-common-2022"
          size="mini"
          clearable
          popper-class="frame-date-popper-common-2022"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Tìm kiếm nâng cao</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-2">
      <div class="item-search">
        <el-select
          v-model="filter.label_id"
          placeholder="Chọn nhãn"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsLabel"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-select
          v-model="filter.business_type"
          placeholder="Chọn loại hình"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsBusinessType"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search item-search-2">
        <el-select
          v-model="filter.staff_care_id"
          placeholder="Nhân viên chăm sóc"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsStaffCare"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-select
          v-model="filter.staff_counselor_id"
          placeholder="Nhân viên tư vấn"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsStaffCounselor"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search item-search-2">
        <el-select
          v-model="filter.staff_order_id"
          placeholder="Nhân viên đặt hàng"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsStaffOrder"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search item-search-2">
        <el-select
          v-model="filter.via"
          placeholder="Nguồn tương tác"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsVia"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-3">
      <div class="item-search item-search-2">
        <el-input
          placeholder="Số ngày đặt gần nhất"
          v-model="filter.last_order"
          type="number"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search item-search-2">
        <el-select
          v-model="filter.service"
          placeholder="Loại khách hàng"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsService"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search item-search-3">
        <el-select
          v-model="filter.customer_reason_inactive_id"
          placeholder="Chọn lý do đóng tài khoản"
          class="frame-select-customer-2022"
          popper-class="frame-select-popper-customer-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in optionsReason"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div
      class="frame-btn-customer-td-2022 d-flex justify-content-center align-items-center my-2 search-button"
      @click="search(true)"
    >
      <span> Tìm kiếm </span>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Thống kê</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-3">
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Hôm nay</span>
        <span class="count">{{ reportToday }}</span>
      </div>
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Tuần nay</span>
        <span class="count">{{ reportWeek }}</span>
      </div>
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Tháng nay</span>
        <span class="count">{{ reportMonth }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="frame-content-title-2022">
        <span class="customer-list">Danh sách khách hàng</span>
        <span>({{ total }} khách hàng)</span>
      </div>
      <div class="d-flex flex-row">
        <div
          class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center mx-2"
          v-if="dataTableSelection.length > 0"
          @click="showChangeUserForCustomer()"
        >
          <span>Chuyển thông tin</span>
        </div>
        <div
          class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
          @click="nextToCreateCustomer()"
        >
          <img src="@/static/icon/action/add-white.svg" alt="" />
          <span>Thêm mới khách hàng</span>
        </div>
      </div>
    </div>
    <div class="customer-common-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionTableChange"
      >
        <el-table-column
          header-align="center"
          align="center"
          type="selection"
          min-width="45"
        >
        </el-table-column>
        <el-table-column
          prop="stt"
          label="STT"
          header-align="center"
          align="center"
          min-width="50"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text">
              <span>{{ scope.$index + 1 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="Mã khách hàng"
          min-width="120"
        >
          <template slot-scope="scope">
            <div class="customer-list-code d-flex flex-column">
              <span>{{ scope.row.code }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Thông tin khách hàng"
          header-align="center"
          align="left"
          min-width="300"
        >
          <template slot-scope="scope">
            <div class="customer-list-info d-flex flex-column">
              <span class="name">{{ scope.row.info.name }}</span>
              <div class="d-flex justify-content-left align-items-center">
                <span class="address" v-if="scope.row.info.address !== null">{{
                  scope.row.info.address
                }}</span>
                <span
                  class="address sex"
                  v-if="
                    scope.row.info.gender !== null &&
                    scope.row.info.gender !== 'Chưa xác định'
                  "
                >
                  {{ scope.row.info.gender }}
                </span>
              </div>
              <div class="sub-info-wrap">
                <div class="sub-info d-flex align-items-center">
                  <img src="@/static/icon/customer-list/PhoneBlue.svg" alt="" />
                  <span>{{ scope.row.info.phone_number }}</span>
                </div>
                <div class="sub-info d-flex align-items-center">
                  <img src="@/static/icon/customer-list/EmailBlue.svg" alt="" />
                  <span>{{ scope.row.info.email }}</span>
                </div>
                <div class="sub-info d-flex align-items-center">
                  <img
                    src="@/static/icon/customer-list/CalendarBlue.svg"
                    alt=""
                  />
                  <span>{{ scope.row.info.created_at }}</span>
                </div>
                <div
                  class="sub-info d-flex align-items-center"
                  v-if="scope.row.info.level > 0"
                >
                  <star-rating
                    :max-rating="5"
                    :rating="scope.row.info.level"
                    :star-size="15"
                    :read-only="true"
                    text-class="text-start-rate"
                  ></star-rating>
                </div>
                <div class="sub-info d-flex align-items-center py-1">
                  <div>
                    <el-select
                      v-model="scope.row.info.via"
                      placeholder="Thêm nguồn tương tác"
                      class="frame-select-common-2022"
                      popper-class="frame-select-popper-common-2022"
                      clearable
                      @change="updateCustomer($event, 'via', scope.row)"
                      size="mini"
                    >
                      <el-option
                        v-for="item in optionsVia"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="sub-info d-flex align-items-center">
                  <div class="item-search">
                    <el-select
                      v-model="scope.row.info.business_type.value"
                      placeholder="Thêm loại hình"
                      class="frame-select-common-2022"
                      popper-class="frame-select-popper-common-2022"
                      clearable
                      @change="
                        updateCustomer($event, 'business_type', scope.row)
                      "
                      size="mini"
                    >
                      <el-option
                        v-for="item in optionsBusinessType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Đơn hàng" header-align="center">
          <el-table-column
            prop="order"
            header-align="center"
            align="center"
            label="Order"
            min-width="80"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{ scope.row.order.orders_number }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="kigui"
            header-align="center"
            align="center"
            label="Kí gửi"
            min-width="80"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{ scope.row.order.order_consignment_number }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pack"
            header-align="center"
            align="center"
            label="Kiện"
            min-width="80"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{ scope.row.order.order_packages_number }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="Giao dịch" header-align="center">
          <el-table-column
            prop="nap"
            header-align="center"
            align="center"
            label="Nạp"
            width="120"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{
                  formatCurrencyVND(scope.row.transaction.deposited_amount)
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="balance"
            header-align="center"
            align="center"
            label="Số dư"
            width="120"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{
                  formatCurrencyVND(scope.row.transaction.balance_amount)
                }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Tình trạng tài khoản"
          header-align="center"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div v-if="scope.row.status">
                <div
                  class="customer-button-status"
                  @click="showStatusDialog(scope.row)"
                >
                  <span>Mở</span>
                </div>
              </div>
              <div v-else>
                <div
                  class="customer-button-status-close"
                  @click="activeCustomer(scope.row)"
                >
                  <span>Đóng</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhân viên" header-align="center">
          <el-table-column
            prop="staff_order"
            header-align="center"
            align="center"
            label="Đặt hàng"
            min-width="150"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{
                  scope.row.staff.order != null
                    ? scope.row.staff.order.name
                    : ""
                }}</span>
              </div>
              <div
                class="customer-list-action d-flex flex-column align-items-center"
                @click="showStaffOrder(scope.row)"
              >
                <img src="@/static/icon/action/add-blue.svg" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="staff_care"
            header-align="center"
            align="center"
            label="Chăm sóc"
            min-width="150"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{
                  scope.row.staff.care != null ? scope.row.staff.care.name : ""
                }}</span>
              </div>
              <div
                class="customer-list-action d-flex flex-column align-items-center"
                @click="showStaffCare(scope.row)"
              >
                <img src="@/static/icon/action/add-blue.svg" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="staff_counselor"
            header-align="center"
            align="center"
            label="Tư vấn"
            min-width="150"
          >
            <template slot-scope="scope">
              <div class="d-flex flex-column table-text">
                <span>{{
                  scope.row.staff.counselor != null
                    ? scope.row.staff.counselor.name
                    : ""
                }}</span>
                <div
                  class="customer-list-action d-flex flex-column align-items-center"
                  @click="showStaffCounselor(scope.row)"
                >
                  <img src="@/static/icon/action/add-blue.svg" alt="" />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="Nhãn"
          min-width="150"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text align-items-start">
              <span class="label my-1" v-if="scope.row.label">{{
                scope.row.label.name
              }}</span>
              <div
                class="customer-list-action d-flex flex-column align-items-center"
                @click="openLabelSelector(scope.row)"
              >
                <img src="@/static/icon/action/add-blue.svg" alt="" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="Tác vụ"
          min-width="70"
        >
          <template slot-scope="scope">
            <div
              class="customer-list-action d-flex flex-column align-items-center"
            >
              <el-tooltip placement="top">
                <template #content> Sửa đổi </template>
                <img
                  src="@/static/icon/action/edit.svg"
                  alt=""
                  @click="goToUpdate(scope.row)"
                />
              </el-tooltip>
              <el-tooltip placement="top">
                <template #content> Chi tiết </template>
                <img
                  src="@/static/icon/action/detail.svg"
                  alt=""
                  @click="goToDetail(scope.row)"
                />
              </el-tooltip>
              <el-tooltip placement="top">
                <template #content> Xoá khách hàng </template>
                <img
                  src="@/static/icon/action/delete.svg"
                  alt=""
                  @click="showDeleteDialog(scope.row)"
                />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="page-count-common-2022">
        <el-radio-group v-model="radio" size="mini" @change="changePerPage">
          <el-radio-button label="10"></el-radio-button>
          <el-radio-button label="20"></el-radio-button>
          <el-radio-button label="50"></el-radio-button>
          <el-radio-button label="100"></el-radio-button>
        </el-radio-group>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="radio"
        :current-page="currentPage"
        @current-change="changeCurrentPage"
      >
      </el-pagination>
    </div>
    <div class="dialog-frame-normal-2022">
      <el-dialog :visible.sync="dialogLabelVisible" width="400px" center>
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/DonePurchase.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">Chọn nhãn</span>
        </span>
        <div class="d-flex flex-row justify-content-center form-label">
          <el-form :model="formLabel" :rules="ruleLabel" ref="label-form">
            <el-form-item prop="label">
              <div class="width-full">
                <el-select
                  v-model="formLabel.label"
                  placeholder="Chọn nhãn"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in optionsLabel"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-end align-items-end">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
              @click="dialogLabelVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="updateLabelCustomer()"
            >
              <span>Xác nhận</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog-frame-delete-2022">
      <el-dialog :visible.sync="dialogStatusVisible" width="400px" center>
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/Cancle.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">
            Yêu cầu đóng tài khoản
          </span>
        </span>
        <div class="d-flex flex-row justify-content-center form-label">
          <el-form :model="formReason" :rules="ruleReason" ref="reason-form">
            <el-form-item prop="label">
              <div class="width-full">
                <el-select
                  v-model="formReason.customer_reason_inactive_id"
                  placeholder="-Lý do-"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in optionsReason"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-end align-items-end">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
              @click="dialogStatusVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="updateStatusCustomer()"
            >
              <span>Xác nhận</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog-frame-delete-2022">
      <el-dialog :visible.sync="dialogDeleteVisible" width="500px" center>
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/Warning.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">Thông báo</span>
        </span>
        <div class="d-flex flex-column justify-content-center content">
          <span class="py-1 warning-text">
            Sau khi xóa, mọi thông tin sẽ không thể khôi phục lại được nữa!
          </span>
          <span class="py-1 normal-text">
            Bạn chắc chắn muốn xóa tất cả thông tin về khách hàng này?
          </span>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-end align-items-end">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-between align-items-center mr-2 px-2 button-modal"
              @click="dialogDeleteVisible = false"
            >
              <img
                src="@/static/icon/customer-list/Close.svg"
                alt=""
                class="d-flex px-1"
              />
              <span class="d-flex">Đóng</span>
            </div>
            <div
              class="d-flex frame-btn-create-td-2022 justify-content-between align-items-center button-modal"
              @click="deleteCustomer()"
            >
              <img
                src="@/static/icon/customer-list/Trash.svg"
                alt=""
                class="d-flex px-1"
              />
              <span class="d-flex">Xoá</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
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
            :items="optionsStaffCare"
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
            :items="optionsStaffOrder"
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
    <div class="dialog-frame-normal-2022">
      <el-dialog
        :visible.sync="dialogUserCounselorVisible"
        width="400px"
        center
      >
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/AddUser.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">
            Nhân viên tư vấn
          </span>
        </span>
        <div class="d-flex">
          <select-search
            :items="optionsStaffCounselor"
            @change="setSelectedUser"
            :value="selectedUser"
          ></select-search>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-end align-items-end">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
              @click="dialogUserCounselorVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="updateStaffCounselorForCustomer()"
            >
              <span>Thêm nhân viên</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog-frame-normal-2022">
      <el-dialog :visible.sync="dialogChangeUserVisible" width="400px" center>
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/AddUser.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">
            Chuyển thông tin
          </span>
        </span>
        <div class="d-flex">
          <multi-select-search
            :items="optionsStaff"
            @change="setChangeSupportUserForCustomer"
            :value="selectedUser"
          ></multi-select-search>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-center align-items-end">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
              @click="dialogChangeUserVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="changeUserSupportCustomer"
            >
              <span>Chuyển thông tin</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import { formatCurrency } from "@/common/convert.js";
import SelectSearch from "@/components/UI/Selection/SelectSearch";
import * as moment from "moment";
import MultiSelectSearch from "@/components/UI/Selection/MultiSelectSearch";

export default {
  name: "CustomerList",
  components: {
    SelectSearch,
    MultiSelectSearch,
    StarRating,
  },
  metaInfo() {
    return {
      title: "Danh sách khách hàng",
    };
  },
  data() {
    return {
      filter: {
        level: "",
        warehouse_id: "",
        code: "",
        email: "",
        phone_number: "",
        province_id: "",
        from: "",
        to: "",
        label_id: "",
        business_type: "",
        staff_care_id: "",
        staff_counselor_id: "",
        staff_order_id: "",
        via: "",
        customer_reason_inactive_id: "",
        service: "",
        last_order: "",
        per_page: 10,
      },
      reportToday: 0,
      reportWeek: 0,
      reportMonth: 0,
      optionsLevel: [],
      optionsVia: [],
      optionsBusinessType: [],
      optionsLabel: [],
      optionsProvince: [],
      optionsWarehouse: [],
      optionsStaffCare: [],
      optionsStaffCounselor: [],
      optionsStaffOrder: [],
      optionsReason: [],
      optionsStaff: [],
      optionsService: [],
      optionsWareHouse: [],
      dialogLabelVisible: false,
      dialogStatusVisible: false,
      dialogDeleteVisible: false,
      dialogUserCareVisible: false,
      dialogUserCounselorVisible: false,
      dialogUserOrderVisible: false,
      dialogChangeUserVisible: false,
      radio: 10,
      currentPage: 1,
      total: 0,
      selectedRow: {},
      selectedUser: {},
      selectedChangeUserType: "",
      dataTableSelection: [],
      tableData: [],
      formLabel: {
        label: "",
      },
      formReason: {
        customer_reason_inactive_id: "",
      },
      ruleReason: {
        customer_reason_inactive_id: [
          {
            required: true,
            message: "Vui lòng chọn lí do.",
            trigger: ["blur", "change"],
          },
        ],
      },
      ruleLabel: {
        label: [
          {
            required: true,
            message: "Vui lòng chọn nhãn.",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.get();
    this.getReport();
    this.getCategory();
    this.getCreatedAt();
  },
  methods: {
    search(val) {
      if (val) {
        this.filter.page = 1;
      }
      this.get();
    },
    setSelectedUser(item) {
      this.selectedUser = item;
    },
    setChangeSupportUserForCustomer(item, category) {
      this.selectedUser = item;
      this.selectedChangeUserType = category;
    },
    showStatusDialog(row) {
      this.selectedRow = row;
      this.dialogStatusVisible = true;
    },
    showDeleteDialog(row) {
      this.selectedRow = row;
      this.dialogDeleteVisible = true;
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
    showChangeUserForCustomer() {
      this.dialogChangeUserVisible = true;
      this.selectedUser = {};
      this.selectedChangeUserType = "";
    },
    showStaffOrder(row) {
      this.selectedRow = row;
      if (undefined !== row.staff.order && row.staff.order !== null) {
        this.selectedUser = row.staff.order;
      } else {
        this.selectedUser = {};
      }
      this.dialogUserOrderVisible = true;
    },
    showStaffCounselor(row) {
      this.selectedRow = row;
      if (undefined !== row.staff.counselor && row.staff.counselor !== null) {
        this.selectedUser = row.staff.counselor;
      } else {
        this.selectedUser = {};
      }
      this.dialogUserCounselorVisible = true;
    },
    formatCurrencyVND(value) {
      if (value === 0) {
        return "0₫";
      }
      return formatCurrency(value);
    },
    nextToCreateCustomer() {
      this.$router.push({ name: "customer-lists-create" });
    },
    get() {
      this.filter["created_at"] = this.getCreatedAt();
      axios
        .get("customer/", {
          params: this.filter,
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.tableData = response.data.items;
              this.currentPage = response.data.pagination.current_page;
              this.total = response.data.pagination.total;
              break;
            default:
              break;
          }
        });
    },
    getCategory() {
      axios.get("common/customer/").then((response) => {
        switch (response.code) {
          case 200:
            this.optionsBusinessType = response.data.business_type;
            this.optionsLabel = response.data.label;
            this.optionsLevel = response.data.level;
            this.optionsProvince = response.data.provinces;
            this.optionsVia = response.data.via;
            this.optionsWareHouse = response.data.warehouses;
            this.optionsReason = response.data.reasons;
            this.optionsService = response.data.service;
            this.optionsStaff = response.data.staffs;
            this.optionsStaffCare = response.data.staffs.care;
            this.optionsStaffCounselor = response.data.staffs.counselor;
            this.optionsStaffOrder = response.data.staffs.order;
            break;
          default:
            break;
        }
      });
    },
    getReport() {
      axios.get("/customer/reports").then((response) => {
        switch (response.code) {
          case 200:
            this.reportToday = response.data.today;
            this.reportWeek = response.data.week;
            this.reportMonth = response.data.month;
            break;
          default:
            break;
        }
      });
    },
    updateCustomer(value, type, row) {
      this.selectedRow = row;
      let data = {};
      data[type] = value;
      axios.patch("/customer/" + row.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Cập nhật thành công.",
              message:
                "Khách hàng " +
                this.selectedRow.info.name +
                " đã được cập nhật thành công.",
              type: "success",
            });
            this.get();
            break;
          default:
            break;
        }
      });
    },
    openLabelSelector(row) {
      this.selectedRow = row;
      if (this.selectedRow.label != null) {
        this.formLabel.label = this.selectedRow.label.id;
      } else {
        this.formLabel = {
          label: "",
        };
      }
      this.dialogLabelVisible = true;
    },
    updateLabelCustomer() {
      this.$refs["label-form"].validate((valid) => {
        if (valid) {
          this.updateCustomer(
            this.formLabel.label,
            "label_id",
            this.selectedRow
          );
          this.dialogLabelVisible = false;
        }
      });
    },
    updateStaffCareForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      this.updateCustomer(
        this.selectedUser.id,
        "staff_care_id",
        this.selectedRow
      );
      this.dialogUserCareVisible = false;
    },
    updateStaffOrderForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      this.updateCustomer(
        this.selectedUser.id,
        "staff_order_id",
        this.selectedRow
      );
      this.dialogUserOrderVisible = false;
    },
    updateStaffCounselorForCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      this.updateCustomer(
        this.selectedUser.id,
        "staff_counselor_id",
        this.selectedRow
      );
      this.dialogUserCounselorVisible = false;
    },
    updateStatusCustomer() {
      this.$refs["reason-form"].validate((valid) => {
        if (valid) {
          let data = this.formReason;
          data["status"] = 0;
          axios
            .patch("/customer/status/" + this.selectedRow.id, data)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Cập nhật thành công.",
                    message:
                      "Khách hàng " +
                      this.selectedRow.info.name +
                      " đã được cập nhật thành công.",
                    type: "success",
                  });
                  this.get();
                  this.dialogStatusVisible = false;
                  break;
                default:
                  break;
              }
            });
        }
      });
    },
    activeCustomer(row) {
      axios
        .patch("/customer/status/" + row.id, {
          status: 1,
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Cập nhật thành công.",
                message:
                  "Khách hàng " +
                  row.info.name +
                  " đã được cập nhật thành công.",
                type: "success",
              });
              this.get();
              break;
            default:
              break;
          }
        });
    },
    deleteCustomer() {
      axios.delete("/customer/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá thành công.",
              message:
                "Khách hàng " +
                this.selectedRow.info.name +
                " đã được xoá thành công.",
              type: "success",
            });
            this.get();
            this.dialogDeleteVisible = false;
            break;
          default:
            break;
        }
      });
    },
    handleSelectionTableChange(event) {
      this.dataTableSelection = event;
    },
    changeUserSupportCustomer() {
      if (undefined === this.selectedUser.id) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng chọn nhân viên !",
        });
        return;
      }
      if (this.selectedChangeUserType === "") {
        this.$notify.error({
          title: "Error",
          message: "Có lỗi xảy ra!",
        });
        return;
      }
      let data = {};
      switch (this.selectedChangeUserType) {
        case "care":
          data["staff_care_id"] = this.selectedUser.id;
          break;
        case "counselor":
          data["staff_counselor_id"] = this.selectedUser.id;
          break;
        case "order":
          data["staff_order_id"] = this.selectedUser.id;
          break;
        default:
          break;
      }
      let customers = [];
      this.dataTableSelection.forEach((e) => {
        customers.push(e.id);
      });
      data["customers"] = customers;
      axios
        .patch("/customer/change-staff-to-customers", data)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Cập nhật thành công.",
                message: "Dữ liệu đã được cập nhật thành công.",
                type: "success",
              });
              this.get();
              this.dialogChangeUserVisible = false;
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
    changePerPage(event) {
      this.filter.per_page = event;
      this.search(true);
    },
    getCreatedAt() {
      let from = this.filter.from;
      if (from === null || from === "") {
        from = "2021-01-01";
      } else {
        from = moment(from).format("YYYY-MM-DD");
      }
      let to = this.filter.to;
      if (to === null || to === "") {
        to = "";
        return from;
      } else {
        to = moment(to).format("YYYY-MM-DD");
        if (moment(to).isBefore(moment(from))) {
          this.$notify({
            title: "Cảnh báo",
            message: "Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại!",
            type: "warning",
          });
          return;
        }
        return from + "," + to;
      }
    },
    changeCurrentPage(val) {
      this.filter.page = val;
      this.search(false);
    },
    goToUpdate(row) {
      this.$router.push("/customer/customer-lists/update/" + row.id);
    },
    goToDetail(row) {
      this.$router.push("/customer/customer-lists/detail/" + row.id);
    },
  },
};
</script>
<style lang="css" scoped>
.customer-list {
  font-weight: 600;
}
.search-button {
  width: 100px;
}
.button-modal {
  padding: 7px 15px !important;
}
.button-modal span {
  font-size: 14px;
}
.customer-list-code span {
  font-weight: 400;
  color: #000728;
  font-size: 12px;
}
.customer-list-info .name {
  font-size: 16px;
  font-weight: 700;
  color: #000728;
}
.customer-list-info .address {
  border-radius: 8px;
  background: #f4c533;
  font-size: 10px;
  margin-right: 8px;
  text-align: right;
  letter-spacing: 1px;
  color: #fff;
  line-height: 20px;
  height: 19px;
  padding: 0px 8px;
}
.customer-list-info .sex {
  background: #2672ab;
}
.customer-list-info .sub-info-wrap {
  margin-top: 7px;
}
.customer-list-info .sub-info img {
  width: 10px;
}
.customer-list-info .sub-info span {
  font-size: 12px;
  color: #000728;
  margin-left: 3px;
  font-weight: 400;
  line-height: 16px;
}
.customer-list-action img {
  margin-bottom: 7px;
  width: 20px;
  cursor: pointer;
}
.table-text span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.label {
  padding: 5px 10px;
  background: #e8f3ff;
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  color: #0688ee !important;
}
.customer-button-status {
  padding: 2px 5px;
  background: #26b01c;
  border-radius: 2px;
  cursor: pointer;
}

.customer-button-status span {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
}

.customer-button-status-close {
  padding: 2px 5px;
  background: #f09920;
  border-radius: 2px;
  cursor: pointer;
}

.customer-button-status-close span {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
}
.warning-text {
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #3f92d1;
}
.normal-text {
  font-size: 14px;
  color: #000728;
}
.content {
  padding-left: 50px;
}
.item-level-quantity {
  padding: 0 5px;
  font-size: 10px;
  background: #00a962;
  border-radius: 4px;
  margin-left: 5px;
  color: #fff;
  height: 28px;
}
</style>
<style>
.vue-star-rating-rating-text {
  display: none !important;
}
.customer-list-status .el-input__inner {
  background-color: #26b01c !important;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
}
.customer-list-status .el-input .el-select__caret {
  color: #fff !important;
}
.form-label .width-full {
  width: 100%;
}

.form-label form .width-full .el-select {
  width: 100%;
}
.form-label .el-form {
  width: 80%;
}
.form-label .el-form-item {
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<template>
  <div class="delivery-list" id="ST2022">
    <div class="order-list-statistic" v-if="listCategory.reports">
      <div
        class="order-list-statistic-item"
        v-for="item in listCategory.reports.all"
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
            v-model="filter.receiver"
            @keyup.enter.native="fetchDelivery"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.phone_number"
            @keyup.enter.native="fetchDelivery"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Mã vận đơn"
            v-model="filter.bill_code"
            @keyup.enter.native="fetchDelivery"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-name">
          <el-input
            placeholder="Mã bưu điện"
            v-model="filter.postcode"
            @keyup.enter.native="fetchDelivery"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Số điện thoại ship"
            v-model="filter.shipper_phone_number"
            @keyup.enter.native="fetchDelivery"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023 filter-shipping-method">
          <el-select
            v-model="filter.transporter_id"
            placeholder="Phương thức vận chuyển"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.transporters"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023 filter-shipping-method">
          <el-select
            v-model="filter.payment"
            placeholder="Hình thức thanh toán"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.payments"
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
      </div>
      <div class="frame-content-title-2023">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Tìm kiếm nâng cao</span>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2023">
        <div class="frame-item-filter-2023 filter-car">
          <el-select
            v-model="filter.transporter_detail_id"
            placeholder="Chọn nhà xe"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.transporters_detail"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.is_received"
            placeholder="Tất cả"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.status_package"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.is_paid_extend"
            placeholder="Trạng thái thanh toán"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.status_payment"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.warehouse_id"
            placeholder="Chọn kho"
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
      </div>
      <div class="btn-seach-wrap pt-1">
        <span class="frame-btn-seach-2022" @click="fetchDelivery()"
          >Tìm kiếm</span
        >
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thống kê</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-wrap">
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Hôm nay</span>
            <span class="count">{{ listCategory.reports.time.today }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tuần nay</span>
            <span class="count">{{ listCategory.reports.time.week }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tháng nay</span>
            <span class="count">{{ listCategory.reports.time.month }}</span>
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
            label="Ngày tạo"
            align="center"
            header-align="center"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Khách hàng"
            align="left"
            header-align="center"
            min-width="200"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span class="customer-name">{{ scope.row.customer.name }}</span>
              </div>
              <div class="line-item">
                <span
                  class="count-status-top-3388 v2"
                  style="background-color: #207cdc"
                  >{{ scope.row.customer.warehouse_code }}</span
                >
              </div>
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/call.svg" />
                <span>{{ scope.row.customer.phone_number }}</span>
              </div>
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/money.svg" />
                <span>Số dư: {{ scope.row.customer.balance_amount | vnd }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Tình trạng"
            align="left"
            header-align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <div v-if="showCanUpdate(scope.row.status.value)">
                <el-select
                  :style="{ backgroundColor: scope.row.status.color }"
                  v-model="scope.row.status.value"
                  placeholder="Chọn trạng thái"
                  class="frame-input-common-2022 status-withdrawal-2022"
                  popper-class="frame-select-popper-customer-2022"
                  size="mini"
                >
                  <el-option
                    v-for="item in listCategory.statuses"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div v-else>
                <span
                  class="count-status-top-3388 v2 status"
                  :style="{ backgroundColor: scope.row.status.color }"
                  >{{ scope.row.status.name }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thông tin giao hàng"
            align="left"
            header-align="center"
            min-width="300"
          >
            <template slot-scope="scope">
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/car.svg" />
                <span>Hình thức: {{ scope.row.info.carrier }} <span v-if="scope.row.info.transporter_detail"> - {{ scope.row.info.transporter_detail.name }} - {{ scope.row.info.transporter_detail.phone_number }}</span></span>
              </div>
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/bill.svg" />
                <span>Thanh toán: {{ scope.row.info.payment }}</span>
              </div>
              <div class="line-item d-flex align-items-start">
                <img
                  class="address"
                  src="@/static/icon/delivery/list/user.svg"
                />
                <span>{{ scope.row.info.receiver }}</span>
              </div>
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/box.svg" />
                <span>Số kiện: </span>
                <span class="count-pack">{{
                  scope.row.info.packages.quantity
                }}</span>
                <img src="@/static/icon/delivery/list/eye.svg" />
                <span class="show-pack" @click="showPack(scope.row)"
                  >Xem kiện</span
                >
              </div>
              <div class="line-item d-flex">
                <img src="@/static/icon/delivery/list/time.svg" />
                <span>Thời gian giao hàng: {{ scope.row.info.date }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thanh toán"
            align="left"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <el-input
                  v-model="scope.row.info.extend.extend_cost"
                  placeholder="Số tiền"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                  type="number"
                >
                </el-input>
              </div>
              <div class="line-item">
                <el-select
                  v-model="scope.row.info.extend.is_paid_extend"
                  placeholder="Lựa chọn trạng thái"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  size="mini"
                >
                  <el-option
                    v-for="item in listCategory.status_payment"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Ghi chú của khách hàng"
            align="left"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <div class="customer-note" v-if="scope.row.info.notes.customer">
                <span>{{ scope.row.info.notes.customer }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Nhân viên ghi chú"
            align="left"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <el-input
                placeholder="Nhân viên ghi chú"
                v-model="scope.row.info.notes.staff"
                class="frame-input-common-2022 input-order"
                size="mini"
                type="textarea"
                :rows="4"
              ></el-input>
              <div class="line-item line-item-note d-flex">
                <img src="@/static/icon/delivery/list/note.svg" />
                <span class="show-pack" @click="showNote(scope.row)"
                  >{{ scope.row.info.notes.staff_quantity }} ghi chú</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Mã bưu kiện / SĐT"
            align="left"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <el-input
                  v-model="scope.row.info.info_po_shi.postcode"
                  placeholder="Mã bưu kiện"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="line-item">
                <el-input
                  v-model="scope.row.info.info_po_shi.shipper_phone_number"
                  placeholder="SĐT ship"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                  type="number"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thao tác"
            align="center"
            header-align="center"
            min-width="80"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="item-action" v-if="scope.row.status.name == 'Chờ xử lý'">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Sửa"
                  placement="top"
                >
                  <img
                    src="@/static/icon/delivery/list/edit.svg"
                    @click="showUpdateDelivery(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="In phiếu giao hàng"
                  placement="top"
                >
                  <img
                    src="@/static/icon/delivery/list/print.svg"
                    @click="printDeliveryNote(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action" v-if="scope.row.status.name == 'Chờ xử lý'">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xóa"
                  placement="top"
                >
                  <img
                    src="@/static/icon/delivery/list/delete.svg"
                    @click="confirmDeleteModel(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="In phiếu xuất kho"
                  placement="top"
                >
                  <img
                    src="@/static/icon/delivery/list/subway_print.svg"
                    @click="printDeliveryBill(scope.row)"
                  />
                </el-tooltip>
              </div>
              <div class="item-action" v-if="scope.row.status.name == 'Chờ xử lý'">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Thêm kiện hàng vào đơn giao hàng"
                  placement="top"
                >
                  <img
                    src="@/static/icon/delivery/list/ion_add.svg"
                    @click="clickAddPackToDelivery(scope.row)"
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
              <el-table
                :data="tableListDeliveryPack"
                style="width: 100%"
                border
              >
                <el-table-column
                  label="STT"
                  width="50"
                  align="center"
                  type="index"
                ></el-table-column>
                <el-table-column
                  prop="order_code"
                  label="Mã đơn hàng"
                  width="180"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="bill_code"
                  label="Mã vận đơn"
                  header-align="center"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="weight"
                  label="Trọng lượng"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.weight }} kg</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="order_kind_of"
                  label="Loại kiện hàng"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="Trạng thái"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column
                  label="Thao tác"
                  header-align="center"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="item-action frame-poiter-2022">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="Xem"
                        placement="top"
                      >
                        <img
                          src="@/static/icon/delivery/list/detail.svg"
                          @click="showPackRoute(scope.row)"
                        />
                      </el-tooltip>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="title-2022">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span>Lịch sử thay đổi trạng thái</span>
            </div>
            <div class="table-element-custom-2022-v-history pb-4">
              <el-table
                :data="tableLogDeliveryPack.statuses"
                style="width: 100%"
                border
              >
                <el-table-column
                  label="STT"
                  width="50"
                  align="center"
                  type="index"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="Thời gian"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column label="Trạng thái" header-align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.properties.status.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Người thay đổi"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.staff.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="title-2022">
              <img src="@/static/icon/delivery/list/box.svg" />
              <span>Lịch sử thay đổi kiện hàng</span>
            </div>
            <div class="table-element-custom-2022-v-history pb-4">
              <el-table :data="tableLogDeliveryPack.packages" style="width: 100%" border>
                <el-table-column
                  label="STT"
                  width="50"
                  align="center"
                  type="index"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="Thời gian"
                  header-align="center"
                >
                </el-table-column>
                <el-table-column label="Người thay đổi" header-align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.staff.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Loại thay đổi" header-align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.content }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Kiện hàng thay đổi"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.properties.package }}</span>
                  </template>
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

      <!-- ghi chú nội bộ  -->
      <div class="frame-dialog-no-close-1988 delivery-list-form-note">
        <el-dialog
          top="150px"
          width="750px"
          :close-on-click-modal="false"
          :visible.sync="dialogNoteVisible"
          :show-close="false"
        >
          <div class="header-1988 el-dialog-header-2022">
            <img src="@/static/icon/order/list/form-note/edit.svg" />
            <span>Ghi chú</span>
          </div>
          <div class="body-1988">
            <div class="table-element-custom-2022-v2 pt-3">
              <el-table
                style="width: 100%"
                :data="itemNoteArr"
                border
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
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="dialogNoteVisible = false"
                  >Hủy bỏ</span
                >
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <!-- Thêm kiện vào giao hàng -->
      <div class="frame-dialog-no-close-1988 delivery-list-add-pack">
        <el-dialog
          top="100px"
          width="550px"
          :close-on-click-modal="false"
          :visible.sync="dialogAddPackVisible"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/delivery/list/box-2.svg" />
            <span>Thêm kiện vào giao hàng</span>
          </div>
          <div class="body-1988" v-loading="itemAddPackLoading">
            <div class="search-wrap d-flex align-items-center">
              <el-input
                placeholder="Tìm theo mã kiện"
                v-model="addPackSeachText"
                class="frame-input-common-2022"
                size="small"
                clearable
              ></el-input>
              <img src="@/static/icon/order/edit/tic_3.svg" v-if="addPackSeachCheckAll" @click="clickAddPackCheckAll" />
              <img src="@/static/icon/order/edit/tic_4.svg" v-else @click="clickAddPackCheckAll" />
              <span class="text" @click="clickAddPackCheckAll">Tất cả</span>
            </div>
            <div class="list-wrap" v-if="itemAddPackArrFilter.length">
              <div
                class="line-item"
                :class="[item.checked ? 'active' : '']"
                @click="selectPackToDelivery(item)"
                v-for="item in itemAddPackArrFilter" :key="item.id">
                <span>{{ item.bill_code }}</span>
                <img v-if="item.checked" src="@/static/icon/delivery/list/Check-Circle.svg" />
              </div>
            </div>
            <div class="list-wrap text-center pt-3" v-if="itemAddPackArrFilter.length == 0 && itemAddPackLoading == false">
              <span>Không có kiện nào có thể thêm</span>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="dialogAddPackVisible = false"
                  >Hủy bỏ</span>
                <span
                  class="btn-common frame-hover-2022 btn-success"
                  :class="!addPackCanSubmit ? 'disable' : ''"
                  @click="submitAddPackToDelivery()"
                  >
                    <span v-if="!addPackCanSubmit">
                      <i class="el-icon-loading"></i>
                    </span>
                    <span>Thêm kiện</span>
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
        receiver: "",
        phone_number: "",
        bill_code: "",
        postcode: "",
        shipper_phone_number: "",
        transporter_id: "",
        transporter_detail_id: "",
        payment: "",
        date_from: null,
        date_to: null,
        warehouse_id: "",
        is_paid_extend: "", // Trạng thái thanh toán
        is_received: "",
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
        reports: {
          time: {},
        },
      },

      // Demo
      input: "",
      input2: "",

      // Show Chi tiết kiện
      dialogShowPackVisible: false,

      dialogShowPackLoading: false,
      dialogShowActivityLoading: false,
      tableDataDetail: [
        {
          time: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      tableListDeliveryPack: [],
      tableLogDeliveryPack: [],

      // Tự động lưu
      autoSaveStart: false,
      autoSaveData: [],

      // Ghi chú:
      dialogNoteVisible: false,
      itemNoteArr: [],

      // Thêm kiện vào giao hàng
      dialogAddPackVisible: false,
      itemDeliverySelected: {},
      itemAddPackLoading: false,
      itemAddPackArr: [],
      addPackSeachText: "",
      addPackSeachCheckAll: false,
      addPackCanSubmit: true,
      addPackSeachChecked: [],
    };
  },

  computed: {
    itemAddPackArrFilter() {
      return this.itemAddPackArr.filter((samsung) => {
        return this.addPackSeachText.toLowerCase().split(' ').every(v => samsung.bill_code.toLowerCase().includes(v));
      });
    }
  },
  mounted() {
    this.fetchDelivery();
    this.scrollTopST();
    this.fetchCategory();
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
      axios.get("common/delivery").then((response) => {
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
    fetchDelivery(loading = true) {
      if (loading) {
        this.loading = true;
      }

      let filter = {
        receiver: this.filter.receiver,
        phone_number: this.filter.phone_number,
        bill_code: this.filter.bill_code,
        postcode: this.filter.postcode,
        shipper_phone_number: this.filter.shipper_phone_number,
        transporter_id: this.filter.transporter_id,
        transporter_detail_id: this.filter.transporter_detail_id,
        payment: this.filter.payment,
        warehouse_id: this.filter.warehouse_id,
        is_paid_extend: this.filter.is_paid_extend,
        is_received: this.filter.is_received,
        status: this.filter.status,

        page: this.filter.page,
        per_page: this.filter.per_page,
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

      axios.get("delivery", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;

            this.tableData.map(function (i) {
              i.info.extend.extend_cost = parseInt(i.info.extend.extend_cost);
              if (i.info.extend.extend_cost == 0) {
                i.info.extend.extend_cost = "";
              }
              return i;
            });

            // Tự động lưu
            this.autoSaveData = JSON.parse(JSON.stringify(this.tableData));
            this.autoSaveStart = false;
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
      this.fetchDelivery();
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

      axios.get("delivery/" + item.id).then((response) => {
        this.dialogShowPackLoading = false;
        switch (response.code) {
          case 200:
            this.tableListDeliveryPack = response.data.packages;
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            break;
        }
      });

      axios.get("activity/delivery/" + item.id).then((response) => {
        this.dialogShowPackLoading = false;
        switch (response.code) {
          case 200:
            this.tableLogDeliveryPack = response.data;
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
    showPackRoute(item) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: item.id },
      });
    },

    // Xử lý lưu tự động
    saveAuto() {
      if (this.autoSaveStart) {
        // compare object js
        // https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

        let indexSave = 0;
        this.tableData.forEach((item, index) => {
          if (
            JSON.stringify(item) !== JSON.stringify(this.autoSaveData[index])
          ) {
            indexSave = index;
          }
        });
        this.autoSaveData = JSON.parse(JSON.stringify(this.tableData));
        this.saveAutoAction(indexSave);
      }
      this.autoSaveStart = true;
    },
    saveAutoAction(index) {
      console.log("Index" + index);
      let model = this.tableData[index];
      let data = {
        extend_cost: model.info.extend.extend_cost,
        is_paid_extend: model.info.extend.is_paid_extend,
        postcode: model.info.info_po_shi.postcode,
        shipper_phone_number: model.info.info_po_shi.shipper_phone_number,
        note: model.info.notes.staff,
        status: model.status.value,
      };
      axios.patch("delivery/" + model.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$message({
              message: "Cập nhật thành công",
              type: "success",
            });
            this.fetchDelivery(false);
            break;
          case 422:
            console.log(response.data);
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

    // Hiển thị ghi chú
    showNote(row) {
      this.dialogNoteVisible = true;
      this.itemNoteArr = row.info.notes.data;
    },

    // Thêm kiện vào Giao hàng
    clickAddPackToDelivery(item) {
      this.dialogAddPackVisible = true;
      this.itemAddPackLoading = true;
      this.itemAddPackArr = [];
      this.itemDeliverySelected = item;
      console.log(item);
      axios.get("package/" + item.customer.id + "/vn").then((response) => {
        this.itemAddPackLoading = false;
        switch (response.code) {
          case 200:
            this.itemAddPackArr = response.data;
            this.itemAddPackArr.map(function (i) {
              i.checked = false;
              if (i.bill_code == null) {
                i.bill_code = "";
              }
              return i;
            });
            this.itemAddPackArr = JSON.parse(JSON.stringify(this.itemAddPackArr));
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
    clickAddPackCheckAll() {
      this.addPackSeachCheckAll = !this.addPackSeachCheckAll;
      this.itemAddPackArr.forEach((item) => {
        item.checked = this.addPackSeachCheckAll;
      });
    },
    selectPackToDelivery(item) {
      item.checked = !item.checked;
    },
    submitAddPackToDelivery() {
      let packageAdd = [];
      this.itemAddPackArr.forEach((item) => {
        if (item.checked) {
          packageAdd.push(item.id);
        }
      });
      if (packageAdd.length == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ít nhất 1 kiện cần thêm",
          type: "warning",
        });
        return;
      }
      this.addPackCanSubmit = false;
      let data = {
        packages: {
          add: packageAdd
        }
      }

      axios.put("delivery/" + this.itemDeliverySelected.id, data).then((response) => {
        this.addPackCanSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm kiện hàng thành công",
              type: "success",
            });
            this.dialogAddPackVisible = false;
            this.itemDeliverySelected.info.packages.quantity += packageAdd.length;
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

    // Chuyển sang màn hình cập nhật
    showUpdateDelivery(item) {
      this.$router.push({
        name: "delivery-update",
        params: { delivery_id: item.id },
      });
    },

    // Xóa giao hàng
    confirmDeleteModel(order) {
      this.$confirm("Xác nhận xóa giao hàng ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(order);
        })
        .catch(() => {});
    },
    deleteModel(order) {
      axios.delete("delivery/" + order.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa bản ghi thành công",
              type: "success",
            });
            this.fetchDelivery();
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

    // In phiếu xuất kho
    printDeliveryBill(item) {
      this.$router.push({
        name: "delivery-bill",
        params: { delivery_id: item.id },
      });
    },

    // In phiếu giao hàng
    printDeliveryNote(item) {
      // this.$router.push({
      //   name: "delivery-note",
      //   params: { delivery_id: item.id },
      // });

      let routeData = this.$router.resolve({name: 'delivery-note', params: {delivery_id: item.id}})
      window.open(routeData.href, '_blank')
    },

    // Check xem có đc hiện nút update trạng thái không
    showCanUpdate(value) {
      if (value == 'status_2' || value == 'status_3') {
        return false;
      }
      return true;
    }
  },
  watch: {
    "filter.transporter_id": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.transporter_detail_id": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.payment": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.warehouse_id": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.is_paid_extend": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.is_received": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchDelivery();
    },

    // Xử lý lưu tự động
    tableData: {
      handler: function () {
        console.log("@!321");
        clearTimeout(this.timer);
        let _this = this;
        this.timer = setTimeout(function () {
          _this.saveAuto();
        }, 800);
      },
      deep: true,
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

/*Đè Dialog form*/
.delivery-list-form-note .header-1988 {
  background-color: #0688ee;
}

/*Thêm kiện vào giao hàng*/
.delivery-list-add-pack .header-1988 {
  background: #0688ee;
}
.delivery-list-add-pack .search-wrap img {
  margin-left: 10px;
  cursor: pointer;
}
.delivery-list-add-pack .search-wrap .text {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #000728;
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  width: 60px;
  text-transform: inherit;
  cursor: pointer;
  user-select: none;
}
.delivery-list-add-pack .list-wrap {
  margin-top: 10px;
  height: 200px;
  overflow-y: scroll;
}
.delivery-list-add-pack .line-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdd6ee;
  padding: 0px 5px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
.delivery-list-add-pack .line-item:hover {
  background: #f6f6f6;
}
.delivery-list-add-pack .line-item.active {
  background: #e8f3ff;
}

/*// Trạng thái:*/
.delivery-list .count-status-top-3388.status {
  width: calc(100% - 35px);
  display: inline-block;
  font-size: 12px;
  padding: 3px 18px;
  border-radius: 5px;
}
</style>

<style>
.delivery-list .frame-select-common-2022 input {
  font-size: 12px;
}
.delivery-list .frame-input-common-2022 input {
  font-size: 12px;
}
.delivery-list .frame-input-common-2022 textarea {
  font-size: 12px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Trạng thái */
.delivery-list .status-withdrawal-2022 {
  border-radius: 4px;
  margin-bottom: 5px;
}
.delivery-list .status-withdrawal-2022 input {
  font-size: 12px;
  background: none;
  color: #fff;
  border: none !important;
}
.delivery-list .status-withdrawal-2022 .el-input--suffix .el-input__inner {
  height: 25px;
}
.delivery-list .status-withdrawal-2022 .el-input__icon {
  line-height: 25px !important;
}
.delivery-list .status-withdrawal-2022 .el-icon-arrow-up::before {
  color: #fff !important;
}
.delivery-list .status-withdrawal-2022 .el-icon-arrow-down::before {
  color: #fff !important;
}
.delivery-list .status-withdrawal-2022 .el-input.is-disabled .el-input__inner {
  background: none !important;
  color: #fff;
}
.delivery-list .status-withdrawal-2022 .el-input.is-disabled .el-input__suffix {
  display: none !important;
}
</style>

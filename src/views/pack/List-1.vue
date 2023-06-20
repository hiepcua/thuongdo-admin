<template>
  <div class="pack-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Đơn hàng</span>
      </div>
      <div class="d-flex flex-wrap frame-line-filter-2022">
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã vận đơn"
            v-model="filter.bill_code"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đặt hàng"
            v-model="filter.code_po"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.order_code"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Mã tài khoản"
            v-model="filter.customer_code"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.customer_phone"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-phone">
          <el-input
            placeholder="Họ và tên"
            v-model="filter.customer_name"
            class="frame-input-common-2022"
            size="mini"
            clearable
            @keyup.enter.native="fetchPack"
          ></el-input>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.delivery_type"
            placeholder="Loại vận chuyển"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
            @keyup.enter.native="loadingNew"
          >
            <el-option
              v-for="item in listDelivery_types"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.ecommerce"
            placeholder="Chọn website"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
            @keyup.enter.native="fetchPack"
          >
            <el-option
              v-for="item in listEcommerce"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022">
          <el-select
            v-model="filter.category_id"
            placeholder="Chọn danh mục sản phẩm"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
            @keyup.enter.native="fetchPack"
          >
            <el-option
              v-for="item in listCategoriOrder"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Tìm kiếm nâng cao</span>
      </div>
      <!--  -->
      <div class="d-flex flex-wrap">
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
              v-for="item in listUserOrder"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_quotation_id"
            placeholder="Chọn nhân viên báo giá"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listQuote"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.staff_care_id"
            placeholder="Chọn nhân viên chăm sóc"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCare"
              :key="item.id"
              :label="item.nam"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.warehouse_id"
            placeholder="Chọn kho nhận hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listWarehouse"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-staff">
          <el-select
            v-model="filter.warehouse_cn"
            placeholder="Chọn kho nhận hàng TQ"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listWarehouseCN"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.type"
            placeholder="chọn loại hàng"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.status"
            placeholder="Chọn trạng thái"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
            @keyup.enter.native="fetchPack"
          >
            <el-option
              v-for="item in statusesPack"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.modify_key"
            placeholder="chọn cập nhật"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listmodifies"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.status_extend"
            placeholder="chọn loại kiện"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2022 filter-level">
          <el-select
            v-model="filter.request_key"
            placeholder="chọn yêu cầu"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listrequests"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!--  -->
        <div class="d-flex flex-wrap">
          <div class="frame-item-filter-2022">
            <span class="title">Ngày tạo mã vận đơn</span>
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
      </div>
      <!--  -->
      <!--  -->
      <div class="btn-seach-wrap my-4" @click="loadingNew()">
        <span class="frame-btn-seach-2022">Tìm kiếm</span>
      </div>
      <div class="frame-content-title-2022">
        <img src="@/static/icon/action/to-right.svg" alt="" />
        <span>Thống kê</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-wrap" v-if="listCommon.reports">
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Hôm nay</span>
            <span class="count">{{ listCommon.reports.time.today }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tuần nay</span>
            <span class="count">{{ listCommon.reports.time.week }}</span>
          </div>
          <div class="frame-icon-date-statistic-2022">
            <span class="title">Tháng nay</span>
            <span class="count">{{ listCommon.reports.time.month }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center my-3">
        <div class="d-flex flex-wrap">
          <div
            class="frame-icon-2022 icon-1 d-flex align-items-center justify-content-center"
            @click="showDelivery()"
          >
            <img src="@/static/icon/pack/car.svg" alt="" />
            <span>Thêm giao hàng</span>
          </div>
          <div
            class="frame-icon-2022 icon-2 d-flex align-items-center justify-content-center"
          >
            <img src="@/static/icon/pack/pack.svg" alt="" />
            <span>Cập nhật trạng thái</span>
          </div>
          <div
            class="frame-icon-2022 icon-3 d-flex align-items-center justify-content-center"
            @click="printWindow()"
          >
            <img src="@/static/icon/pack/in.svg" alt="" />
            <span>Bản in</span>
          </div>
          <div
            class="frame-icon-2022 icon-4 d-flex align-items-center justify-content-center"
            @click="loadingNew()"
          >
            <img src="@/static/icon/pack/load.svg" alt="" />
            <span>Làm mới</span>
          </div>
          <!-- kiện đã về VN -->
          <div class="d-flex align-items-center">
            <div class="frame-filter-item-2022 pack-list-status-10" @click="getPackToVN()">
              <span class="text">Kiện hàng đã về VN</span>
              <span class="count">{{ countPackToVN }}</span>
            </div>
            <div class="cancelPackToVN ml-2">
              <img
                src="@/static/icon/pack/list/delete.svg"
                v-if="showPackToVN"
                @click="closeShowPackVN()"
              />
            </div>
          </div> 
          <!--  -->
        </div>
        <div class="order-list-total-money" v-if="listCommon.reports">
          <span class="title">Tổng tiền thiếu</span>
          <span class="number">{{ listCommon.reports.debt_cost | vnd }}</span>
        </div>
      </div>
      <!-- table -->
      <div class="table-element-custom-2022 order-list-table tablePack">
        <el-table
          style="width: 100%"
          stripe
          border
          :data="tableData"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column label="STT" width="50" align="center" type="index">
          </el-table-column>
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="Thông tin kiện hàng" width="200">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <div class="pack-status d-flex align-items-center">
                  <div>
                    <el-input
                      v-if="scope.row.editDone == false"
                      v-model="scope.row.info.bill_code"
                      placeholder="Mã vận đơn"
                      @keyup.enter.native="addCode(scope.row)"
                    ></el-input>
                    <span v-else>{{ scope.row.info.bill_code }}</span>
                  </div>
                  <div
                    v-if="scope.row.info.bill_code !== null"
                    class="editPack"
                    @click="editBillCode(scope.row)"
                  >
                    <img
                      class="pl-2 pt-1"
                      src="@/static/icon/pack/list/edit.svg"
                      alt=""
                    />
                  </div>
                </div>
                <!--  -->
                <div class="pack-status d-flex align-items-center">
                  <div v-if="scope.row.editDone3 == true" class="mr-1">
                    <span>MĐH:</span>
                  </div>
                  <div>
                    <el-input
                      v-if="scope.row.editDone3 == false"
                      v-model="scope.row.order.code_po"
                      placeholder="Mã đặt hàng"
                      @keyup.enter.native="addCode_po(scope.row)"
                    ></el-input>
                    <span v-else>{{ scope.row.order.code_po }}</span>
                  </div>
                  <div
                    v-if="scope.row.order.code_po !== null"
                    class="editPack"
                    @click="editCode_po(scope.row)"
                  >
                    <img
                      class="pl-2 pt-1"
                      src="@/static/icon/pack/list/edit.svg"
                      alt=""
                    />
                  </div>
                </div>
                <!--  -->
                <div class="pack-status d-flex align-item-center">
                  <div>
                    <div v-if="scope.row.editDone2 == false">
                      <el-select
                        v-model="scope.row.info.transporter"
                        @change="addTrans(scope.row)"
                        placeholder="Hãng vận chuyển"
                        class="frame-select-common-2022"
                        popper-class="frame-select-popper-common-2022"
                        size="mini"
                      >
                        <el-option
                          v-for="item in listTrans"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <span v-else>{{ scope.row.info.transporter }}</span>
                  </div>
                  <div
                    v-if="scope.row.info.transporter !== null"
                    class="editPack"
                    @click="editTrans(scope.row)"
                  >
                    <img
                      class="pl-2 pt-1"
                      src="@/static/icon/pack/list/edit.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <span
                    class="order-detail-icon-status-6868amg"
                    style="background: #26b01c"
                    >{{ scope.row.info.warehouse_code }}</span
                  >
                </div>
                <div>
                  <div class="car-check-pack">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Phí kiểm đếm"
                      placement="top"
                    >
                      <img
                        src="@/static/icon/order/pack/check-11.svg"
                        v-if="scope.row.info.is_inspection"
                      />
                      <img src="@/static/icon/order/pack/check-0.svg" v-else />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Phí bảo hiểm"
                      placement="top"
                    >
                      <img
                        src="@/static/icon/order/pack/khieng-11.svg"
                        v-if="scope.row.info.is_insurance"
                      />
                      <img src="@/static/icon/order/pack/khieng-0.svg" v-else />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Phí đóng gỗ"
                      placement="top"
                    >
                      <img
                        src="@/static/icon/order/pack/pack-1.svg"
                        v-if="scope.row.info.is_woodworking"
                      />
                      <img src="@/static/icon/order/pack/pack-0.svg" v-else />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="Đã gửi yêu cầu ship"
                      placement="top"
                    >
                      <img
                        src="@/static/icon/order/pack/car-11.svg"
                        v-if="scope.row.info.is_delivery"
                      />
                      <img src="@/static/icon/order/pack/car-00.svg" v-else />
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Khách hàng" width="150">
            <template slot-scope="scope">
              <div class="d-flex flex-column info-common-table">
                <span class="name">{{ scope.row.customer.name }}</span>
                <span
                  v-if="scope.row.customer.phone_number !== null"
                  class="d-flex align-items-center"
                  ><img
                    class="pr-1"
                    src="@/static/icon/pack/phone.svg"
                    alt=""
                  />
                  {{ scope.row.customer.phone_number }}</span
                >
                <div class="d-flex align-items-center infoKH">
                  <span style="background: #f09920">{{
                    scope.row.customer.warehouse
                  }}</span>
                  <span class="ml-1" style="background: #207cdc">{{
                    scope.row.customer.level
                  }}</span>
                </div>
                <span v-if="scope.row.customer.code !== null" class="code"
                  >MTK: {{ scope.row.customer.code }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Nhân viên" header-align="center">
            <el-table-column label="Tư vấn" width="130" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.staffs.counselor">{{
                  scope.row.staffs.counselor.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Đặt hàng" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.staffs.order">{{
                  scope.row.staffs.order.name
                }}</span>
                <div class="pb-1">
                  <el-input
                    placeholder="Ghi chú cho khách hàng"
                    v-model="scope.row.notes.order.content"
                    class="frame-input-common-2022 input-order"
                    size="mini"
                    type="textarea"
                    clearable
                    @keyup.enter.native="sentFeedBackV2(scope.row)"
                  ></el-input>
                </div>
                <div class="count-note-packlist d-flex align-items-center">
                  <img class="pr-1" src="@/static/icon/order/edit/note.svg" />
                  <span @click="showNote(scope.row)">
                    {{
                      scope.row.notes.order.quantity == null
                        ? 0
                        : scope.row.notes.order.quantity
                    }}
                    Ghi chú cho khách hàng</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Chăm sóc" width="130" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.staffs.care">{{
                  scope.row.staffs.care.name
                }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="Mã đặt hàng / ghi chú" width="160">
            <template slot-scope="scope">
              <div
                class="d-flex flex-column justify-content-center info-common-table"
              >
                <span>{{ scope.row.order.code_po }}</span>
                <span class="d-flex align-items-center"
                  ><img class="pr-1" src="@/static/icon/pack/date.svg" alt="" />
                  {{ scope.row.order.created_at }}</span
                >
                <div class="pack-status d-flex align-items-center">
                  <img class="pr-1" src="@/static/icon/pack/box.svg" alt="" />
                  <div>
                    <el-input
                      v-if="scope.row.editDone5 == false"
                      v-model="scope.row.order.package_number"
                      placeholder="Mã vận đơn"
                      @keyup.enter.native="addPackNum(scope.row)"
                    ></el-input>
                    <span v-else>{{ scope.row.order.package_number }}</span>
                  </div>
                  <div class="pl-1" v-if="scope.row.editDone5 == true">
                    <span>Kiện</span>
                  </div>
                  <div
                    v-if="scope.row.info.bill_code !== null"
                    class="editPack"
                    @click="editPackNum(scope.row)"
                  >
                    <img
                      class="pl-2 pt-1"
                      src="@/static/icon/pack/list/edit.svg"
                      alt=""
                    />
                  </div>
                </div>
                <!--  -->
                <div class="pb-1">
                  <el-input
                    placeholder="Ghi chú nội bộ"
                    v-model="scope.row.notes.note.content"
                    class="frame-input-common-2022 input-order"
                    size="mini"
                    type="textarea"
                    clearable
                    @keyup.enter.native="editNotePackV2(scope.row)"
                  ></el-input>
                </div>
                <div class="count-note-packlist d-flex align-items-center">
                  <div>
                    <img class="pr-1" src="@/static/icon/order/edit/note.svg" />
                  </div>
                  <span @click="showNotePack(scope.row)">
                    {{
                      scope.row.notes.note.quantity == null
                        ? 0
                        : scope.row.notes.note.quantity
                    }}
                    ghi chú nội bộ</span
                  >
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Loại kiện" width="200" property="type">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <div v-for="i in scope.row.type" :key="i">
                  <div class="type-pack" v-if="i !== null">
                    <span>{{ i }}</span>
                  </div>
                </div>
              </div>
              <div
                class="editPack d-flex align-content-center"
                @click="showEditPack(scope.row)"
              >
                <img src="@/static/icon/pack/list/edit.svg" alt="" />
                <span class="pl-1 textEdit">Sửa danh mục hàng hóa</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thông tin kiện hàng" width="260">
            <template slot-scope="scope">
              <!--  -->
              <div v-if="scope.row.info.wv">
                <div>
                  <!--  -->
                  <div class="d-flex align-content-center">
                    <el-input
                      placeholder=""
                      v-model="scope.row.info.wv.result"
                      class="frame-input-common-2022 input-v1 mr-1"
                      size="mini"
                      type="number"
                      clearable
                      @keyup.enter.native="addWeight(scope.row)"
                    ></el-input>
                    <el-select
                      v-model="scope.row.info.wv.type"
                      placeholder="Chọn"
                      class="frame-select-common-2022 select-v2"
                      popper-class="frame-select-popper-common-2022"
                      size="mini"
                      @change="editTypeUnit(scope.row)"
                    >
                      <el-option
                        v-for="item in listUnit"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <!-- dài rộng cao  -->
                  <div
                    class="inputVolume d-flex align-items-center mt-1"
                    v-if="scope.row.editDone4 == true"
                  >
                    <div class="d-flex align-content-center">
                      <el-input
                        placeholder="Dài"
                        v-model="scope.row.modelData.length"
                        class="inputV4 mr-1"
                        size="mini"
                        type="number"
                      ></el-input>
                      <el-input
                        placeholder="Rộng"
                        v-model="scope.row.modelData.width"
                        class="inputV4 mr-1"
                        size="mini"
                        type="number"
                      ></el-input>
                      <el-input
                        placeholder="Cao"
                        v-model="scope.row.modelData.height"
                        class="inputV4 mr-1"
                        size="mini"
                        type="number"
                      ></el-input>
                    </div>
                    <div
                      class="imageIcon d-flex align-items-center justily-content-center"
                      @click="updateVolume(scope.row)"
                    >
                      <img
                        class="pl-1"
                        src="@/static/icon/pack/list/vector.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <!--  -->
                </div>
              </div>
              <!--  -->
              <div class="d-flex align-items-center">
                <div class="pack-status">
                  <el-input
                    v-model="scope.row.costs.china_shipping_cost_cny"
                    placeholder="Phí vận chuyển nội địa"
                    type="number"
                    @keyup.enter.native="addFree(scope.row)"
                  ></el-input>
                </div>
                <span class="pl-2">¥</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Tình trạng" width="160">
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
                    v-for="item in statusesPack"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Phí khác" width="200" fixed="right">
            <template slot-scope="scope">
              <div
                class="d-flex align-items-center justify-content-between item-note"
              >
                <div class="d-flex align-items-center">
                  <img src="@/static/icon/pack/icon-1.svg" alt="" />
                  <span>Phí kiểm đếm</span>
                </div>
                <span>{{ scope.row.costs.inspection_cost | vnd }}</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between item-note"
              >
                <div clas="d-flex align-items-center">
                  <img src="@/static/icon/pack/icon-2.svg" alt="" />
                  <span>Phí bảo hiểm</span>
                </div>
                <span>{{ scope.row.costs.insurance_cost | vnd }}</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between item-note"
              >
                <div class="d-flex align-items-center">
                  <img src="@/static/icon/pack/icon-3.svg" alt="" />
                  <span>Phí đóng gỗ</span>
                </div>
                <span>{{ scope.row.costs.woodworking_cost | vnd }}</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between item-note"
              >
                <div class="d-flex align-items-center">
                  <img src="@/static/icon/pack/icon-4.svg" alt="" />
                  <span>Phí chống sốc</span>
                </div>
                <span>{{ scope.row.costs.shock_proof_cost | vnd }}</span>
              </div>
              <div
                class="d-flex justify-content-between align-items-center item-note"
              >
                <div class="d-flex align-items-center">
                  <img src="@/static/icon/pack/icon-5.svg" alt="" />
                  <span>Phí lưu kho</span>
                </div>
                <span>{{ scope.row.costs.storage_cost | vnd }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Chiết khấu" align="center" fixed="right">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span>{{ scope.row.costs.discount_percent }} %</span>
                <span>{{ scope.row.costs.discount_cost | vnd }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thành tiền" fixed="right">
            <template slot-scope="scope">
              <div class="colorRed">
                <span>{{ scope.row.costs.amount | vnd }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" align="center" fixed="right">
            <template slot-scope="scope">
              <div class="item-action" @click="showDetailPack(scope.row)">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xem chi tiết"
                  placement="top"
                >
                  <img src="@/static/icon/pack/action1.svg" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content=""
                  placement="top"
                >
                  <img src="@/static/icon/pack/action2.svg" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content=""
                  placement="top"
                >
                  <img src="@/static/icon/pack/action3.svg" />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- ghi chú nội bộ  -->
        <div class="frame-dialog-no-close-1988 form-note">
          <el-dialog
            top="150px"
            width="750px"
            :close-on-click-modal="false"
            :visible.sync="dialogNotePackVisible"
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
                  :data="itemNoteArrV2"
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
                    @click="dialogNotePackVisible = false"
                    >Hủy bỏ</span
                  >
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
        <!-- ghi chú order -->
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
              <span>Ghi chú</span>
            </div>
            <div class="body-1988">
              <div class="table-element-custom-2022-v2 pt-3">
                <el-table
                  :data="itemNoteArr"
                  style="width: 100%"
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
                    @click="cancelNoteItem()"
                    >Hủy bỏ</span
                  >
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
        <!-- Sửa kiện -->
        <div class="dialog-frame-normal-2022">
          <el-dialog :visible.sync="dialogEditVisible" width="400px" center>
            <span
              slot="title"
              class="d-flex flex-row justify-content-start align-items-start"
            >
              <img src="@/static/icon/pack/list/packedit.svg" alt="" />
              <span class="px-2 d-flex justify-content-center">
                Sửa loại kiện
              </span>
            </span>
            <div class="d-flex">
              <select-search
                :items="listCategori"
                @change="setSelectedUser"
                :value="selectedUser"
              ></select-search>
            </div>
            <template #footer>
              <div class="d-flex flex-row justify-content-end align-items-end">
                <div
                  class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
                  @click="dialogEditVisible = false"
                >
                  <span>Huỷ bỏ</span>
                </div>
                <div
                  class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
                  @click="updateStaffOrderForCustomer()"
                >
                  <span>Sửa loại kiện</span>
                </div>
              </div>
            </template>
          </el-dialog>
        </div>
        <!--  -->
      </div>
      <div
        class="china-panigation-1988 d-flex justify-content-end pt-1"
      >
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
      <!-- table -->

      <!-- // Kiện đã về VN -->
      <div class="pack-to-VN" v-if="showPackToVN">
        <div class="table-element-custom-2022 order-list-table tablePack" >
          <el-table style="Width: 100%" border>
            <el-table-column label="Ngày đặt hàng"></el-table-column>
            <el-table-column label="Mã đơn hàng"></el-table-column>
            <el-table-column label="Tổng tiền"></el-table-column>
            <el-table-column label="Tạm ứng" width="280"></el-table-column>
            <el-table-column label="Còn lại" width="250"></el-table-column>
          </el-table>
        </div>
        <div class="line-total">
          <span class="line-1">Số dư ví</span>
          <span class="line-2">{{ reportsPackToVN.e_wallet | vnd }}</span>
        </div>
        <div class="line-total">
          <span class="line-1">Tiền hàng còn thiếu</span>
          <span class="line-2">{{
            reportsPackToVN.orders_remainder_fee | vnd
          }}</span>
        </div>
        <div class="line-total">
          <span class="line-1">Tổng phí vận chuyển</span>
          <span class="line-2">{{ reportsPackToVN.total_shipping | vnd }}</span>
        </div>
        <div class="line-total">
          <span class="line-1">Số dư còn lại</span>
          <span class="line-2">{{ reportsPackToVN.balance | vnd }}</span>
        </div>
        <div class="line-total">
          <span class="line-1">Cần nạp thêm</span>
          <span class="line-2 color-green">{{
            reportsPackToVN.recharge | vnd
          }}</span>
        </div>
      </div>
      <!--  -->
      <div></div>
    </div>
  </div>
</template>

<script>
import ls from "local-storage";
import axios from "axios";
import SelectSearch from "@/components/UI/Selection/SelectSearch";
export default {
  name: "ListPack",
  metaInfo() {
    return {
      title: "Danh sách kiện hàng",
    };
  },
  components: {
    SelectSearch,
  },
  data() {
    return {
      loading: true,
      dialogVisible: false,
      dialogVisibleNotePack: false,
      dialogVisibleEditBillCode: false,
      selectedUser: {},
      dialogNoteVisible: false,
      dialogNotePackVisible: false,
      dialogEditVisible: false,
      textarea: "",
      itemNoteArr: [],
      itemNoteArrV2: [],
      textareaPack: "",
      fineDetailId: "",
      fineDetailIdPack: "",
      filter: {
        date_from: null,
        date_to: null,
        customer_id: "",
        customer_name: "",
        customer_phone: "",
        customer_code: "",
        bill_code: "", // mã vận đơn
        code_po: "", //mã đặt hàng
        order_code: "", // Mã đơn hàng
        phone: "",
        category_id: "", // danh mục sản phẩm
        delivery_type: "",
        statuses: "",
        ecommerce: "", //chọn website
        //
        status_extend: "",
        type: "", //loại hàng
        warehouse_id: "",
        warehouse_cn: "",
        staff_order_id: "", //nv đặt hàng
        staff_quotation_id: "", //nv Báo giá
        staff_care_id: "", //nv chăm sóc
        status: "", // loại kiện
        request_key: "", // loại yêu cầu
        modify_key: "", //loại cập nhật
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
      input: "",
      // list
      tableData: [],
      listCommon: [],
      listCategori: [],
      listCategoriOrder: [],
      listTrans: [],
      listType: [], //loại hàng
      listWarehouse: [],
      listWarehouseCN: [],
      listStatus: [], // loại kiện
      listUserOrder: [], //nv đặt hàng
      listCounselor: [], //nv tư vấn
      listQuote: [], //nv báo giá
      listCare: [], //nv chăm sóc
      listrequests: [], //loại yêu cầu
      listmodifies: [], // loại cập nhật
      listEcommerce: [], //website
      listDelivery_types: [], //loại vận chuyển
      listStatuses: [], //trạng thái
      listUnit: [], // đơn vị
      selectedRow: {},
      statusesPack: [],
      // check
      listPackSelect: [],
      listLs: [],
      customer_id: "",
      // Xử lý phần xem kiện đã về VN
      showPackToVN: false,
      countPackToVN: 0,
      reportsPackToVN: {
        orders: [],
      },
    };
  },
  mounted() {
    this.fetchPack();
    this.fetchCommon();
    this.initPackToVN();
  },
  methods: {
    loadingNew() {
      this.fetchPack((this.loading = true));
    },
    setSelectedUser(item) {
      this.selectedUser = item;
    },
    updateStaffOrderForCustomer() {
      let data = {
        category_id: this.selectedUser.id,
      };
      this.updateModelCat(data);
      this.dialogEditVisible = false;
    },
    //
    printWindow: function () {
      window.print();
    },
    // showOne(value) {
    //   this.listPackSelect = value;
    //   this.filter.customer_id = this.listPackSelect[0].customer.id;
    //   console.log("123", this.filter.customer_id);
    //   let filter = {
    //     customer_id: this.filter.customer_id,
    //   }
    //   axios.get("package", { params: filter }).then((response) => {
    //     this.loading = false;
    //     switch (response.code) {
    //       case 200:
    //         this.tableData = response.data.items;
    //         this.pagination.total = response.data.pagination.total;
    //         this.pagination.per_page = response.data.pagination.per_page;
    //         break;
    //       default:
    //         this.$notify.error({
    //           title: "Error",
    //           message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
    //         });
    //         break;
    //     }
    //   });
    // },
    // Lấy dữ liệu
    fetchPack() {
      let filter = {
        customer_id: this.filter.customer_id,
        order_code: this.filter.order_code,
        code_po: this.filter.code_po,
        bill_code: this.filter.bill_code,
        customer_code: this.filter.customer_code,
        customer_name: this.filter.customer_name,
        customer_phone: this.filter.customer_phone,
        ecommerce: this.filter.ecommerce,
        category_id: this.filter.category_id,
        delivery_type: this.filter.delivery_type,
        //
        status_extend: this.filter.status_extend,
        status: this.filter.status,
        statuses: this.filter.statuses,
        warehouse_cn: this.filter.warehouse_cn,
        type: this.filter.type,
        modify_key: this.filter.modify_key,
        request_key: this.filter.request_key,
        page: this.filter.page,
        per_page: this.filter.per_page,
        staff_care_id: this.filter.staff_care_id,
        staff_order_id: this.filter.staff_order_id,
        staff_quotation_id: this.filter.staff_quotation_id,
        warehouse_id: this.filter.warehouse_id,
      };

      filter.bill_code_at = null;

      if (this.filter.date_from !== null) {
        filter.bill_code_at = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.bill_code_at = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.bill_code_at = this.filter.date_from + "," + this.filter.date_to;
        const x = new Date(this.filter.date_from);
        const y = new Date(this.filter.date_to);
        if (x > y) {
          this.$message.error();
          setTimeout(() => {
            this.filter.date_from = null;
          }, 800);
        }
      }

      axios.get("package", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
            this.tableData.map(function (i) {
              i.editDone = false;
              i.editDone2 = false;
              i.editDone3 = false;
              i.editDone4 = false;
              i.editDone5 = false;
              if (i.info.bill_code) {
                i.editDone = true;
              }
              if (i.info.transporter) {
                i.editDone2 = true;
              }
              if (i.order.code_po) {
                i.editDone3 = true;
              }
              if (i.order.package_number !== null) {
                i.editDone5 = true;
              }
              i.modelData = {
                height: "",
                width: "",
                length: "",
              };
              return i;
            });
            this.tableData = JSON.parse(JSON.stringify(this.tableData));
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
    // thêm 1 số trường
    addCode(row) {
      let data = {
        bill_code: row.info.bill_code,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            row.editDone = true;
            this.fetchPack();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Mã vận đơn đã tồn tại !",
            });
            break;
        }
      });
    },
    addPackNum(row) {
      row.editDone5 = true;
      let data = {
        package_number: row.order.package_number,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchPack();
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
    // Nhập dài rộng cao
    editTypeUnit(row) {
      if (row.info.wv.type == "volume") {
        row.editDone4 = true;
      } else {
        row.editDone4 = false;
      }
    },
    // edit mã đặt hàng
    addCode_po(row) {
      let data = {
        code_po: row.order.code_po,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            row.editDone3 = true;
            this.fetchPack();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Mã đặt hàng đã tồn tại !",
            });
            break;
        }
      });
    },
    // sửa phí
    addFree(row) {
      let data = {
        china_shipping_cost_cny: row.costs.china_shipping_cost_cny,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchPack();
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
    addNoteOrder(row) {
      this.dialogVisible = true;
      this.fineDetailId = row.info.id;
    },
    sentFeedBackV2(row) {
      this.canSubmit = false;
      let data = {
        note_ordered: row.notes.order.content,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm thành công",
              type: "success",
            });
            this.fetchPack();
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
    // thêm ghi chú pack
    editNotePackV2(row) {
      this.canSubmit = false;
      let data = {
        note: row.notes.note.content,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.fetchPack();
            this.$notify({
              title: "Thành công",
              message: "Thêm thành công",
              type: "success",
            });
            this.dialogVisibleNotePack = false;
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
    addWeight(row) {
      let data = {
        weight: row.info.wv.result,
        type: row.info.wv.type,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm thành công",
              type: "success",
            });
            this.fetchPack();
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
    addTypeUnit(row) {
      let data = {
        type: row.info.wv.type,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm thành công",
              type: "success",
            });
            this.fetchPack();
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
    updateVolume(row) {
      let data = {
        height: row.modelData.height,
        width: row.modelData.width,
        length: row.modelData.length,
        type: row.info.wv.type,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            row.editDone4 = false;
            this.$notify({
              title: "Thành công",
              message: "Thêm thành công",
              type: "success",
            });
            this.fetchPack();
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
    //
    editBillCode(row) {
      row.editDone = false;
    },
    editCode_po(row) {
      row.editDone3 = false;
    },
    editPackNum(row) {
      row.editDone5 = false;
    },
    editTrans(row) {
      row.editDone2 = false;
    },
    updateStatus(item) {
      this.deleteModel(item);
    },
    deleteModel(item) {
      let data = {
        status: item.status.value,
      };
      axios.patch("package/" + item.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchPack();
            this.initPackToVN();
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
    // danh mục
    fetchCommon() {
      axios.get("common/package").then((response) => {
        switch (response.code) {
          case 200:
            this.listCommon = response.data;
            this.listCategori = response.data.categories;
            this.listTrans = response.data.transporters;
            this.listUserOrder = response.data.staffs.order;
            this.listCounselor = response.data.staffs.counselor;
            this.listQuote = response.data.staffs.quote;
            this.listWarehouse = response.data.warehouses.vi;
            this.listWarehouseCN = response.data.warehouses.cn;
            this.listType = response.data.types;
            this.listStatus = response.data.status;
            this.listrequests = response.data.requests;
            this.listmodifies = response.data.modifies;
            this.listEcommerce = response.data.order.ecommerce;
            this.listDelivery_types = response.data.order.delivery_types;
            this.listStatuses = response.data.order.statuses;
            this.statusesPack = response.data.statuses;
            this.listCategoriOrder = response.data.order.categories;
            this.listUnit = response.data.units;
            this.listCare = response.data.staffs.care;
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
    //
    // chuyển hướng
    showDetailPack(row) {
      this.$router.push({
        name: "pack-detail",
        params: { pack_id: row.info.id },
      });
    },
    showNote(row) {
      this.dialogNoteVisible = true;
      this.itemNoteArr = row.notes.order.data;
    },
    showNotePack(row) {
      this.dialogNotePackVisible = true;
      this.itemNoteArrV2 = row.notes.note.data;
    },
    cancelNoteItem() {
      this.dialogNoteVisible = false;
    },
    showEditPack(row) {
      this.selectedRow = row.info.id;
      // if (undefined !== row.type && row.type !== null) {
      //   this.selectedUser = row.type;
      // } else {
      //   this.selectedUser = {};
      // }
      this.dialogEditVisible = true;
    },
    addTrans(row) {
      let data = {
        transporter_id: row.info.transporter,
      };
      axios.patch("package/" + row.info.id, data).then((response) => {
        switch (response.code) {
          case 200:
            // row.editDone2 = true;
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchPack();
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
    // update loại kiện
    updateModelCat(data) {
      axios.patch("package/" + this.selectedRow, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchPack();
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
    // xử ly check
    changeCheckChild(element) {
      element.checked = !element.checked;
    },
    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchPack();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
    // check kiện
    handleSelectionChange(value) {
      this.listPackSelect = value;
      this.listLs = [];
      this.listPackSelect.forEach((item) => {
        let dataLS = {
          customer_id: item.customer.id,
          customer_name: item.customer.name,
          customer_phone: item.customer.phone_number,
          pack_id: item.info.id,
          bill_code: item.info.bill_code,
          pack_status: item.status,
          china_shipping_cost: item.costs.china_shipping_cost,
          order_id: item.info.order_id,
        };
        this.listLs.push(dataLS);
      });
      // this.filter.customer_id = this.listPackSelect[0].customer.id;
      // console.log("123", this.filter.customer_id);
      // cùng 1
      // this.showOne(value);
      //
    },
    // check chuyển màn tạo giao hàng
    showDelivery() {
      if (this.listPackSelect.length == 0) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: "Vui lòng chọn kiện hàng cần giao",
          type: "warning",
        });
        return;
      }

      let bill_code_error = "";
      let bill_code_error_mess = "";
      this.listPackSelect.forEach((item) => {
        if (item.can_make_delivery == false) {
          bill_code_error = item.info.bill_code ? item.info.bill_code : 'cần giao hàng';
          bill_code_error_mess = item.reason_cant_make_delivery;
        }
      });
      if (bill_code_error) {
        let mes =
          "Kiện " +
          bill_code_error +
          " không thể tạo giao hàng vì " +
          bill_code_error_mess;
        this.$notify({
          title: "Có lỗi xảy ra",
          message: mes,
          type: "warning",
        });
        return;
      }

      ls("createDelivery", this.listLs);
      this.$router.push({
       name: "delivery-create",
     });
    },
    // Kiện về vn
    getPackToVN() {
      if (this.showPackToVN == false) {
        this.showPackToVN = true;
        this.filter.page = 1;
        this.filter.per_page = 15;
        this.filter.status = "status_10";
        this.loadingNew();
      }
    },
    closeShowPackVN() {
      this.showPackToVN = false;
      this.filter.page = 1;
      this.filter.per_page = 15;
      this.filter.status = "";
      this.loadingNew();
    },
    // Kiện về VN
    initPackToVN() {
      let filter = {
        status: "status_10",
        page: 1,
        per_page: 10000,
      };
      axios.get("package", { params: filter } + "/vn").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.countPackToVN = response.data.status_warehouse_vn.quantity;
            this.reportsPackToVN = response.data;
            console.log("123123", this.reportsPackToVN);
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
    "modelData.weight": function () {
      if (this.modelData.weight < 0) {
        this.modelData.weight = 1;
      }
    },
    "filter.category_id": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.order_code": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.code_po": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.bill_code": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.customer_code": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.statuses": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.ecommerce": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.customer_phone": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.customer_name": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.delivery_type": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.loadingNew();
    },
    // "filter.customer_id": function () {
    //   this.filter.page = 1;
    //   this.fetchPack();
    // },
  },
};
</script>

<style lang="css" scoped>
/*Đè chiều dài các ô lọc*/
.frame-item-filter-2022 {
  margin-top: 10px;
}
.frame-item-filter-2022.filter-phone {
  width: 115px;
}
.frame-item-filter-2022.filter-level {
  width: 140px;
}
.frame-item-filter-2022.filter-staff {
  width: 180px;
}
/* thao tác bảng */
.frame-icon-2022 {
  /* padding: 8px 0; */
  height: 36px;
  margin-right: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  cursor: pointer;
}
.frame-icon-2022 img {
  padding-right: 5px;
}
.frame-icon-2022.icon-1 {
  background: #0688ee;
  border-radius: 5px;
  width: 207px;
}
.frame-icon-2022.icon-2 {
  background: #26b01c;
  border-radius: 5px;
  width: 207px;
}
.frame-icon-2022.icon-3 {
  background: #45b4ce;
  border-radius: 5px;
  width: 116px;
}
.frame-icon-2022.icon-4 {
  background: #075970;
  border-radius: 5px;
  width: 116px;
}
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
.colorRed {
  color: #ed1c24 !important;
}
/* table Khách hàng */
.info-common-table span {
  margin-bottom: 5px;
}
.info-common-table .name {
  font-weight: 700;
}
.info-common-table .code {
  color: #fff;
  background: #383f57;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}
.infoKH span {
  font-size: 8px;
  color: #fff;
  border-radius: 4px;
  padding: 0 10px;
}
/* ghi chú  */
.count-note-packlist {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee !important;
  cursor: pointer;
}
</style>
<style>
/* table */
.pack-list .table-element-custom-2022 .el-table th.el-table__cell {
  background: #207cdc;
  text-align: center;
}
.pack-list .money {
  color: #ed1c24;
  text-align: center !important;
}
.pack-list .table-element-custom-2022 .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.pack-list .action-top {
  width: 200px !important;
}
.pack-list .action-top input {
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  height: 36px !important;
}
/* bảng  */
.pack-list .tablePack .item-note {
  padding-top: 7px;
  padding-bottom: 7px;
  border-bottom: 0.5px dashed #bdd6ee;
}
.pack-list .tablePack .item-note img {
  padding-right: 5px;
}
.pack-list .pack-status input {
  height: 28px;
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  color: #000728;
  margin: 5px 0;
}
.pack-list .pack-status .el-input__icon {
  line-height: 0;
}
.pack-list .item-action {
  cursor: pointer;
}
.pack-list .item-action img {
  padding-bottom: 10px;
}
.pack-list .typePack-2022 {
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  padding: 3px 13px;
  color: #0688ee !important;
  margin: 10px 0;
}
.order-detail-icon-status-6868amg {
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
.order-detail-icon-status-6868amg.poiter {
  cursor: pointer;
}
.el-dialog-header-2022 {
  background-color: #0688ee !important;
}
.editPack {
  cursor: pointer;
}
/* .dialogEdit2022 .body-1988 {
  padding: 15px 0;
} */
.car-check-pack {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.car-check-pack img {
  height: 13px;
  margin-right: 10px;
}
.pack-list .type-pack {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 3px 5px;
}
.pack-list .type-pack span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}
/* tình trạng */
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
.pack-list .select-v2 {
  width: 120px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.pack-list .input-v3 {
  width: 50px;
}
.pack-list .input-v3 input {
  padding-right: 10px;
}
.textEdit {
  font-style: italic;
  color: #207cdc;
}
.input-order input {
  border: 1px solid #207cdc !important;
}
.pack-list .imageIcon {
  background: #f09920;
  border-radius: 5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.pack-list .inputVolume {
  background: #45b4ce;
  border-radius: 7px;
  padding: 8px;
}
.pack-list .inputV4 input {
  padding-right: 10px;
  width: 60px;
}
.pack-list .form-note .header-1988 {
  background-color: #0688ee;
}
/*pack-list-status-10*/
.pack-list-status-10 {
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #f09920;
  border-radius: 5px;
  padding: 0 17px;
  height: 36px;
}
.pack-list-status-10 .text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #FFFFFF;
}
.pack-list-status-10 .count {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-left: 10px;
  font-weight: 400;
  font-size: 12px;
  background: #df4747;
  border-radius: 4px;
  padding: 7px 5px;
}
.pack-list-status-10 img {
  margin-left: 10px;
}
.cancelPackToVN {
  cursor: pointer;
}
.pack-to-VN .line-total {
  height: 50px;
  border-bottom: 1px solid #ebeef5;
  line-height: 50px;
  display: flex;
  justify-content: flex-end;
  color: #575757;
}
.pack-to-VN .line-total .line-1 {
  width: 280px;
}
.pack-to-VN .line-total .line-2 {
  width: 250px;
}
</style>

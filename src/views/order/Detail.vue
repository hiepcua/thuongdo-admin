<template>
  <div class="order-detail" id="ST2022">
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
      <div class="d-flex justify-content-between">
        <div class="order-update-title d-flex align-items-center">
          <img src="@/static/icon/order/edit/edit_2.svg" />
          <span>Chi tiết đơn hàng</span>
        </div>
        <div
          class="btn-detail-order d-flex align-items-center justify-content-end"
        >
          <span>Bản in</span>
          <span>Xuất Exel</span>
          <span @click="goBack()">Quay lại</span>
        </div>
      </div>
      <div v-if="orderDetail.info">
        <div class="error-order-detail d-flex flex-column" v-if="orderDetail.info.status.value == 'status_7' && orderDetail.error_log !== null">
          <span>Đơn hàng bị lỗi</span>
          <span>Lý do: {{ orderDetail.error_log.reson_text }}</span>
          <span>Nội dung: {{ orderDetail.error_log.note }} </span>
        </div>
      </div>
      <!--  -->
      <div class="content-detail-order mt-3">
        <el-row>
          <el-col :span="14">
            <div class="order-detail-info" v-if="orderDetail.info">
              <div class="order-detail-info-top d-flex align-items-center">
                <div class="order-detail-info-title d-flex align-items-center">
                  <span class="title">Mã đơn hàng: </span>
                  <span class="codeTitle">{{ orderDetail.info.code }}</span>
                  <span
                    class="count-status-top-3388 v2"
                    :style="{ backgroundColor: orderDetail.info.status.color }"
                    >{{ orderDetail.info.status.name }}</span
                  >
                </div>
                <div class="pl-5 date-top d-flex align-content-center">
                  <span class="title">Ngày đặt hàng:</span>
                  <span class="info"> {{ orderDetail.info.created_at }}</span>
                </div>
              </div>
              <!--  -->
              <div class="order-update-warehouse">
                <div class="order-update-warehouse-title">
                  <img src="@/static/icon/order/edit/maki_warehouse.svg" />
                  <span>Kho nhận hàng</span>
                </div>
                <div class="info-warehouse pl-4">
                  <span> {{ orderDetail.info.warehouse.custom_name }}</span>
                </div>
                <div class="order-update-warehouse-title mt-5">
                  <img
                    src="@/static/icon/order/edit/carbon_location-filled.svg"
                  />
                  <span>Thông tin mua hàng</span>
                </div>
                <div class="info-warehouse pl-4">
                  <span>
                    {{ orderDetail.info.customer_delivery.custom_name }}</span
                  >
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="box-content-fee" v-if="orderDetail.accounting">
              <div class="item-icon">
                <span class="title"
                  ><img src="@/static/icon/order/edit/icon_1.svg" alt="" /> Phí
                  đặt hàng:</span
                >
                <span class="info">{{
                  orderDetail.accounting.order_fee | vnd
                }}</span>
              </div>
              <div class="item-icon">
                <span class="title"
                  ><img src="@/static/icon/order/edit/icon_3.svg" alt="" /> Phí
                  chiết khấu:</span
                >
                <span class="info">{{
                  orderDetail.accounting.discount_cost | vnd
                }}</span>
              </div>
              <div class="item-icon">
                <span class="title"
                  ><img src="@/static/icon/order/edit/icon_4.svg" alt="" /> Phí
                  kiểm đếm:</span
                >
                <span class="info">{{
                  orderDetail.accounting.inspection_cost | vnd
                }}</span>
              </div>
              <div class="item-icon">
                <span class="title"
                  ><img src="@/static/icon/order/edit/icon_5.svg" alt="" /> Phí
                  ship TQ:</span
                >
                <span class="info">{{
                  orderDetail.accounting.china_shipping_cost | vnd
                }}</span>
              </div>
              <div class="item-icon">
                <span class="title"
                  ><img src="@/static/icon/order/edit/icon_6.svg" alt="" /> Tổng
                  tiền hàng:</span
                >
                <span class="info">{{
                  orderDetail.accounting.order_cost | vnd
                }}</span>
              </div>
              <!--  -->
              <div class="amount-bottom">
                <div class="item-icon">
                  <span class="title">Tổng tiền đơn hàng:</span>
                  <span class="color-red">{{
                    orderDetail.accounting.total_amount | vnd
                  }}</span>
                </div>
                <div class="item-icon">
                  <span class="title">Đã đặt cọc:</span>
                  <span class="color-red">{{
                    orderDetail.accounting.deposit_cost | vnd
                  }}</span>
                </div>
                <div class="item-icon">
                  <span class="title">Còn lại</span>
                  <span class="color-red">{{
                    (orderDetail.accounting.total_amount -
                      orderDetail.accounting.deposit_cost)
                      | vnd
                  }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--  -->
      <div class="content-detail-order mt-4" v-loading="loadListNCC">
        <div
          class="order-update-table-item"
          v-for="(item, index) in listNCC"
          :key="index"
        >
          <div class="d-flex align-items-center">
            <div class="titleNCC">
              <span>Nhà cung cấp: {{ item.suppliers.name }}</span>
            </div>
            <div class="deliveryNCC pl-5">
              <span class="title">Vận chuyển:</span>
              <span class="info pl-2">{{
                item.suppliers.delivery_type.label
              }}</span>
            </div>
            <div class="deliveryNCC pl-5 d-flex align-items-center">
              <span class="title">Dịch vụ khác:</span>
              <!--  -->
              <div class="item-check pl-5">
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.services.is_inspection == true"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Kiểm hàng</span>
              </div>
              <div class="item-check">
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.services.is_woodworking == true"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Đóng gỗ</span>
              </div>
              <div class="item-check">
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.services.is_shock_proof == true"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Chống sốc</span>
              </div>
              <!--  -->
            </div>
          </div>
          <!--  -->
          <el-row :gutter="24">
            <el-col :span="17">
              <div class="table-element-custom-2022-v2 mt-3">
                <el-table :data="item.products" border style="width: 100%">
                  <el-table-column label="Sản phẩm">
                    <template slot-scope="scope">
                      <div class="d-flex align-items-center">
                        <div class="logo-item">
                          <img :src="scope.row.image" />
                        </div>
                        <div class="description-item">
                          <span class="name">{{ scope.row.name }}</span>
                          <span class="properties">{{
                            scope.row.classification
                          }}</span>
                        </div>
                      </div>
                      <div class="access-path">
                        <span class="link">{{ scope.row.link }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Đơn giá" width="100" align="center">
                    <template slot-scope="scope">
                      <div class="d-flex flex-column">
                        <span>{{
                          (scope.row.unit_price_cny * scope.row.exchange_rate)
                            | vnd
                        }}</span>
                        <span class="mr-1"
                          >¥{{ scope.row.unit_price_cny }}</span
                        >
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Số lượng" width="100" align="center">
                    <template slot-scope="scope">
                      <div>
                        <span>{{ scope.row.quantity }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Ghi chú" width="100" align="center">
                    <template slot-scope="scope">
                      <div
                        class="count-note d-flex align-items-center"
                        @click="showNote(scope.row)"
                      >
                        <img src="@/static/icon/order/edit/note.svg" />
                        <span
                          >{{
                            scope.row.note_number == null
                              ? 0
                              : scope.row.note_number
                          }}
                          ghi chú</span
                        >
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Thành tiền"
                    width="130"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="d-flex flex-column">
                        <span class="color-red">{{
                          (scope.row.unit_price_cny *
                            scope.row.exchange_rate *
                            scope.row.quantity)
                            | vnd
                        }}</span>
                        <span class="color-red"
                          >¥{{
                            (
                              scope.row.unit_price_cny * scope.row.quantity
                            ).toFixed(2)
                          }}</span
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="box-content-fee-NCC mt-3">
                <div class="content-note-detail">
                  <span>Khách hàng ghi chú cho Thương Đô</span>
                  <el-input
                    class="mb-3"
                    type="textarea"
                    :rows="6"
                    v-model="item.note.public"
                    disabled
                  >
                  </el-input>
                  <span>Ghi chú nội bộ</span>
                  <el-input
                    type="textarea"
                    :rows="6"
                    v-model="item.note.private"
                    disabled
                  >
                  </el-input>
                </div>
                <div class="item-box">
                  <span>Phí đặt hàng</span>
                  <span>{{ item.accounting.order_fee | vnd }}</span>
                </div>
                <div class="item-box">
                  <span>Phí chiết khấu</span>
                  <span>{{ item.accounting.discount_cost | vnd }}</span>
                </div>
                <div class="item-box">
                  <span>Phí kiểm đếm</span>
                  <span>{{ item.accounting.inspection_cost | vnd }}</span>
                </div>
                <div class="item-box">
                  <span>Phí ship TQ</span>
                  <span>{{ item.accounting.china_shipping_cost | vnd }}</span>
                </div>
                <div class="item-box">
                  <span>Tổng tiền hàng</span>
                  <span>{{ item.accounting.order_cost | vnd }}</span>
                </div>
                <div class="item-box-amount">
                  <span class="title">Tổng tiền</span>
                  <span class="color-red">{{
                    item.accounting.total_amount | vnd
                  }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--  -->
      <div class="mt-3">
        <DetailPack :orderDetail="orderDetail" />
      </div>
      <!--  -->
      <div class="content-detail-order mt-3">
        <DetailHistory />
      </div>
      <!-- Xem ghi chú -->
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
                v-loading="dialogNoteLoading"
                element-loading-spinner="el-icon-loading"
              >
                <el-table-column prop="time" label="Ngày" width="160">
                </el-table-column>
                <el-table-column label="Nhân viên" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.subject.name }}</span>
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
      <!--  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DetailPack from "@/views/order/components/Pack";
import DetailHistory from "@/views/order/components/History";
export default {
  name: "HomeIndex",
  metaInfo() {
    return {
      title: "Chi tiết đơn hàng",
    };
  },
  components: {
    DetailPack,
    DetailHistory,
  },
  data() {
    return {
      loading: true,
      dialogNoteVisible: false,
      dialogNoteLoading: false, // Load dữ liệu thoại thoại
      loadListNCC: true,
      listCategory: {
        staffs: {},
        report: {
          time: {},
        },
      },
      orderDetail: {},
      listNCC: [],
      noteId: "",
      itemNoteArr: [],
    };
  },
  mounted() {
    this.fetchCategory();
    this.fetchOrderDetai();
    this.fetchOrderProduct();
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
    // lấy data
    fetchOrderDetai(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.orderDetail = response.data;
            break;
          case 500:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: response.message,
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
    // Back lại trang list
    goBack() {
      this.$router.push({
        name: "order-list",
      });
    },
    //
    fetchOrderProduct() {
      this.loadListNCC = true;
      axios
        .get("order/products/" + this.$route.params.order_id)
        .then((response) => {
          this.loadListNCC = false;
          switch (response.code) {
            case 200:
              this.listNCC = response.data;
              break;
            case 500:
              this.$notify({
                title: "Có lỗi xảy ra",
                message: response.message,
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
    // showNote
    showNote(row) {
      this.noteId = row.id;
      this.fetchNoteItem();
      this.dialogNoteVisible = true;
    },
    cancelNoteItem() {
      this.dialogNoteVisible = false;
    },
    fetchNoteItem() {
      this.dialogNoteLoading = true;
      axios.get("note/order-detail/" + this.noteId).then((response) => {
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
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.order-update-title {
  margin-bottom: 15px;
}
.order-update-title span {
  margin-left: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #0688ee;
}
.content-detail-order {
  background: #fcfcff;
  border: 1px solid #bdd6ee;
  border-radius: 5px;
  padding: 10px 25px 28px 20px;
}
/* Top */
.order-detail-info-top {
  padding-bottom: 40px;
}
.order-detail-info-title .title {
  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  color: #207cdc;
}
.order-detail-info-title .codeTitle {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
  padding-left: 10px;
  padding-right: 20px;
}
.date-top span {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
}
.date-top .info {
  color: #0688ee;
  padding-left: 10px;
}
/* kho nhận */
.order-update-warehouse-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.order-update-warehouse-title span {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #207cdc;
  margin-left: 10px;
}
.delivery_type .title_1 {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
}
.delivery_type .info {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #207cdc;
}
.order-note-content .title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.btn-detail-order span {
  background: #ecf5ff;
  border: 0.5px solid #bdd6ee;
  border-radius: 5px;
  width: 142px;
  height: 32px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0688ee;
}
.btn-detail-order span:hover {
  background: #0688ee;
  color: #fff;
}
.box-content-fee {
  margin-top: 30px;
}
.box-content-fee .item-icon {
  border-bottom: 1px dashed #bdd6ee;
  padding-top: 11px;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
  padding-right: 20%;
}
.box-content-fee .item-icon img {
  padding-right: 10px;
}
.box-content-fee .item-icon .title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
  width: 300px;
}
.box-content-fee .item-icon .info {
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #075970;
}
.amount-bottom {
  background: #f8f9fc;
  margin-top: 13px;
  padding: 21px 0 10px 39px;
}
.amount .color-red {
  font-weight: 400;
  font-size: 20px;
  line-height: 16px;
  text-align: right;
  color: #ed1c24;
}
/* bảng nhà cung cấp  */
.titleNCC span {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #000728;
}
.order-update-table-item .table-element-custom-2022-v2 {
  color: #000728;
}
.order-update-table-item .table-element-custom-2022-v2 .logo-item img {
  width: 80px;
}
.order-update-table-item .table-element-custom-2022-v2 .description-item {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.order-update-table-item .table-element-custom-2022-v2 .description-item .name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000728;
}
.order-update-table-item
  .table-element-custom-2022-v2
  .description-item
  .properties {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #767676;
  margin-top: 10px;
}
.order-update-table-item .table-element-custom-2022-v2 .count-note {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
  cursor: pointer;
}
.order-update-table-item .table-element-custom-2022-v2 .count-note span {
  margin-left: 5px;
}
.color-red {
  color: #ed1c24;
}
.box-content-fee-NCC {
  background: #f6f8ff;
  border: 1px solid #bdd6ee;
  border-radius: 8px;
  padding: 22px 23px 21px 13px;
}
.box-content-fee-NCC .item-box {
  border-bottom: 1px dashed #bdd6ee;
  padding-top: 11px;
  padding-bottom: 13px;
  display: flex;
  justify-content: space-between;
}
.box-content-fee-NCC .item-box span {
  padding: 0 28px;
}
.item-box-amount {
  display: flex;
  justify-content: space-between;
  background: #ecf5ff;
  margin-top: 13px;
  padding: 21px 16px 22px 28px;
  font-weight: 700;
  font-size: 15px;
}
</style>
<style>
/* ghi chú */
.content-note-detail textarea {
  margin-top: 10px;
  background-color: #fff !important;
  color: #000728 !important;
  border-radius: 5px;
}
.content-note-detail span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.colorBlue {
  color: #207cdc;
}
.form-note .header-1988 {
  background-color: #0688ee;
}
.deliveryNCC .title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
}
.deliveryNCC .info {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #207cdc;
}
.item-check {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}
.item-check img {
  margin-right: 8px;
}
/* đơn hàng lỗi  */
.error-order-detail {
  background: #FFF0F0;
  padding: 8px 0 8px 27px;
  margin-top: 14px;
}
.error-order-detail span {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #ED1C24;
}
</style>

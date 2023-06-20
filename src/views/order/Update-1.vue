<template>
  <div class="order-update" id="ST2022">
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
      <div class="order-update-title d-flex align-items-center">
        <img src="@/static/icon/order/edit/edit_2.svg" />
        <span>Sửa đơn - báo giá</span>
      </div>
      <div class="order-update-warehouse">
        <div class="order-update-warehouse-title">
          <img src="@/static/icon/order/edit/maki_warehouse.svg" />
          <span>Kho nhận hàng</span>
        </div>
        <div class="order-update-warehouse-choose-city">
          <span class="title">Tỉnh, thành phố</span>
          <div>
            <el-select
              v-model="modelData.city_id"
              placeholder="Chọn ..."
              class="frame-select-common-2022"
              popper-class="frame-select-popper-common-2022"
              clearable
              size="mini"
            >
              <el-option
                v-for="item in groupCiti"
                :key="item.value"
                :label="item.province.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <span class="title">Địa chỉ kho</span>
          <div class="choose-350-wrap">
            <el-select
              v-model="modelData.warehouse_id"
              placeholder="Chọn ..."
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
        <div class="order-update-warehouse-title">
          <img src="@/static/icon/order/edit/carbon_location-filled.svg" />
          <span>Thông tin mua hàng</span>
        </div>
        <div class="order-update-warehouse-choose-warehouse">
          <div class="line-item" v-for="i in listCustomerDelivery" :key="i.id">
            <img src="@/static/icon/order/edit/tic_1.svg" />
            <span>{{ i.custom_name }}</span>
          </div>
          <div class="line-item">
            <img src="@/static/icon/order/edit/tic_2.svg" />
            <span
              >Bé Kiên - Hà Nội, 298 Trần Điền, Định Công, Thanh Xuân, Hà
              Nội</span
            >
          </div>
        </div>
      </div>
      <div class="order-update-table" v-loading="loadListNCC">
        <div
          class="order-update-table-item"
          v-for="(item, index) in listNCC"
          :key="index"
        >
          <div class="hub-1">
            <div class="hub-1-1">
              <div class="title">
                <img src="@/static/icon/order/edit/tic_3.svg" />
                <span>Nhà cung cấp: {{ item.suppliers.name }}</span>
              </div>
              <div
                class="btn-cancel frame-hover-2022"
                @click="confirmDeleteNCC(item)"
              >
                <img src="@/static/icon/order/edit/del.svg" />
                <span>Xóa nhà cung cấp</span>
              </div>
            </div>
            <div class="hub-1-2">
              <span class="title">Vận chuyển</span>
              <div
                class="item-check"
                @click="item.suppliers.delivery_type = 'fast'"
              >
                <img
                  src="@/static/icon/order/edit/tic_6.svg"
                  v-if="item.suppliers.delivery_type == 'fast'"
                />
                <img src="@/static/icon/order/edit/tic_7.svg" v-else />
                <span>Nhanh</span>
              </div>
              <div
                class="item-check"
                @click="item.suppliers.delivery_type = 'normal'"
              >
                <img
                  src="@/static/icon/order/edit/tic_6.svg"
                  v-if="item.suppliers.delivery_type == 'normal'"
                />
                <img src="@/static/icon/order/edit/tic_7.svg" v-else />
                <span>Thường</span>
              </div>
              <span class="space"></span>
              <span class="title">Dịch vụ khác</span>
              <div
                class="item-check"
                @click="
                  item.suppliers.is_inspection = !item.suppliers.is_inspection
                "
              >
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.is_inspection"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Kiểm hàng</span>
              </div>
              <div
                class="item-check"
                @click="
                  item.suppliers.is_woodworking = !item.suppliers.is_woodworking
                "
              >
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.is_woodworking"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Đóng gỗ</span>
              </div>
              <div
                class="item-check"
                @click="item.suppliers.is_tax = !item.suppliers.is_tax"
              >
                <img
                  src="@/static/icon/order/edit/tic_3.svg"
                  v-if="item.suppliers.is_tax"
                />
                <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                <span>Khai thuế</span>
              </div>
            </div>
          </div>
          <div class="hub-2">
            <el-row :gutter="12">
              <el-col :span="18">
                <div class="table-element-custom-2022-v2">
                  <el-table :data="item.products" border style="width: 100%">
                    <el-table-column
                      width="55"
                      header-align="center"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <div
                          class="frame-poiter-2022"
                          @click="
                            confirmDeleteProduct(scope.row, item.products)
                          "
                        >
                          <img src="@/static/icon/order/edit/del.svg" />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Sản phẩm"
                      min-width="320"
                      align="center"
                    >
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
                        <div class="d-flex align-items-center access-path">
                          <img src="@/static/icon/order/edit/edit.svg" />
                          <span class="link"
                            >Đường dẫn: {{ getSortLink(scope.row.link) }}</span
                          >
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Đơn giá"
                      header-align="center"
                      align="center"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <div>
                          <span>{{
                            (scope.row.unit_price_cny * scope.row.exchange_rate)
                              | vnd
                          }}</span>
                          <div class="d-flex justify-content-center">
                            <span class="mr-1"
                              >¥{{ scope.row.unit_price_cny }}</span
                            >
                            <img src="@/static/icon/order/edit/edit.svg" />
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Số lượng"
                      header-align="center"
                      align="center"
                      width="160"
                    >
                      <template slot-scope="scope">
                        <el-input-number
                          v-model="scope.row.quantity"
                          size="mini"
                        ></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Ghi chú"
                      header-align="center"
                      align="center"
                      width="150"
                    >
                      <template slot-scope="scope">
                        <div class="count-note">
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
                        <div
                          class="add-note frame-hover-2022"
                          @click="addNote(scope.row)"
                        >
                          <span>Thêm ghi chú</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Thành tiền"
                      header-align="center"
                      align="center"
                      width="150"
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
                              scope.row.unit_price_cny * scope.row.quantity
                            }}</span
                          >
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="static-price">
                  <span class="title-1">Khách hàng ghi chú cho Thương Đô</span>
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="modelData.textarea2"
                  >
                  </el-input>
                  <span class="title-1">Ghi chú nội bộ</span>
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="modelData.textarea2"
                  >
                  </el-input>
                  <div class="list-item-price">
                    <div class="item-price">
                      <span class="title">Phí đặt hàng</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Phí đóng kiện</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Phí chiết khấu</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Phí kiểm đếm</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Phí ship TQ</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Phí vận chuyển QT</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                    <div class="item-price">
                      <span class="title">Tổng tiền hàng</span>
                      <el-input
                        placeholder="0"
                        class="frame-input-common-2022"
                        v-model="input"
                        size="mini"
                      ></el-input>
                      <span class="currency">đ</span>
                    </div>
                  </div>
                  <div class="total-price">
                    <span class="text">Tổng tiền:</span>
                    <span class="number">5.300.000 đ</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end pt-3">
        <span class="btn-crud-2022 frame-hover-2022 btn-info">Quay lại</span>
        <span class="btn-crud-2022 frame-hover-2022 btn-success">Lưu</span>
      </div>

      <!-- Ghi chú -->
      <list-note
        :randomOpen="randomOpen"
        :noteId="noteSelect.id"
        @addNoteDetailDone="addNoteDetailDoneParant"
      ></list-note>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { number } from "@/filters";
import ListNote from "@/views/order/components/ListNote";
export default {
  name: "UpdateOrder",
  components: {
    ListNote,
  },
  metaInfo() {
    return {
      title: "Sửa đơn hàng",
    };
  },
  data() {
    return {
      modelData: {
        city_id: "",
        warehouse_id: "",
        textarea2: "",
      },

      listCategory: {
        staffs: {},
        report: {
          time: {},
        },
      },

      orderDetail: {},

      input: "",

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

      // Citi
      groupCiti: [],
      listWarehouse: [],

      // List NCC
      loadListNCC: false,
      listNCC: [],

      // Ghi chú
      randomOpen: 0,
      noteSelect: {},

      // Thông tin mua hàng
      listCustomerDelivery: [],
    };
  },
  mounted() {
    this.fetchCategory();
    this.fetchCiti();

    this.fetchOrder();
    this.fetchOrderProduct();

    this.fetchListCustomerDelivery();
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
    fetchCiti() {
      axios.get("warehouse/group-by-province/vi").then((response) => {
        switch (response.code) {
          case 200:
            this.groupCiti = response.data;
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
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        switch (response.code) {
          case 200:
            this.orderDetail = response.data;
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
    getSortLink(item) {
      if (item && item.length > 30) {
        return item.slice(0, 25) + " ...";
      }
      return item;
    },

    // Ghi chú
    addNote(item) {
      this.noteSelect = item;
      this.randomOpen = Math.floor(Math.random() * 100000) + 1;
    },
    addNoteDetailDoneParant() {
      this.noteSelect.note_number += 1;
    },

    // Xóa nhà cung cấp
    confirmDeleteNCC(item) {
      this.$confirm(
        "Xác nhận xóa nhà cung cấp: " + item.suppliers.name,
        "Cảnh báo",
        {
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          type: "warning",
        }
      )
        .then(() => {
          this.actionDeleteNCC(item);
        })
        .catch(() => {});
    },
    actionDeleteNCC(item) {
      let indexDelete = -1;
      this.listNCC.forEach((temp, index) => {
        if (temp.suppliers.id === item.suppliers.id) {
          indexDelete = index;
        }
      });
      if (indexDelete > -1) {
        this.listNCC.splice(indexDelete, 1);
      }
    },

    // Xóa sản phẩm detail
    confirmDeleteProduct(item, table) {
      this.$confirm("Xác nhận xóa sản phẩm: " + item.name, "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.actionDeleteProduct(item, table);
        })
        .catch(() => {});
    },
    actionDeleteProduct(item, table) {
      let indexDelete = -1;
      table.forEach((temp, index) => {
        if (temp.id === item.id) {
          indexDelete = index;
        }
      });
      if (indexDelete > -1) {
        table.splice(indexDelete, 1);
      }
    },

    // Thông tin mua hàng
    fetchListCustomerDelivery() {
      axios.get("customer_delivery/list").then((response) => {
        switch (response.code) {
          case 200:
            this.listCustomerDelivery = response.data;
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
    input: function (newValue, oldValue) {
      let returnNewValue = newValue.replaceAll(",", "");
      let returnOldValue = oldValue.replaceAll(",", "");
      if (returnNewValue != returnOldValue) {
        let a = number(returnNewValue);
        this.input = a;
      }
    },
  },
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

/*Khung chọn địa chỉ trên cùng*/
.order-update-warehouse {
  background-color: #f7f8ff;
  padding: 15px 15px 25px 15px;
}
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
.order-update-warehouse-choose-city {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.order-update-warehouse-choose-city .title {
  margin-left: 25px;
  margin-right: 15px;
}
.order-update-warehouse-choose-city .choose-350-wrap {
  width: 380px;
}

.order-update-warehouse-choose-warehouse .line-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.order-update-warehouse-choose-warehouse .line-item:hover {
  opacity: 0.8;
}
.order-update-warehouse-choose-warehouse .line-item span {
  margin-left: 10px;
}

/*Hub 1 của phần bảng*/
.order-update-table-item .hub-1 {
  background-color: #e8f3ff;
  padding: 25px 30px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.order-update-table-item .hub-1-1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.order-update-table-item .hub-1-1 .title {
  display: flex;
  align-items: center;
}
.order-update-table-item .hub-1-1 .title img {
  cursor: pointer;
}
.order-update-table-item .hub-1-1 .title span {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000728;
  margin-left: 10px;
}
.order-update-table-item .hub-1-1 .btn-cancel {
  background: #ffffff;
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.order-update-table-item .hub-1-1 .btn-cancel span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #0688ee;
  margin-left: 5px;
}
.order-update-table-item .hub-1-2 {
  margin-left: 28px;
  display: flex;
  align-items: center;
}
.order-update-table-item .hub-1-2 .title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
  margin-right: 30px;
}
.order-update-table-item .hub-1-2 .space {
  width: 60px;
}
.order-update-table-item .hub-1-2 .item-check {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}
.order-update-table-item .hub-1-2 .item-check img {
  margin-right: 8px;
}

.order-update-table-item .hub-2 .static-price {
  min-height: 300px;
  background: #f6f8ff;
  border: 1px solid #bdd6ee;
  border-radius: 8px;
  padding: 5px 10px 15px 10px;
  color: #000728;
}
.order-update-table-item .hub-2 .static-price .title-1 {
  margin-bottom: 10px;
  margin-top: 10px;
  display: inline-block;
}
.order-update-table-item .hub-2 .static-price .list-item-price {
  margin-top: 20px;
}
.order-update-table-item .hub-2 .static-price .item-price {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}
.order-update-table-item .hub-2 .static-price .item-price .title {
  width: 220px;
}
.order-update-table-item .hub-2 .static-price .item-price .currency {
  position: absolute;
  right: 10px;
  top: 6px;
  color: red;
}

.order-update-table-item .hub-2 .static-price .total-price {
  margin-top: 20px;
  background: #e8f3ff;
  padding: 20px 0px 20px 15px;
  border-top: 1px solid #bdd6ee;

  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
}
.order-update-table-item .hub-2 .static-price .total-price .number {
  font-weight: 700;
  font-size: 18px;
  line-height: 16px;
  text-align: right;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #ed1c24;
  margin-left: 5px;
}
@media screen and (min-width: 1025px) {
  .order-update-table-item .hub-2 .static-price .total-price {
    font-size: 20px;
  }
  .order-update-table-item .hub-2 .static-price .total-price .number {
    font-size: 24px;
  }
}

/* Đè cái bảng table */
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
.order-update-table-item .table-element-custom-2022-v2 .access-path {
  padding-top: 10px;
}
.order-update-table-item .table-element-custom-2022-v2 .access-path .link {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #000728;
  margin-left: 5px;
  text-align: left;
}

.order-update-table-item .table-element-custom-2022-v2 .count-note {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}
.order-update-table-item .table-element-custom-2022-v2 .count-note span {
  margin-left: 5px;
}
.order-update-table-item .table-element-custom-2022-v2 .add-note span {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  padding: 3px 20px;
  display: inline-block;
  margin-top: 5px;

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #0688ee;
  cursor: pointer;
}
.order-update-table-item .table-element-custom-2022-v2 .color-red {
  color: #ed1c24;
}
</style>

<style type="text/css">
.order-update-table-item .hub-2 .static-price textarea {
  border-color: #3f92d1;
}
</style>

<template>
  <div class="delivery-add" id="ST2022">
    <div class="order-list-statistic" v-if="listCategory.reports">
      <div
        class="order-list-statistic-item"
        v-for="item in listCategory.reports.all"
        :key="item.value"
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
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/delivery/create/car.svg" />
        </span>
        <span class="title">Đơn hàng - Thêm giao hàng</span>
      </div>
      <div class="delivery-add-title">
        <img src="@/static/icon/delivery/create/maki_warehouse.svg" />
        <span>Thông tin khách hàng</span>
      </div>
      <div class="table-td-show-detail-v1-2023 delivery-add-table-1 mb-4">
        <div class="title-wrap d-flex">
          <div class="icon-item icon-v1">
            <span>Khách hàng</span>
          </div>
          <div class="icon-item">
            <span>Thông tin giao hàng</span>
          </div>
        </div>
        <div class="line-wrap d-flex">
          <div class="icon-item icon-v1" v-if="listCategory.customer">
            <div class="line-item">
              <span class="customer-name">{{ listCategory.customer.name }}</span>
            </div>
            <div class="line-item">
              <span
                class="count-status-top-3388 v2"
                style="background-color: #207cdc"
                >{{ listCategory.customer.warehouse_code }}</span
              >
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/call.svg" />
              <span>{{ listCategory.customer.phone_number }}</span>
            </div>
            <div class="line-item d-flex">
              <img src="@/static/icon/delivery/list/money.svg" />
              <span>Số dư: {{ listCategory.customer.balance_amount | vnd }}</span>
            </div>
          </div>
          <div class="icon-item icon-v2">
            <el-row :gutter="0">
              <el-col :span="14">
                <div class="delivery-add-info">
                  <div class="line-item transport-method">
                    <div class="delivery-add-info-title">
                      <span>Hình thức vận chuyển</span>
                    </div>
                    <div class="d-flex">
                      <div
                        class="item-common-9012"
                        v-for="item in listCategory.transporters"
                        :key="item.id"
                        @click="transporter_select = item"
                      >
                        <img
                          src="@/static/icon/delivery/list/checked-2.svg"
                          v-if="item.id == transporter_select.id"
                        />
                        <img
                          src="@/static/icon/delivery/list/no-checked.svg"
                          v-else
                        />
                        <span>{{ item.name }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="line-item pt-3"
                    v-if="transporter_select.name == 'Xe khách'"
                  >
                    <CreateDeliveryGarage
                      :transporter_select="transporter_select"
                      @changeGarageId="changeGarageIdParent"
                    />
                  </div>
                  <div class="line-item shipping-method" v-if="transporter_select.is_delivery_type == 1">
                    <div class="delivery-add-info-title">
                      <span>Phương thức vận chuyển</span>
                    </div>
                    <div class="d-flex">
                      <div
                        class="item-common-9012"
                        @click="modelData.type = 'fast'"
                      >
                        <img
                          src="@/static/icon/delivery/list/checked-2.svg"
                          alt=""
                          v-if="modelData.type == 'fast'"
                        />
                        <img
                          src="@/static/icon/delivery/list/no-checked.svg"
                          alt=""
                          v-else
                        />
                        <span>Chuyển nhanh</span>
                      </div>
                      <div
                        class="item-common-9012"
                        @click="modelData.type = 'normal'"
                      >
                        <img
                          src="@/static/icon/delivery/list/checked-2.svg"
                          alt=""
                          v-if="modelData.type == 'normal'"
                        />
                        <img
                          src="@/static/icon/delivery/list/no-checked.svg"
                          alt=""
                          v-else
                        />
                        <span>Chuyển thường</span>
                      </div>
                    </div>
                  </div>
                  <div class="line-item payments-method">
                    <div class="delivery-add-info-title">
                      <span>Hình thức thanh toán</span>
                    </div>
                    <div class="d-flex">
                      <div
                        class="item-common-9012"
                        @click="modelData.payment = 'e-wallet'"
                      >
                        <img
                          src="@/static/icon/delivery/list/checked-2.svg"
                          alt=""
                          v-if="modelData.payment == 'e-wallet'"
                        />
                        <img
                          src="@/static/icon/delivery/list/no-checked.svg"
                          alt=""
                          v-else
                        />
                        <span>Ví điện tử</span>
                      </div>
                      <div
                        class="item-common-9012"
                        @click="modelData.payment = 'cod'"
                      >
                        <img
                          src="@/static/icon/delivery/list/checked-2.svg"
                          alt=""
                          v-if="modelData.payment == 'cod'"
                        />
                        <img
                          src="@/static/icon/delivery/list/no-checked.svg"
                          alt=""
                          v-else
                        />
                        <span>COD</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="line-item d-flex pt-3"
                    v-if="transporter_select.is_get_delivery_price"
                  >
                    <span class="create-delivery-sub-title">Phí vận chuyển tạm tính: </span>
                    <i class="el-icon-loading" v-if="deliveryPriceLoading"></i>
                    <span class="color-red" v-if="!deliveryPriceLoading">
                      <span v-if="deliveryPriceTemp == 0">Chờ báo giá</span>
                      <span v-else>{{ deliveryPriceTemp | vnd }}</span>
                    </span>
                  </div>
                  <div class="line-item time-method">
                    <div class="delivery-add-info-title">
                      <span>Thời gian giao hàng</span>
                    </div>
                    <el-date-picker
                      v-model="modelData.date"
                      type="date"
                      :clearable="true"
                      format="dd/MM/yyyy"
                      value-format="yyyy-MM-dd"
                      placeholder="Ngày nhận hàng"
                      align="center"
                      size="mini"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </div>
                  <div class="line-item note-method">
                    <div class="delivery-add-info-title">
                      <span>Ghi chú</span>
                    </div>
                    <div>
                      <el-input
                        placeholder="Ghi chú"
                        type="textarea"
                        rows="5"
                        v-model="modelData.note"
                      >
                      </el-input>
                    </div>
                  </div>
                  <div class="line-item">
                    <div class="delivery-add-info-title">
                      <span>Chi phí phải thanh toán</span>
                    </div>
                    <div>
                      <div class="pay-item" v-if="listCategory.customer">
                        <span class="title">Số dư ví</span>
                        <span>{{ listCategory.customer.balance_amount | vnd }}</span>
                      </div>
                      <div class="pay-item">
                        <span class="title">Tiền hàng còn thiếu</span>
                        <i class="el-icon-loading" v-if="debtOrderLoading"></i>
                        <span v-else>{{ debtOrder | vnd }}</span>
                      </div>
                      <div class="pay-item">
                        <span class="title">Tổng phí vận chuyển TQ</span>
                        <span>{{ totalDeliveryCostTQ | vnd }}</span>
                      </div>
                      <div class="pay-item">
                        <span class="title">Phí vận chuyển tạm tính</span>
                        <span v-if="deliveryPriceTemp == 0">Chờ báo giá</span>
                        <span v-else>{{ deliveryPriceTemp | vnd }}</span>
                      </div>
                      <div class="pay-item">
                        <span class="title">Số dư còn lại</span>
                        <span>{{ getMoneyBalance() | vnd }}</span>
                      </div>
                      <div class="pay-item">
                        <span class="title">Cần nạp thêm</span>
                        <span class="color-red">{{ getMoneyChard() | vnd }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="delivery-add-warehouse">
                  <address-take
                    :customer_id="modelData.customer_id"
                    @changeAddressId="changeAddressIdParent"
                  ></address-take>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="delivery-add-title">
        <img src="@/static/icon/delivery/list/box.svg" />
        <span>Danh sách kiện cần giao</span>
      </div>
      <div class="table-element-custom-2022-v3 delivery-add-table-2">
        <el-table style="width: 100%" stripe border :data="listPack">
          <el-table-column label="STT" width="50" align="center" type="index">
          </el-table-column>
          <el-table-column
            label="Mã vận đơn"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="d-flex align-items-center">
                <span>{{ scope.row.bill_code }}</span>
                <div class="pl-2">
                  <span
                    class="count-status-top-3388 v2"
                    :style="{ backgroundColor: scope.row.pack_status.color }"
                    >{{ scope.row.pack_status.name }}</span
                  >
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" width="250" align="center">
            <template slot-scope="scope">
              <div class="item-action frame-poiter-2022">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xóa"
                  placement="top"
                >
                  <img
                    src="@/static/icon/pack/action3.svg"
                    @click="deletePackTap1(scope.row)"
                  />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="d-flex pt-3">
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success"
          @click="loadFormaddPackToDelivery()"
        >Thêm kiện cần giao</span>
      </div>
      <div class="d-flex justify-content-end pt-3">
        <span
          class="btn-crud-2022 frame-hover-2022 btn-goback"
          @click="goBack()"
          >Hủy bỏ</span
        >
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success"
          :class="!canSubmit ? 'disable' : ''"
          @click="submitForm()"
        >
          <span v-if="!canSubmit">
            <i class="el-icon-loading"></i>
          </span>
          <span>Thêm giao hàng</span>
        </span>
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
import { findIndex } from "lodash";
import ls from "local-storage";
import AddressTake from "./common-components/AddressTake";
import CreateDeliveryGarage from "./common-components/Garage";
export default {
  name: "DeliveryCreate",
  components: {
    AddressTake,
    CreateDeliveryGarage,
  },
  metaInfo() {
    return {
      title: "Thêm mới giao hàng",
    };
  },
  data() {
    return {
      loading: false,
      canSubmit: true,
      filter: {
        // Lọc theo status:
        status: "",

        page: 1,
        per_page: 15,
      },

      modelData: {
        packages: [],
        transporter_id: "",
        transporter_detail_id: "",
        type: "",
        payment: "",
        customer_delivery_id: "",
        note: "",
        date: "",

        customer_id: "",
        customer_name: "",
        customer_phone: "",
      },
      listPack: [],

      // Ẩn date:
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },

      transporter_select: {},

      tableData: [],

      listCategory: {},

      // Thêm kiện vào giao hàng
      dialogAddPackVisible: false,
      itemDeliverySelected: {},
      itemAddPackLoading: false,
      itemAddPackArr: [],
      addPackSeachText: "",
      addPackSeachCheckAll: false,
      addPackCanSubmit: true,
      addPackSeachChecked: [],

      // Tính giá tạm ứng:
      deliveryPriceLoading: false,
      deliveryPriceTemp: 0,

      // Tiền hàng còn thiếu
      debtOrderLoading: 0,
      debtOrder: 0,

      // Tổng phí vận chuyển TQ
      totalDeliveryCostTQ: 0,

      // Tài khoản
      accountInfo: {
        e_wallet: 0
      }
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
    this.getInfoFromStorage();
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
    getInfoFromStorage() {
      const createDelivery = ls.get("createDelivery", "");
      if (createDelivery) {
        let customer_id = "";
        let customer_name = "";
        let customer_phone = "";
        createDelivery.forEach((item) => {
          customer_id = item.customer_id;
          customer_name = item.customer_name;
          customer_phone = item.customer_phone;
        });
        this.modelData.customer_id = customer_id;
        this.modelData.customer_name = customer_name;
        this.modelData.customer_phone = customer_phone;
        this.listPack = createDelivery;
      }
    },
    fetchCategory() {
      let data = {
        customer_id: this.modelData.customer_id,
      };
      axios.get("common/delivery", { params: data }).then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
            this.accountInfo.e_wallet = this.listCategory.customer.balance_amount;
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

    changeGarageIdParent(value) {
      this.modelData.transporter_detail_id = value;
    },
    // Chọn kho
    changeAddressIdParent(id) {
      this.modelData.customer_delivery_id = id;
    },

    // Back lại trang list
    goBack() {
      this.$router.push({
        name: "pack-list",
      });
    },

    // Xóa kiện
    deletePackTap1(item) {
      let index = findIndex(this.listPack, function (o) {
        return o.pack_id === item.pack_id;
      });
      if (index > -1) {
        this.listPack.splice(index, 1);
        this.$message({
          message: 'Đã xóa kiện',
          type: 'warning'
        });
      }
    },

    checkDataPushError() {
      let message = "";
      let flag = false;
      if (this.modelData.date == "") {
        flag = true;
        message = "Thời gian giao hàng không được để trống";
      }
      if (
        this.transporter_select.name == "Xe khách" &&
        this.modelData.transporter_detail_id == ""
      ) {
        flag = true;
        message = "Vui lòng chọn nhà xe";
      }
      let ab = Object.keys(this.transporter_select).length;
      if (ab == 0) {
        flag = true;
        message = "Vui lòng chọn hình thức vận chuyển";
      }
      if (this.transporter_select.id == "") {
        flag = true;
        message = "Vui lòng chọn hình thức vận chuyển";
      }

      if (
        this.modelData.type == "" &&
        this.transporter_select.is_delivery_type == 1
      ) {
        flag = true;
        message = "Vui lòng chọn phương thức vận chuyển";
      }
      if (this.modelData.payment == "") {
        flag = true;
        message = "Vui lòng chọn hình thức thanh toán";
      }

      if (flag) {
        this.$notify({
          title: "Có lỗi xảy ra",
          message: message,
          type: "warning",
        });
      }
      return flag;
    },

    // Lưu
    submitForm() {
      if (this.checkDataPushError()) {
        return;
      }
      this.canSubmit = false;
      let data = {};
      let packages = [];

      this.listPack.forEach((item) => {
        packages.push(item.pack_id);
      });

      // Gán
      data.packages = packages;
      data.transporter_id = this.transporter_select.id;
      data.transporter_detail_id = this.modelData.transporter_detail_id;
      if (this.modelData.type !== "") {
        data.type = this.modelData.type;
      }
      data.payment = this.modelData.payment;
      data.customer_delivery_id = this.modelData.customer_delivery_id;
      if (this.modelData.note !== "") {
        data.note = this.modelData.note;
      }
      data.date = this.modelData.date;
      data.customer_id = this.modelData.customer_id;

      axios.post("delivery/", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Tạo giao hàng thành công",
              type: "success",
            });

            // Xóa ở local Storage
            ls.remove("createDelivery");
            // Trở về màn hình danh sách
            this.$router.push({
              name: "delivery-list",
            });
            break;
          case 422:
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

    // Thêm kiện vào giao hàng
    loadFormaddPackToDelivery() {
      this.dialogAddPackVisible = true;
      this.itemAddPackLoading = true;
      this.itemAddPackArr = [];
      let arrTemp = [];
      let inListPack = "";

      axios.get("package/" + this.modelData.customer_id + "/vn").then((response) => {
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

            this.itemAddPackArr.forEach((item) => {
              // Nếu nó không nằm trong listPack thì dc phép push
              inListPack = false;
              this.listPack.forEach((i) => {
                if (i.pack_id == item.id) {
                  inListPack = true;
                }
              })
              if (inListPack == false) {
                arrTemp.push(item);
              }
            })
            this.itemAddPackArr = JSON.parse(JSON.stringify(arrTemp));
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

          let temp = {
            pack_id: item.id,
            bill_code: item.bill_code,
            pack_status: {
              value: "status_10",
              name: "Đến kho VN",
              color: "#022652",
            },
            china_shipping_cost: item.shipping_cost,
            order_id: item.order_id
          }

          // Check nó không có trong listPack thì mới add thêm vào
          let canPush = true;
          this.listPack.forEach((i) => {
            if (i.pack_id == item.id) {
              canPush = false;
              return;
            }
          })

          if (canPush) {
            this.listPack.push(temp);
          }
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

      this.dialogAddPackVisible = false;
    },

    // Tính phí tạm tính
    getDeliveryPrice() {
      this.deliveryPriceLoading = true;
      let packages = [];
      this.listPack.forEach((item) => {
        packages.push(item.pack_id);
      });
      let data = {
        carrier: this.transporter_select.short_name,
        delivery_type:
          this.modelData.type == "" ? "normal" : this.modelData.type,
        packages: packages,
        customer_delivery_id: this.modelData.customer_delivery_id,
        customer_id: this.modelData.customer_id
      };
      axios.patch("carrier/get-price/", data).then((response) => {
        this.deliveryPriceLoading = false;
        switch (response.code) {
          case 200:
            this.deliveryPriceTemp = response.data;
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: Object.values(response.data)[0],
              type: "warning",
            });
            break;

          case 500:
            this.deliveryPriceTemp = 0;
            this.$message({
              message:
                "Có lỗi phát sinh từ phía bên nhà vận chuyển! Vui lòng quay lại sau",
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

    // Tiền hàng còn thiếu
    getDebtOrder() {
      this.debtOrderLoading = true;
      let orders = "";
      this.listPack.forEach((item) => {
        orders += item.pack_id + ",";
      });
      orders = orders.slice(0, -1);
      if (orders == "") {
        this.debtOrder = 0;
        this.debtOrderLoading = false;
        return;
      }

      axios.get("order/get-debt/" + orders).then((response) => {
        this.debtOrderLoading = false;
        switch (response.code) {
          case 200:
            this.debtOrder = response.data;
            break;
          case 422:
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

    // Tính số tiền cần nạp
    getMoneyChard() {
      // Nếu là COD thì để nguyên
      if (this.modelData.payment == "cod") {
        return 0;
      }
      let totalFree =
        this.debtOrder + this.totalDeliveryCostTQ + this.deliveryPriceTemp;
      if (totalFree > this.accountInfo.e_wallet) {
        return totalFree - this.accountInfo.e_wallet;
      }
      return 0;
    },
    // Tính số dư
    getMoneyBalance() {
      // Nếu là COD thì để nguyên
      if (this.modelData.payment == "cod") {
        return this.accountInfo.e_wallet;
      }
      let totalFree =
        this.debtOrder + this.totalDeliveryCostTQ + this.deliveryPriceTemp;
      if (this.accountInfo.e_wallet < totalFree) {
        return 0;
      }
      return this.accountInfo.e_wallet - totalFree;
    },
  },
  watch: {
    'modelData.customer_id': function () {
      this.fetchCategory();
    },
    // Tính phí tạm tính
    transporter_select() {
      if (this.transporter_select.is_get_delivery_price) {
        this.getDeliveryPrice();
      }
    },
    "modelData.type": function () {
      if (this.transporter_select.is_get_delivery_price) {
        this.getDeliveryPrice();
      }
    },
    listPack: function() {
      let temp = 0;
      this.listPack.forEach((item) => {
        temp += item.china_shipping_cost;
      });
      this.totalDeliveryCostTQ = temp;
      this.getDebtOrder();
    },
  },
};
</script>

<style lang="css" scoped>
.delivery-add-title {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.delivery-add-title span {
  margin-left: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #207cdc;
}

/*Table*/
.delivery-add-table-1 .line-item {
  margin-bottom: 3px;
  margin-top: 3px;
}
.delivery-add-table-1 .line-item-note {
  padding-left: 3px;
}
.delivery-add-table-1 .line-item img {
  margin-right: 5px;
}
.delivery-add-table-1 .line-item img.address {
  margin-top: 2px;
}
.delivery-add-table-1 .customer-name {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}

/*Đè các khoảng cách ô*/
.delivery-add-table-1 {
  line-height: 23px;
}
.delivery-add-table-1 .icon-v1 {
  width: 200px;
  flex-grow: 0;
}
.delivery-add-table-1 .icon-v2 {
  padding-bottom: 0px;
  padding-top: 0px;
}

/*Ô radio select custom*/
.item-common-9012 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 12px;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
@media screen and (min-width: 1025px) {
  .item-common-9012 {
    margin-right: 28px;
    font-size: 14px;
  }
}
.item-common-9012:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.item-common-9012 img {
  margin-right: 8px;
}

.delivery-add-info {
  border-right: 1px solid #bdd6ee;
  padding-right: 10px;
  padding-bottom: 10px;
}
.delivery-add-info-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
  margin-bottom: 15px;
  margin-top: 15px;
}
.delivery-add-warehouse {
  padding-left: 10px;
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

/*Phí vận chuyển tạm tính*/
.create-delivery-sub-title {
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #000728;
  margin-right: 10px;
}

/*Chi phí phải thanh toán*/
.color-red {
  color: red;
}
.pay-item {
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #ccc;
  color: #575757;
}
.pay-item .title {
  width: 200px;
  display: inline-block;
}
</style>

<style>
.delivery-add
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td.el-table__cell {
  background: #fff;
}
</style>

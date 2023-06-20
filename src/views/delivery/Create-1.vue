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
        <span class="title">Đơn hàng - Thêm kiện hàng</span>
      </div>
      <div class="delivery-add-title">
        <img src="@/static/icon/delivery/create/maki_warehouse.svg" />
        <span>Thông tin khách hàng</span>
      </div>
      <div class="table-element-custom-2022-v3 delivery-add-table-1 mb-4">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column
            label="Khách hàng"
            align="left"
            header-align="center"
            width="200"
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
            label="Thông tin giao hàng"
            align="left"
            header-align="center"
          >
            <el-row :gutter="0">
              <el-col :span="12">
                <div class="delivery-add-info">
                  <div class="line-item transport-method">
                    <div class="delivery-add-info-title">
                      <span>Hình thức vận chuyển</span>
                    </div>
                    <div class="d-flex pt-3">
                      <div
                        class="item-common-9012"
                        v-for="item in listCategory.transporters"
                        :key="item.id"
                        @click="clickTransporter(item)"
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
                  <div class="line-item shipping-method">
                    <div class="delivery-add-info-title">
                      <span>Phương thức vận chuyển</span>
                    </div>
                    <div class="d-flex pt-3">
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
                      <span>Hình thức thanht toán</span>
                    </div>
                    <div class="d-flex pt-3">
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
                </div>
              </el-col>
              <el-col :span="12">
                <div class="delivery-add-warehouse">
                  <address-take
                    :customer_id="modelData.customer_id"
                    @changeAddressId="changeAddressIdParent"
                  ></address-take>
                </div>
              </el-col>
            </el-row>
          </el-table-column>
        </el-table>
      </div>
      <div class="delivery-add-title">
        <img src="@/static/icon/delivery/list/box.svg" />
        <span>Danh sách kiện cần giao</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ls from "local-storage";
import AddressTake from "./common-components/AddressTake";
export default {
  name: "DeliveryCreate",
  components: {
    AddressTake,
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
        type: "",
        payment: "",
        date: "",
        note: "",
        customer_delivery_id: "",
        customer_id: "",
        customer_name: "",
        customer_phone: "",
      },

      // Ẩn date:
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },

      transporter_select: {},

      tableData: [],

      listCategory: {},
    };
  },
  mounted() {
    this.fetchCategory();
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
    changeTable() {
      this.tableData = [{}];
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

        setTimeout(() => {
          this.changeTable();
        }, 500);
      }
    },
    fetchCategory() {
      axios.get("common/delivery").then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
            this.changeTable();
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

    // Chọn loại vận chuyển
    clickTransporter(item) {
      this.transporter_select = item;
      this.changeTable();
    },

    // Chọn kho
    changeAddressIdParent(id) {
      this.modelData.customer_delivery_id = id;
      this.changeTable();
    },
  },
  watch: {
    "modelData.type": function () {
      this.changeTable();
    },
    "modelData.payment": function () {
      this.changeTable();
    },
    "modelData.date": function () {
      this.changeTable();
    },
    "modelData.note": function () {
      this.changeTable();
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

/*Ô radio select custom*/
.item-common-9012 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 35px;

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #575757;
}
.item-common-9012:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.item-common-9012 img {
  margin-right: 8px;
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

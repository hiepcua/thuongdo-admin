<template>
  <div class="customer-common customer-detail frame-content-common-2022">
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Chi tiết thông tin khách hàng</span>
    </div>
    <div class="tab-navigation d-flex flex-row">
      <span
        class="item"
        :class="[tab === 'info' ? 'active' : '']"
        @click="changeTap('info')"
      >
        Thông tin tài khoản</span
      >
      <span
        class="item"
        :class="[tab === 'order' ? 'active' : '']"
        @click="changeTap('order')"
      >
        Thông tin đơn hàng
      </span>
      <span
        class="item"
        :class="[tab === 'e-wallet' ? 'active' : '']"
        @click="changeTap('e-wallet')"
      >
        Ví điện tử
      </span>
      <span
        class="item"
        :class="[tab === 'care-history' ? 'active' : '']"
        @click="changeTap('care-history')"
      >
        Lịch sử chăm sóc
      </span>
      <span
        class="item"
        :class="[tab === 'supplier' ? 'active' : '']"
        @click="changeTap('supplier')"
      >
        Nhà cung cấp
      </span>
      <span
        class="item"
        :class="[tab === 'change-history' ? 'active' : '']"
        @click="changeTap('change-history')"
      >
        Lịch sử thay đổi
      </span>
      <span
        class="item"
        :class="[tab === 'change-staff-history' ? 'active' : '']"
        @click="changeTap('change-staff-history')"
      >
        Lịch sử thay đổi nhân viên
      </span>
      <span
        class="item"
        :class="[tab === 'change-label-history' ? 'active' : '']"
        @click="changeTap('change-label-history')"
      >
        Lịch sử gán nhãn
      </span>
      <span
        class="item"
        :class="[tab === 'voucher' ? 'active' : '']"
        @click="changeTap('voucher')"
      >
        Ưu đãi
      </span>
    </div>

    <div class="customer-list-item" v-if="tab === 'info'">
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Họ và tên</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.name
                    ? customerInfo.info.name
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Số điện thoại</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.phone_number
                    ? customerInfo.info.phone_number
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Email</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.email
                    ? customerInfo.info.email
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Mật khẩu</div>
              <div class="content">****************</div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Ngày sinh</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.bod
                    ? customerInfo.info.bod
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Trạng thái tài khoản</div>
              <div class="content">
                {{ customerInfo.status ? "Hoạt động" : "Ngưng hoạt động" }}
              </div>
            </div>
          </div>
          <div class="d-flex align-items-start mt-4">
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="goToUpdate()"
            >
              <span>Thay đổi thông tin</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Kho nhận hàng</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.warehouse_id
                    ? getWarehouseName(customerInfo.info.warehouse_id)
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Dịch vụ</div>
              <div class="content">
                {{
                  customerInfo.info
                    ? getServiceName(customerInfo.info.service)
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Địa chỉ</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.address
                    ? customerInfo.info.address
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Nhân viên CSKH</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.staff_care_id
                    ? getStaffCare(customerInfo.info.staff_care_id)
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Nhân viên tư vấn</div>
              <div class="content">
                {{
                  customerInfo.info && customerInfo.info.staff_counselor_id
                    ? getStaffCounselor(customerInfo.info.staff_counselor_id)
                    : ""
                }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="tab === 'order'">
      <customer-order-history />
    </div>
    <div v-if="tab === 'e-wallet'">
      <wallet-history></wallet-history>
    </div>
    <div v-if="tab === 'care-history'">
      <care-history />
    </div>
    <div v-if="tab === 'supplier'">
      <supplier-history />
    </div>
    <div v-if="tab === 'change-history'">
      <change-history />
    </div>
    <div v-if="tab === 'change-staff-history'">
      <change-staff-history />
    </div>
    <div v-if="tab === 'change-label-history'">
      <change-label-history />
    </div>
    <div class="customer-list-item" v-if="tab === 'voucher'">
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">% Đặt hàng</div>
              <div class="content">
                {{
                  customerOffer.offer_rate
                    ? customerOffer.offer_rate + " %"
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">% Đặt cọc</div>
              <div class="content">
                {{
                  customerOffer.deposit_rate
                    ? customerOffer.deposit_rate + " %"
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex align-items-start mt-5">
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="goToUpdate()"
            >
              <span>Thay đổi thông tin</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HN (/kg)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hn_fee
                    ? convertMoney(customerOffer.trans_weight_hn_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HCM (/kg)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hn_fee
                    ? convertMoney(customerOffer.trans_weight_hcm_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HP (/kg)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hp_fee
                    ? convertMoney(customerOffer.trans_weight_hp_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HN (/m3)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hn_fee
                    ? convertMoney(customerOffer.trans_volumn_hn_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HCM (/m3)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hn_fee
                    ? convertMoney(customerOffer.trans_volumn_hcm_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="customer-detail-item d-flex flex-row">
              <div class="label">Phí vận chuyển HP (/m3)</div>
              <div class="content">
                {{
                  customerOffer.trans_weight_hp_fee
                    ? convertMoney(customerOffer.trans_volumn_hp_fee)
                    : "0 đ"
                }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { formatCurrency } from "@/common/convert";
import CustomerOrderHistory from "@/views/customer/components/CustomerOrderHistory";
import WalletHistory from "@/views/customer/components/WalletHistory";
import CareHistory from "@/views/customer/components/CareHistory";
import ChangeLabelHistory from "@/views/customer/components/ChangeLabelHistory";
import ChangeStaffHistory from "@/views/customer/components/ChangeStaffHistory";
import ChangeHistory from "@/views/customer/components/ChangeHistory";
import SupplierHistory from "@/views/customer/components/Supplier";
export default {
  name: "CustomerDetail",
  components: {
    SupplierHistory,
    ChangeLabelHistory,
    CareHistory,
    WalletHistory,
    CustomerOrderHistory,
    ChangeStaffHistory,
    ChangeHistory,
  },
  metaInfo() {
    return {
      title: "Thay đổi thông tin khách hàng",
    };
  },
  data() {
    return {
      tab: "info",
      customerInfo: {},
      customerOffer: {
        offer_rate: 0,
        deposit_rate: 0,
        trans_weight_hn_fee: 0,
        trans_weight_hcm_fee: 0,
        trans_weight_hp_fee: 0,
        trans_volumn_hn_fee: 0,
        trans_volumn_hcm_fee: 0,
        trans_volumn_hp_fee: 0,
      },
      optionsService: [],
      optionsStaffCare: [],
      optionsStaffCounselor: [],
      optionsWareHouse: [],
    };
  },
  created() {
    this.getCategory();
    this.getCustomer();
  },
  methods: {
    changeTap(tab) {
      this.tab = tab;
    },
    convertMoney(value) {
      return formatCurrency(value);
    },
    getCustomer() {
      axios.get("customer/" + this.$route.params.id).then((response) => {
        switch (response.code) {
          case 200:
            this.customerInfo = response.data;
            this.customerOffer = {
              offer_rate: response.data.offer.offer_rate,
              deposit_rate: response.data.offer.deposit_rate,
              trans_weight_hn_fee: response.data.offer.trans_weight_hn_fee,
              trans_weight_hcm_fee: response.data.offer.trans_weight_hcm_fee,
              trans_weight_hp_fee: response.data.offer.trans_weight_hp_fee,
              trans_volumn_hn_fee: response.data.offer.trans_volumn_hn_fee,
              trans_volumn_hcm_fee: response.data.offer.trans_volumn_hcm_fee,
              trans_volumn_hp_fee: response.data.offer.trans_volumn_hp_fee,
            };
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
            this.optionsService = response.data.service;
            this.optionsWareHouse = response.data.warehouses;
            this.optionsStaffCare = response.data.staffs.care;
            this.optionsStaffCounselor = response.data.staffs.counselor;
            break;
          default:
            break;
        }
      });
    },
    getWarehouseName(warehouse_id) {
      if (warehouse_id === "" || this.optionsWareHouse.length === 0) {
        return "";
      }
      let warehouse = this.optionsWareHouse.filter(
        (e) => e.id === warehouse_id
      );
      return warehouse.length !== 0 ? warehouse[0].name : "";
    },
    getServiceName(service) {
      let serviceName = this.optionsService.filter((e) => e.value === service);
      return serviceName[0] ? serviceName[0].name : "";
    },
    getStaffCare(staff_care_id) {
      if (staff_care_id === "" || this.optionsStaffCare.length === 0) {
        return "";
      }
      let staff = this.optionsStaffCare.filter((e) => e.id === staff_care_id);
      return staff.length !== 0 ? staff[0].name : "";
    },
    getStaffCounselor(staff_counselor_id) {
      if (
        staff_counselor_id === "" ||
        this.optionsStaffCounselor.length === 0
      ) {
        return "";
      }
      let staff = this.optionsStaffCounselor.filter(
        (e) => e.id === staff_counselor_id
      );
      return staff.length !== 0 ? staff[0].name : "";
    },
    goToUpdate() {
      this.$router.push(
        "/customer/customer-lists/update/" + this.$route.params.id
      );
    },
  },
};
</script>
<style lang="css" scoped>
.tab-navigation {
  border-bottom: 0.5px dashed #bdd6ee;
  padding-bottom: 17px;
  padding-top: 17px;
}
.tab-navigation .item {
  font-size: 14px;
  padding: 7px 20px;
  border-radius: 5px;
  color: #3f92d1;
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.3s;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
}
.tab-navigation .active {
  background: #0688ee;
  color: #fff;
}
.tab-navigation .item:hover {
  background: #0688ee;
  color: #fff;
  transition: all 0.3s;
}
.customer-list-item {
  padding-top: 25px;
}

.customer-list-item .customer-detail-item {
  line-height: 40px;
}
.customer-list-item .customer-detail-item .label {
  width: 170px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: #000728;
}

.customer-list-item .customer-detail-item .content {
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: #767676;
  padding-left: 10px;
}
</style>

<template>
  <div class="customer-common customer-list-create frame-content-common-2022">
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Thay đổi thông tin khách hàng</span>
    </div>
    <div class="tab-navigation">
      <span
        class="item"
        :class="[tab == 'info' ? 'active' : '']"
        @click="changeTap('info')"
      >
        Thông tin tài khoản
      </span>
      <span
        class="item"
        :class="[tab == 'address' ? 'active' : '']"
        @click="changeTap('address')"
      >
        Địa chỉ nhận hàng
      </span>
      <span
        class="item"
        :class="[tab == 'voucher' ? 'active' : '']"
        @click="changeTap('voucher')"
      >
        Ưu đãi
      </span>
    </div>
    <div
      class="customer-list-create-item customer-list-create-info"
      v-if="tab == 'info'"
    >
      <el-form
        ref="customer-create-form"
        :rules="customerFormRule"
        :model="customerForm"
        label-position="left"
        :show-message="true"
        label-width="180px"
      >
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item
              label="Họ và tên"
              prop="name"
              class="item-form-normal"
            >
              <el-input
                placeholder="Họ và tên"
                v-model="customerForm.name"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Số điện thoại"
              class="item-form-normal"
              prop="phone_number"
            >
              <el-input
                placeholder="Số điện thoại"
                v-model="customerForm.phone_number"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email" class="item-form-normal">
              <el-input
                placeholder="Email"
                v-model="customerForm.email"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Mật khẩu mới"
              prop="password"
              class="item-form-normal"
            >
              <el-input
                placeholder="Mật khẩu"
                v-model="customerForm.password"
                type="password"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Nhập lại mật khẩu mới"
              prop="repeat_password"
              class="item-form-normal"
            >
              <el-input
                placeholder="Mật khẩu"
                v-model="customerForm.repeat_password"
                type="password"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Ngày sinh" prop="bod" class="item-form-normal">
              <el-date-picker
                v-model="customerForm.bod"
                type="date"
                placeholder="Ngày sinh"
                class="frame-date-common-2022 padding-input-bod"
                size="mini"
                clearable
                popper-class="frame-date-popper-common-2022"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="Chọn kho hàng nhận"
              prop="warehouse_id"
              class="item-form-normal"
            >
              <el-select
                v-model="customerForm.warehouse_id"
                placeholder="--Chọn--"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
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
            </el-form-item>
            <el-form-item
              label="Chọn dịch vụ"
              prop="service"
              class="item-form-normal"
            >
              <el-select
                v-model="customerForm.service"
                placeholder="---Chọn---"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
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
            </el-form-item>
            <el-form-item
              label="Chọn nhân viên CSKH"
              prop="staff"
              class="item-form-normal"
            >
              <el-select
                v-model="customerForm.staff_care_id"
                placeholder="---Chọn---"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
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
            </el-form-item>
            <el-form-item
              label="Chọn nhân viên Tư vấn"
              prop="staff"
              class="item-form-normal"
            >
              <el-select
                v-model="customerForm.staff_counselor_id"
                placeholder="---Chọn---"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
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
            </el-form-item>
            <div class="d-flex justify-content-end pt-3">
              <div
                class="frame-btn-create-td-2022 submit-button d-flex justify-content-center align-items-center"
                @click="submitCustomerForm()"
              >
                <img src="@/static/icon/action/save.svg" alt="" />
                <span>Lưu thông tin</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="customer-list-create-item customer-list-create-address"
      v-if="tab == 'address'"
    >
      <div
        v-for="customerDelivery in listAdd"
        :key="customerDelivery.id"
        class="item d-flex justify-content-between align-items-center"
      >
        <div class="info d-flex flex-column">
          <div class="d-flex align-items-center">
            <span class="name">{{ customerDelivery.receiver }}</span>
            <img
              class="icon-1"
              src="@/static/icon/customer-list/Ellipse46.svg"
              alt=""
            />
            <span class="phone">{{ customerDelivery.phone_number }}</span>
            <img
              class="icon-1 icon-2"
              v-if="customerDelivery.is_default"
              src="@/static/icon/customer-list/CheckCircle.svg"
              alt=""
            />
            <img
              class="icon-1 icon-2"
              v-else
              @click="changeReceiver(customerDelivery)"
              src="@/static/icon/customer-list/UnCheckCircle.svg"
              alt=""
            />
          </div>
          <span class="address">
            {{ customerDelivery.address }}
          </span>
        </div>
        <div class="action">
          <img
            src="@/static/icon/action/edit.svg"
            @click="showEditAddress(customerDelivery)"
            alt=""
          />
          <img
            src="@/static/icon/action/delete.svg"
            @click="deleteAddress(customerDelivery)"
            alt=""
          />
        </div>
      </div>
      <div
        class="item d-flex flex-row add-address"
        @click="showCreateAddress()"
      >
        <img
          class="icon-1"
          src="@/static/icon/customer-list/AddCircle.svg"
          alt=""
        />
        <span>Thêm địa chỉ</span>
      </div>
    </div>
    <div
      class="customer-list-create-item customer-list-create-voucher"
      v-if="tab == 'voucher'"
    >
      <el-form
        ref="voucher-create-form"
        :model="customer_offer"
        label-position="left"
        :show-message="true"
        label-width="180px"
      >
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item
              label="% Đặt hàng"
              prop="offer_rate"
              class="item-form-normal"
            >
              <el-input
                placeholder="% Đặt hàng"
                v-model="customer_offer.offer_rate"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="% Đặt cọc"
              prop="deposit_rate"
              class="item-form-normal"
            >
              <el-input
                placeholder="% Đặt cọc"
                v-model="customer_offer.deposit_rate"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="Phí vận chuyển HN (/kg)"
              prop="trans_weight_hn_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HN (/kg)"
                v-model="customer_offer.trans_weight_hn_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Phí vận chuyển HCM (/kg)"
              prop="trans_weight_hcm_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HCM (/kg)"
                v-model="customer_offer.trans_weight_hcm_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Phí vận chuyển HP (/kg)"
              prop="trans_weight_hp_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HP (/kg)"
                v-model="customer_offer.trans_weight_hp_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="Phí vận chuyển HN (/m3)"
              prop="trans_volumn_hn_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HN (/m3)"
                v-model="customer_offer.trans_volumn_hn_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Phí vận chuyển HCM (/m3)"
              prop="trans_volumn_hcm_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HCM (/m3)"
                v-model="customer_offer.trans_volumn_hcm_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Phí vận chuyển HP (/m3)"
              prop="trans_volumn_hp_fee"
              class="item-form-normal"
            >
              <el-input
                placeholder="Phí vận chuyển HP (/m3)"
                v-model="customer_offer.trans_volumn_hp_fee"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <div class="d-flex justify-content-end pt-3">
              <div
                class="frame-btn-create-td-2022 submit-button d-flex justify-content-center align-items-center"
                @click="submitVoucher()"
              >
                <img src="@/static/icon/action/save.svg" alt="" />
                <span class="justify-content-center align-items-center">
                  Lưu thông tin
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="dialog-frame-normal-2022">
      <el-dialog :visible.sync="dialogAddAddressVisible" width="750px" center>
        <span
          slot="title"
          class="d-flex flex-row justify-content-start align-items-start"
        >
          <img src="@/static/icon/customer-list/Location.svg" alt="" />
          <span class="px-2 d-flex justify-content-center">
            {{ adding ? "Thêm" : "Sửa" }} địa chỉ nhận hàng
          </span>
        </span>
        <div class="d-flex customer-list-create-item">
          <el-form
            :model="addressForm"
            :rules="addressFormRule"
            label-width="150px"
            label-position="left"
            ref="address-customer-form"
            class="address-form"
          >
            <el-form-item
              label="Họ tên người nhận"
              prop="receiver"
              class="item-form-normal"
            >
              <el-input
                placeholder="Nhập"
                v-model="addressForm.receiver"
                type="repeat_password"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Số điện thoại"
              prop="phone_number"
              class="item-form-normal"
            >
              <el-input
                placeholder="Nhập"
                v-model="addressForm.phone_number"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="item-form-normal">
              <span slot="label"><span class="star">*</span> Địa chỉ</span>
              <div class="d-flex flex-column">
                <div class="d-flex flex-row">
                  <div class="customer-province-select">
                    <el-form-item prop="province_id">
                      <el-select
                        v-model="addressForm.province_id"
                        placeholder="--Chọn tỉnh--"
                        class="frame-select-common-2022"
                        popper-class="frame-select-popper-common-2022"
                        clearable
                        @change="getDistrictForDialog"
                        size="mini"
                      >
                        <el-option
                          v-for="item in optionsProvinceForDialog"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="customer-district-select">
                    <el-form-item prop="district_id">
                      <el-select
                        v-model="addressForm.district_id"
                        placeholder="--Chọn quận--"
                        class="frame-select-common-2022"
                        popper-class="frame-select-popper-common-2022"
                        clearable
                        @change="getWardForDialog"
                        size="mini"
                      >
                        <el-option
                          v-for="item in optionsDistrictForDialog"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="customer-ward-select">
                    <el-form-item prop="ward_id">
                      <el-select
                        v-model="addressForm.ward_id"
                        placeholder="--Chọn Phường--"
                        class="frame-select-common-2022"
                        popper-class="frame-select-popper-common-2022"
                        clearable
                        size="mini"
                      >
                        <el-option
                          v-for="item in optionsWardForDialog"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <el-form-item prop="address">
                    <el-input
                      placeholder="Nhập địa chỉ chi tiết"
                      v-model="addressForm.address"
                      type="repeat_password"
                      class="frame-input-common-2022"
                      size="mini"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-end align-items-end mr-3">
            <div
              class="d-flex frame-btn-cancel-customer-td-2022 justify-content-center align-items-center mr-1"
              @click="dialogAddAddressVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              @click="addAddress()"
            >
              <span> {{ adding ? "Thêm địa chỉ" : "Xác nhận" }} </span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as moment from "moment";

export default {
  name: "CustomerListUpdate",
  metaInfo() {
    return {
      title: "Thay đổi thông tin khách hàng",
    };
  },
  data() {
    var phoneNumberValidate = (rule, value, callback) => {
      var startNumber = [
        "088",
        "091",
        "094",
        "086",
        "096",
        "097",
        "098",
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "038",
        "039",
        "070",
        "079",
        "077",
        "076",
        "078",
        "083",
        "084",
        "085",
        "081",
        "082",
        "056",
        "058",
        "059",
        "099",
        "092",
        "093",
        "090",
        "089",
      ];
      if (/^[0]\d{9}$/.test(value) && startNumber.includes(value.slice(0, 3))) {
        callback();
      } else {
        callback(new Error("Vui lòng nhập đúng định dạng SĐT."));
      }
    };
    var customPasswordValidate = (rule, value, callback) => {
      if (this.customerForm.repeat_password !== "") {
        if (this.customerForm.password !== this.customerForm.repeat_password) {
          callback(new Error("Mật khẩu không trùng khớp."));
        }
        callback();
      }
    };
    return {
      tab: "info",
      dialogAddAddressVisible: false,
      value1: "",
      value: "",
      checked: false,
      adding: false,
      customerForm: {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        repeat_password: "",
        bod: "",
        warehouse_id: "",
        service: "",
        staff_care_id: "",
        staff_counselor_id: "",
      },
      customer_offer_id: "",
      customer_offer: {
        offer_rate: 0,
        deposit_rate: 0,
        trans_weight_hn_fee: 0,
        trans_weight_hcm_fee: 0,
        trans_weight_hp_fee: 0,
        trans_volumn_hn_fee: 0,
        trans_volumn_hcm_fee: 0,
        trans_volumn_hp_fee: 0,
      },
      customerFormRule: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên khách hàng",
            trigger: "blur",
          },
          {
            max: 255,
            message: "Tên khách hàng phải nhỏ hơn 256 kí tự",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "Vui lòng nhập email.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email.",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: false,
            message: "Vui lòng điền mật khẩu.",
            trigger: "blur",
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu phải từ 6 đến 14 kí tự",
            trigger: ["blur", "change"],
          },
        ],
        repeat_password: [
          {
            required: false,
            message: "Vui lòng điền mật khẩu.",
            trigger: "blur",
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu phải từ 6 đến 14 kí tự",
            trigger: ["blur", "change"],
          },
          {
            validator: customPasswordValidate,
            trigger: ["blur", "change"],
          },
        ],
        phone_number: [
          {
            required: true,
            message: "Vui lòng điền số điện thoại",
            trigger: "blur",
          },
          {
            validator: phoneNumberValidate,
            trigger: ["blur", "change"],
          },
        ],
        warehouse_id: [
          {
            required: true,
            message: "Vui lòng chọn kho nhận hàng",
            trigger: ["blur", "change"],
          },
        ],
        service: [
          {
            required: true,
            message: "Vui lòng chọn dịch vụ",
            trigger: ["blur", "change"],
          },
        ],
      },
      addressForm: {
        id: "",
        receiver: "",
        phone_number: "",
        ward_id: "",
        district_id: "",
        province_id: "",
        address: "",
        is_default: 0,
      },
      listAdd: [],
      addressFormRule: {
        receiver: [
          {
            required: true,
            message: "Vui lòng điền tên người nhận",
            trigger: "blur",
          },
          {
            max: 255,
            message: "Tên người nhận phải nhỏ hơn 256 kí tự",
            trigger: ["blur", "change"],
          },
        ],
        phone_number: [
          {
            required: true,
            message: "Vui lòng điền số điện thoại",
            trigger: "blur",
          },
          {
            validator: phoneNumberValidate,
            trigger: ["blur", "change"],
          },
        ],
        province_id: [
          {
            required: true,
            message: "Vui lòng chọn thành phố.",
            trigger: ["blur", "change"],
          },
        ],
        district_id: [
          {
            required: true,
            message: "Vui lòng chọn quận.",
            trigger: ["blur", "change"],
          },
        ],
        ward_id: [
          {
            required: true,
            message: "Vui lòng chọn phường.",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: true,
            message: "Vui lòng điền địa chỉ chi tiết",
            trigger: "blur",
          },
          {
            max: 255,
            message: "Địa chỉ phải nhỏ hơn 256 kí tự",
            trigger: ["blur", "change"],
          },
        ],
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
      optionsService: [],
      optionsProvince: [],
      optionsDistrict: [],
      optionsWard: [],
      optionsProvinceForDialog: [],
      optionsDistrictForDialog: [],
      optionsWardForDialog: [],
      optionsWareHouse: [],
      optionsStaffCare: [],
      optionsStaffCounselor: [],
    };
  },
  created() {
    this.getCustomer();
    this.getCategory();
  },
  methods: {
    changeTap(tab) {
      this.tab = tab;
    },
    getCustomer() {
      axios.get("customer/" + this.$route.params.id).then((response) => {
        switch (response.code) {
          case 200:
            this.customerForm = {
              name: response.data.info.name ? response.data.info.name : "",
              phone_number: response.data.info.phone_number,
              email: response.data.info.email,
              bod: response.data.info.bod,
              warehouse_id: response.data.info.warehouse_id,
              service: response.data.info.service,
              staff_care_id: response.data.info.staff_care_id,
              staff_counselor_id: response.data.info.staff_counselor_id,
            };
            this.listAdd = response.data.delivery;
            this.customer_offer_id = response.data.offer.id
              ? response.data.offer.id
              : "";
            this.customer_offer = {
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
    showCreateAddress() {
      this.dialogAddAddressVisible = true;
      if (this.$refs["address-customer-form"]) {
        this.$refs["address-customer-form"].clearValidate();
      }
      this.adding = true;
    },
    showEditAddress(row) {
      this.dialogAddAddressVisible = true;
      if (this.$refs["address-customer-form"]) {
        this.$refs["address-customer-form"].clearValidate();
      }
      this.adding = false;
      const item = row;
      this.addressForm = {
        receiver: item.receiver,
        phone_number: item.phone_number,
        ward_id: item.ward_id,
        district_id: item.district_id,
        province_id: item.province_id,
        address: item.address,
        id: item.id,
        is_default: item.is_default,
      };
      this.getDistrictForDialog(item.province_id);
      this.getWardForDialog(item.district_id);
    },
    deleteAddress(item) {
      axios.delete("/customer_delivery/" + item.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá địa chỉ thành công.",
              message: "Đã xoá địa chỉ  hàng thành công.",
              type: "success",
            });
            this.getCustomer();
            break;
          case 422:
            var mess = Object.keys(response.data);
            this.$notify({
              title: "Xoá địa chỉ thất bại",
              message: response.data[mess[0]],
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
    getCategory() {
      axios.get("common/customer/").then((response) => {
        switch (response.code) {
          case 200:
            this.optionsService = response.data.service;
            this.optionsProvince = response.data.provinces;
            this.optionsProvinceForDialog = response.data.provinces;
            this.optionsWareHouse = response.data.warehouses;
            this.optionsStaffCare = response.data.staffs.care;
            this.optionsStaffCounselor = response.data.staffs.counselor;
            break;
          default:
            break;
        }
      });
    },
    getDistrict(province_id) {
      if (province_id === "") {
        this.optionsDistrict = [];
        this.optionsWard = [];
        this.customerForm.ward_id = "";
        this.customerForm.district_id = "";
        return;
      }
      this.optionsWard = [];
      axios.get("/locate/district/" + province_id).then((response) => {
        switch (response.code) {
          case 200:
            this.optionsDistrict = response.data;
            break;
          default:
            break;
        }
      });
    },
    getWard(district_id) {
      if (district_id === "") {
        this.optionsWard = [];
        this.customerForm.ward_id = "";
        return;
      }
      axios.get("/locate/ward/" + district_id).then((response) => {
        switch (response.code) {
          case 200:
            this.optionsWard = response.data;
            break;
          default:
            break;
        }
      });
    },
    getDistrictForDialog(province_id) {
      if (province_id === "") {
        this.optionsDistrictForDialog = [];
        this.optionsWardForDialog = [];
        this.addressForm.ward_id = "";
        this.addressForm.district_id = "";
        return;
      }
      this.optionsWardForDialog = [];
      axios.get("/locate/district/" + province_id).then((response) => {
        switch (response.code) {
          case 200:
            this.optionsDistrictForDialog = response.data;
            break;
          default:
            break;
        }
      });
    },
    getWardForDialog(district_id) {
      if (district_id === "") {
        this.optionsWardForDialog = [];
        this.addressForm.ward_id = "";
        return;
      }
      axios.get("/locate/ward/" + district_id).then((response) => {
        switch (response.code) {
          case 200:
            this.optionsWardForDialog = response.data;
            break;
          default:
            break;
        }
      });
    },
    addAddress() {
      this.$refs["address-customer-form"].validate((valid) => {
        if (valid) {
          if (this.adding) {
            let item = Object.assign(this.addressForm);
            if (this.listAdd.length === 0) {
              item["is_default"] = 1;
            }
            delete item["id"];
            item["customer_id"] = this.$route.params.id;
            axios.post("/customer_delivery", item).then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Cập nhật danh sách địa chỉ thành công.",
                    message: "Đã cập danh sách địa chỉ  hàng thành công.",
                    type: "success",
                  });
                  this.getCustomer();
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Cập nhật danh sách địa chỉ thất bại",
                    message: response.data[mess[0]],
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
          } else {
            let item = Object.assign(this.addressForm);
            item["customer_id"] = this.$route.params.id;
            axios
              .put("/customer_delivery/" + item.id, item)
              .then((response) => {
                switch (response.code) {
                  case 200:
                    this.$notify({
                      title: "Cập nhật danh sách địa chỉ thành công.",
                      message: "Đã cập danh sách địa chỉ  hàng thành công.",
                      type: "success",
                    });
                    this.getCustomer();
                    break;
                  case 422:
                    var mess = Object.keys(response.data);
                    this.$notify({
                      title: "Cập nhật danh sách địa chỉ thất bại",
                      message: response.data[mess[0]],
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
          }
          this.addressForm = {
            receiver: "",
            phone_number: "",
            ward_id: "",
            district_id: "",
            province_id: "",
            address: "",
            id: "",
            is_default: 0,
          };
          this.dialogAddAddressVisible = false;
        }
      });
    },
    backToForm() {
      this.tab = "info";
    },
    changeReceiver(item) {
      axios
        .patch("/customer_delivery/status/" + item.id, {
          customer_id: this.$route.params.id,
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Cập nhật trạng thái địa chỉ thành công.",
                message: "Đã cập trạng thái địa chỉ  hàng thành công.",
                type: "success",
              });
              this.getCustomer();
              break;
            case 422:
              var mess = Object.keys(response.data);
              this.$notify({
                title: "Cập nhật trạng thái địa chỉ thất bại",
                message: response.data[mess[0]],
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
    submitCustomerForm() {
      this.$refs["customer-create-form"].validate((valid) => {
        if (valid) {
          this.customerForm.bod
            ? (this.customerForm.bod = moment(this.customerForm.bod).format(
                "YYYY-MM-DD"
              ))
            : "";
          axios
            .put("/customer/" + this.$route.params.id, this.customerForm)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Cập nhật khách hàng thành công.",
                    message: "Đã cập nhật khách hàng thành công.",
                    type: "success",
                  });
                  // this.$router.push({ name: "customer-lists" });
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Cập nhật khách hàng thất bại",
                    message: response.data[mess[0]],
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
        }
      });
    },
    submitVoucher() {
      axios
        .patch("/customer/offer/" + this.customer_offer_id, this.customer_offer)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Cập nhật ưu đãi thành công.",
                message: "Đã cập ưu đãi thành công.",
                type: "success",
              });
              this.getCustomer();
              break;
            case 422:
              var mess = Object.keys(response.data);
              this.$notify({
                title: "Cập nhật ưu đãi thất bại",
                message: response.data[mess[0]],
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
  /*cursor: pointer;*/
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
.add-address {
  border-bottom: 0.5px dashed #bdd6ee !important;
  padding-left: 10px;
  cursor: pointer;
}

.add-address span {
  font-size: 14px;
  font-weight: 400;
  color: #207cdc;
}
.customer-list-create-item {
  padding-top: 25px;
}

.customer-list-create-address {
  padding-top: 10px;
}
.customer-list-create-address .item {
  border-bottom: 1px dashed rgba(130, 130, 130, 0.58);
  padding: 15px 0px 15px 0px;
}
.customer-list-create-address .name {
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: #000935;
}
.customer-list-create-address .icon-1 {
  margin: 0px 10px;
  cursor: pointer;
}
.customer-list-create-address .phone {
  color: #3f92d1;
  font-size: 12px;
}

.customer-list-create-address .address {
  color: #3f92d1;
  font-size: 12px;
  padding-top: 6px;
}
.customer-list-create-address .action img {
  margin: 0px 5px;
  cursor: pointer;
  width: 15px;
}
.item-form-normal .customer-province-select {
  padding-right: 10px;
  min-width: 130px;
}
.item-form-normal .customer-district-select {
  padding-right: 10px;
  min-width: 135px;
}
.item-form-normal .customer-ward-select {
  width: 80%;
}
.address-form {
  padding: 0 25px;
}
.padding-input-bod {
  padding-bottom: 9px;
}
.star {
  color: #f56c6c;
}
</style>

<style type="text/css">
.customer-list-create-item .el-form-item {
  margin-bottom: 0 !important;
}
.customer-list-create-item .el-dialog__body form .el-form-item {
  margin-bottom: 0 !important;
}

.customer-list-create-item .item-form-normal .el-form-item__label {
  font-size: 14px;
  color: #000728 !important;
  font-weight: 400;
}
.customer-list-create-item .item-form-normal .el-input--mini .el-input__inner {
  height: 38px;
  line-height: 38px;
}
.customer-list-create-item
  .item-form-normal
  .el-input--mini
  input::-webkit-input-placeholder {
  font-size: 14px !important;
}

.customer-list-create-item
  .item-form-normal
  .el-input--mini
  input::-moz-placeholder {
  font-size: 14px !important;
}
.customer-list-create-item
  .item-form-normal
  .el-input--miniinput::-ms-input-placeholder {
  font-size: 14px !important;
}
.customer-list-create-item
  .item-form-normal
  .el-form-item__content
  .el-form-item__error {
  padding-left: 4px;
  font-size: 10px !important;
  top: 72% !important;
}
.customer-list-create .submit-button span {
  font-size: 14px !important;
  padding: 5px 10px !important;
}
.customer-list-create .frame-input-common-2022 {
  margin-bottom: 12px;
}
.customer-list-create .frame-select-common-2022 {
  margin-bottom: 12px;
}
.customer-list-create .frame-date-common-2022 {
  width: 100% !important;
}
.customer-list-create .frame-select-common-2022 {
  width: 100%;
}

.el-checkbox__label {
  color: #3f92d1;
  font-weight: 300;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  margin-left: -2px;
}
.customer-list-create-voucher
  .el-checkbox__input.is-checked
  .el-checkbox__inner,
.customer-list-create-voucher
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner {
  background: #3f92d1;
}
.item-form-normal .frame-input-common-2022 {
  font-size: 14px;
}
.item-form-normal .frame-input-common-2022 input::-webkit-input-placeholder {
  font-size: 14px !important;
  color: #767676 !important;
  font-weight: 300;
}
.frame-input-common-2022 input::-moz-placeholder {
  font-size: 14px !important;
  color: #767676 !important;
  font-weight: 300;
}
.frame-input-common-2022 input::-ms-input-placeholder {
  font-size: 14px !important;
  color: #767676 !important;
  font-weight: 300;
}
.item-form-normal .el-input__icon {
  height: auto !important;
}
</style>

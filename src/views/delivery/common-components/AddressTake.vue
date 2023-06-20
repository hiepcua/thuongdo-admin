<template>
  <div class="address-take-826218" v-loading="loading">
    <div class="title-wrap d-flex justify-content-between align-items-center">
      <span class="title-1">Thông tin nhận hàng</span>
    </div>
    <div
      class="list-delivery"
      v-if="listWareHouse.length > 0 && loading == false"
    >
      <div
        class="list-delivery-item d-flex align-items-center"
        v-for="item in listWareHouse"
        :key="item.id"
      >
        <img
          src="@/static/icon/delivery/list/checked-2.svg"
          alt=""
          v-if="item.id === warehouse_id"
        />
        <img
          src="@/static/icon/delivery/list/no-checked.svg"
          alt=""
          v-else
          @click.stop="changeWareHouseId(item.id)"
        />
        <span class="address" @click.stop="changeWareHouseId(item.id)">{{
          item.custom_name
        }}</span>
        <div class="action-wrap-192s8">
          <div class="frame-hover-2022" @click="addDelivery(item)">
            <img src="@/static/icon/delivery/list/edit2.svg" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="list-delivery-none d-flex justify-content-center pt-4"
      v-if="listWareHouse.length == 0 && loading == false"
    >
      <span>Không có địa chỉ nào !!</span>
    </div>
    <div class="pt-3">
      <span class="btn-crud-2022 btn-goback frame-hover-2022" @click="addDelivery2">Thêm mới địa chỉ</span>
    </div>
    <div class="frame-dialog-no-close-1988">
      <el-dialog
        custom-class="account-profile-create-address-dialog-12829"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible"
        :show-close="false"
      >
        <div class="header-1988 el-dialog-header-2022">
          <img src="@/static/icon/delivery/list/localtion.svg" />
          <span>Cập nhật địa chỉ nhận hàng</span>
        </div>
        <div class="body-1988">
          <div class="address-dialog-12829-item">
            <span>Họ và tên <span class="color-red-dialog">*</span></span>
            <el-input
              placeholder="Họ và tên"
              v-model="deliveryAdd.receiver"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-item">
            <span>Số điện thoại <span class="color-red-dialog">*</span></span>
            <el-input
              placeholder="Số điện thoại"
              v-model="deliveryAdd.phone_number"
              class="frame-input-common-2022"
              size="mini"
              type="number"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-item">
            <span>Địa chỉ <span class="color-red-dialog">*</span></span>
            <div class="can-3">
              <el-select
                v-model="deliveryAdd.province_id"
                placeholder="Tỉnh thành"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listProvince"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="can-3">
              <el-select
                v-model="deliveryAdd.district_id"
                placeholder="Quận huyện"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listDistrict"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select
                v-model="deliveryAdd.ward_id"
                placeholder="Phường xã"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listWard"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="address-dialog-12829-item">
            <span></span>
            <el-input
              placeholder="Địa chỉ chi tiết"
              v-model="deliveryAdd.address"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-action d-flex justify-content-end pt-3 pb-3">
            <div class="d-flex">
              <span
                class="btn-common frame-hover-2022 btn-cancel"
                @click="dialogTableVisible = false"
                >Hủy bỏ</span>
              <span
                class="btn-common frame-hover-2022 btn-success"
                :class="!canSubmit ? 'disable' : ''"
                @click="submitAddressDelivery()"
                >
                  <span v-if="!canSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Cập nhật địa chỉ</span>
              </span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="frame-dialog-no-close-1988">
      <el-dialog
        top="150px"
        width="750px"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible2"
        :show-close="false"
      >
        <div class="header-1988 el-dialog-header-2022">
          <img src="@/static/icon/delivery/list/localtion.svg" />
          <span>Thêm địa chỉ nhận hàng</span>
        </div>
        <div class="body-1988">
          <div class="address-dialog-12829-item">
            <span>Họ và tên <span class="color-red-dialog">*</span></span>
            <el-input
              placeholder="Họ và tên"
              v-model="deliveryAdd.receiver"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-item">
            <span>Số điện thoại <span class="color-red-dialog">*</span></span>
            <el-input
              placeholder="Số điện thoại"
              v-model="deliveryAdd.phone_number"
              class="frame-input-common-2022"
              size="mini"
              type="number"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-item">
            <span>Địa chỉ <span class="color-red-dialog">*</span></span>
            <div class="can-3">
              <el-select
                v-model="deliveryAdd.province_id"
                placeholder="Tỉnh thành"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listProvince"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="can-3">
              <el-select
                v-model="deliveryAdd.district_id"
                placeholder="Quận huyện"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listDistrict"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select
                v-model="deliveryAdd.ward_id"
                placeholder="Phường xã"
                class="frame-select-common-2022 account-profile-select-city"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listWard"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="address-dialog-12829-item">
            <span></span>
            <el-input
              placeholder="Địa chỉ chi tiết"
              v-model="deliveryAdd.address"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
          </div>
          <div class="address-dialog-12829-action d-flex justify-content-end pt-3 pb-3">
            <div class="d-flex">
              <span
                class="btn-common frame-hover-2022 btn-cancel"
                @click="dialogTableVisible2 = false"
                >Hủy bỏ</span>
              <span
                class="btn-common frame-hover-2022 btn-success"
                :class="!canSubmit ? 'disable' : ''"
                @click="submitAddressDelivery2()"
                >
                  <span v-if="!canSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Thêm địa chỉ</span>
              </span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WarehouseTake",
  props: {
    customer_id: String,
  },
  data() {
    return {
      loading: false,
      listWareHouse: [],
      warehouse_id: null,

      // Phần cập nhật địa chỉ nhận hàng
      canSubmit: true,
      loadDone: false,
      dialogTableVisible: false,
      listProvince: [],
      listDistrict: [],
      listWard: [],
      deliveryAdd: {
        receiver: "",
        phone_number: "",
        province_id: "",
        district_id: "",
        ward_id: "",
        address: "",
      },

      // Phần thêm
      dialogTableVisible2: false,
    };
  },
  mounted() {},
  methods: {
    fetchWareHouse(loading = true) {
      if (loading) {
        this.loading = true;
      }
      let data = {
        customer_id: this.customer_id,
      };
      axios.get("common/delivery", { params: data }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listWareHouse = response.data.customer_deliveries;
            if (this.warehouse_id == null) {
              this.listWareHouse.forEach((element) => {
                if (element.is_default) {
                  this.warehouse_id = element.id;
                }
              });
              this.changeWareHouseId(this.warehouse_id);
            }
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
    updateWareHouse(id) {
      this.$confirm("Thiết lập địa chỉ này là địa chỉ mặc định", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.updateWareHouseAction(id);
        })
        .catch(() => {});
    },
    updateWareHouseAction(id) {
      // this.loading = true;
      let data = {
        customer_delivery_id: id,
      };
      axios.put("customer", data).then((response) => {
        // this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thành công",
              type: "success",
            });
            this.loadDone = false;
            this.fetchWareHouse(false);
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xẩy ra",
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
    changeWareHouseId(id) {
      this.warehouse_id = id;
      this.$emit("changeAddressId", id);
    },

    // Cập nhật địa chỉ
    addDelivery(item) {
      this.dialogTableVisible = true;
      this.deliveryAdd = JSON.parse(JSON.stringify(item));
      this.loadDone = false;
      this.fetchProvince();
      this.fetchDistrict();
      this.fetchWard();
    },
    fetchProvince() {
      axios.get("locate/province").then((response) => {
        switch (response.code) {
          case 200:
            this.listProvince = response.data;
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
    fetchDistrict() {
      axios
        .get("locate/district/" + this.deliveryAdd.province_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listDistrict = response.data;
              this.loadDone = true;
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
    fetchWard() {
      axios
        .get("locate/ward/" + this.deliveryAdd.district_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listWard = response.data;
              this.loadDone = true;
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
    submitAddressDelivery() {
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      axios
        .put("/customer_delivery/" + this.deliveryAdd.id, this.deliveryAdd)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Cập nhật thành công",
                type: "success",
              });
              this.dialogTableVisible = false;
              this.loadDone = false;
              this.fetchWareHouse();
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

    // Thêm địa chỉ
    addDelivery2() {
      this.dialogTableVisible2 = true;
      this.deliveryAdd.receiver = "";
      this.deliveryAdd.phone_number = "";
      this.deliveryAdd.province_id = "";
      this.deliveryAdd.district_id = "";
      this.deliveryAdd.ward_id = "";
      this.deliveryAdd.address = "";
      this.fetchProvince();
    },
    submitAddressDelivery2() {
      if (this.canSubmit == false) {
        return;
      }
      this.canSubmit = false;
      this.deliveryAdd.customer_id = this.customer_id;
      axios.post("/customer_delivery", this.deliveryAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.dialogTableVisible2 = false;
            this.loadDone = false;
            this.fetchWareHouse();
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
  },
  watch: {
    "deliveryAdd.province_id": function () {
      if (this.loadDone) {
        this.deliveryAdd.district_id = "";
      }
      if (this.deliveryAdd.province_id) {
        this.fetchDistrict();
      } else {
        this.listDistrict = [];
      }
    },
    "deliveryAdd.district_id": function () {
      if (this.loadDone) {
        this.deliveryAdd.ward_id = "";
      }
      if (this.deliveryAdd.district_id) {
        this.fetchWard();
      } else {
        this.listWard = [];
      }
    },
    "deliveryAdd.phone_number": function () {
      let reg = new RegExp("^[0-9]+$");
      let result = reg.test(this.deliveryAdd.phone_number);
      if (!result && this.deliveryAdd.phone_number) {
        this.$message.error("Số điện thoại sai định dạng");
      }
    },

    customer_id: function () {
      this.fetchWareHouse();
    },
  },
};
</script>

<style lang="css" scoped>
.address-take-826218 {
  padding: 20px 0px 20px 0px;
  min-height: 120px;
  background-color: #fff;
}
.address-take-826218 .title-wrap {
  margin-bottom: 22px;
  background: #fff;
}
.address-take-826218 .title-1 {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
}
.address-take-826218 .title-2 {
  color: #1771c1;
  cursor: pointer;
}
.list-delivery-item {
  margin-bottom: 10px;
  margin-bottom: 15px;
  cursor: pointer;
}
.list-delivery-item:hover {
  color: #1d60a6;
}
.list-delivery-item img {
  margin-right: 8px;
}
.list-delivery-item .address {
  font-size: 13px;
  font-size: 14px;
  margin-right: 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}
.btn-action-delivery {
  padding: 3px 10px;
  background-color: #f2f2f2;
  font-size: 10px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  color: #fff;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.btn-action-delivery:hover {
  opacity: 0.8;
  transition: all 0.3s;
}
.btn-action-default {
  background: #26b01c;
}
.btn-action-add-default {
  background: #2196f3;
}
.btn-action-update {
  background: #fd6120;
}
.btn-action-delete {
  background: #8b8b8b;
}
.action-wrap-192s8 {
  min-width: 50px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
}

/*Dialog nhập thêm mới sản phẩm*/
.address-dialog-12829-item {
  display: flex;
  padding: 5px 20px;
  align-items: center;
}
.address-dialog-12829-item span {
  min-width: 130px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #575757;
}

.btn-add-address-in-profile-9262 {
  margin-right: 20px;
  padding: 7px 30px;
  background-color: #2196f3;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}
.btn-add-address-in-profile-9262:hover {
  opacity: 0.8;
}


/*Đè lại bảng*/
.address-take-826218 .header-1988 {
  background: #0688ee;
}

.address-dialog-12829-action {
  padding: 5px 20px;
}

.color-red-dialog {
  color: red !important;
}
.can-3 {
  padding-right: 10px;
}
</style>

<style type="text/css">
.account-profile-create-address-dialog-12829 .el-dialog__body {
  padding: 0px;
}
.account-profile-select-city {
  margin-right: 10px;
}
.account-profile-create-address-dialog-12829 .el-dialog__title {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #2196f3;
}
</style>

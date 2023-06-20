<template>
  <div class="order-update-pack" id="ST2022" v-loading="loading">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Đơn hàng - Sửa kiện hàng</span>
      </div>
      <div v-for="(item, index) in listProduct" :key="index">
        <div class="order-update-pack-title">
          <span class="name-ncc">Nhà cung cấp: {{ item.suppliers.name }}</span>
          <div class="check-all frame-hover-2022" @click="changeCheck(item)">
            <img src="@/static/icon/order/edit/tic_3.svg" v-if="item.checked" />
            <img src="@/static/icon/order/edit/tic_4.svg" v-else />
            <span>Chọn tất cả</span>
          </div>
        </div>
        <div class="order-update-pack-list-product">
          <div class="table-element-custom-2022-v2">
            <el-table :data="item.products" style="width: 100%" stripe border>
              <el-table-column
                label="STT"
                header-align="center"
                align="center"
                width="50"
              >
                <template slot-scope="scope">
                  <div>
                    <span>{{ scope.$index + 1 }}</span>
                  </div>
                  <div
                    class="check-item frame-poiter-2022"
                    @click="changeCheckChild(scope.row)"
                  >
                    <img
                      src="@/static/icon/order/edit/tic_3.svg"
                      v-if="scope.row.checked"
                    />
                    <img src="@/static/icon/order/edit/tic_4.svg" v-else />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Sản phẩm"
                header-align="center"
                align="left"
              >
                <template slot-scope="scope">
                  <div class="d-flex">
                    <img class="img-product" :src="scope.row.image" alt="" />
                    <span>{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Mô tả"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.classification }}</span>
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
                    :min="0"
                    :max="scope.row.quantity_temp"
                    size="mini"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                label="Đơn giá"
                header-align="left"
                align="left"
                width="130"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column">
                    <span>{{
                      (scope.row.unit_price_cny * scope.row.exchange_rate) | vnd
                    }}</span>
                    <span>¥{{ scope.row.unit_price_cny }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Thành tiền"
                header-align="left"
                align="left"
                width="130"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column">
                    <span class="color-red">{{
                      (scope.row.unit_price_cny *
                        scope.row.quantity *
                        scope.row.exchange_rate)
                        | vnd
                    }}</span>
                    <span class="color-red"
                      >¥{{
                        (scope.row.unit_price_cny * scope.row.quantity).toFixed(
                          2
                        )
                      }}</span
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="order-update-pack-form">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="form-left">
              <div class="item-form">
                <span class="title"
                  >Mã đặt hàng <span class="important">*</span></span
                >
                <el-input
                  placeholder="Mã đặt hàng"
                  v-model="modelData.code_po"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="item-form">
                <span class="title">Mã vận đơn</span>
                <el-input
                  placeholder="Mã vận đơn"
                  v-model="modelData.bill_code"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="form-right">
              <div class="item-form">
                <span class="title"
                  >Danh mục hàng hóa <span class="important">*</span></span
                >
                <el-select
                  v-model="modelData.category_id"
                  placeholder="Lựa chọn danh mục hàng hóa"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in listCategory.categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input
                  placeholder="Danh mục khác"
                  v-model="modelData.category"
                  class="frame-input-common-2022 input-v2"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="item-form">
                <span class="title">Hãng vận chuyển</span>
                <el-select
                  v-model="modelData.transporter_id"
                  placeholder="Lựa chọn hãng vận chuyển"
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
              <div class="item-form">
                <span class="title">Số kiện</span>
                <el-input
                  placeholder="Số kiện"
                  v-model="modelData.package_number"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="d-flex justify-content-end">
                <span
                  class="btn-crud-2022 frame-hover-2022 btn-goback"
                  @click="goBack()"
                >
                  Hủy bỏ
                </span>
                <span
                  class="btn-crud-2022 frame-hover-2022 btn-info"
                  :class="!canSubmit ? 'disable' : ''"
                  @click="submitForm()"
                >
                  <span v-if="!canSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Sửa đổi</span>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PackUpdate",
  metaInfo() {
    return {
      title: "Sửa kiện hàng",
    };
  },
  data() {
    return {
      loading: false,
      canSubmit: true,
      checkAll: false,

      modelData: {
        products: [],
        code_po: "",
        bill_code: "",
        category_id: "",
        category: "",
        transporter_id: "",
        package_number: "",
        supplier_id: "",
      },

      listCategory: [],
      listProduct: [],
      listPackage: [],

      packDetail: {},
    };
  },
  mounted() {
    this.fetchCommonPackage();
    this.fetchPack();
    this.scrollTopST();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 800);
    },
    fetchPack(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("package/" + this.$route.params.pack_id).then((response) => {
        switch (response.code) {
          case 200:
            this.packDetail = response.data;
            this.modelData.code_po = this.packDetail.code_po;
            this.modelData.bill_code = this.packDetail.bill_code;
            this.modelData.category_id = this.packDetail.category.id;
            this.modelData.category = this.packDetail.category.other;
            this.modelData.transporter_id = this.packDetail.transporter.id;
            this.modelData.package_number = this.packDetail.package_number;
            this.fetchProduct(this.packDetail.order_id);
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
    fetchProduct(order_id) {
      this.loading = true;
      axios.get("order/products/" + order_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listProduct = response.data;
            this.listProduct.map(function (i) {
              i.checked = true;
              i.products.map(function (j) {
                j.checked = false;
                return j;
              });
              return i;
            });
            this.listProduct = JSON.parse(JSON.stringify(this.listProduct));
            this.fetchPackProduct();
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
    fetchCommonPackage() {
      axios.get("common/package").then((response) => {
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
    fetchPackProduct() {
      let tempPackProduct = null;
      axios
        .get("package/products/" + this.$route.params.pack_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              // Chế cháo dữ liệu để nhét
              tempPackProduct = response.data;
              tempPackProduct.forEach((item) => {
                item.products.forEach((item1) => {
                  this.listProduct.forEach((i) => {
                    i.products.forEach((i1) => {
                      if (i1.id == item1.id) {
                        i1.checked = true;
                        i1.quantity_temp = i1.quantity;
                        i1.quantity = item1.quantity;
                      }
                    });
                  });
                });
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

    submitForm() {
      if (this.modelData.code_po == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng mã đặt hàng",
          type: "warning",
        });
        return;
      }
      if (this.modelData.category_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn danh mục hàng hóa",
          type: "warning",
        });
        return;
      }
      let products_temp = [];
      this.listProduct.forEach((item) => {
        item.products.forEach((i) => {
          if (i.checked) {
            let temp = {
              id: i.id,
              quantity: i.quantity,
            };
            products_temp.push(temp);
          }
        });
      });
      this.modelData.products = products_temp;

      if (this.modelData.products.length == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ít nhất 1 sản phẩm",
          type: "warning",
        });
        return;
      }

      // Nếu không nhập kiện thì xóa key ý luôn
      if (this.modelData.package_number == "") {
        delete this.modelData["package_number"];
      }

      this.canSubmit = false;

      axios
        .put("package/" + this.$route.params.pack_id, this.modelData)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Cập nhật thành công",
                type: "success",
              });
              this.$router.push({
                name: "order-add-pack",
                params: { order_id: this.packDetail.order_id },
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

    // Back lại trang list
    goBack() {
      this.$router.push({
        name: "order-list",
      });
    },

    // Chuyển sang route update kiện
    nextRouteUpdatePack(item) {
      this.$router.push({
        name: "order-update",
        params: { pack_id: item.id },
      });
    },

    // Chuyển sang route chi tiết kiện
    nextRouteDetailPack(item) {
      this.$router.push({
        name: "order-detail",
        params: { pack_id: item.id },
      });
    },

    // Xử lý chỗ check
    changeCheck(item) {
      item.checked = !item.checked;
      item.products.forEach((e) => {
        e.checked = item.checked;
      });
    },

    changeCheckChild(element) {
      element.checked = !element.checked;
    },
  },
};
</script>

<style lang="css" scoped>
.order-update-pack-title {
  background: #e8f3ff;
  padding: 15px 25px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-update-pack-title .name-ncc {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000728;
}
.order-update-pack-title .check-all {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.order-update-pack-title .check-all span {
  margin-left: 5px;
}

.order-update-pack-list-product .img-product {
  width: 100px;
  margin-right: 10px;
}
.order-update-pack-list-product .color-red {
  color: #ed1c24;
}

.order-update-pack-form {
  background: #fff;
  padding: 20px 10px 20px 60px;
}
@media screen and (min-width: 1025px) {
  .order-update-pack-form {
    padding: 20px 80px 20px 60px;
  }
}
.order-update-pack-form .form-left {
  padding-right: 50px;
}
.order-update-pack-form .form-right {
  padding-right: 10px;
}
.order-update-pack-form .item-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.order-update-pack-form .item-form .important {
  color: red;
}
.order-update-pack-form .title {
  min-width: 145px;
}

.order-update-pack-history {
  margin-top: 20px;
}
.order-update-pack-history .type-pack {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.order-update-pack-history .type-pack span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}
</style>

<style>
.order-update-pack-form .input-v2 {
  width: 350px;
  margin-left: 10px;
}
</style>

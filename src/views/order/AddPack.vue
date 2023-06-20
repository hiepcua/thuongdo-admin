<template>
  <div class="order-add-pack" id="ST2022" v-loading="loading">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Đơn hàng - Thêm kiện hàng</span>
      </div>
      <div v-for="(item, index) in listProduct" :key="index">
        <div class="order-add-pack-title">
          <span class="name-ncc">Nhà cung cấp: {{ item.suppliers.name }}</span>
          <div class="check-all frame-hover-2022" @click="changeCheck(item)">
            <img src="@/static/icon/order/edit/tic_3.svg" v-if="item.checked" />
            <img src="@/static/icon/order/edit/tic_4.svg" v-else />
            <span>Chọn tất cả</span>
          </div>
        </div>
        <div class="order-add-pack-list-product">
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
      <div class="order-add-pack-form">
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
              <div class="item-form">
                <span
                  class="btn-crud-2022 frame-hover-2022 btn-info"
                  :class="!canSubmit ? 'disable' : ''"
                  @click="submitForm()"
                >
                  <span v-if="!canSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Thêm mới</span>
                </span>
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
                  type="number"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="order-add-pack-history">
        <div class="table-element-custom-2022-v2">
          <el-table :data="listPackage" style="width: 100%" stripe border>
            <el-table-column
              label="STT"
              header-align="center"
              align="center"
              width="50"
              type="index"
            >
            </el-table-column>
            <el-table-column
              label="Mã vận đơn"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.bill_code }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Mã đặt hàng"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.code_po }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Hãng vận chuyển"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.transporter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Loại kiện"
              header-align="center"
              align="center"
              width="220"
            >
              <template slot-scope="scope">
                <div class="d-flex flex-wrap">
                  <div v-for="i in scope.row.type" :key="i">
                    <div class="type-pack" v-if="i">
                      <span>{{ i }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Trạng thái"
              header-align="center"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                <div>
                  <span
                    class="count-status-top-3388 v2"
                    :style="{ backgroundColor: scope.row.status.color }"
                    >{{ scope.row.status.name }}</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Người xử lý"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.staff_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Thao tác"
              header-align="center"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <div class="item-action frame-poiter-2022">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Sửa kiện"
                    placement="top"
                  >
                    <img
                      src="@/static/icon/order/list/edit.svg"
                      @click="nextRouteUpdatePack(scope.row)"
                    />
                  </el-tooltip>
                </div>
                <div class="item-action frame-poiter-2022">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Xem chi tiết"
                    placement="top"
                  >
                    <img
                      src="@/static/icon/pack/action1.svg"
                      @click="nextRouteDetailPack(scope.row)"
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PackCreate",
  metaInfo() {
    return {
      title: "Thêm mới kiện hàng",
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
    };
  },
  mounted() {
    this.fetchOrder();
    this.fetchProduct();
    this.fetchCommonPackage();
    this.fetchPackageOrder();
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
    fetchOrder() {
      axios.get("order/" + this.$route.params.order_id).then((response) => {
        switch (response.code) {
          case 200:
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
    fetchProduct() {
      this.loading = true;
      let categoryIdTemp = "";
      axios
        .get("order/products/" + this.$route.params.order_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.listProduct = response.data;
              this.listProduct.map(function (i) {
                i.checked = false;
                i.products.map(function (j) {
                  j.checked = false;
                  j.quantity_temp = j.quantity;
                  return j;
                });
                return i;
              });
              this.listProduct = JSON.parse(JSON.stringify(this.listProduct));

              // Lấy ra category để chọn luôn
              this.listProduct.forEach((m) => {
                m.products.forEach((k) => {
                  categoryIdTemp = k.category.id;
                });
              });

              if (categoryIdTemp) {
                this.modelData.category_id = categoryIdTemp;
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
    fetchPackageOrder() {
      this.loading = true;
      axios
        .get("package/order/" + this.$route.params.order_id)
        .then((response) => {
          this.loading = false;
          switch (response.code) {
            case 200:
              this.listPackage = response.data;
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
      if (this.modelData.category_id == "" && this.modelData.category == "") {
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
        .post("package/order/" + this.$route.params.order_id, this.modelData)
        .then((response) => {
          this.canSubmit = true;
          switch (response.code) {
            case 200:
              this.$notify({
                title: "Thành công",
                message: "Thêm kiện hàng thành công",
                type: "success",
              });
              this.modelData.products = [];
              this.modelData.code_po = "";
              this.modelData.bill_code = "";
              this.modelData.category_id = "";
              this.modelData.category = "";
              this.modelData.transporter_id = "";
              this.modelData.package_number = "";
              this.modelData.supplier_id = "";

              this.listProduct.forEach((item) => {
                item.checked = false;
                item.products.forEach((i) => {
                  i.checked = false;
                });
              });

              this.fetchPackageOrder();
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
      console.log(item);
      this.$router.push({
        name: "order-update-pack",
        params: { pack_id: item.id },
      });
    },

    // Chuyển sang route chi tiết kiện
    nextRouteDetailPack(item) {
      this.$router.push({
        name: "pack-detail",
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
  watch: {
    "modelData.package_number": function () {
      if (this.modelData.package_number < 0) {
        this.modelData.package_number = 1;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.order-add-pack-title {
  background: #e8f3ff;
  padding: 15px 25px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-add-pack-title .name-ncc {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000728;
}
.order-add-pack-title .check-all {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.order-add-pack-title .check-all span {
  margin-left: 5px;
}

.order-add-pack-list-product .img-product {
  width: 100px;
  margin-right: 10px;
}
.order-add-pack-list-product .color-red {
  color: #ed1c24;
}

.order-add-pack-form {
  background: #e8f3ff;
  padding: 20px 10px 20px 60px;
}
@media screen and (min-width: 1025px) {
  .order-add-pack-form {
    padding: 20px 80px 20px 60px;
  }
}
.order-add-pack-form .form-left {
  padding-right: 50px;
}
.order-add-pack-form .form-right {
  padding-right: 10px;
}
.order-add-pack-form .item-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.order-add-pack-form .item-form .important {
  color: red;
}
.order-add-pack-form .title {
  min-width: 145px;
}
.order-add-pack-form .btn-crud-2022 {
  margin-left: 0px;
  margin-top: 45px;
}

.order-add-pack-history {
  margin-top: 20px;
}
.order-add-pack-history .type-pack {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.order-add-pack-history .type-pack span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}
</style>

<style>
.order-add-pack-form .input-v2 {
  width: 350px;
  margin-left: 10px;
}
</style>

<template>
  <div class="order-add-pack" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Đơn hàng - Thêm kiện hàng</span>
      </div>
      <div class="order-add-pack-title">
        <span class="name-ncc">Nhà cung cấp: Xiaomi</span>
        <div class="check-all frame-hover-2022" @click="changeCheckAll()">
          <img src="@/static/icon/order/edit/tic_3.svg" v-if="checkAll" />
          <img src="@/static/icon/order/edit/tic_4.svg" v-else />
          <span>Chọn tất cả</span>
        </div>
      </div>
      <div class="order-add-pack-list-product">
        <div class="table-element-custom-2022-v2">
          <el-table :data="tableData" style="width: 100%" stripe>
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
                  @click="changeCheck(scope.row)"
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
              <div class="d-flex">
                <img
                  class="img-product"
                  src="https://api-admin.thuongdo.vn/storage/uploads/20221224/34a7681c-ed88-450b-b3f7-47817b25bc3e.jpg"
                  alt=""
                />
                <span
                  >女孩可爱的小衣服
                  女孩可爱的小衣服女孩可爱的小衣服女孩可爱</span
                >
              </div>
            </el-table-column>
            <el-table-column label="Mô tả" header-align="center" align="center">
              <div>
                <span>Xanh lá, 2x99 pcs green royal</span>
              </div>
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
                  :min="1"
                  :max="10000"
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
              <div class="d-flex flex-column">
                <span>2,630,823 đ</span>
                <span>¥377.64</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Thành tiền"
              header-align="left"
              align="left"
              width="130"
            >
              <div class="d-flex flex-column">
                <span class="color-red">2,630,823 đ</span>
                <span class="color-red">¥377.64</span>
              </div>
            </el-table-column>
          </el-table>
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
                <span class="title">Nhà cung cấp</span>
                <el-select
                  v-model="modelData.supplier_id"
                  placeholder="Lựa chọn nhà cung cấp"
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in listCategory.suppliers"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
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
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="order-add-pack-history">
        <div class="table-element-custom-2022-v2">
          <el-table :data="tableData" style="width: 100%" stripe>
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
              <div>
                <span>0091300506</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Mã đặt hàng"
              header-align="center"
              align="center"
            >
              <div>
                <span>0091300506</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Hãng vận chuyển"
              header-align="center"
              align="center"
            >
              <div>
                <span>EMSS - XXXX</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Loại kiện"
              header-align="center"
              align="center"
            >
              <div class="d-flex flex-wrap">
                <div class="type-pack">
                  <span>Kiện 1</span>
                </div>
                <div class="type-pack">
                  <span>Kiện 2</span>
                </div>
              </div>
            </el-table-column>
            <el-table-column
              label="Trạng thái"
              header-align="center"
              align="center"
              width="140"
            >
              <div>
                <span
                  class="count-status-top-3388 v2"
                  style="background-color: #ed1c24"
                  >Chờ đặt cọc</span
                >
              </div>
            </el-table-column>
            <el-table-column
              label="Người xử lý"
              header-align="center"
              align="center"
            >
              <div>
                <span>Nguyễn Văn A</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Thao tác"
              header-align="center"
              align="center"
              width="120"
            >
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Báo giá/sửa đơn"
                  placement="top"
                >
                  <img src="@/static/icon/order/list/edit.svg" />
                </el-tooltip>
              </div>
              <div class="item-action">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Xem chi tiết"
                  placement="top"
                >
                  <img src="@/static/icon/pack/action1.svg" />
                </el-tooltip>
              </div>
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
      canSubmit: true,
      checkAll: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
          checked: false,
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
          checked: false,
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
          checked: false,
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
          checked: false,
        },
      ],

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

      listCategory: {},
      listProduct: {},
    };
  },
  mounted() {
    this.fetchProduct();
    this.fetchCommonPackage();
  },
  methods: {
    fetchProduct() {
      axios
        .get("order/products/" + this.$route.params.order_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listProduct = response.data;
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

    submitForm() {
      this.canSubmit = false;
      setTimeout(() => {
        this.canSubmit = true;
      }, 500);
    },

    // Xử lý chỗ check
    changeCheck(item) {
      item.checked = !item.checked;
    },

    changeCheckAll() {
      this.checkAll = !this.checkAll;
      this.tableData.forEach((item) => {
        item.checked = this.checkAll;
      });
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
  margin-top: 15px;
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

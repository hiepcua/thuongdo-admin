<template>
  <div class="pack-create" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Thêm kiện hàng</span>
      </div>
      <div class="pack-create-form">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="item-form">
              <span class="title">Khách hàng</span>
              <el-input
                placeholder="Khách hàng"
                v-model="modelData.customer_id"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="item-form">
              <span class="title"
                >Mã vận đơn <span class="important">*</span></span
              >
              <el-input
                placeholder="Mã vận đơn"
                v-model="modelData.bill_code"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="item-form">
              <span class="title"
                >Loại kiện hàng <span class="important">*</span></span
              >
              <el-select
                v-model="modelData.type"
                placeholder="Chọn loại kiện hàng"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listCategory.types"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span class="title">Trọng lượng</span>
              <el-select
                v-model="modelData.unit"
                placeholder="Chọn"
                class="frame-select-common-2022 select-v2"
                popper-class="frame-select-popper-common-2022"
                size="mini"
              >
                <el-option
                  v-for="item in listCategory.units"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                placeholder=""
                v-model="modelData.weight"
                class="frame-input-common-2022 input-v1"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item-form">
              <span class="title">Nhân viên đặt hàng</span>
              <el-select
                v-model="modelData.customer_level"
                placeholder="Chọn nhân viên đặt hàng"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span class="title">Mã đơn hàng</span>
              <el-input
                placeholder="Mã đơn hàng"
                v-model="modelData.code"
                class="frame-input-common-2022"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="item-form">
              <span class="title"
                >Hãng vận chuyển <span class="important">*</span></span
              >
              <el-select
                v-model="modelData.transporter_id"
                placeholder="Lựa chọn nhà cung cấp"
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
          </el-col>
          <el-col :span="8">
            <div class="item-form">
              <span class="title"
                >Danh mục kiện hàng <span class="important">*</span></span
              >
              <el-select
                v-model="modelData.category_id"
                placeholder="Danh mục"
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
                placeholder="Tên hàng hóa"
                v-model="modelData.product_name"
                class="frame-input-common-2022 input-v2"
                size="mini"
                clearable
              ></el-input>
            </div>
            <div class="item-form">
              <span class="title">Phí ship nội địa TQ (¥)</span>
              <el-input
                placeholder="Phí vận chuyển"
                v-model="modelData.china_shipping_cost"
                class="frame-input-common-2022"
                size="mini"
                type="number"
                clearable
              ></el-input>
            </div>
            <div class="item-form">
              <span class="title">Kho nhận hàng</span>
              <el-select
                v-model="modelData.warehouse_id"
                placeholder="Chọn kho nhận hàng"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in listWarehouse"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pack-create-image">
        <div class="choose-img" v-if="loadingImage">
          <i class="el-icon-loading"></i>
        </div>
        <div class="choose-img" v-else @click="selectImage()">
          <img src="@/static/icon/pack/create/add-image.svg" />
          <span>Thêm ảnh</span>
        </div>
        <div
          class="image-wrap"
          v-for="i in this.modelData.images_temp"
          :key="i.full_path"
        >
          <img :src="i.full_path" />
          <img
            class="img-close"
            src="@/static/icon/pack/create/ion_del.svg"
            @click="clearImage(i)"
          />
        </div>
      </div>
      <div class="pack-create-result d-flex justify-content-end">
        <img src="@/static/icon/pack/create/icon-1.svg" />
        <span class="text">Thành tiền: </span>
        <span class="color-red" v-if="loadingFee"
          ><i class="el-icon-loading"></i
        ></span>
        <span class="color-red" v-else>{{ getPriceShip | vnd }}</span>
      </div>
      <div class="d-flex justify-content-end pt-3">
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

    <!-- Input upload ảnh -->
    <div>
      <input
        type="file"
        class="upload-avatar"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
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
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      loadingImage: false,

      // Logic mới
      modelData: {
        customer_id: "",
        bill_code: "",
        type: "",
        staff_order_id: "",
        order_code: "",
        transporter_id: "",
        category_id: "",
        product_name: "",
        warehouse_id: "",
        china_shipping_cost: "",
        images: [],
        images_temp: [],
        unit: "kg",
        weight: "",
      },

      listCategory: [],
      listWarehouse: [],
      listUnit: [
        {
          value: "kg",
          label: "KG",
        },
        {
          value: "m3",
          label: "M3",
        },
      ],
      listConfig: {},

      // Tính tiền phí ship QT
      word_shipping_cost: 0,
      loadingFee: false,
    };
  },

  computed: {
    getPriceShip() {
      return (
        this.word_shipping_cost +
        this.modelData.china_shipping_cost * this.listConfig.exchange_rate
      );
    },
  },

  mounted() {
    this.fetchCommonPackage();
    this.fetchConfig();
    this.fetchWarehouse();
  },

  methods: {
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
    fetchConfig() {
      axios.get("config/list").then((response) => {
        switch (response.code) {
          case 200:
            this.listConfig = response.data;
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
    fetchWarehouse() {
      axios.get("warehouse/vi").then((response) => {
        switch (response.code) {
          case 200:
            this.listWarehouse = response.data;
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

    // Xử lý upload ảnh
    selectImage() {
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let file = this.file;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("Dung lượng file tối đa là 2M");
        return;
      }
      let typeFile = file["type"];
      let arr_type = ["image/jpeg", "image/png", "image/jpg"];
      if (!arr_type.includes(typeFile)) {
        this.$message.error("Chỉ được upload file ảnh");
        return;
      }
      this.submitFile();
    },
    async submitFile() {
      this.loadingImage = true;
      let formData = new FormData();
      formData.append("files[]", this.file);
      fetch(process.env.VUE_APP_API_URL + "media/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.loadingImage = false;
          this.modelData.images_temp.push(result.data[0]);
        })
        .catch(() => {
          this.packClick.loading = false;
          this.$notify.error({
            title: "Error",
            message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
          });
        });
    },

    submitForm() {
      if (this.modelData.bill_code == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập mã vận đơn",
          type: "warning",
        });
        return;
      }
      if (this.modelData.type == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn loại kiện",
          type: "warning",
        });
        return;
      }
      if (this.modelData.transporter_id == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn hãng vận chuyển",
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
      if (this.modelData.product_name == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập tên hàng hóa chi tiết",
          type: "warning",
        });
        return;
      }

      // Nếu không nhập kiện thì xóa key ý luôn
      if (this.modelData.weight == "") {
        delete this.modelData["weight"];
      }

      let images_temp = [];
      this.modelData.images.forEach((item) => {
        images_temp.push(item.full_path);
      });
      this.modelData.images = images_temp;

      this.canSubmit = false;

      axios.post("package/customer/", this.modelData).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm kiện hàng thành công",
              type: "success",
            });
            this.$router.push({
              name: "pack-list",
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

    // Tính giá vận chuyển quốc tế:
    getPriceShipQT() {
      this.loadingFee = true;
      let data = {
        weight: this.modelData.weight,
      };
      axios.patch("accounting/international", data).then((response) => {
        this.loadingFee = false;
        switch (response.code) {
          case 200:
            this.word_shipping_cost = response.data;
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

    // Xóa 1 ảnh trong list ảnh
    clearImage(item) {
      var index = this.modelData.images_temp.indexOf(item);
      if (index !== -1) {
        this.modelData.images_temp.splice(index, 1);
        this.$message("Đã xóa 1 ảnh");
      }
    },
  },
  watch: {
    "modelData.china_shipping_cost": function () {
      if (this.modelData.china_shipping_cost < 0) {
        this.modelData.china_shipping_cost = 1;
      }
    },
    "modelData.weight": function () {
      if (this.modelData.weight < 0) {
        this.modelData.weight = 1;
      }

      if (this.modelData.weight) {
        this.getPriceShipQT();
      } else {
        this.word_shipping_cost = 0;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.pack-create-title {
  background: #e8f3ff;
  padding: 15px 25px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pack-create-title .name-ncc {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000728;
}

.pack-create-form {
  background: #fff;
  padding: 20px 10px 20px 20px;
}
@media screen and (min-width: 1025px) {
  .pack-create-form {
    padding: 20px 10px 20px 30px;
  }
}
.pack-create-form .item-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.pack-create-form .item-form .important {
  color: red;
}
.pack-create-form .item-form .title {
  font-size: 12px;
  min-width: 120px;
}
@media screen and (min-width: 1025px) {
  .pack-create-form .item-form .title {
    font-size: inherit;
    min-width: 145px;
  }
}
.pack-create-form .btn-crud-2022 {
  margin-left: 0px;
  margin-top: 15px;
}

.pack-create-image {
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 25px;
  padding-left: 30px;
  border-top: 1px solid #bdd6ee;
}
.pack-create-image .choose-img {
  width: 120px;
  height: 120px;
  background: #e8f3ff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
.pack-create-image .choose-img span {
  margin-top: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #3f92d1;
}
.pack-create-image .image-wrap {
  width: 120px;
  height: 120px;
  background: #ccc;
  border-radius: 5px;
  margin-left: 10px;
  text-align: center;
}
.pack-create-image .image-wrap img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  object-fit: cover;
}
.pack-create-image .image-wrap .img-close {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.pack-create-result {
  border-top: 1px solid #bdd6ee;
  background: #e8f3ff;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  font-size: 16px;
  padding-right: 20px;
}
.pack-create-result .color-red {
  color: red;
}
.pack-create-result .text {
  padding-left: 5px;
  padding-right: 5px;
  color: #000728;
}
</style>

<style>
.pack-create-form .input-v1 {
  width: 300px;
  margin-left: 10px;
}
.pack-create-form .input-v2 {
  width: 320px;
  margin-left: 10px;
}
.pack-create-form .select-v2 {
  width: 170px;
}
</style>

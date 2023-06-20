<template>
  <div class="pack-create" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Thêm kiện hàng</span>
      </div>
      <div class="pack-create-title">
        <span class="name-ncc">Nhà cung cấp: Xiaomi</span>
        <div class="check-all frame-hover-2022">
          <img src="@/static/icon/order/edit/tic_3.svg" v-if="checkAll" />
          <img src="@/static/icon/order/edit/tic_4.svg" v-else />
          <span>Chọn tất cả</span>
        </div>
      </div>
      <div class="pack-create-list-product">
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
                <div class="check-item">
                  <img
                    src="@/static/icon/order/edit/tic_3.svg"
                    v-if="checkAll"
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
              header-align="center"
              align="left"
              width="160"
            >
              <div class="d-flex flex-column">
                <span>2,630,823 đ</span>
                <span>¥377.64</span>
              </div>
            </el-table-column>
            <el-table-column
              label="Thành tiền"
              header-align="center"
              align="left"
              width="160"
            >
              <div class="d-flex flex-column">
                <span class="color-red">2,630,823 đ</span>
                <span class="color-red">¥377.64</span>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pack-create-form">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="form-left">
              <div class="item-form">
                <span class="title"
                  >Mã đặt hàng <span class="important">*</span></span
                >
                <el-input
                  placeholder="Mã đặt hàng"
                  v-model="modelData.code"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="item-form">
                <span class="title">Mã vận đơn</span>
                <el-input
                  placeholder="Mã vận đơn"
                  v-model="modelData.code"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="item-form">
                <span class="title">Nhà cung cấp</span>
                <el-select
                  v-model="modelData.customer_level"
                  placeholder="Lựa chọn nhà cung cấ"
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
                <span class="btn-crud-2022 btn-info">Thêm mới</span>
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
                  v-model="modelData.customer_level"
                  placeholder="Lựa chọn danh mục hàng hóa"
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
                <el-input
                  placeholder="Tên khách hàng"
                  v-model="modelData.code"
                  class="frame-input-common-2022 input-v2"
                  size="mini"
                  clearable
                ></el-input>
              </div>
              <div class="item-form">
                <span class="title">Hãng vận chuyển</span>
                <el-select
                  v-model="modelData.customer_level"
                  placeholder="Lựa chọn hãng vận chuyển"
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
                <span class="title">Số kiện</span>
                <el-input
                  placeholder="Số kiện"
                  v-model="modelData.code"
                  class="frame-input-common-2022"
                  size="mini"
                  clearable
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pack-create-history">
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
export default {
  name: "PackCreate",
  metaInfo() {
    return {
      title: "Thêm mới kiện hàng",
    };
  },

  data() {
    return {
      checkAll: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          quantity: 1,
        },
      ],
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

      modelData: {
        code: "",
        customer_level: "",
      },
    };
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
.pack-create-title .check-all {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.pack-create-title .check-all span {
  margin-left: 5px;
}

.pack-create-list-product .img-product {
  width: 100px;
  margin-right: 10px;
}
.pack-create-list-product .color-red {
  color: #ed1c24;
}

.pack-create-form {
  background: #e8f3ff;
  padding: 20px 10px 20px 60px;
}
@media screen and (min-width: 1025px) {
  .pack-create-form {
    padding: 20px 80px 20px 60px;
  }
}
.pack-create-form .form-left {
  padding-right: 50px;
}
.pack-create-form .form-right {
  padding-right: 10px;
}
.pack-create-form .item-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.pack-create-form .item-form .important {
  color: red;
}
.pack-create-form .title {
  min-width: 145px;
}
.pack-create-form .btn-crud-2022 {
  margin-left: 0px;
  margin-top: 15px;
}

.pack-create-history {
  margin-top: 20px;
}
.type-pack {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.type-pack span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}
</style>

<style>
.pack-create-form .input-v2 {
  width: 350px;
  margin-left: 10px;
}
</style>

<template>
  <div class="pack-detail-component-list-product">
    <div v-for="(item, index) in listProduct" :key="index">
      <div class="pack-detail-component-title">
        <span class="name-ncc">Nhà cung cấp: {{ item.suppliers.name }}</span>
      </div>
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
            </template>
          </el-table-column>
          <el-table-column label="Sản phẩm" header-align="center" align="left">
            <template slot-scope="scope">
              <div class="d-flex">
                <img class="img-product" :src="scope.row.image" alt="" />
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Mô tả" header-align="center" align="center">
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
              <span>{{ scope.row.quantity }}</span>
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
                    (scope.row.unit_price_cny * scope.row.quantity).toFixed(2)
                  }}</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailComponentProduct",

  data() {
    return {
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

      listProduct: [],
    };
  },
  mounted() {
    this.fetchPackProduct();
  },
  methods: {
    fetchPackProduct() {
      axios
        .get("package/products/" + this.$route.params.pack_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listProduct = response.data;
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
  },
};
</script>

<style lang="css" scoped>
.pack-detail-component-title {
  background: #e8f3ff;
  padding: 15px 25px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pack-detail-component-title .name-ncc {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000728;
}
.pack-detail-component-list-product .img-product {
  width: 100px;
  margin-right: 10px;
}
.pack-detail-component-list-product .color-red {
  color: #ed1c24;
}
</style>

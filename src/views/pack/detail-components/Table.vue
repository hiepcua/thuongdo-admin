<template>
  <div class="pack-detail-component-table">
    <div class="table-element-custom-2022-v2">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column
          label="Mã đơn hàng"
          header-align="center"
          align="left"
          width="160"
        >
          <div>
            <span>{{ packDetail.info.order_code }}</span>
          </div>
          <div
            class="show-detail frame-hover-2022"
            v-if="packDetail.info.order_kind_of == 'Hàng Order'"
          >
            <img src="@/static/icon/pack/detail/download.svg" />
            <span @click="viewOrderDetail()">Xem đơn hàng</span>
          </div>
        </el-table-column>
        <el-table-column
          label="Loại hàng"
          header-align="center"
          align="left"
          min-width="140"
        >
          <span>{{ packDetail.info.order_kind_of }}</span>
        </el-table-column>
        <el-table-column
          label="Danh mục hàng hóa"
          header-align="center"
          align="left"
          min-width="250"
        >
          <div class="d-flex flex-wrap">
            <div class="type-pack">
              <span>{{ packDetail.category.name }}</span>
            </div>
          </div>
        </el-table-column>
        <el-table-column
          label="Cân nặng thực tế"
          header-align="center"
          align="left"
          width="140"
        >
          <span>{{ packDetail.info.weight }} Kg</span>
        </el-table-column>
        <el-table-column
          label="Cân nặng làm tròn"
          header-align="center"
          align="left"
          min-width="140"
        >
          <span
            >{{
              packDetail.info.weight < 0.5 && packDetail.info.weight > 0
                ? "0.5"
                : packDetail.info.weight
            }}
            Kg</span
          >
        </el-table-column>
        <el-table-column
          label="Phí vận chuyển nội địa TQ (¥)"
          header-align="center"
          align="left"
          min-width="150"
        >
          <span>{{ packDetail.costs.china_shipping_cost_cny }}¥</span>
        </el-table-column>
        <el-table-column
          label="Phí vận chuyển quốc tế (vnd)"
          header-align="center"
          align="left"
          min-width="150"
        >
          <span>{{ packDetail.costs.international_shipping_cost | vnd }}</span>
        </el-table-column>
        <el-table-column
          label="Hãng vận chuyển"
          header-align="center"
          align="left"
          width="140"
        >
          <span>{{ packDetail.transporter.name }}</span>
        </el-table-column>
        <el-table-column
          label="Phí"
          header-align="center"
          align="left"
          width="250"
        >
          <div class="d-flex flex-column">
            <div class="line-fee">
              <img src="@/static/icon/pack/detail/fee/fee-kiem-dem.svg" />
              <div class="text-price">
                <span class="line-1">Phí kiểm đếm</span>
                <span class="number-1">{{
                  packDetail.costs.inspection_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="line-fee">
              <img src="@/static/icon/pack/detail/fee/fee-bao-hiem.svg" />
              <div class="text-price">
                <span class="line-1">Phí bảo hiểm</span>
                <span class="number-1">{{
                  packDetail.costs.insurance_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="line-fee">
              <img src="@/static/icon/pack/detail/fee/fee-dong-go.svg" />
              <div class="text-price">
                <span class="line-1">Phí đóng gỗ</span>
                <span class="number-1">{{
                  packDetail.costs.woodworking_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="line-fee">
              <img src="@/static/icon/pack/detail/fee/fee-chong-soc.svg" />
              <div class="text-price">
                <span class="line-1">Phí chống sốc</span>
                <span class="number-1">{{
                  packDetail.costs.shock_proof_cost | vnd
                }}</span>
              </div>
            </div>
            <div class="line-fee">
              <img src="@/static/icon/pack/detail/fee/fee-luu-kho.svg" />
              <div class="text-price">
                <span class="line-1">Phí lưu kho</span>
                <span class="number-1">{{
                  packDetail.costs.storage_cost | vnd
                }}</span>
              </div>
            </div>
          </div>
        </el-table-column>
        <el-table-column
          label="Tổng phí"
          header-align="center"
          align="left"
          width="140"
        >
          <span class="color-green">{{ packDetail.costs.amount | vnd }}</span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailComponentNote",
  props: {
    packDetail: Object,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    // Xem chi tiết
    viewOrderDetail() {
      this.$router.push({
        name: "order-detail",
        params: { order_id: this.packDetail.order_id },
      });
    },
  },
  watch: {
    packDetail: function () {
      let temp = {
        order_code: 123,
      };
      this.tableData.push(temp);
    },
  },
};
</script>

<style lang="css" scoped>
.pack-detail-component-table {
  margin-bottom: 25px;
  margin-top: 10px;
}

.pack-detail-component-table .type-pack {
  background: #e8f3ff;
  border: 1px solid #3f92d1;
  border-radius: 5px;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.pack-detail-component-table .type-pack span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
}

.pack-detail-component-table .line-fee {
  display: flex;
  align-content: center;
  height: 30px;
  line-height: 30px;
}
.pack-detail-component-table .line-fee img {
  margin-right: 8px;
}
.pack-detail-component-table .line-fee .text-price {
  display: flex;
  align-content: center;
  border-bottom: 1px solid #eee;
  width: 100%;
  justify-content: space-between;
}

.pack-detail-component-table .color-green {
  color: #26b01c;
}
.pack-detail-component-table .show-detail {
  display: flex;
  align-content: center;
}
.pack-detail-component-table .show-detail img {
  margin-right: 5px;
}
.pack-detail-component-table .show-detail span {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #0688ee;
  cursor: pointer;
}
</style>

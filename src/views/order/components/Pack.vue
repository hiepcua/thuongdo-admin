<template>
  <div class="pack-detail-order">
    <!--  -->
    <div class="navigation-78931" v-if="orderDetail.reports">
      <div
        class="item-68"
        :class="[tabActive == 1 ? 'active' : '']"
        @click="changeTab(1)"
      >
        <span class="count-1">{{ orderDetail.reports.packages.quantity }}</span>
        <span class="text-1">Tổng số kiện hàng</span>
      </div>
      <div class="line-1" v-show="tabActive == 3"></div>
      <!--  -->
      <div
        class="item-68"
        :class="[tabActive == 2 ? 'active' : '']"
        @click="changeTab(2)"
      >
        <span class="count-1">{{
          orderDetail.reports.complains.quantity
        }}</span>
        <span class="text-1">Khiếu nại</span>
      </div>
      <!--  -->
      <div class="line-1" v-show="tabActive == 1"></div>
      <div
        class="item-68"
        :class="[tabActive == 3 ? 'active' : '']"
        @click="changeTab(3)"
      >
        <span class="count-1">{{
          orderDetail.reports.deliveries.quantity
        }}</span>
        <span class="text-1">Thông tin giao hàng</span>
      </div>
    </div>
    <!-- kiện hàng -->
    <div
      class="table-data-pack mt-1"
      v-if="orderDetail.reports"
      v-show="tabActive == 1"
    >
      <el-table
        border
        style="width: 100%"
        :data="orderDetail.reports.packages.data"
      >
        <el-table-column
          label="STT"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column label="Thông tin kiện hàng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.bill_code }}</span>
              <span>{{ scope.row.order_code }}</span>
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  style="background: #26b01c"
                  >{{ scope.row.warehouse_code }}</span
                >
              </div>
              <!--  -->
              <div class="car-check-pack">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí kiểm đếm"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/pack/check-11.svg"
                    v-if="scope.row.inspection_cost"
                  />
                  <img src="@/static/icon/order/pack/check-0.svg" v-else />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí bảo hiểm"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/pack/khieng-11.svg"
                    v-if="scope.row.insurance_cost"
                  />
                  <img src="@/static/icon/order/pack/khieng-0.svg" v-else />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Phí đóng gỗ"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/pack/pack-1.svg"
                    v-if="scope.row.woodworking_cost"
                  />
                  <img src="@/static/icon/order/pack/pack-0.svg" v-else />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Đã gửi yêu cầu ship"
                  placement="top"
                >
                  <img
                    src="@/static/icon/order/pack/car-11.svg"
                    v-if="scope.row.is_delivery"
                  />
                  <img src="@/static/icon/order/pack/car-00.svg" v-else />
                </el-tooltip>
              </div>
              <!--  -->
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Tình trạng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <div>
                <span
                  class="order-detail-icon-status-6868amg"
                  :style="{ backgroundColor: scope.row.status.color }"
                  >{{ scope.row.status.name }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Tổng KG hoặc M3">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.weight_or_volume }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Phí vận chuyển nội địa">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.delivery_cost | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Giá vận chuyển">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.china_shipping_cost | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Tổng phí vận chuyển">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.amount | vnd }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Ghi chú">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.note }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Thao tác">
          <template>
            <div class="d-flex flex-column">
              <div>
                <el-tooltip placement="top" content="Xem chi tiết">
                  <img src="@/static/icon/action/detail.svg" alt="" />
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- khiếu nại -->
    <div
      class="table-data-pack mt-1 tab-active-2"
      v-show="tabActive == 2"
      v-if="orderDetail.reports"
    >
      <el-table
        border
        style="width: 100%"
        :data="orderDetail.reports.complains.data"
      >
        <el-table-column
          label="STT"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column label="Hình ảnh" width="250" align="center">
          <template slot-scope="scope">
            <div class="image-complain">
              <img :src="scope.row.image" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Kiện hàng" align="center">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span>{{ scope.row.order_code }}</span>
              <div class="d-flex align-content-center justify-content-center">
                <img class="pr-1" src="@/static/icon/pack/pack_2.svg" alt="" />
                <span>Xem kiện hàng</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Loại khiếu nại">
          <template slot-scope="scope">
            <span>{{ scope.row.complain_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Trạng thái khiếu nại"
          width="200"
        >
          <template slot-scope="scope">
            <div>
              <span
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: scope.row.status.color }"
                >{{ scope.row.status.name }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Ngày gửi" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Thao tác" width="200">
          <template slot-scope="scope">
            <div>
              <el-tooltip placement="top" content="Xem chi tiết">
                <img src="@/static/icon/action/detail.svg" alt="" />
              </el-tooltip>
            </div>
            <div
              class="line-1 d-flex align-items-center justify-content-center"
            >
              <span class="count">{{ scope.row.comment_number }}</span>
              <span class="show-detail-782fkme">Phản hồi</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- Thông tin giao hàng -->
    <div
      class="table-data-pack mt-1"
      v-show="tabActive == 3"
      v-if="orderDetail.reports"
    >
      <el-table
        border
        style="width: 100%"
        :data="orderDetail.reports.deliveries.data"
      >
        <el-table-column
          type="index"
          label="STT"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column label="Ngày tạo" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Mã vận đơn"
          align="center"
          width="170"
          property="bill_code"
        >
          <template slot-scope="scope">
            <span v-for="i in scope.row.bill_code" :key="i">{{ i }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thông tin giao hàng">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <span class="d-flex align-items-center">
                <img class="pr-1" src="@/static/icon/pack/user.svg" alt="" />
                {{ scope.row.delivery.receiver }}
              </span>
              <span class="d-flex align-items-center">
                <img class="pr-1" src="@/static/icon/pack/phone_2.svg" alt="" />
                {{ scope.row.delivery.phone_number }}
              </span>
              <span class="d-flex">
                <img class="pr-1" src="@/static/icon/pack/address.svg" alt="" />
                {{ scope.row.delivery.address }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày giao" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Hãng vận chuyển" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.transporter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phí vận chuyển" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.delivery_cost | vnd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tổng tiền thu" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.amount | vnd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Hình thức thanh toán"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" align="center" width="150">
          <template slot-scope="scope">
            <div>
              <span
                class="order-detail-icon-status-6868amg"
                :style="{ backgroundColor: scope.row.status.color }"
                >{{ scope.row.status.name }}</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "DetailPack",
  props: {
    orderDetail: Object,
  },
  components: {},
  data() {
    return {
      loading: true,
      tabActive: 1,
    };
  },
  mounted() {},
  methods: {
    changeTab(tab) {
      this.tabActive = tab;

      // if (this.hasLoadListDelivery == false && this.tabActive == 3) {
      //   this.fetchDelivery();
      // }
      // if (this.hasLoadListComplain == false && this.tabActive == 2) {
      //   this.fetchComplain();
      // }
    },
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.box-title .title {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.box-title .count {
  display: flex;
  align-content: center;
  justify-content: center;
  background: #ed1c24;
  border-radius: 4px;
  width: 28px;
  height: 20px;
  color: #fff;
}
.boxCount {
  background: #e8f3ff;
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  padding: 4px 10px 4px 10px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
</style>
<style>
.table-data-pack .el-table th.el-table__cell {
  background: #00a962;
  color: #fff;
}
.table-data-pack .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
  padding-top: 3px;
  padding-bottom: 3px;
}
.order-detail-icon-status-6868amg {
  background-color: #ccc;
  border-radius: 4px;
  padding: 3px 10px;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  user-select: none;
}
.order-detail-icon-status-6868amg.poiter {
  cursor: pointer;
}
.car-check-pack {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.car-check-pack img {
  height: 13px;
  margin-right: 10px;
}
/* tab bảng  */
.navigation-78931 {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #00a962;
}
.item-68 {
  background-color: #f6faff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #1771c1;
  transition: all 0.3s;
  font-weight: 400;
  margin-bottom: 1px;
}
.item-68.active {
  background-color: #00a962;
  color: #fff;
}
.item-68:hover {
  background-color: #00a962;
  transition: all 0.3s;
  color: #fff;
}
.item-68 .count-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  margin-right: 5px;
}
.navigation-78931 .line-1 {
  width: 1px;
  height: 25px;
  display: inline-block;
  background-color: #a9ddf3;
}
.tab-active-2 .image-complain img {
  max-width: 50%;
}
.tab-active-2 .count {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  margin-right: 10px;
  background-color: #d60b4a;
  font-weight: 400;
  font-size: 12px;
}
.tab-active-2 .line-1 {
  margin-top: 5px;
}
.tab-active-2 .show-detail-782fkme {
  margin-left: 0px;
}
</style>

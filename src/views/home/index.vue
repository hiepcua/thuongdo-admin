<template>
  <div id="ST2022">
    <div class="tabReport">
      <span
        class="item"
        :class="tabActive == 1 ? 'active' : ''"
        @click="changeTab(1)"
      >CEO</span>
      <span
        class="item"
        :class="tabActive == 2 ? 'active' : ''"
        @click="changeTab(2)"
      >TP đặt hàng</span>
      <span
        class="item"
        :class="tabActive == 3 ? 'active' : ''"
        @click="changeTab(3)"
      >NV báo giá</span>
      <span
        class="item"
        :class="tabActive == 4 ? 'active' : ''"
        @click="changeTab(4)"
      >NV đặt hàng</span>
      <span
        class="item"
        :class="tabActive == 5 ? 'active' : ''"
        @click="changeTab(5)"
      >TP tư vấn</span>
      <span
        class="item"
        :class="tabActive == 6 ? 'active' : ''"
        @click="changeTab(6)"
      >NV tư vấn</span>
      <span
        class="item"
        :class="tabActive == 7 ? 'active' : ''"
        @click="changeTab(7)"
      >TP chăm sóc</span>

      <span
        class="item"
        :class="tabActive == 8 ? 'active' : ''"
        @click="changeTab(8)"
      >NV chăm sóc</span>
      <span
        class="item"
        :class="tabActive == 9 ? 'active' : ''"
        @click="changeTab(9)"
      >Kế toán</span>
      <span
        class="item"
        :class="tabActive == 10 ? 'active' : ''"
        @click="changeTab(10)"
      >Marketing</span>
      <span
        class="item"
        :class="tabActive == 11 ? 'active' : ''"
        @click="changeTab(11)"
      >Kho trung quốc</span>
      <span
        class="item"
        :class="tabActive == 12 ? 'active' : ''"
        @click="changeTab(12)"
      >Kho trung chuyển</span>
      <span
        class="item"
        :class="tabActive == 13 ? 'active' : ''"
        @click="changeTab(13)"
      >Kho chi nhánh</span>
    </div>
    <!--  -->
    <div v-if="tabActive == 1">
      <IndexCeo />
    </div>
    <div v-if="tabActive == 2">
      <orderManager />
    </div>
    <div v-if="tabActive == 3">
      <orderQuoteStaff />
    </div>
    <div v-if="tabActive == 4">
      <orderStaff />
    </div>
    <div v-if="tabActive == 5">
      <counseManager />
    </div>
    <div v-if="tabActive == 6">
      <counselor />
    </div>
    <div v-if="tabActive == 7">
      <careManager />
    </div>
    <div v-if="tabActive == 8">
      <careStaff />
    </div>
    <div v-if="tabActive == 9">
      <accountantrp />
    </div>
    <div v-if="tabActive == 10">
      <Maketing />
    </div>
    <div v-if="tabActive == 11">
      <wareHouseCN />
    </div>
    <div v-if="tabActive == 12">
      <wareHouseTransit />
    </div>
    <div v-if="tabActive == 13">
      <wareHouseBranch />
    </div>
    <!--  -->
  </div>
</template>

<script>
// import axios from "axios";
import IndexCeo from "@/views/home/ceo/Index.vue";
import orderManager from "@/views/home/order/Index-order-manager.vue";
import orderStaff from "@/views/home/order/Index-order-staff.vue";
import orderQuoteStaff from "@/views/home/order/Index-quote-staff.vue";
import counseManager from "@/views/home/counsel/Index-consulting-manager.vue";
import counselor from "@/views/home/counsel/Index-counselor.vue";
import careManager from "@/views/home/care/Index-care-manager.vue";
import careStaff from "@/views/home/care/Index-care-staff.vue";
import accountantrp from "@/views/home/accountantrp/Index.vue";
import Maketing from "@/views/home/maketing/Index.vue";
import wareHouseCN from "@/views/home/warehouse/Warehouse-cn.vue";
import wareHouseTransit from "@/views/home/warehouse/Warehouse-transit.vue";
import wareHouseBranch from "@/views/home/warehouse/Warehouse-branch.vue";
export default {
  name: "HomeIndex",
  metaInfo() {
    return {
      title: "ChinaOrder - Đặt hàng Trung Quốc",
    };
  },
  components: {
    IndexCeo, //CEO
    orderManager, // TP đặt hàng
    orderStaff, // nv đặt hàng
    orderQuoteStaff, // NV báo giá
    counseManager, // TP tư vấn
    counselor, // NV tư vấn
    careManager, // TP chắm sóc
    careStaff, // NV chăm sóc
    accountantrp, // Kế toán
    Maketing, // marketing
    wareHouseCN, // Kho trung quốc
    wareHouseTransit, // Kho Trung chuyển
    wareHouseBranch, // Kho chi nhánh
  },
  data() {
    return {
      showDetail: true,
      loading: true,
      tabActive: 8,
    };
  },
  mounted() {
    this.scrollTopST();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    //
    changeTab(tab) {
      this.tabActive = tab;
    },
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.tabReport {
  margin: 20px 0;
  padding: 0 20px;
}
.tabReport .item {
  padding: 20px 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.tabReport .item.active {
  /* background-color: #28b8ce; */
  color: #28b8ce;
}
</style>

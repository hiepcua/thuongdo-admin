<template>
  <div class="home-index frame-content-common-2022 order-report" id="ST2022">
    <div class="search-top-order d-flex align-items-center">
      <div class="width50">
        <span class="title-rp-order">Thống kê nhanh</span>
        <div class="pt-2">
          <div class="d-flex align-items-center">
            <div
              v-for="i in listStatus"
              :key="i.value"
              @click="changeStatus(i)"
            >
              <div class="title" :class="[i.value === filter.time ? 'activeStatus' : '']">
                <span>{{ i.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="width50">
        <span class="title-rp-order">Tìm kiếm nhanh</span>
        <div class="pt-2 d-flex align-items-center">
          <div class="input-search-content">
            <el-input v-model="filter.customer_search" placeholder="Nhập tên KH, mã KH, số điện thoại..."></el-input>
          </div>
          <div
            class="frame-content-search d-flex align-items-center"
            @click="fetchCareStaff()"
          >
            <img src="@/static/icon/Dashboard/ceo/search.svg" />
            <span class="pl-2">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Báo cáo -->
    <div v-loading="loading" class="report-infoCare">
      <div class="content-report-frame-2023 mt-3" v-if="listData.arr_order">
        <div class="content-box-report">
          <span class="numberReport color2">22.341.234.112</span>
          <span class="reportInfo">Tổng khách hàng đang chăm sóc</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color2">{{ listData.arr_order.total_waiting_quote | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn chờ báo giá</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color6">{{ listData.arr_order.total_waiting_deposit | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn chờ đặt cọc</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color1">{{ listData.arr_order.total_ordered | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn đặt hàng</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color5">{{ listData.arr_order.total_done | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn hoàn thành</span>
        </div>
      </div>
      <!--  -->
      <div class="content-report-frame-2023" v-if="listData.arr_complain">
        <div class="content-box-report">
          <span class="numberReport color4">{{ listData.arr_complain.total_pending | vnd2 }}</span>
          <span class="reportInfo">Tổng khiếu nại chờ xử lý</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color2">{{ listData.arr_complain.total_process | vnd2 }}</span>
          <span class="reportInfo">Tổng khiếu nại đang xử lý</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color3">{{ listData.arr_complain.total_done | vnd2 }}</span>
          <span class="reportInfo">Tổng khiếu nại hoàn thành</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport">{{ listData.arr_pack.total_pack_not_take | vnd2 }}</span>
          <span class="reportInfo color2">Tổng kiện hàng chưa lấy</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color5">{{ listData.arr_order.total_order_fee | vnd2 }}</span>
          <span class="reportInfo">Tổng doanh số dịch vụ</span>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeIndex",
  metaInfo() {
    return {
      title: "ChinaOrder - Đặt hàng Trung Quốc",
    };
  },
  data() {
    return {
      loading: true,
      input: "",
      filter: {
        time: "d",
        customer_search: "",
      },
      listStatus: [
        {
          name: "Trong ngày",
          value: "d",
        },
        {
          name: "Trong tuần",
          value: "w",
        },
        {
          name: "Tháng",
          value: "m",
        },
        {
          name: "Quý",
          value: "q",
        },
      ],
      listData: {},
    };
  },
  mounted() {
    this.scrollTopST();
    this.fetchCareStaff();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    // lọc 
    changeStatus(item) {
      this.filter.time = item.value;
      this.fetchCareStaff();
    },
    // lấy dữ liệu 
    fetchCareStaff() {
      this.loading = true;
      let filter  = {
        time: this.filter.time,
        user_type: "8",
        customer_search: this.filter.customer_search
      }
      axios.get("statistic/fast", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data;
            console.log("listData", this.listData);
            break;
          case 422:
            this.$notify.error({
              title: "Lỗi",
              message: response.data.error,
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
  watch: {},
};
</script>

<style lang="css" scoped>
.home-index.frame-content-common-2022 {
  background: #F7F8FF;
}
/* search top  */
.search-top-order {
  padding: 0 35px;
}
.search-top-order .width50 {
  width: 50%;
}
.search-top-order .width50 .title {
  width: 135px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #000728;
  cursor: pointer;
}
.activeStatus {
  background: #E8F3FF;
  border-radius: 5px;
  border-bottom: 2px solid #45B4CE;
}
.title-rp-order {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #207CDC;
}
/* phần báo cáo  */
.order-report .content-report-frame-2023 {
  display: flex;
  align-items: center;
}
.order-report .numberReport {
  font-weight: 700;
  font-size: 24px;
  line-height: 56px;
  letter-spacing: 0.02em;
}
.order-report .content-box-report {
  width: 20%;
  height: 200px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 22px 6px 8px 15px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
.order-report .reportInfo {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
  margin-top: 12px;
}
.order-report .detail-report {
  margin-top: 11px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #767676;
  cursor: pointer;
}
.order-report .detail-report:hover > span {
  color: #0688EE;
}
.order-report .detail-report img {
  margin-right: 10px;
}
.order-report .weight-report {
  padding: 5px 0 11px 0;
}
.order-report .weight-report span {
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #3F92D1;
  background: #F7F8FF;
  padding: 3px 6px;
}
</style>
<style>
/* Phần search  */
.order-report .input-search-content {
  width: 80%;
}
.order-report .input-search-content input {
  background: #FFFFFF;
  border: 0.5px solid #3F92D1;
  border-radius: 8px;
  height: 36px;
}
.order-report .frame-content-search {
  justify-content: center;
  width: 20%;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  margin-left: 10px;
  background: #0688EE;
  border-radius: 8px;
  width: 120px;
  height: 36px;
  color: #fff;
}
/* màu number  */
.color1 {
  color: #207CDC;
}
.color2 {
  color: #F09920;
}
.color3 {
  color: #26B01C;
}
.color4 {
  color: #DF4747;
}
.color5 {
  color: #45B4CE;
}
.color6 {
  color: #ED18BE;
}
/*  */
.report-infoCare {
  min-height: 550px;
}
</style>

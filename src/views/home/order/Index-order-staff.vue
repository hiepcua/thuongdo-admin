<template>
  <div class="home-index frame-content-common-2022 order-report order-index-staff" id="ST2022">
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
            @click="fetchDataOrder()"
          >
            <img src="@/static/icon/Dashboard/ceo/search.svg" />
            <span class="pl-2">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Báo cáo -->
    <div v-loading="loading" class="report-info">
      <div class="content-report-frame-2023" v-if="listData.arr_current">
        <div class="content-box-report">
          <span class="numberReport color1">{{ listData.arr_current.total_deposited }}</span>
          <span class="reportInfo">Tổng đơn chờ đặt hàng</span>
          <!-- Phần trăm theo ngày  -->
          <div v-if="filter.time == 'd'">
            <div v-if="listData.arr_previous.total_deposited > 0">
              <div class="d-flex align-items-center percent-top" v-if="percent.day > 0">
                <img src="@/static/icon/Dashboard/order/up.svg" />
                <el-tooltip content="So với ngày hôm qua">
                  <span class="textGreen">{{ percent.day | percent }}</span>
                </el-tooltip>
              </div>
              <div class="d-flex align-items-center percent-top" v-else>
                <img src="@/static/icon/Dashboard/order/down.svg" />
                <el-tooltip content="So với ngày hôm qua">
                  <span class="textRed">{{ -percent.day | percent }}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box-report">
          <span class="numberReport color2">{{ listData.arr_current.total_ordered }}</span>
          <span class="reportInfo">Tổng đơn đã đặt hàng</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color3">{{ listData.arr_current.total_done }}</span>
          <span class="reportInfo">Tổng đơn đã hoàn thành</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color4">{{ listData.arr_current.total_not_done }}</span>
          <span class="reportInfo">Tổng đơn chưa hoàn thành</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color5">{{ listData.arr_current.total_pack_not_take }}</span>
          <span class="reportInfo">Tổng kiện chưa lấy hàng</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color6">{{ listData.arr_current.total_full | vnd2 }}</span>
          <span class="reportInfo">Tổng doanh số dịch vụ</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color6">...</span>
          <span class="reportInfo">Tổng doanh số đàm phán</span>
        </div>
      </div>
    </div>
    <!-- Biểu đồ -->
    <div class="d-flex">
      <div class="chart-customer-column">
        <span class="chart-title">Biểu đồ đặt hàng theo ngày</span>
        <highcharts class="chart" :options="chartOrderLine"></highcharts>
      </div>
      <div class="chart-customer-column">
        <span class="chart-title">Biểu đồ đặt hàng theo tháng</span>
        <highcharts class="chart" :options="chartOrderLineMonth"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Chart} from 'highcharts-vue'
export default {
  name: "HomeIndex",
  metaInfo() {
    return {
      title: "ChinaOrder - Đặt hàng Trung Quốc",
    };
  },
  components: {
    highcharts: Chart 
  },
  data() {
    return {
      loading: true,
      input: "",
      filter: {
        time: "d",
        customer_search: "",
        timeQuottion: "month",
        timeOrder: "month",
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
      // biểu đồ
      chartOrderLine: {
        chart: {
          type: 'line'
        },
        title: {
          text: '',
          align: 'left'
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineColor: "#BDD6EE",
        },
        xAxis: {
          categories: ['1','2','3','4','5','6','7','8','9','10','11','12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        // legend: {
        //   enabled: false
        // },
        legend: {
          align: 'left',
          verticalAlign: 'top',
          borderWidth: 0,
          padding: 20,
        },
        series: [],
      },
      chartOrderLineMonth: {
        chart: {
          type: 'line'
        },
        title: {
          text: '',
          align: 'left'
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineColor: "#BDD6EE",
        },
        xAxis: {
          categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        // legend: {
        //   enabled: false
        // },
        legend: {
          align: 'left',
          verticalAlign: 'top',
          borderWidth: 0,
          padding: 20,
        },
        series: [],
      },
      listData: {},
      listChartOrder: {},
      percent: {
        day: "",
        week: "",
        month: "",
        precious: "",
        year: "",
      },
    };
  },
  mounted() {
    this.scrollTopST();
    this.fetchDataOrder();
    this.fetchChartOrder();
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
      this.fetchDataOrder();
    },
    // lấy dữ liệu báo cáo
    fetchDataOrder() {
      this.loading = true;
      let filter  = {
        time: this.filter.time,
        user_type: "4",
        customer_search: this.filter.customer_search
      }
      axios.get("statistic/fast", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data;
            // tính phần trăng tăng trưởng so vs ngày hôm qua
            if (this.filter.time == "d") {
              if (this.listData.arr_previous.total_deposited > 0) {
                this.percent.day = (response.data.arr_current.total_deposited - response.data.arr_previous.total_deposited)/response.data.arr_previous.total_deposited * 100;
              }
            }
            // phần trăm tăng trưởng so với tuần trước
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
    // lấy data biểu đồ
    fetchChartOrder() {
      let filter  = {
        user_type: "4",
      }
      axios.get("statistic/slow", { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.listChartOrder = response.data;
            this.chartOrderLine.series = response.data.chart_user_type_4.chart_day;
            this.chartOrderLineMonth.series = response.data.chart_user_type_4.chart_month;
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
  margin-top: 30px;
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
  width: 16%;
  height: 200px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 22px 6px 8px 15px;
  margin: 5px;
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
/* biểu đồ  */
.order-report.order-index-staff .chart-customer-column {
  width: 50%;
  background: #fff;
  margin: 10px;
  padding-top: 22px;
}
.order-report .highcharts-container svg {
  font-family: 'Roboto', sans-serif !important;
}
.order-report .highcharts-credits {
  display: none;
}
.order-report .chart-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
  padding-left: 22px;
}
/* chú thích biểu đồ  */
.height40 {
  height: 40px;
  padding: 10px 20px;
}
.height40 .icon {
  width: 12px;
  height: 12px;
  background: #F09920;
  border-radius: 50%;
}
.height40 .text {
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #000728;
  padding-left: 6px;
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
.report-info {
  min-height: 250px;
}
</style>

<template>
  <div class="home-index frame-content-common-2022 order-report orderManager" id="ST2022">
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
        <div class="d-flex align-items-center pt-2">
          <div class="input-search-content">
            <el-input
              v-model="filter.customer_search"
              placeholder="Nhập tên KH, mã KH, số điện thoại, email,..."
            ></el-input>
          </div>
          <div
            class="frame-content-search d-flex align-items-center"
            @click="fetchData()"
          >
            <img src="@/static/icon/Dashboard/ceo/search.svg" />
            <span class="pl-2">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-loading="loading" class="report-info">
      <div class="content-report-frame-2023" v-if="listData.arr_current">
        <div class="content-box-report">
          <span class="numberReport color1">{{ listData.arr_current.total_all_order | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn</span>
          <!-- Phần trăm theo ngày  -->
          <div v-if="filter.time == 'd'">
            <div v-if="listData.arr_previous.total_all_order > 0">
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
          <span class="numberReport color2">{{ listData.arr_current.total_waiting_quote | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn chờ báo giá</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color3">{{ listData.arr_current.total_waiting_deposit | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn đã báo giá</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color4">{{ listData.arr_current.total_ordered | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn đã đặt hàng</span>
        </div>
        <div class="content-box-report color5">
          <span class="numberReport">{{ listData.arr_current.total_done | vnd2 }}</span>
          <span class="reportInfo">Tổng đơn hoàn thành</span>
        </div>
      </div>
      <!--  -->
      <div class="box-rp-conten-2023">
        <div class="d-flex" v-if="listData.arr_outdate">
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-1">
                <img src="@/static/icon/Dashboard/order/er.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number color4">{{ listData.arr_outdate.not_done | vnd2 }}</span>
                <span class="excerpt">Tổng đơn chưa hoàn thành quá ngày</span>
              </div>
            </div>
          </div>
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-2">
                <img src="@/static/icon/Dashboard/order/date.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number color1">{{ listData.arr_outdate.not_take_pack | vnd2 }}</span>
                <span class="excerpt">Tổng kiện chưa lấy hàng quá ngày</span>
              </div>
            </div>
          </div>
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-3">
                <img src="@/static/icon/Dashboard/order/bar.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number">{{ listData.arr_outdate.waiting_for_liquidation | vnd2 }}</span>
                <span class="excerpt">Tổng đơn chờ thanh lý</span>
              </div>  
            </div>
          </div>
        </div>
        <!--  -->
        <div class="d-flex mt-3" v-if="listData.arr_complain">
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-1">
                <img src="@/static/icon/Dashboard/order/chat.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number color4">{{ listData.arr_complain.total_pending | vnd2 }}</span>
                <span class="excerpt">Tổng khiếu nại chờ xử lý</span>
              </div>
            </div>
          </div>
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-2">
                <img src="@/static/icon/Dashboard/order/list.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number color2">{{ listData.arr_complain.total_process | vnd2 }}</span>
                <span class="excerpt">Tổng khiếu nại đang xử lý</span>
              </div>
            </div>
          </div>
          <div class="box-rp">
            <div class="d-flex align-items-center">
              <div class="icon icon-item-3">
                <img src="@/static/icon/Dashboard/order/done.svg" />
              </div>
              <div class="content d-flex flex-column">
                <span class="number color3">{{ listData.arr_complain.total_done | vnd2 }}</span>
                <span class="excerpt">Tổng khiếu nại đã xử lý</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Biểu đồ -->
    <div class="d-flex">
      <div class="chart-customer-column">
        <span class="chart-title">Biểu đồ nhân viên báo giá</span>
        <div class="d-flex justify-content-between height40">
          <el-select
            v-model="filter.timeQuottion"
            placeholder="Theo tháng"
            class="select-date frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
          >
            <el-option
              v-for="item in timeQuottion"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div>
            <!-- <span class="detail">Thống kê chi tiết</span> -->
          </div>
        </div>
        <highcharts class="chart" :options="charStaff"></highcharts>
      </div>
      <!-- biểu đồ nhân viên đặt hàng  -->
      <div class="chart-customer-column">
        <span class="chart-title">Biểu đồ nhân viên đặt hàng</span>
        <div class="d-flex justify-content-between height40">
          <el-select
            v-model="filter.timeOrder"
            placeholder="Theo tháng"
            class="select-date frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
          >
            <el-option
              v-for="item in timeOrder"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div>
            <!-- <span class="detail">Thống kê chi tiết</span> -->
          </div>
        </div>
        <highcharts class="chart" :options="charStaffOrder"></highcharts>
      </div>
    </div>
    <!-- Biểu đồ Khiếu nại nhân viên  -->
    <div class="chart-customer-line">
      <span class="chart-title">Biểu đồ khiếu nại nhân viên theo tháng</span>
      <div class="d-flex justify-content-between height40">
        <!-- <el-select
          v-model="filter.timeOrder"
          placeholder="Theo tháng"
          class="select-date frame-select-common-2022"
          popper-class="frame-select-popper-common-2022"
        >
          <el-option
            v-for="item in timeOrder"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div>
          <span class="detail">Thống kê chi tiết</span>
        </div> -->
      </div>
      <highcharts class="chart" :options="chartComplain"></highcharts>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Chart} from 'highcharts-vue'
export default {
  name: "HomeOrderIndex",
  metaInfo() {
    return {
      title: "ChinaOrder - Đặt hàng Trung Quốc",
    };
  },
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      loading: true,
      input: "",
      timeOrder: [
        {
          value: 'day',
          label: 'Theo ngày'
        },
        {
          value: 'month',
          label: 'Theo tháng'
        },
      ],
      timeQuottion: [
        {
          value: 'day',
          label: 'Theo ngày'
        },
        {
          value: 'month',
          label: 'Theo tháng'
        },
      ],
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
        {
          name: "Năm",
          value: "y",
        },
      ],
      // biểu đồ cột
      charStaff: {
        chart: {
          type: 'column',
        },
        lang: {
          noData: "ko có dữ liệu"
        },
        title: {
          text: '',
          align: 'left',
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      // biểu đồ nhân viên đặt hàng
      charStaffOrder: {
        chart: {
          type: 'column'
        },
        title: {
          text: '',
          align: 'left',
        },
        xAxis: {
          type: 'category',
          gridLineWidth: 1,
        },
        yAxis: {
          title: {
            text: ''
          },
          gridLineWidth: 1,
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      // biểu đồ kn nhân viên
      chartComplain: {
        chart: {
          type: 'line',
        },
        title: {
          text: '',
          align: 'left'
        },
        yAxis: {
            title: {
                text: '',
            },
            gridLineColor: "#BDD6EE",
        },
        xAxis: {
          categories: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: "",
            data: [3, 5, 1, 3, 4, 7, 9, 2, 1, 4, 9, 5],
          },
        ],
      },
      // data thống kê
      listData: {},
      listChart: {},
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
    this.fetchData();
    this.fetchChart();
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
      this.fetchData();
    },
    // lấy số thống kê
    fetchData() {
      this.loading = true;
      let filter  = {
        time: this.filter.time,
        user_type: "2",
        customer_search: this.filter.customer_search
      }
      axios.get("statistic/fast", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data;
            if(this.filter.time == "d") {
              if (this.listData.arr_previous.total_all_order > 0) {
                this.percent.day = (response.data.arr_current.total_all_order - response.data.arr_previous.total_all_order)/response.data.arr_previous.total_all_order * 100;
              }
            }
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
    fetchChart() {
      let filter  = {
        user_type: "2",
      }
      axios.get("statistic/slow", { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.listChart = response.data;
            if(this.filter.timeQuottion == 'month') {
              this.charStaff.series[0].data = response.data.chart_user_type_2.staff_quotation.chart_month;
            } else {
              this.charStaff.series[0].data = response.data.chart_user_type_2.staff_quotation.chart_day;
            }
            if(this.filter.timeOrder == 'month') {
              this.charStaffOrder.series[0].data = response.data.chart_user_type_2.staff_order.chart_month;
            } else {
              this.charStaffOrder.series[0].data = response.data.chart_user_type_2.staff_order.chart_day;
            }
            this.chartComplain.series[0].data = response.data.chart_user_type_2.staff_complain.chart_month;
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
  watch: {
    "filter.timeQuottion": function () {
      this.fetchChart();
    },
    "filter.timeOrder": function () {
      this.fetchChart();
    },
  },
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
  width: 20%;
  height: 160px;
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
/*  */
.box-rp-conten-2023 {
  margin: 25px 0;
}
.box-rp-conten-2023 .box-rp {
  width: 32%;
  background: #fff;
  margin-right: 24px;
  border-radius: 5px;
  padding: 20px 0 21px 28px;
}
.box-rp-conten-2023 .box-rp .icon {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 22px;
}
.box-rp-conten-2023 .box-rp .icon-item-1 {
  background: #FFF0F0;
}
.box-rp-conten-2023 .box-rp .icon-item-2 {
  background: #ECF5FF;
}
.box-rp-conten-2023 .box-rp .icon-item-3 {
  background: #F7F8FF;
}
.box-rp-conten-2023 .box-rp .number {
  font-weight: 700;
  font-size: 24px;
  line-height: 56px;
  letter-spacing: 0.02em;
}
.box-rp-conten-2023 .box-rp .excerpt {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
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
.order-report.orderManager .chart-customer-column {
  width: 50%;
  background: #fff;
  margin-right: 22px;
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
.order-report .select-date {
  width: auto;
}
.order-report .select-date input {
  width: 125px;
  height: 28px;
  border: 0.5px solid #DEDEDE;
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: #767676;
}
.order-report .select-date .el-input__icon {
  line-height: 20px;
}
.height40 {
  height: 40px;
  padding: 10px 20px;
}
.height40 .detail {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
  cursor: pointer;
}
.order-report .chart-customer-column .highcharts-point.highcharts-color-0 {
  fill: #45B4CE;
}
/* biểu đồ kn nhân viên  */
.order-report .chart-customer-line {
  background: #fff;
  margin-top: 24px;
  padding: 22px 0;
}
/* .chart-customer-line .highcharts-graph {
  stroke: #00A962;
}
.chart-customer-line .highcharts-color-0 {
  fill: #00A962;
} */
/* màu số  */
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
/*  */
.percent-top {
  margin-top: 40px;
}
.percent-top img {
  padding-right: 8px;
}
.percent-top span {
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  cursor: pointer;
}
.textGreen {
  color: #26B01C;
}
.textRed {
  color: red;
}
</style>

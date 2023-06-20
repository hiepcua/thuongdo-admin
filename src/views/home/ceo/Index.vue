<template>
  <div class="home-index frame-content-common-2022 ceo-report" id="ST2022 ceo-report-index">
    <div class="search-index-top">
      <span class="title">Tìm kiếm nhanh</span>
      <div class="d-flex align-items-center mt-2">
        <div class="input-search-content">
          <el-input v-model="input" placeholder="Nhập tên KH, mã KH, số điện thoại, email,.... để tìm kiếm"></el-input>
        </div>
        <div class="frame-content-search d-flex align-items-center justify-content-center">
          <img src="@/static/icon/Dashboard/ceo/search.svg" />
          <span>Tìm kiếm</span>
        </div>
      </div>
    </div>
    <div class="content-report-frame-2023">
      <div class="content-box-report">
        <div v-if="listReport.revenue">
          <span class="numberReport color1" v-if="listReport.revenue.length == 0">0</span>
          <div v-else>
            <span class="numberReport color1">{{ listReport.revenue[0].value | vnd }}</span>
          </div>
        </div>
        <span class="reportInfo">Tổng doanh thu năm</span>
        <div class="detail-report d-flex align-items-center" v-if="percentRp > 0">
          <img src="@/static/icon/Dashboard/ceo/up.svg" />
          <span class="colorPercent">{{ percentRp | percent }}</span>
        </div>
        <div class="detail-report d-flex align-items-center" v-if="percentRp < 0">
          <img src="@/static/icon/Dashboard/ceo/down.svg" />
          <span class="colorRed">{{ percentRp }} %</span>
        </div>
      </div>
      <div class="content-box-report">
        <div v-if="listReport.shipping">
          <span class="numberReport color2" v-if="listReport.shipping.length == 0">0</span>
          <div v-else>
            <div v-for="item in listReport.shipping" :key="item.key">
              <span class="numberReport color2" v-if="item.key == 'shipping_kg'">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <span class="reportInfo">Tổng vận chuyển</span>
        <div class="d-flex align-items-center">
          <div class="weight-report" v-for="i in listReport.shipping" :key="i.key">
            <span v-if="i.key == 'shipping_kg'">{{ i.value }} kg</span>
            <span v-else>{{ i.value }} m3</span>
          </div>
        </div>
      </div>
      <div class="content-box-report">
        <span class="numberReport color3">{{ listReport.balance | vnd }}</span>
        <span class="reportInfo">Số dư tài khoản hệ thống</span>
      </div>
      <div class="content-box-report">
        <span class="numberReport color4">{{ listReport.unpaid | vnd }}</span>
        <span class="reportInfo do">Tổng tiền hàng phải thanh toán</span>
      </div>
      <div class="content-box-report">
        <span class="numberReport color5">{{ listReport.money_receivable |vnd }}</span>
        <span class="reportInfo">Tổng tiền phí vận chuyển phải thu</span>
      </div>
      <div class="content-box-report">
        <span v-if="listReport.fund_china" class="numberReport color6">{{ listReport.fund_china.vnd | vnd }}</span>
        <span class="reportInfo">Tổng số dư tiền tệ</span>
        <div v-if="listReport.fund_china" class="d-flex align-items-center weight-report">
          <span>{{ listReport.fund_china.cny | vnd3 }}</span>
        </div>
      </div>
    </div>
    <!-- biểu đồ -->
      <div class="d-flex mt-3">
        <div class="chart-customer">
          <span class="title-charts chart-line">Biểu đồ biến động phí dịch vụ theo tháng</span>
          <div class="d-flex align-items-center height40">
          </div>
          <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
        </div>
        <div class="chart-customer">
          <span class="title-charts">Biểu đồ đặt hàng và vận chuyển theo kho</span>
          <div class="height40">
            <el-select
              v-model="filter.warehouses"
              placeholder="Chọn kho"
              class="select-date-2023 frame-select-common-2022 select-Common-date"
              popper-class="frame-select-popper-common-2022"
            >
              <el-option
                v-for="item in listWarehouse"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <highcharts class="chart" :options="chartWarehouse" :updateArgs="updateArgs"></highcharts>
        </div>
        <div class="chart-customer chart-column">
          <span class="title-charts">Biểu đồ top danh mục hàng hóa đi</span>
          <div class="d-flex justify-content-between height40">
            <el-select
              v-model="filter.time"
              placeholder="Chọn thời gian"
              class="select-date-2023 frame-select-common-2022 timeoption"
              popper-class="frame-select-popper-common-2022"
            >
              <el-option
                v-for="item in optionsTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div>
              <span class="detail" @click="showDetail = !showDetail">Thống kê chi tiết</span>
            </div>
          </div>
          <highcharts v-if="showDetail" class="chart chartCat" :options="chartColumn"></highcharts>
          <transition name="slide" type="animation">
            <div class="report-detail" v-if="!showDetail">
              <div class="d-flex align-item-center">
                <div class="row-table-40">
                  <span class="text-top">Danh mục</span>
                </div>
                <div class="row-table text-center">
                  <span class="text-top">Số lượng</span>
                </div>
                <div class="row-table text-center">
                  <span class="text-top">Phần trăm</span>
                </div>
                <div class="row-table"></div>
              </div>
              <div class="d-flex align-item-center" v-for="i in percerntCat" :key="i.key">
                <div class="row-table-40">
                  <span class="text-top">{{ i.name }}</span>
                </div>
                <div class="row-table text-center">
                  <span class="text-top">{{ i.quantity }}</span>
                </div>
                <div class="row-table text-center">
                  <span class="text-top">{{ i.percent | percent }}</span>
                </div>
                <div class="row-table text-center" v-if="i.quantity_old > 0">
                  <div v-if="i.quantity < i.quantity_old" class="d-flex justify-content-center">
                    <div class="d-flex align-items-center justify-content-center">
                      <img class="pr-1" src="@/static/icon/Dashboard/ceo/icon-2.svg" />
                      <span class="colorRed">{{ -percerntcolumn | percent }}</span>
                    </div>
                  </div>
                  <div v-else class="d-flex justify-content-center">
                    <div class="d-flex align-items-center">
                      <img class="pr-1" src="@/static/icon/Dashboard/ceo/icon-1.svg" />
                      <span class="colorPercent">{{ percerntcolumn | percent }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    <!-- biểu đồ -->
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
      showDetail: true,
      loading: true,
      input: "",
      filter: {
        warehouses: "",
        time: "month",
      },
      optionsTime: [
        {
          label: 'Theo ngày',
          value: 'day'
        },
        {
          label: 'Theo tháng',
          value: 'month'
        },
      ],
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'line',
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
          categories: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0,
        },
        // legend: {
        //   enabled: false
        // },
        series: [],
      },
      //Biểu đồ kho
      chartWarehouse: {
        chart: {
          type: 'line',
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
          categories: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0
        },
        // legend: {
        //   enabled: false
        // },
        series: [],
      },
      // biểu đồ cột
      chartColumn: {
        chart: {
          type: 'column'
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
          gridLineColor: "#fff",
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0,
        },
        // legend: {
        //   enabled: false,
        // },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      //
      listReport: {},
      percentRp: "",
      listWarehouse: [],
      percerntCat: [],
      percerntcolumn: "",
    };
  },
  mounted() {
    this.scrollTopST();
    this.fetchCeo();
    this.fetchWarehouse();
    this.fetchTimeCat();
    this.fetchPercentCat();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    //xem chi tiết
    fetchCeo() {
      axios.get("report/ceo").then((response) => {
        switch (response.code) {
          case 200:
            this.listReport = response.data.general;
            this.chartOptions.series = response.data.charts.services;
            // if (this.listReport.revenue.length > 1) {
            //   this.percentRp = this.listReport.revenue[0].value/(this.listReport.revenue[0].value + this.listReport.revenue[1].value) * 100;
            //   this.percentRp = this.percentRp.toFixed(2);
            // }
            if (this.listReport.revenue.length > 1) {
              if(this.listReport.revenue[1].value > 0) {
                this.percentRp = (this.listReport.revenue[0].value - this.listReport.revenue[1].value)/this.listReport.revenue[1].value * 100
              }
            }
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
    // Chọn kho
    fetchWarehouse() {
      axios.get("warehouse/vi").then((response) => {
        switch (response.code) {
          case 200:
            this.listWarehouse = response.data;
            this.filter.warehouses = this.listWarehouse[0].id;
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
    // biểu đồ chọn kho
    fetchRpWarehouse() {
      let id = this.filter.warehouses
      axios.get("report/ceo/warehouse/" + id).then((response) => {
        switch (response.code) {
          case 200:
            this.chartWarehouse.series = response.data;
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
    // chọm theo thời gian
    fetchTimeCat() {
      let time = this.filter.time
      let filter= {
        type: 'count',
      }
      axios.get("report/ceo/category/" + time, { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.chartColumn.series[0].data = response.data;
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
    // lấy %
    fetchPercentCat() {
      let time = this.filter.time
      let filter= {
        type: 'percent',
      }
      axios.get("report/ceo/category/" + time, { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.percerntCat = response.data;
            this.percerntCat.forEach((item) => {
              if(item.quantity_old !==0) {
                this.percerntcolumn = (item.quantity - item.quantity_old)/item.quantity_old * 100
              }
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
  watch: {
    "filter.warehouses": function () {
      this.fetchRpWarehouse();
    },
    "filter.time": function () {
      this.fetchTimeCat();
      this.fetchPercentCat();
    },
  },
};
</script>

<style lang="css" scoped>
.home-index.frame-content-common-2022 {
  background: #F7F8FF;
}
/* search top  */
.search-index-top {
  padding: 0 64px;
}
.search-index-top .title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #207CDC;
}
/* phần báo cáo */
.content-report-frame-2023 {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.numberReport {
  font-weight: 700;
  font-size: 24px;
  line-height: 56px;
  letter-spacing: 0.02em;
}
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
.content-box-report {
  width: 16%;
  height: 200px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 22px 6px 8px 15px;
  margin: 5px;
  display: flex;
  flex-direction: column;
}
.reportInfo {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
  margin-top: 12px;
}
.detail-report {
  margin-top: 11px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #767676;
  cursor: pointer;
}
.detail-report:hover > span {
  color: #0688EE;
}
.detail-report img {
  margin-right: 10px;
}
.weight-report {
  padding: 5px 0 11px 0;
  margin-right: 10px;
}
.weight-report span {
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #3F92D1;
  background: #F7F8FF;
  padding: 3px 6px;
}
</style>
<style>
.input-search-content {
  width: 80%;
}
.input-search-content input {
  border: 1px solid #3F92D1;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
}
.frame-content-search {
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
.chart-customer {
  width: 33%;
  margin: 5px;
  background: #fff;
  padding-top: 22px;
}
.chart-customer .highcharts-container svg {
  font-family: 'Roboto', sans-serif !important;
}
.chart-customer .highcharts-credits {
  display: none;
}
.chart-customer .highcharts-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px;
  color: #000728;
}
.chart-column .highcharts-point.highcharts-color-0 {
  fill: #45B4CE !important
}
.title-charts {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
  padding-left: 20px;
}
/* .chart-customer .chart {
  padding-top: 20px;
} */
.chart-line .highcharts-point.highcharts-color-0 {
  fill: red !important
}
.chartCat rect.highcharts-point {
  /* display: none; */
}
/*  */
.ceo-report .timeoption {
  width: 50%;
}
.select-date-2023 input {
  width: 100%;
  height: 28px;
  border: 0.5px solid #DEDEDE;
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: #767676;
}
.select-date-2023 .el-input__icon {
  line-height: 20px;
}
/* chú thích biểu đồ  */
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
.height40 .icon-1 {
  background: #7cb5ec;
}
.height40 .icon-2 {
  background: #5a5a5f;
}.height40 .icon-3 {
  background: #b7f3ab;
}.height40 .icon-4 {
  background: #ee7513;
}
/* // ********* Slide Animation ************ */
.slide-enter { 
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-in forwards;
  transition: opacity .5s;
}

.slide-leave {
  /* // initial state set in keyframe */
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards; 
  opacity: 0;
  transition: opacity 1s;
}


@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
/* thống kê chi tiết */
.report-detail {
  height: 400px;
  padding: 0 10px 10px 20px;
}
.report-detail .row-table-40 {
  padding: 10px 0;
  width: 40%;
}
.report-detail .row-table {
  width: 20%;
  padding: 10px 0;
}
.report-detail .text-top {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000728
}
.report-detail .text-center {
  text-align: center;
}
/* màu % */
.colorPercent {
  color: #26B01C;
}
.colorRed {
  color: red;
}
.select-Common-date {
  width: 100% !important;
}
/*  */
.chartCat .highcharts-no-tooltip .highcharts-point {
  fill: #fff
}
</style>

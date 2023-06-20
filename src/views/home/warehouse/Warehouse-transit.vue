<template>
  <div class="home-index frame-content-common-2022 order-report warehouseRP" id="ST2022">
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
              <div class="title" :class="[i.value === filter.status ? 'activeStatus' : '']">
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
            <el-input v-model="input" placeholder="Nhập tên KH, mã KH, số điện thoại..."></el-input>
          </div>
          <div class="frame-content-search d-flex align-items-center">
            <img src="@/static/icon/Dashboard/ceo/search.svg" />
            <span class="pl-2">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Báo cáo -->
    <div class="content-report-frame-2023 mt-3">
      <div class="content-box-report">
        <span class="numberReport color3">22.341.234.112</span>
        <span class="reportInfo">Tổng kiện hàng nhận hàng</span>
      </div>
      <div class="content-box-report">
        <span class="numberReport color1">22.341.234.112</span>
        <span class="reportInfo">Tổng kiện hàng đã giao</span>
      </div>
      <div class="content-box-report">
        <span class="numberReport color2">22.341.234.112</span>
        <span class="reportInfo">Tổng kiện hàng chờ giao</span>
      </div>
      <div class="content-box-report">
        <span class="numberReport color6">22.341.234.112</span>
        <span class="reportInfo">Tổng kiện hàng chờ xác nhận từ kho</span>
      </div>
    </div>
    <!--  -->
    <!-- Biểu đồ -->
    <div class="d-flex justify-content-center">
      <div class="chart-customer-column">
        <span class="chart-title">Tổng trọng lượng kiện hàng nhận</span>
        <div class="d-flex align-items-center height40">
          <el-select
            v-model="input"
            placeholder="Theo tháng"
            class="select-date frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <highcharts class="chart" :options="chartOrderLine"></highcharts>
      </div>
      <div class="chart-customer-column">
        <span class="chart-title">Tổng thể tích kiện hàng nhận</span>
        <div class="d-flex align-items-center height40">
          <el-select
            v-model="input"
            placeholder="Theo tháng"
            class="select-date frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <highcharts class="chart" :options="chartOrderLine"></highcharts>
      </div>
    </div>
    <div class="chart-line-wasehouse">
      <span class="title">Biểu đồ kiện hàng theo chi nhánh</span>
      <div class="d-flex justify-content-between height40">
        <el-select
            v-model="input"
            placeholder="Theo tháng"
            class="select-date frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <!-- <div>
          <span class="detail">Thống kê chi tiết</span>
        </div> -->
      </div>
      <highcharts class="chart" :options="chartWasehouse"></highcharts>
    </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
  name: "WasehouseTransit",
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
      options: [
        {
          value: 'Option1',
          label: 'Theo ngày'
        },
        {
          value: 'Option2',
          label: 'Theo tháng'
        },
      ],
      filter: {
        status: "day",
      },
      listStatus: [
        {
          name: "Trong ngày",
          value: "day",
        },
        {
          name: "Trong tuần",
          value: "week",
        },
        {
          name: "Tháng",
          value: "month",
        },
        {
          name: "Quý",
          value: "precious",
        },
        {
          name: "Năm",
          value: "year",
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
          categories: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
          gridLineWidth: 1,
          gridLineColor: "#BDD6EE",
        },
        legend: {
          enabled: false
        },
        series:[{
              name: '',
              data: [43934, 48656, 65165, 81827, 112143, 142383,
                  171533, 165174, 155157, 161454, 154610, 221001]
          },
        ],
      },
    //
    chartWasehouse: {
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
        series:[{
              name: 'Chi nhánh 1',
              data: [43934, 48656, 65165, 81827, 112143, 142383,
                  171533, 165174, 155157, 161454, 154610, 221001]
          },
          {
            name: 'Chi nhánh 2',
              data: [13934, 788656, 65165, 21827, 12143, 342383,
                  171533, 365174, 155157, 161454, 754610, 221001]
          },
        ],
      },
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
  width: 25%;
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
/* biểu đồ  */
.order-report.warehouseRP .chart-customer-column {
  width: 50%;
  background: #fff;
  /* margin-right: 22px; */
  padding-top: 22px;
  margin: 10px;
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
.chart-line-wasehouse {
  width: 100%;
  background: #fff;
  padding-top: 22px;
  margin: 10px;
}
.chart-line-wasehouse .title {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
  padding-left: 22px;
}
/*  */
.order-report .select-date {
  width: auto;
}
.select-date input {
  width: 110px;
  height: 28px;
  border: 0.5px solid #DEDEDE;
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: #767676;
}
.select-date .el-input__icon {
  line-height: 20px;
}
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
.height40 .detail {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
  cursor: pointer;
}
</style>

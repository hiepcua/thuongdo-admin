<template>
  <div class="home-index frame-content-common-2022 order-report index-tu-van" id="ST2022">
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
            @click="fetchDataCounsel()"
          >
            <img src="@/static/icon/Dashboard/ceo/search.svg" />
            <span class="pl-2">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Báo cáo -->
    <div class="report-info" v-loading="loading">
      <div class="content-report-frame-2023 report-info" v-if="listData.arr_customer">
        <div class="content-box-report">
          <span class="numberReport color2">{{ listData.arr_customer.total_waiting_for_advice }}</span>
          <span class="reportInfo">Tổng khách hàng chờ tư vấn</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color4">{{ listData.arr_order.total_not_done }}</span>
          <span class="reportInfo">Tổng đơn chưa hoàn thành</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color2">{{ listData.arr_order.total_waiting_quote }}</span>
          <span class="reportInfo">Tổng đơn chờ báo giá</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color6">{{ listData.arr_order.total_waiting_deposit }}</span>
          <span class="reportInfo">Tổng đơn chờ đặt cọc</span>
        </div>
        <div class="content-box-report">
          <span class="numberReport color5">{{ listData.arr_order.total_ordered }}</span>
          <span class="reportInfo">Tổng đơn đã đặt hàng</span>
        </div>
      </div>
    </div>
    <!-- Báo cáo V2 -->
    <div class="d-flex" v-if="listData.arr_customer">
      <div class="width50">
        <div class="d-flex align-item-center">
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number color3">{{ listData.arr_customer.total_new }}</span>
              <span class="title">Tổng khách hàng mới</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/user.svg" />
            </div>
          </div>
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number color1">{{ listData.arr_customer.total_order }}</span>
              <span class="title">Tổng khách hàng order</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/box.svg" />
            </div>
          </div>
        </div>
        <!-- Biểu đồ -->
        <div class="chart-customer-column">
          <span class="chart-title">Biểu đồ nhân viên tư vấn có doanh số từ cao xuống thấp</span>
          <div class="d-flex justify-content-between height40">
            <el-select
              v-model="filter.timeCounsel"
              placeholder="Theo tháng"
              class="select-date frame-select-common-2022"
              popper-class="frame-select-popper-common-2022"
            >
              <el-option
                v-for="item in optionsCounsel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <div>
              <span class="detail">Thống kê chi tiết</span>
            </div> -->
          </div>
          <highcharts class="chart" :options="chartCounsel"></highcharts>
        </div>
        <!--  -->
      </div>
      <div class="width50" v-if="listData.arr_customer">
        <div class="d-flex align-item-center">
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number color5">{{ listData.arr_customer.total_consignment }}</span>
              <span class="title">Tổng khách hàng mới ký gửi</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/mask.svg" />
            </div>
          </div>
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number color4">{{ listData.arr_complain.total_pending }}</span>
              <span class="title">Tổng khiếu nại chưa xử lý</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/vector.svg" />
            </div>
          </div>
        </div>
        <div class="d-flex align-item-center">
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number color2">{{ listData.arr_pack.total_pack_not_take }}</span>
              <span class="title">Tổng kiện hàng chưa lấy</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/time.svg" />
            </div>
          </div>
          <div class="report-counsel d-flex align-items-center justify-content-between">
            <div class="info-rp d-flex flex-column">
              <span class="number">{{ listData.arr_complain.total_done }}</span>
              <span class="title">Tổng khiếu nại đã xử lý</span>
            </div>
            <div class="box-icon">
              <img src="@/static/icon/Dashboard/counsel/done.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Biểu đồ -->
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
      filter: {
        time: "d",
        customer_search: "",
        timeCounsel: "month",
      },
      optionsCounsel: [
        {
          value: 'day',
          label: 'Theo ngày'
        },
        {
          value: 'month',
          label: 'Theo tháng'
        },
      ],
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
      chartCounsel: {
        chart: {
          type: 'column'
        },
        title: {
          text: '',
          align: 'left'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
          type: "category",
          label: {
            rotation: 0,
          }
        },
        legend: {
          enabled: false
        },
        series:[
          {
            name: "",
            data: [
              ['Lê Ngọc An', 98699],
              ['Lê Thu Uyên', 78699],
              ['Đoàn Xuân Kiên', 58699],
              ['Bùi Thảo', 48699],
              ['Lê Hoa', 38699],
              ['Ngọc Minh', 28699],
              ['Ngô Thức', 18699],
            ],
          },
        ],
      },
      listData: {},
      listChart: {},
    };
  },
  mounted() {
    this.scrollTopST();
    this.fetchDataCounsel();
    // this.fetchChart();
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
      this.fetchDataCounsel();
    },
    // lấy dữ liệu
    fetchDataCounsel() {
      this.loading = true;
      let filter  = {
        time: this.filter.time,
        user_type: "5",
        customer_search: this.filter.customer_search
      }
      axios.get("statistic/fast", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listData = response.data;
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
    // lấy dữ liệu biểu đồ
    fetchChart() {
      let filter  = {
        user_type: "5",
      }
      axios.get("statistic/slow", { params: filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.listChart = response.data;
            // if(this.filter.timeCounsel == 'month') {
            //   this.chartCounsel.series[0].data = response.data.chart_user_type_2.staff_quotation.chart_month;
            // } else {
            //   this.chartCounsel.series[0].data = response.data.chart_user_type_2.staff_quotation.chart_day;
            // }
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
    "filter.timeCounsel": function () {
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
/* báo cáo 2  */
.width50 {
  width: 50%;
}
.width50 .report-counsel {
  width: 50%;
  background: #fff;
  margin: 10px;
  height: 200px;
  padding: 22px 23px 8px 27px;
}
.width50 .info-rp .number {
  font-weight: 700;
  font-size: 24px;
  line-height: 56px;
  letter-spacing: 0.02em;
}
.width50 .info-rp .title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000728;
}
.width50 .box-icon {
  width: 80px;
  height: 80px;
  background: #E9FFEC;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
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
.order-report.index-tu-van .chart-customer-column {
  /* width: 100%; */
  margin-top: 10px;
  margin-right: 10px;
  background: #fff;
  /* margin-right: 22px; */
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
/* số number  */
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
.height40 {
  height: 40px;
  padding: 10px 20px;
}
.order-report .select-date {
  width: auto;
}
.order-report .select-date input {
  width: 110px;
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
.height40 .detail {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  letter-spacing: 0.01em;
  color: #767676;
}
/*  */
.report-info {
  min-height: 250px;
}
</style>

<template>
  <div class="wallet-history">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div class="d-flex flex-column wallet-info">
        <span class="wallet-title">Tổng tiền nạp</span>
        <span class="money-active">+556,998,999đ</span>
      </div>
      <div class="d-flex flex-column wallet-info">
        <span class="wallet-title">Tổng tiền rút</span>
        <span class="money-de-active">-11,000,000,099đ</span>
      </div>
      <div class="d-flex flex-column wallet-info">
        <span class="wallet-title">Tổng thanh toán</span>
        <span class="money-de-active">-11,000,000,099đ</span>
      </div>
      <div class="d-flex flex-column wallet-info">
        <span class="wallet-title">Tổng tiền nạp</span>
        <span class="money-active">+556,998,999đ</span>
      </div>
      <div class="d-flex flex-column wallet-info">
        <span class="wallet-title">Tổng tiền nạp</span>
        <span class="money-active">+556,998,999đ</span>
      </div>
    </div>
    <div class="wallet-history-search-title">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Tìm kiếm</span>
    </div>
    <div class="wallet-history-search">
      <div class="d-flex flex-row justify-content-between">
        <div class="d-flex">
          <div class="item-search item-search-date">
            <el-date-picker
              type="date"
              placeholder="Từ ngày"
              class="frame-date-common-2022"
              size="medium"
              clearable
              popper-class="frame-date-popper-common-2022"
            >
            </el-date-picker>
          </div>
          <div class="item-search item-search-date">
            <el-date-picker
              type="date"
              placeholder="Đến ngày"
              class="frame-date-common-2022"
              size="medium"
              clearable
              popper-class="frame-date-popper-common-2022"
            >
            </el-date-picker>
          </div>
          <div
            class="button-search d-flex justify-content-center align-items-center"
          >
            <span>Tìm kiếm</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="button-excel justify-content-center align-items-center">
            <img src="@/static/icon/action/excel.svg" alt="" />
            <span> Xuất Exel</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wallet-history-table">
      <el-table
        :data="tableData"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column
          label="Thời gian"
          header-align="center"
          align="center"
          min-width="50"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text">
              <span>{{ scope.row.created_at }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Loại giao dịch"
          header-align="center"
          align="left"
          min-width="50"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text">
              <span v-if="scope.row.order_type === 0" class="status-error">
                Thanh toán
              </span>
              <span v-if="scope.row.order_type === 1" class="status-complete">
                Nạp tiền
              </span>
              <span> Mã đơn hàng: {{ scope.row.order_id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Thông tin"
          header-align="center"
          align="left"
          min-width="150"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text">
              <span>{{ scope.row.info }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Giá trị giao dịch"
          header-align="center"
          align="left"
          min-width="50"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text money-de-active">
              <span>{{ convertMoney(scope.row.deposit_order) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Số dư còn lại"
          header-align="center"
          align="left"
          min-width="50"
        >
          <template slot-scope="scope">
            <div class="d-flex flex-column table-text money-active">
              <span>{{ convertMoney(scope.row.balance) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-between align-items-center">
        <div class="page-count-common-2022">
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="10"></el-radio-button>
            <el-radio-button label="20"></el-radio-button>
            <el-radio-button label="50"></el-radio-button>
            <el-radio-button label="100"></el-radio-button>
          </el-radio-group>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="radio"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { formatCurrency } from "@/common/convert";

export default {
  name: "WalletHistory",
  data() {
    return {
      tableData: [
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          order_type: 0,
          info: "Trừ ví tiền ship hàng nội thành",
          deposit_order: -1000000000,
          balance: +5000000,
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          order_type: 1,
          info: "Trừ ví tiền ship hàng nội thành",
          deposit_order: -1000000000,
          balance: +5000000,
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          order_type: 0,
          info: "Trừ ví tiền ship hàng nội thành",
          deposit_order: -1000000000,
          balance: +5000000,
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          order_type: 0,
          info: "Trừ ví tiền ship hàng nội thành",
          deposit_order: -1000000000,
          balance: +5000000,
        },
      ],
      total: 5,
      currentPage: 1,
      radio: 10,
    };
  },
  methods: {
    convertMoney(value) {
      return formatCurrency(value);
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "even-row";
      } else {
        return "old-row";
      }
    },
  },
};
</script>
<style>
.wallet-history {
  padding-top: 25px;
}
.wallet-history .wallet-info {
  height: 80px;
  min-width: 120px;
}

.wallet-history-search-title {
  margin-bottom: 10px;
}
.wallet-history-search-title span {
  margin-left: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #207cdc;
}
.wallet-history .wallet-info .wallet-title {
  font-size: 14px;
  color: #000728;
  text-align: center;
  font-weight: 400;
  padding-bottom: 10px;
}
.wallet-history .wallet-info .money-active {
  color: #00a962;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}
.wallet-history .wallet-info .money-de-active {
  color: #ed1c24;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

.wallet-history-search .button-excel {
  color: #575757;
  cursor: pointer;
  border: 1px solid #b4b4b4;
  padding: 5px 20px;
  border-radius: 4px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.wallet-history-search .button-excel img {
  margin-right: 5px;
  padding-top: 5px;
}
.wallet-history-search .button-excel span {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

.wallet-history-search .button-search {
  color: #fff;
  cursor: pointer;
  border: 1px solid #207cdc;
  background-color: #207cdc;
  padding: 5px 25px;
  border-radius: 4px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.wallet-history-search .button-search span {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}
.wallet-history-table {
  padding-top: 20px;
}
.wallet-history-table .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #000728;
}
.wallet-history-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 14px;
}
.wallet-history-table .money-active {
  color: #26b01c;
}
.wallet-history-table .money-de-active {
  color: #ed1c24;
}
.wallet-history-table .status-error {
  padding: 0 10px;
  width: 55px;
  background-color: #ed1c24;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.wallet-history-table .status-complete {
  padding: 0 10px;
  width: 40px;
  background-color: #26b01c;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.old-row {
  background-color: #e8f3ff !important;
}
</style>

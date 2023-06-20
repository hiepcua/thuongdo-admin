<template>
  <div class="customer-order-table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="stt"
        label="STT"
        header-align="center"
        align="center"
        min-width="40"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Mã DH"
        header-align="center"
        align="left"
        min-width="80"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span> Mã đơn hàng: {{ scope.row.order_id }}</span>
            <span> {{ scope.row.created_at }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tổng SP"
        header-align="center"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.total_order }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tổng tiền"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text money-active">
            <span>{{ convertMoney(scope.row.total_price) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tạm ứng"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text money-active">
            <span>{{ convertMoney(scope.row.deposit_order) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Còn lại"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text money-de-active">
            <span>{{ convertMoney(scope.row.balance) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tỉ giá"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.rate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Họ và tên"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.name }}</span>
            <span>{{ scope.row.phone_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Số kiện"
        header-align="center"
        align="left"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.package_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Trạng thái"
        header-align="center"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span v-if="scope.row.status === 0" class="status-error">
              Chờ báo giá
            </span>
            <span v-if="scope.row.status === 1" class="status-active">
              Đã đặt hàng
            </span>
            <span v-if="scope.row.status === 2" class="status-complete">
              Đã hoàn thành
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Người xử lý"
        header-align="center"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.by_user }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Thao tác"
        header-align="center"
        align="center"
        min-width="50"
      >
        <template>
          <div
            class="d-flex flex-column action justify-content-between align-items-center"
          >
            <el-tooltip placement="top">
              <template #content> Xem đơn hàng </template>
              <img src="@/static/icon/action/detail.svg" alt="" />
            </el-tooltip>
            <el-tooltip placement="top">
              <template #content> Kiện hàng </template>
              <img src="@/static/icon/action/package.svg" alt="" class="mt-1" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-content-between align-items-center pt-2">
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
</template>
<script>
import { formatCurrency } from "@/common/convert";

export default {
  name: "CustomerOrderHistory",
  data() {
    return {
      tableData: [
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          total_order: 1,
          total_price: 1000000000,
          deposit_order: 1000000000,
          balance: -5000000,
          rate: 3.645,
          name: "Huyền",
          phone_number: "08882888855",
          package_number: 2,
          status: 0,
          by_user: "Đoàn Xuân Kiên",
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          total_order: 1,
          total_price: 1000000000,
          deposit_order: 1000000000,
          balance: -5000000,
          rate: 3.645,
          name: "Huyền",
          phone_number: "08882888855",
          package_number: 2,
          status: 0,
          by_user: "Đoàn Xuân Kiên",
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          total_order: 1,
          total_price: 1000000000,
          deposit_order: 1000000000,
          balance: -5000000,
          rate: 3.645,
          name: "Huyền",
          phone_number: "08882888855",
          package_number: 2,
          status: 0,
          by_user: "Đoàn Xuân Kiên",
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          total_order: 1,
          total_price: 1000000000,
          deposit_order: 1000000000,
          balance: -5000000,
          rate: 3.645,
          name: "Huyền",
          phone_number: "08882888855",
          package_number: 2,
          status: 1,
          by_user: "Đoàn Xuân Kiên",
        },
        {
          order_id: "155998",
          created_at: "08-05-2022 11:19",
          total_order: 1,
          total_price: 1000000000,
          deposit_order: 1000000000,
          balance: -5000000,
          rate: 3.645,
          name: "Huyền",
          phone_number: "08882888855",
          package_number: 2,
          status: 2,
          by_user: "Đoàn Xuân Kiên",
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
      if (rowIndex % 2 == 0) {
        return "even-row";
      } else {
        return "old-row";
      }
    },
  },
};
</script>
<style>
.customer-order-table {
  padding-top: 20px;
}
.customer-order-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 12px;
}

.customer-order-table .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 12px;
  color: #000728;
}
.customer-order-table .money-active {
  color: #26b01c;
}
.customer-order-table .money-de-active {
  color: #ed1c24;
}
.customer-order-table .status-error {
  background-color: #ed1c24;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.customer-order-table .status-active {
  background-color: #0688ee;
  font-size: 10px;
  font-weight: 400;
  color: #fff;
  border-radius: 4px;
}
.customer-order-table .status-complete {
  background-color: #26b01c;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.customer-order-table .action img {
  width: 25px;
}
.old-row {
  background-color: #e8f3ff !important;
}
</style>

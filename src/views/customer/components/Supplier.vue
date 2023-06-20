<template>
  <div class="supplier-history">
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
        min-width="50"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Mã NCC"
        header-align="center"
        align="left"
        min-width="150"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span> {{ scope.row.supplier_code }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Logo"
        header-align="center"
        align="left"
        min-width="150"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <div v-if="scope.row.logo">
              <img src="@/static/images/logo/logo_supplier_1.png" alt="" />
            </div>
            <div v-else>
              <span class="no-logo">Chưa có logo</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Thông tin NCC"
        header-align="center"
        align="left"
        min-width="300"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.name }}</span>
            <span v-if="scope.row.status" class="status-complete">online</span>
            <span v-else class="status-error">offline</span>
            <div v-if="scope.row.branch" class="d-flex flex-row pt-1">
              <img src="@/static/icon/action/store.svg" alt="" class="mr-2" />
              <span>{{ scope.row.branch }}</span>
            </div>
            <div v-if="scope.row.address" class="d-flex flex-row pt-1">
              <img
                src="@/static/icon/action/location.svg"
                alt=""
                class="mr-2"
              />
              <span>{{ scope.row.address }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tổng tiền đặt hàng"
        header-align="center"
        align="left"
        min-width="150"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ convertMoney(scope.row.order_total) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tổng tiền khiếu nại"
        header-align="center"
        align="left"
        min-width="150"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.complain_total }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Thao tác"
        header-align="center"
        align="center"
        min-width="70"
      >
        <template>
          <div
            class="d-flex flex-column action justify-content-between align-items-center"
          >
            <el-tooltip placement="top">
              <template #content> Sửa đổi </template>
              <img src="@/static/icon/action/edit.svg" alt="" />
            </el-tooltip>
            <el-tooltip placement="top">
              <template> Chi tiết </template>
              <img src="@/static/icon/action/detail.svg" alt="" class="mt-1" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-content-between align-items-center mt-3">
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
  name: "SupplierHistory",
  data() {
    return {
      tableData: [
        {
          name: "Tên NCC",
          supplier_code: "0008854",
          logo: "images/logo/logo_supplier_1.svg",
          status: 1,
          address: "",
          branch: "",
          order_total: 50000000,
          complain_total: 6,
        },
        {
          name: "Tên NCC",
          supplier_code: "0008854",
          logo: "@/static/images/logo/logo_supplier_2.svg",
          status: 1,
          address: "",
          branch: "",
          order_total: 50000000,
          complain_total: 6,
        },
        {
          name: "Tên NCC",
          supplier_code: "0008854",
          logo: "@/static/images/logo/logo_supplier_3.svg",
          status: 1,
          address: "",
          branch: "",
          order_total: 50000000,
          complain_total: 6,
        },
        {
          name: "Tên NCC",
          supplier_code: "0008854",
          logo: "@/static/images/logo/logo_supplier_3.svg",
          status: 1,
          address: "",
          branch: "",
          order_total: 50000000,
          complain_total: 6,
        },
        {
          name: "Tên NCC",
          supplier_code: "0008854",
          logo: "",
          status: 1,
          address: "Thâm Quyến, Trung Quốc",
          branch: "Ngành hàng",
          order_total: 50000000,
          complain_total: 6,
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
.supplier-history {
  padding-top: 20px;
}
.supplier-history .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 14px;
}
.supplier-history .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #000728;
}

.supplier-history .status-error {
  padding: 0 10px;
  width: 55px;
  background-color: #ed1c24;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.supplier-history .status-complete {
  padding: 0 10px;
  width: 30px;
  background-color: #26b01c;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
.old-row {
  background-color: #e8f3ff !important;
}
.supplier-history .no-logo {
  padding: 30px 20px;
  background-color: #f6f8ff;
  color: #3f92d1;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
}
</style>

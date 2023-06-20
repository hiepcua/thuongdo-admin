<template>
  <div class="change-label-history">
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
        label="Thời gian"
        header-align="center"
        align="left"
        min-width="100"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span> {{ scope.row.created_at }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tên nhãn"
        header-align="center"
        align="left"
        min-width="400"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Nhân viên"
        header-align="center"
        align="left"
        min-width="400"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text money-de-active">
            <span>{{ scope.row.staff }}</span>
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
export default {
  name: "ChangeLabelHistory",
  data() {
    return {
      tableData: [
        {
          created_at: "08-05-2022 11:19",
          label: "Đã lên đơn",
          staff: "Đoàn Xuân Kiên",
        },
        {
          created_at: "08-05-2022 11:19",
          label: "Không liên hệ được",
          staff: "Đoàn Xuân Kiên",
        },
        {
          created_at: "08-05-2022 11:19",
          label: "Đang follow",
          staff: "Đoàn Xuân Kiên",
        },
        {
          created_at: "08-05-2022 11:19",
          label: "Hẹn gọi lại",
          staff: "Đoàn Xuân Kiên",
        },
        {
          created_at: "08-05-2022 11:19",
          label: "Không liên hệ được",
          staff: "Đoàn Xuân Kiên",
        },
      ],
      total: 5,
      currentPage: 1,
      radio: 10,
    };
  },
  methods: {
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
.change-label-history {
  padding-top: 20px;
}
.change-label-history .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 14px;
}
.change-label-history .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #000728;
}
.old-row {
  background-color: #e8f3ff !important;
}
</style>

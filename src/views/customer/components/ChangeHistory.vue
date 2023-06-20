<template>
  <div class="change-history">
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
        min-width="150"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span> {{ scope.row.created_at }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Nội dung"
        header-align="center"
        align="left"
        min-width="500"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
            <span>{{ scope.row.content }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Nhân viên"
        header-align="center"
        align="left"
        min-width="500"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column table-text">
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
  name: "ChangeStaffHistory",
  data() {
    return {
      tableData: [
        {
          created_at: "08-05-2022 11:19",
          content: "Thay đổi số điện thoại",
          staff: "Vũ Thị Hoa",
        },
        {
          created_at: "08-05-2022 11:19",
          content: "Thay đổi số điện thoại",
          staff: "Vũ Thị Hoa",
        },
        {
          created_at: "08-05-2022 11:19",
          content: "Thay đổi số điện thoại",
          staff: "Vũ Thị Hoa",
        },
        {
          created_at: "08-05-2022 11:19",
          content: "Thay đổi số điện thoại",
          staff: "Vũ Thị Hoa",
        },
        {
          created_at: "08-05-2022 11:19",
          content: "Thay đổi số điện thoại",
          staff: "Vũ Thị Hoa",
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
.change-history {
  padding-top: 20px;
}
.change-history .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 14px;
}
.change-history .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #000728;
}
.old-row {
  background-color: #e8f3ff !important;
}
</style>

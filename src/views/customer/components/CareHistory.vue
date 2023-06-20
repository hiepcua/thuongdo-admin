<template>
  <div class="customer-care-history">
    <el-row>
      <el-col :span="8">
        <div class="customer-care-form">
          <el-form label-position="left">
            <el-form-item>
              <span slot="label" class="label">
                Nhập nội dung chăm sóc khách hàng
              </span>
              <el-input type="textarea" placeholder="Nhập nội dung" />
            </el-form-item>
            <el-form-item label="Trạng thái gọi" class="customer-normal-input">
              <el-select
                placeholder="Chọn trạng thái"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="Hình thức kinh doanh"
              class="customer-normal-input"
            >
              <el-select
                placeholder="Chọn hình thức kinh doanh"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in optionsBusinessType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Loại chăm sóc" class="customer-normal-input">
              <el-select
                placeholder="Chọn loại chăm sóc"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in optionsBusinessType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Ngày chăm sóc" class="customer-normal-input">
              <el-date-picker
                type="date"
                placeholder="Ngày chăm sóc"
                class="frame-date-common-2022 padding-input-bod"
                size="mini"
                clearable
                popper-class="frame-date-popper-common-2022"
              >
              </el-date-picker>
            </el-form-item>
            <div class="d-flex align-items-start mt-4">
              <div
                class="d-flex frame-btn-customer-td-2022 justify-content-center align-items-center"
              >
                <span class="save-button">Lưu</span>
              </div>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="d-flex flex-column">
          <div class="label pb-3 pt-2 pl-4">Lịch sử chăm sóc khách hàng</div>
          <div class="customer-care-table">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                label="Ngày"
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
                label="Trạng thái gọi"
                header-align="center"
                align="left"
                min-width="50"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column table-text">
                    <span> {{ scope.row.status }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Hình thức kinh doanh"
                header-align="center"
                align="left"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column table-text">
                    <span>{{ scope.row.business_type }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Loại chăm sóc"
                header-align="center"
                align="left"
                min-width="50"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column table-text money-de-active">
                    <span>{{ scope.row.care_type }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Nội dung"
                header-align="center"
                align="left"
                min-width="50"
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column table-text money-active">
                    <span>{{ scope.row.content }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "CareHistory",
  data() {
    return {
      optionsStatus: [],
      tableData: [
        {
          created_at: "08-05-2022 11:19",
          status: "Đã liên hệ",
          business_type: "Hình thức kinh doanh",
          care_type: "Loại chăm sóc",
          content: "Ghi chú",
        },
        {
          created_at: "08-05-2022 11:19",
          status: "Đã liên hệ",
          business_type: "Hình thức kinh doanh",
          care_type: "Loại chăm sóc",
          content: "Ghi chú",
        },
      ],
      optionsBusinessType: [],
      optionsCareType: [],
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
.customer-care-history {
  padding-top: 20px;
}
.customer-care-history .customer-care-form .text-area-label {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  width: 100% !important;
}
.customer-care-form .customer-normal-input .el-form-item__label {
  font-size: 14px;
  color: #000728 !important;
  font-weight: 400;
  width: 180px;
}
.customer-care-history .label {
  font-size: 14px;
  color: #000728 !important;
  font-weight: 400;
}
.customer-care-form .customer-normal-input .el-select {
  width: calc(100% - 180px);
}
.customer-care-form .customer-normal-input .el-date-editor {
  width: calc(100% - 180px) !important;
}
.customer-care-form .customer-normal-input .el-input--mini .el-input__inner {
  height: 38px;
  line-height: 38px;
}
.customer-care-form .save-button {
  width: 80px;
  text-align: center;
}
.customer-care-table {
  padding: 0 20px;
}
.customer-care-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
  font-size: 14px;
}
.customer-care-table .table-text {
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #000728;
}
.old-row {
  background-color: #e8f3ff !important;
}
</style>

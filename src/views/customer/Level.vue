<template>
  <div class="customer-common customer-level frame-content-common-2022">
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Thông tin khách hàng</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-1">
      <div class="item-search">
        <el-select
          v-model="value"
          placeholder="Lựa chọn cấp độ"
          class="frame-select-common-2022"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-select
          v-model="value"
          placeholder="Kho hàng"
          class="frame-select-common-2022"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Mã tài khoản"
          v-model="input"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Email"
          v-model="input"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-input
          placeholder="Số điện thoại"
          v-model="input"
          class="frame-input-common-2022"
          size="mini"
          clearable
        ></el-input>
      </div>
      <div class="item-search">
        <el-select
          v-model="value"
          placeholder="Chọn tỉnh/tp"
          class="frame-select-common-2022"
          popper-class="frame-select-popper-common-2022"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Cấp độ</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-2">
      <el-radio-group v-model="radio1" size="large" border>
        <el-radio-button label="Tiềm năng" />
        <el-radio-button label="Cấp 1" />
        <el-radio-button label="Cấp 2" />
        <el-radio-button label="Cấp 3" />
        <el-radio-button label="Cấp 4" />
        <el-radio-button label="Cấp 5" />
      </el-radio-group>
    </div>
    <div
      class="frame-btn-customer-td-2022 d-flex justify-content-center align-items-center my-2 search-button"
    >
      <span> Tìm kiếm </span>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Thống kê</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-3">
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Hôm nay</span>
        <span class="count">5689</span>
      </div>
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Tuần nay</span>
        <span class="count">5689</span>
      </div>
      <div class="frame-icon-date-statistic-2022">
        <span class="title">Tháng nay</span>
        <span class="count">5689</span>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="frame-content-title-2022">
        <span>Danh sách khách hàng</span>
      </div>
    </div>
    <div class="customer-common-table customer-common-table-2">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="stt"
          label="STT"
          header-align="center"
          align="center"
          min-width="50"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="Cấp độ"
          min-width="200"
        >
          <template slot-scope="scope">
            <div class="d-flex align-items-center">
              <el-rate v-model="scope.row.level" disabled></el-rate>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="Mã khách hàng"
          header-align="center"
          align="center"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="Họ tên"
          header-align="center"
          align="center"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="Số điện thoại"
          header-align="center"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="Địa chỉ"
          header-align="center"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="Tổng đơn"
          header-align="center"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <span class="count-green">{{ scope.row.ordercount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Tổng giá trị đặt hàng"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <span class="count-green">{{ scope.row.ordertotal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="Ngày đặt gần nhất"
          header-align="center"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="history"
          label="Lịch sử chăm sóc"
          header-align="center"
          align="center"
          width="200"
        >
          <template>
            <div class="d-flex flex-row table-text">
              <div
                class="customer-list-action d-flex flex-row align-items-center mr-2"
              >
                <img
                  src="@/static/icon/action/comment.svg"
                  alt=""
                  class="mr-1"
                />
                <span class="comment-count"> 0 </span>
              </div>
              <div
                class="customer-list-action d-flex flex-column align-items-center"
              >
                <img src="@/static/icon/action/add-blue.svg" alt="" />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="d-flex justify-content-between">
      <div class="page-count-common-2022">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="10"></el-radio-button>
          <el-radio-button label="20"></el-radio-button>
          <el-radio-button label="50"></el-radio-button>
          <el-radio-button label="100"></el-radio-button>
        </el-radio-group>
      </div>
      <el-pagination background layout="prev, pager, next" :total="300">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerLevel",
  metaInfo() {
    return {
      title: "Cấp độ",
    };
  },
  data() {
    return {
      options: [
        {
          value: "Cấp độ 1",
          label: "Cấp độ 1",
        },
        {
          value: "Cấp độ 2",
          label: "Cấp độ 2",
        },
      ],
      value: "",
      input: "",
      value1: "",
      value2: "",
      radio1: 10,
      star: 3,
      tableData: [
        {
          stt: 1,
          level: 2,
          username: "u0363688992",
          name: "Nguyễn Văn C",
          phone: "0363688992",
          address: "Hồ Chí Minh",
          ordercount: "228",
          ordertotal: "31.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 2,
          level: 2,
          username: "u0363688992",
          name: "Nguyễn Văn C",
          phone: "0363688992",
          address: "Hồ Chí Minh",
          ordercount: "228",
          ordertotal: "31.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 3,
          level: 2,
          username: "u0363688992",
          name: "Nguyễn Văn C",
          phone: "0363688992",
          address: "Hồ Chí Minh",
          ordercount: "228",
          ordertotal: "31.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 4,
          level: 2,
          username: "u0363688992",
          name: "Nguyễn Văn C",
          phone: "0363688992",
          address: "Hồ Chí Minh",
          ordercount: "228",
          ordertotal: "31.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 5,
          level: 2,
          username: "u0363688992",
          name: "Nguyễn Văn C",
          phone: "0363688992",
          address: "Hồ Chí Minh",
          ordercount: "228",
          ordertotal: "31.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped></style>
<style>
.customer-common-table-2 .table-text img {
  width: 20px;
}
.input-seach-wrap-2
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  color: #fff;
  background-color: #f09920;
  border: 0.5px solid #f09920 !important;
  margin-right: 5px;
  box-shadow: none;
}
.input-seach-wrap-2 .el-radio-button:first-child .el-radio-button__inner {
  border: 0.5px solid #409eff;
  border-radius: 4px;
}
.el-radio-button__inner {
  border: 0.5px solid #409eff !important;
  margin-right: 5px;
  border-radius: 4px !important;
  color: #409eff;
  font-size: 12px;
}
.search-button {
  width: 120px;
}
</style>

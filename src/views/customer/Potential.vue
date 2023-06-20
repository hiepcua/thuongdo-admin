<template>
  <div class="customer-common customer-potential frame-content-common-2022">
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
      <div class="item-search item-search-date">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="Từ ngày"
          class="frame-date-common-2022"
          size="mini"
          clearable
          popper-class="frame-date-popper-common-2022"
        >
        </el-date-picker>
      </div>
      <div class="item-search item-search-time">
        <el-time-select
          v-model="value2"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="Giờ phút"
          class="frame-time-common-2022"
          size="mini"
          clearable
          popper-class="frame-time-popper-common-2022"
        >
        </el-time-select>
      </div>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Cấp độ</span>
    </div>
    <div class="d-flex flex-wrap input-seach-wrap-2">
      <div class="item-search">
        <el-select
          v-model="value"
          placeholder="Chọn nhãn"
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
          placeholder="Chọn loại hình"
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
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Nhân viên chăm sóc"
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
          placeholder="Nhân viên tư vấn"
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
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Nhân viên kinh doanh"
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
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Lựa chọn danh mục kiện hàng"
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
    <div class="d-flex flex-wrap input-seach-wrap-3">
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Số hàng đặt gần nhất"
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
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Loại khách hàng"
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
      <div class="item-search item-search-2">
        <el-select
          v-model="value"
          placeholder="Chọn nhãn chăm sóc"
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
      <div class="item-search item-search-3">
        <el-select
          v-model="value"
          placeholder="Chọn lý do đóng tài khoản"
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
        <span>Tiềm năng</span>
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
          width="50"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="Cấp độ"
          width="200"
        >
          <template slot-scope="scope">
            <div class="d-flex align-items-center">
              <el-rate v-model="star" disabled></el-rate>
              <span class="vip-icon">{{ scope.row.level }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="Tên đăng nhập"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="Họ tên"
          header-align="center"
          align="center"
          width="200"
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
          label="Tổng tiền"
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
      <el-pagination background layout="prev, pager, next" :total="200">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerPotential",
  metaInfo() {
    return {
      title: "Tiềm năng",
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
      star: 5,
      tableData: [
        {
          stt: 1,
          level: "pro",
          username: "u09779999999",
          name: "Nguyễn Văn B",
          phone: "09779999999",
          address: "Long Biên - Hà Nội",
          ordercount: "300",
          ordertotal: "25.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 2,
          level: "pro",
          username: "u09779999999",
          name: "Nguyễn Văn B",
          phone: "09779999999",
          address: "Long Biên - Hà Nội",
          ordercount: "300",
          ordertotal: "25.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 3,
          level: "pro",
          username: "u09779999999",
          name: "Nguyễn Văn B",
          phone: "09779999999",
          address: "Long Biên - Hà Nội",
          ordercount: "300",
          ordertotal: "25.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 4,
          level: "pro",
          username: "u09779999999",
          name: "Nguyễn Văn B",
          phone: "09779999999",
          address: "Long Biên - Hà Nội",
          ordercount: "300",
          ordertotal: "25.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
        {
          stt: 5,
          level: "pro",
          username: "u09779999999",
          name: "Nguyễn Văn B",
          phone: "09779999999",
          address: "Long Biên - Hà Nội",
          ordercount: "300",
          ordertotal: "25.500.000.000đ",
          date: "08-05-2022",
          history: "",
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped></style>

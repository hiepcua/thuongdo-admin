<template>
  <div class="by-time">
    <div class="list-tap">
      <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="clearOrder = !clearOrder">
        <img src="@/static/icon/trash/list/by-time/tic_3.svg" v-if="clearOrder == true" />
        <img src="@/static/icon/trash/list/by-time/tic_4.svg" v-else/>
        <span>Xóa đơn hàng</span>
      </div>
      <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="clearPack = !clearPack">
        <img src="@/static/icon/trash/list/by-time/tic_3.svg" v-if="clearPack == true"  />
        <img src="@/static/icon/trash/list/by-time/tic_4.svg" v-else/>
        <span>Xóa kiện hàng</span>
      </div>
      <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="clearAllKeepBalance = !clearAllKeepBalance">
        <img src="@/static/icon/trash/list/by-time/tic_3.svg" v-if="clearAllKeepBalance == true"  />
        <img src="@/static/icon/trash/list/by-time/tic_4.svg" v-else/>
        <span>Xóa tất cả để số dư hiện tại</span>
      </div>
      <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="clearAll = !clearAll">
        <img src="@/static/icon/trash/list/by-time/tic_3.svg" v-if="clearAll == true"  />
        <img src="@/static/icon/trash/list/by-time/tic_4.svg" v-else/>
        <span>Xóa tất cả</span>
      </div>
    </div>
    <div class="search-wrap">
      <div class="search-filter d-flex align-items-center">
        <span class="title">Chọn thời gian</span>
        <div>
          <el-date-picker
            v-model="filter.date_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-model="filter.date_to"
            type="date"
            placeholder="Đến ngày"
            class="frame-date-common-2022 v2"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div>
          <span
            class="btn-crud-2022 frame-hover-2022 btn-info btn-search"
            :class="loading ? 'disable' : ''"
            @click="seachTrash()"
            >
              <span v-if="loading">
                <i class="el-icon-loading"></i>
              </span>
              <span>Lọc khách hàng</span>
          </span>
        </div>
      </div>
      <div class="search-result">
        <span>Danh sách khách hàng xóa dữ liệu: <span class="count">{{ arr_customer_id.length }} khách hàng</span></span>
      </div>
      <div class="search-data">
        <div class="table-element-custom-2022-v2 fund-transaction-list-table mt-3">
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            border
            v-loading="loading"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
          >
          <el-table-column
            type="selection"
            align="center"
            header-align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="STT"
            type="index"
            width="50"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="Tên khách hàng"
            align="center"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Mã khách hàng"
            align="center"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Số điện thoại"
            align="center"
            header-align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.phone_number }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      </div>
      <div class="china-panigation-1988 d-flex justify-content-end pt-3">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagination.per_page"
          :total="pagination.total"
          :current-page="filter.page"
          @current-change="changeCurrentPage"
        >
        </el-pagination>
      </div>
    </div>

    <div class="search-action">
      <div>
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success"
          :class="!canSubmit ? 'disable' : ''"
          @click="submitForm()"
          >
            <span v-if="!canSubmit">
              <i class="el-icon-loading"></i>
            </span>
            <span>Xóa dữ liệu</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ByTime',
  data () {
    return {
      loading: false,
      canSubmit: true,
      filter: {
        date_from: null,
        date_to: null,
        page: 1,
        per_page: 15,
      },

      // Phần hiển thị
      tableData: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },

      clearOrder: false,
      clearPack: false,
      clearAllKeepBalance: false,
      clearAll: false,

      arr_customer_id: []
    }
  },
  mounted() {

  },
  methods: {
    seachTrash() {
      if (this.filter.date_from == null || this.filter.date_to == null) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn thời gian",
          type: "warning",
        });
        return;
      }

      this.loading = true;
      let filter = {
        page: this.filter.page,
        per_page: this.filter.per_page,
        date_from: this.filter.date_from,
        date_to: this.filter.date_to,
      };

      // Ngày tạo
      filter.date = null;

      if (this.filter.date_from !== null) {
        filter.date = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.date = "2022-01-01," + this.filter.date_to;
      }
      if (this.filter.date_from !== null && this.filter.date_to !== null) {
        filter.date = this.filter.date_from + "," + this.filter.date_to;
        const x = new Date(this.filter.date_from);
        const y = new Date(this.filter.date_to);
        if (x > y) {
          this.$message.error(
            "Từ ngày đang lớn hơn đến ngày. Vui lòng chọn lại"
          );
          setTimeout(() => {
            this.filter.date_from = null;
          }, 800);
        }
      }

      axios.get("trash/search", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = parseInt(response.data.pagination.per_page);
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

    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.seachTrash();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },

    handleSelectionChange(val) {
      let temp_arr = [];
      val.forEach((item) => {
        temp_arr.push(item.id);
      })
      this.arr_customer_id = temp_arr;
    },

    submitForm () {
      if (this.arr_customer_id.length == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn ít nhất 1 khách hàng",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;

      let data = {
        arr_customer_id: this.arr_customer_id,
        clear_order: this.clearOrder,
        clear_pack: this.clearPack,
        clear_all_keep_balance: this.clearAllKeepBalance,
        clear_all: this.clearAll,
      };

      axios.post("trash/clear", data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Xóa thành công",
              type: "success",
            });
            this.$refs.multipleTable.clearSelection();
            if (this.clearAll) {
              this.seachTrash();
            }
            this.$emit("clearDone", true);
            break;
          case 422:
            this.$notify({
              title: "Có lỗi xảy ra",
              message: Object.values(response.data)[0],
              type: "warning",
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
    }
  }
}
</script>

<style lang="css" scoped>
.by-time {
  margin-top: 20px;
}
.list-tap, .item-tap {
  display: flex;
  align-items: center;
  user-select: none;
}
.item-tap {
  margin-right: 30px;
  margin-left: 20px;
}
.item-tap img {
  margin-right: 5px;
}

.search-wrap {
  min-height: 100px;
  background: #F6F8FF;
  margin-top: 20px;
  padding: 20px;
}

.search-filter .title {
  margin-right: 10px;
}

.search-result span {
  font-weight: bold;
  color: #000728;
  margin-top: 10px;
  display: inline-block;
}
.search-result .count {
  color: #0688EE;
}

.search-action {
  padding-top: 20px;
  margin-left: 15px;
}
</style>

<template>
  <div class="trash-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/trash/list/by-time/delete2.svg" />
        </span>
        <span class="title">Xóa dữ liệu</span>
      </div>
      <div class="choose-tap">
        <span class="title">Chọn loại dữ liệu</span>
        <div class="list-tap">
          <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="changeTap('time')">
            <img src="@/static/icon/trash/list/by-time/tic_1.svg" v-if="tab == 'time'" />
            <img src="@/static/icon/trash/list/by-time/tic_2.svg" v-else/>
            <span>Chọn thời gian tạo tài khoản</span>
          </div>
          <div class="item-tap frame-hover-2022 frame-poiter-2022" @click="changeTap('customer')">
            <img src="@/static/icon/trash/list/by-time/tic_1.svg" v-if="tab == 'customer'"  />
            <img src="@/static/icon/trash/list/by-time/tic_2.svg" v-else/>
            <span>Theo khách hàng</span>
          </div>
        </div>
      </div>

      <ByTime v-show="tab == 'time'" @clearDone="clearDoneParant" />
      <ByCustomer v-show="tab == 'customer'" @clearDone="clearDoneParant" />

      <div class="trash-history">
        <span class="title">Lịch sử xóa dữ liệu</span>
        <div class="table-element-custom-2022-v2 fund-transaction-list-table mt-3">
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            border
            v-loading="loading"
          >
            <el-table-column
              label="STT"
              type="index"
              width="50"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              label="Thời gian"
              align="left"
              header-align="center"
            >
              <template slot-scope="scope">
                <div class="line-item">
                  <span>{{ scope.row.time }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Người xóa"
              align="left"
              header-align="center"
            >
              <template slot-scope="scope">
                <div class="line-item" v-if="scope.row.staff">
                  <span>{{ scope.row.staff.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Khách hàng bị xóa"
              align="left"
              header-align="center"
            >
              <template slot-scope="scope">
                <div class="line-item" v-for="i in  scope.row.properties.arr_customer" :key="i.id">
                  <span>{{ i.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Dữ liệu bị xóa"
              align="left"
              header-align="center"
            >
              <template slot-scope="scope">
                <div class="line-item" v-for="j in  scope.row.properties.arr_delete" :key="j">
                  <span>{{ j }}</span>
                </div>
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
  </div>
</template>

<script>
import axios from "axios";
import ByCustomer from "@/views/trash/index-components/ByCustomer";
import ByTime from "@/views/trash/index-components/ByTime";
export default {
  name: 'TrashList',
  metaInfo() {
    return {
      title: "Xóa dữ liệu",
    };
  },
  components: {
    ByCustomer,
    ByTime,
  },
  data () {
    return {
      tab: 'customer',

      loading: false,
      filter: {
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
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchFundTransacton();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    changeTap(tab) {
      this.tab = tab
    },

    clearDoneParant() {
      this.fetchFundTransacton();
    },

    fetchFundTransacton() {
      this.loading = true;
      let filter = {
        page: this.filter.page,
        per_page: this.filter.per_page,
      };

      axios.get("trash/get-history", { params: filter }).then((response) => {
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
      this.fetchFundTransacton();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
  }
}
</script>

<style lang="css" scoped>
.choose-tap {
  margin-left: 20px;
}
.choose-tap .title {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
  display: inline-block;
}
.list-tap, .item-tap {
  display: flex;
  align-items: center;
  user-select: none;
}
.item-tap {
  margin-right: 30px;
}
.item-tap img {
  margin-right: 5px;
}

.trash-history {
  padding-top: 35px;
}
.trash-history .title {
  font-weight: 500;
  font-size: 15px;
  color: #000728;
}
</style>

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
        <div class="item-input">
          <el-input
            placeholder="Mã khách hàng"
            v-model="filter.code"
            @keyup.enter.native="seachTrash"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="item-input">
          <el-input
            placeholder="Số điện thoại"
            v-model="filter.phone_number"
            @keyup.enter.native="seachTrash"
            class="frame-input-common-2022"
            size="mini"
            clearable
            type="number"
          ></el-input>
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
              <span>Chọn khách hàng</span>
          </span>
        </div>
      </div>
      <div class="search-data">
        <div class="has-customer" v-if="hasCustomer">
          <span class="title">Thông tin khách hàng xóa dữ liệu</span>
          <div class="item">
            <img src="@/static/icon/trash/list/by-customer/icon1.svg" />
            <span class="name">Tên khách hàng:</span>
            <span>{{ dataCustomer.name }}</span>
          </div>
          <div class="item">
            <img src="@/static/icon/trash/list/by-customer/icon2.svg" />
            <span class="name">Mã khách hàng:</span>
            <span>{{ dataCustomer.code }}</span>
          </div>
          <div class="item">
            <img src="@/static/icon/trash/list/by-customer/icon3.svg" />
            <span class="name">Số điện thoại:</span>
            <span>{{ dataCustomer.phone_number }}</span>
          </div>
        </div>
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
        code: 'KH_202302001',
        phone_number: null,
      },

      // Phần hiển thị
      hasCustomer: false,
      dataCustomer: [],

      clearOrder: false,
      clearPack: false,
      clearAllKeepBalance: false,
      clearAll: false,
    }
  },
  mounted() {

  },
  methods: {
    seachTrash() {
      this.loading = true;
      this.hasCustomer = false;
      let filter = {
        code: this.filter.code,
        phone_number: this.filter.phone_number,
      };

      axios.get("trash/search-one", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Đã tìm thấy khách hàng",
              type: "success",
            });
            this.hasCustomer = response.data.hasCustomer;
            this.dataCustomer = response.data.dataCustomer;
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
      if (this.hasCustomer == false) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Chưa có thông tin khách hàng cần xóa",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;

      let data = {
        arr_customer_id: [this.dataCustomer.id],
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
.search-wrap .item-input {
  margin-right: 5px;
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

.has-customer {
  background: #ECF5FF;
  border: 1px solid #BDD6EE;
  min-height: 50px;
  margin-top: 15px;
  padding: 15px;
}
.has-customer .title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #0688EE;
  margin-bottom: 10px;
  display: inline-block;
}
.has-customer .item {
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}
.has-customer .item img {
  margin-right: 5px;
}
.has-customer .item .name {
  font-weight: bold;
  min-width: 150px;
}
</style>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

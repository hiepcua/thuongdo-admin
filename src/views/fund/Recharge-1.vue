<template>
  <div class="fund-recharge" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/fund-transaction/list/clarity_dollar-bill-solid.svg" />
        </span>
        <span class="title">Nạp tiền ngân hàng Trung Quốc</span>
      </div>
      <div class="fund-recharge-wrap-1 d-flex flex-wrap">
        <div class="item">
          <span class="title">Tổng tệ đổi</span>
          <div class="input">
            <el-input
              placeholder="¥"
              v-model="modelAdd.cn_change"
              class="frame-input-common-2022"
              size="mini"
              clearable
              type="number"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <span class="title">Tỉ giá đổi</span>
          <div class="input">
            <el-input
              placeholder="Nhập"
              v-model="modelAdd.cn_change_ratio"
              class="frame-input-common-2022"
              size="mini"
              clearable
              type="number"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <span class="title">Phí đổi tệ</span>
          <div class="input">
            <el-input
              placeholder="¥"
              v-model="modelAdd.fee_change_cn"
              class="frame-input-common-2022"
              size="mini"
              clearable
              type="number"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <span class="title">Phí đổi VNĐ</span>
          <div class="input">
            <el-input
              placeholder="Nhập"
              v-model="modelAdd.fee_change_vnd"
              class="frame-input-common-2022"
              size="mini"
              clearable
              type="number"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <span class="title">Tổng tiền VNĐ</span>
          <div class="input">
            <el-input
              placeholder=""
              v-model="modelAdd.total_money"
              class="frame-input-common-2022"
              size="mini"
              clearable
              disabled
            ></el-input>
          </div>
        </div>
      </div>
      <div class="fund-recharge-wrap-2 pt-3">
        <div class="table-common" v-loading="loading">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th width="250">Tên quỹ</th>
                <th width="250">Số dư</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in listCategory.arrFundVN" :key="i.name">
                <td>{{ i.name }}</td>
                <td>{{ i.current_balance | vnd }}</td>
                <td>
                  <div class="money-fund">
                    <el-input
                      placeholder="Nhập"
                      v-model="i.money"
                      class="frame-input-common-2022"
                      size="mini"
                      clearable
                      type="number"
                    ></el-input>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="fund-recharge-wrap-3">

        <span class="title">Chuyển vào ngân hàng <span class="important">*</span></span>
        <div class="form-input">
          <el-select
            v-model="modelAdd.fund_id_to"
            placeholder="Chọn"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            size="mini"
            filterable
          >
            <el-option
              v-for="item in listCategory.arrFundCN"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="d-flex pt-2">
        <span
          class="btn-crud-2022 frame-hover-2022"
          :class="[!canSubmit ? 'disable' : '', 'btn-success']"
          @click="submitForm()"
          >
            <span v-if="!canSubmit">
              <i class="el-icon-loading"></i>
            </span>
            <span>Xác nhận</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'FundRecharge',
  metaInfo() {
    return {
      title: "Nạp tiền ngân hàng Trung Quốc",
    };
  },
  data () {
    return {
      loading: false,
      searching: false,
      canSubmit: true,

      listCategory: {},

      // Thêm
      modelAdd: {
        cn_change: "",
        cn_change_ratio: "",
        fee_change_cn: "",
        fee_change_vnd: "",
        total_money: "",
        fund_id_from: [],
        fund_id_to: "",
      },
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchCategory();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    fetchCategory() {
      this.loading = true;
      axios.get("fund_transaction/save-money-recharge-get-category").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
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

    // Tính toán tổng tiền
    caculator() {
      let temp_cn_change = 0;
      let temp_fee_change_cn = 0;
      let temp_fee_change_vnd = 0;
      if (this.modelAdd.cn_change) {
        temp_cn_change = Number.parseFloat(this.modelAdd.cn_change);
      }
      if (this.modelAdd.fee_change_cn) {
        temp_fee_change_cn = Number.parseFloat(this.modelAdd.fee_change_cn);
      }
      if (this.modelAdd.fee_change_vnd) {
        temp_fee_change_vnd = Number.parseFloat(this.modelAdd.fee_change_vnd);
      }
      let total_money = (temp_cn_change + temp_fee_change_cn) * this.modelAdd.cn_change_ratio + temp_fee_change_vnd;

      this.modelAdd.total_money = total_money;
    },

    // Thêm mới
    submitForm() {
      if (this.modelAdd.cn_change == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập tổng tệ đổi",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.cn_change_ratio == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập tỉ giá đổi",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fee_change_cn == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập phí đổi tệ",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fee_change_vnd == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập phí đổi VND",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.fund_id_to == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng chọn chuyển vào ngân hàng nào",
          type: "warning",
        });
        return;
      }

      // Kiểm tra xem đã nhập tiền vào ô fund_id_from chưa
      let arr_fund_id_from = [];
      this.listCategory.arrFundVN.forEach((item) => {
        if (item.money) {
          let temp = {
            id: item.id,
            money: item.money
          }
          arr_fund_id_from.push(temp);
        }
      })
      if (arr_fund_id_from.length == 0) {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập số tiền nạp từ từng quỹ",
          type: "warning",
        });
        return;
      }
      this.modelAdd.fund_id_from = arr_fund_id_from;

      this.canSubmit = false;
      axios.post("fund_transaction/save-money-recharge", this.modelAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm mới thành công",
              type: "success",
            });
            this.$router.push({
              name: "fund-transaction-list-cn",
            });
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
  },
  watch: {
    "modelAdd.cn_change": function () {
      if (this.modelAdd.cn_change < 0) {
        this.modelAdd.cn_change = 1
      }
      if (this.modelAdd.cn_change > 10000000000) {
        this.modelAdd.cn_change = 10000000000;
        this.$message({
          message: 'Số tiền tối đa được nhập là 10 tỉ',
          type: 'warning'
        });
      }
      this.caculator();
    },
    "modelAdd.cn_change_ratio": function () {
      if (this.modelAdd.cn_change_ratio < 0) {
        this.modelAdd.cn_change_ratio = 1
      }
      if (this.modelAdd.cn_change_ratio > 10000000000) {
        this.modelAdd.cn_change_ratio = 10000000000;
        this.$message({
          message: 'Số tiền tối đa được nhập là 10 tỉ',
          type: 'warning'
        });
      }
      this.caculator();
    },
    "modelAdd.fee_change_cn": function () {
      if (this.modelAdd.fee_change_cn < 0) {
        this.modelAdd.fee_change_cn = 1
      }
      if (this.modelAdd.fee_change_cn > 10000000000) {
        this.modelAdd.fee_change_cn = 10000000000;
        this.$message({
          message: 'Số tiền tối đa được nhập là 10 tỉ',
          type: 'warning'
        });
      }
      this.caculator();
    },
    "modelAdd.fee_change_vnd": function () {
      if (this.modelAdd.fee_change_vnd < 0) {
        this.modelAdd.fee_change_vnd = 1
      }
      if (this.modelAdd.fee_change_vnd > 10000000000) {
        this.modelAdd.fee_change_vnd = 10000000000;
        this.$message({
          message: 'Số tiền tối đa được nhập là 10 tỉ',
          type: 'warning'
        });
      }
      this.caculator();
    },
  }
}
</script>

<style lang="css" scoped>
.fund-recharge .btn-crud-2022 {
  margin-left: 0px;
}

.fund-recharge-wrap-1 .item {
  margin-right: 10px;
}
.fund-recharge-wrap-1 .title {
  margin-bottom: 10px;
  display: inline-block;
  color: #000728;
}

.fund-recharge-wrap-2 {
  min-height: 100px;
}
.fund-recharge-wrap-2 .money-fund {
  width: 200px;
}

.fund-recharge-wrap-3 {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.fund-recharge-wrap-3 .important {
  color: red;
  margin-right: 10px;
}
.fund-recharge-wrap-3 .form-input {
  width: 350px;
}
</style>

<style lang="css" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  padding: 10px 2px;
  text-align: center;
  color: #000728;
  border: 1px solid;
}
td {
  padding: 10px 2px;
  text-align: left;
  color: #000728;
  padding-left: 15px;
}
th {
  background: #207CDC;
  color: #fff;
  padding: 10px 0px;
}
td {
  border: 1px solid #BDD6EE;
}
.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #F6F8FF;
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

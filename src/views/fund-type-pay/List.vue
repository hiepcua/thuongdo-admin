<template>
  <div class="fund-transaction-list" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/fund-transaction/list/clarity_dollar-bill-solid.svg" />
        </span>
        <span class="title" @click="initDefault()">Danh sách loại thanh toán</span>
      </div>
      <div class="d-flex flex-wrap">
        <div class="frame-item-filter-2023">
          <el-input
            placeholder="Tên"
            v-model="filter.name"
            @keyup.enter.native="fetchFundTransacton"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="frame-item-filter-2023">
          <el-select
            v-model="filter.type"
            placeholder="Chọn phiếu"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in listCategory.arrTypePay2"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="frame-item-filter-2023">
          <span
            class="btn-crud-2022 frame-hover-2022 btn-info btn-search"
            :class="loading ? 'disable' : ''"
            @click="fetchFundTransacton()"
            >
              <span v-if="loading">
                <i class="el-icon-loading"></i>
              </span>
              <span>Tìm kiếm</span>
          </span>
        </div>
      </div>
      <div class="add-fund-type-pay mt-3">
        <span class="header">Thêm loại thanh toán</span>
        <span class="text-item">Loại phiếu</span>
        <div class="input-item">
          <el-select
            v-model="modelAdd.type"
            placeholder="Chọn phiếu"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            size="mini"
            :disabled="showEdit"
          >
            <el-option
              v-for="item in listCategory.arrTypePay2"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <span class="text-item">Loại thanh toán</span>
        <div class="input-item-2">
          <el-input
              placeholder="Nhập"
              v-model="modelAdd.name"
              class="frame-input-common-2022"
              size="mini"
              clearable
            ></el-input>
        </div>
        <div class="d-flex">
          <span
            class="btn-crud-2022 frame-hover-2022"
            :class="[!canSubmit ? 'disable' : '', showEdit ? 'btn-warning' : 'btn-success']"
            @click="showEdit ? editForm() : submitForm()"
            >
              <span v-if="!canSubmit">
                <i class="el-icon-loading"></i>
              </span>
              <span>Xác nhận</span>
          </span>
          <span
            v-if="showEdit"
            class="btn-crud-2022 frame-hover-2022 btn-goback"
            @click="canceEdit()">
            Hủy bỏ
          </span>
        </div>
      </div>
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
            label="Loại phiếu"
            align="left"
            header-align="center"
            width="200"
          >
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.type_txt }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Nội dung"
            align="left"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="line-item">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thao tác"
            align="center"
            header-align="center"
            width="100"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="item-action" v-if="scope.row.can_edit">
                <el-tooltip class="item" effect="dark" content="Sửa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/edit3.svg" @click="addEdit(scope.row)" />
                </el-tooltip>
              </div>
              <div class="item-action" v-if="scope.row.can_edit">
                <el-tooltip class="item" effect="dark" content="Xóa" placement="top" >
                  <img src="@/static/icon/fund-transaction/list/delete.svg" @click="confirmDeleteModel(scope.row)" />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
export default {
  name: 'FundTypePayList',
  metaInfo() {
    return {
      title: "Danh sách loại thanh toán",
    };
  },
  data () {
    return {
      loading: false,
      searching: false,
      canSubmit: true,
      filter: {
        name: "",
        type: "", // Chọn thu chi
        page: 1,
        per_page: 25,
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

      listCategory: {},
      listBank: [],

      // Thêm mới thanh toán
      dialogAddFundTransaction: false,
      canSubmitAddFundTransaction: true,
      modelAdd: {
        name: "",
        type: ""
      },

      // Edit giao dịch
      showEdit: false
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchCategory();
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
    initDefault() {
      axios.post("fund_type_pay/init-default").then((response) => {
        switch (response.code) {
          case 200:
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
    fetchCategory() {
      axios.get("fund_transaction/get-category-vi").then((response) => {
        switch (response.code) {
          case 200:
            this.listCategory = response.data;
            this.listBank = this.listCategory.arrFund;
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
    fetchFundTransacton() {
      this.loading = true;
      let filter = {
        name: this.filter.name,
        type: this.filter.type,

        page: this.filter.page,
        per_page: this.filter.per_page,
        id_sort: 'desc',
        status: 1,
        hide_type: 'true'
      };

      axios.get("fund_type_pay", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_page;
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

    // Thêm mới
    submitForm() {
      if (this.modelAdd.name == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại thanh toán",
          type: "warning",
        });
        return;
      }
      if (this.modelAdd.type == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại phiếu",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;
      axios.post("fund_type_pay", this.modelAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm loại thanh toán thành công",
              type: "success",
            });
            this.modelAdd.name = "";
            this.fetchFundTransacton();
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

      setTimeout(() => {
        this.canSubmit = true;
      }, 1000)
    },

    // Xóa giao hàng
    confirmDeleteModel(order) {
      this.$confirm("Xác nhận xóa " + order.type_txt + " : " + order.name + " ?", "Cảnh báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.deleteModel(order);
        })
        .catch(() => {});
    },
    deleteModel(order) {
      let dataUpdate = {
        'status': false
      }
      axios.post('fund_type_pay/update-status/' + order.id, dataUpdate).then(response => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: 'Thành công',
              message: 'Xóa bản ghi thành công',
              type: 'success',
              duration: '2000'
            })
            this.fetchFundTransacton();
            break
          default:
            break
        }
      })
    },

    // Đổi trạng thái kích hoạt / không kích hoạt
    changeStatus (model) {
      let dataUpdate = {
        'status': model.status
      }
      axios.post('fund_type_pay/update-status/' + model.id, dataUpdate).then(response => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: 'Thành công',
              message: 'Cập nhật trạng thái thành công',
              type: 'success',
              duration: '2000'
            })
            break
          default:
            this.fetchDatabaseModel()
            break
        }
      })
    },

    addEdit(item) {
      this.showEdit = true;
      this.modelAdd =  JSON.parse(JSON.stringify(item));
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });

      // scroll bottom vues
      // https://stackoverflow.com/questions/50215955/how-scroll-end-page-with-vue-js
      // let elmnt = document.getElementById('ST2022');
      // elmnt.scrollIntoView(false);
    },
    canceEdit () {
      this.showEdit = false;
      this.modelAdd.name = "";
    },

    editForm() {
      if (this.modelAdd.name == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập loại thanh toán",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;
      axios.put("fund_type_pay/" + this.modelAdd.id, this.modelAdd).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Cập nhật loại thanh toán thành công",
              type: "success",
            });
            this.showEdit = false;
            this.modelAdd.name = "";
            this.fetchFundTransacton();
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
  },
  watch: {
    "filter.type": function () {
      this.filter.page = 1;
      this.fetchFundTransacton();
    },
  }
}
</script>

<style lang="css" scoped>
/*Đè nút */
.fund-transaction-list .btn-search {
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
}

.fund-transaction-list-action {
  margin-top: 15px;
}
.fund-transaction-list-action-item {
  padding: 7px 45px 7px 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-right: 10px;
  color: #fff;
}
.fund-transaction-list-action-item img {
  margin-right: 5px;
}

.fund-transaction-list-table .line-item {
  margin-bottom: 1px;
  margin-top: 1px;
}
.fund-transaction-list-table .img-text {
  display: flex;
  align-items: center;
}
.fund-transaction-list-table .img-text img {
  margin-right: 5px;
  margin-bottom: 4px;
}

.fund-transaction-list-table .color-green {
  color: #26B01C;
}
.fund-transaction-list-table .color-red {
  color: #ED1C24;
}
.fund-transaction-list-table .item-action {
  margin-bottom: 4px;
  cursor: pointer;
}


.add-fund-type-pay {
  display: flex;
  align-items: center;
  height: 60px;
  background: #F6F8FF;
  padding-left: 10px;
}
.add-fund-type-pay .header {
  margin-right: 30px;
}
.add-fund-type-pay .text-item {
  margin-right: 10px;
  margin-left: 10px;
}
.add-fund-type-pay .input-item {
  width: 150px;
}
.add-fund-type-pay .input-item-2 {
  width: 350px;
  margin-right: 10px;
}
</style>

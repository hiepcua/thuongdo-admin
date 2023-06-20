<template>
  <div class="fines-list-2022" id="ST2022">
    <div class="order-list-statistic">
      <div class="order-list-statistic-item pt-2">
        <div @click="createFines" class="title">Thêm mới nộp phạt</div>
      </div>
      <div
        class="order-list-statistic-item"
        v-for="item in listCategory"
        :key="item.value"
        @click="changeStatus(item)"
      >
        <span
          class="title"
          :style="{ color: item.value === filter.status ? item.color : '' }"
          >{{ item.name }}</span
        >
        <span
          class="count-status-top-3388"
          :style="{ backgroundColor: item.color }"
          >{{ item.quantity }}</span
        >
      </div>
    </div>
    <div
      class="customer-common customer-list frame-content-common-2022 fineList"
    >
      <div class="title d-flex align-items-center">
        <div class="d-flex justify-content-center align-items-center iconTop">
          <img src="@/static/icon/fines/icon.svg" alt="" />
        </div>
        <span>danh sách nộp phạt</span>
      </div>
      <div class="d-flex flex-wrap input-seach-wrap-1 align-items-center">
        <div class="item-filter item-filter-input">
          <el-input
            placeholder="Mã đơn hàng"
            v-model="filter.order_code"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="item-filter item-filter-input">
          <el-input
            placeholder="Mã đặt hàng"
            v-model="filter.code_po"
            class="frame-input-common-2022"
            size="mini"
            clearable
          ></el-input>
        </div>
        <div class="item-filter">
          <el-select
            placeholder="Chọn nhân viên vi phạm"
            class="frame-input-common-2022"
            popper-class="frame-select-popper-customer-2022"
            clearable
            size="mini"
            v-model="filter.user_id"
          >
            <el-option
              v-for="item in listUser"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item-filter">
          <el-select
            placeholder="Chọn người tạo"
            class="frame-input-common-2022"
            popper-class="frame-select-popper-customer-2022"
            clearable
            size="mini"
            v-model="filter.cause_id"
          >
            <el-option
              v-for="item in listCauses"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item-filter">
          <el-select
            placeholder="Chọn loại nộp phạt"
            class="frame-input-common-2022"
            popper-class="frame-select-popper-customer-2022"
            clearable
            size="mini"
            v-model="filter.type"
          >
            <el-option
              v-for="item in listCommon"
              :key="item.value"
              :value="item.value"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item-search item-search-date">
          <el-date-picker
            v-model="filter.date_from"
            type="date"
            placeholder="Từ ngày"
            class="frame-date-common-2022"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="item-search item-search-date">
          <el-date-picker
            v-model="filter.date_to"
            type="date"
            placeholder="Đến ngày"
            class="frame-date-common-2022"
            size="mini"
            clearable
            popper-class="frame-date-popper-common-2022"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div
          class="d-flex justify-content-center align-items-center btnSearch"
          @click="fetchFines()"
        >
          <span>Tìm kiếm</span>
        </div>
      </div>
      <div class="customer-common-table" v-loading="loading">
        <el-table :data="listFine" style="width: 100%" border>
          <el-table-column
            label="STT"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column label="Ngày tạo" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Đơn hàng/mã vận đơn" width="300">
            <template slot-scope="scope">
              <div class="textTabCell">
                <span class="d-flex align-items-center colorBlue"
                  ><img
                    class="pr-2"
                    src="@/static/icon/fines/done.svg"
                    alt=""
                  />{{ scope.row.info.order_code }} /
                  {{ scope.row.info.bill_code }}</span
                >
                <span class="d-flex align-items-center"
                  ><img
                    class="pr-2"
                    src="@/static/icon/fines/complain.svg"
                    alt=""
                  />Loại nộp phạt: {{ scope.row.type.name }}</span
                >
                <span
                  class="d-flex align-items-center colorBlue"
                  @click="showDetailOrder(scope.row)"
                  ><img
                    class="pr-2"
                    src="@/static/icon/fines/vector.svg"
                    alt=""
                  />Xem chi tiết đơn hàng</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Số tiền" width="110" align="center">
            <template slot-scope="scope">
              <span class="money">{{ scope.row.amount | vnd }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Người tạo">
            <template slot-scope="scope">
              <span>{{ scope.row.cause.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Nhân viên vi phạm">
            <template slot-scope="scope">
              <span>{{ scope.row.user.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Ý kiến" width="155">
            <template slot-scope="scope">
              <span
                class="d-flex comment-fines-2022 align-items-center"
                @click="dialogComment(scope.row)"
              >
                <img src="@/static/icon/fines/chat.svg" alt="" />
                <span>{{ scope.row.comment_number }} ý kiến</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="200" align="center">
            <template slot-scope="scope">
              <!--  -->
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                disabled
                v-if="scope.row.status.value == 'done'"
              >
                <el-option
                  v-for="item in listCategory"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!--  -->
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                disabled
                v-else-if="scope.row.status.value == 'cancel'"
              >
                <el-option
                  v-for="item in listCategory"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!--  -->
              <el-select
                :style="{ backgroundColor: scope.row.status.color }"
                v-model="scope.row.status.value"
                placeholder="chọn trạng thái"
                class="frame-input-common-2022 status-withdrawal-2022"
                popper-class="frame-select-popper-customer-2022"
                @change="updateStatus(scope.row)"
                v-else
              >
                <el-option
                  v-for="item in listCategory"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Thao tác" width="150" align="center">
            <template slot-scope="scope">
              <div
                class="customer-list-action d-flex flex-column align-items-center"
              >
                <el-tooltip placement="top" content="Sửa đổi">
                  <img
                    @click="showUpdate(scope.row)"
                    src="@/static/icon/action/edit.svg"
                    alt=""
                    v-if="scope.row.is_hidden_edit_delete_button == false"
                  />
                </el-tooltip>
                <el-tooltip placement="top" content="Xem chi tiết">
                  <img
                    @click="showDetail(scope.row)"
                    src="@/static/icon/action/detail.svg"
                    alt=""
                  />
                </el-tooltip>
                <!-- <el-tooltip placement="top" content="Hủy">
                  <img
                    @click="confirmCancel(scope.row)"
                    src="@/static/icon/action/delete.svg"
                    alt=""
                    v-if="scope.row.is_hidden_edit_delete_button == false"
                  />
                </el-tooltip> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="china-panigation-1988 d-flex justify-content-end pt-1">
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
        <!-- Xem chi tiết -->
        <el-dialog
          width="40%"
          custom-class="list-fines-dialog-456"
          :visible.sync="dialogFinesVisible"
        >
          <div class="headTitle d-flex align-items-center">
            <img src="@/static/icon/fines/icondetail.svg" alt="" />
            <span>Chi tiết nộp phạt </span>
          </div>
          <div class="content-dialog-fines">
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconcode.svg" alt="" />
              <span class="title_1"
                >Mã đơn hàng/ Mã vận đơn:
                <span class="colorTitle">
                  {{ infoDetail.order_code }} / {{ infoDetail.bill_code }}</span
                ></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconchat.svg" alt="" />
              <span class="title_1"
                >Loại nộp phạt:
                <span class="colorTitle" v-if="listFineDetail.type">
                  {{ listFineDetail.type.name }}
                </span></span
              >
            </div>
            <div class="box-dialog d-flex align-items-center">
              <img src="@/static/icon/fines/iconuser.svg" alt="" />
              <span class="title_1"
                >Nhân viên:
                <span class="colorTitle">
                  {{ userDetail.name }}
                </span></span
              >
            </div>
            <div class="box-dialog">
              <span class="title_1">Nguyên nhân</span>
              <div class="note">
                <span>{{ listFineDetail.reason }}</span>
              </div>
            </div>
            <div class="box-dialog">
              <span class="title_1">Phương án giải quyết</span>
              <div class="note">
                <span>{{ listFineDetail.solution }}</span>
              </div>
            </div>
            <span class="title_1"
              >Số tiền phải nộp:
              <span class="colorRed">{{
                listFineDetail.amount | vnd
              }}</span></span
            >
            <div class="close-doalog-fines d-flex justify-content-end mt-2">
              <span
                @click="closeDetail()"
                class="d-flex justify-content-center align-items-center"
                >Đóng</span
              >
            </div>
          </div>
        </el-dialog>
        <!-- ý kiến --------------------------->
        <el-dialog
          custom-class="list-fines-dialog-456"
          :visible.sync="dialogVisibleComment"
          width="40%"
        >
          <div class="headTitle d-flex align-items-center">
            <img src="@/static/icon/fines/comment.svg" alt="" />
            <span>Ý kiến</span>
          </div>
          <div class="content-dialog-fines">
            <div class="feeddback-common-fines" v-if="tableDataComment">
              <div v-if="tableDataComment == 0" class="py-3">
                <span>Không có dữ liệu</span>
              </div>
              <div class="feedback-list-data" v-else>
                <div
                  class="feedback-item"
                  v-for="(item, index) in tableDataComment"
                  :key="index"
                >
                  <div class="image">
                    <div class="temp">
                      <img
                        class="avatar"
                        :src="item.user.avatar"
                        v-if="item.user.avatar"
                      />
                      <img
                        class="avatar"
                        src="@/static/icon/header-top/account.svg"
                        v-else
                      />
                    </div>
                  </div>
                  <div class="data">
                    <div class="info">
                      <span class="name">{{ item.user.name }}</span>
                      <div class="date d-flex align-items-center">
                        <img src="@/static/icon/fines/icondate.svg" alt="" />
                        <span>{{ item.time }}</span>
                      </div>
                      <div class="content">
                        <span>{{ item.content }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="make-feedback">
                <div>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="Thêm ý kiến"
                    v-model="textarea"
                    size="mini"
                    @keyup.enter.native="sentFeedBack"
                  ></el-input>
                </div>
                <div
                  class="d-flex align-items-center justify-content-end btn-common"
                >
                  <span class="btn-common-cancel" @click="cancelDialog"
                    >Hủy bỏ</span
                  >
                  <span
                    class="btn-common-add"
                    :class="!canSubmit ? 'disable' : ''"
                    @click="sentFeedBack"
                    >Thêm ý kiến</span
                  >
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FinesList",
  metaInfo() {
    return {
      title: "Danh sách nộp phạt",
    };
  },
  components: {},
  data() {
    return {
      dialogFinesVisible: false,
      dialogVisibleComment: false,
      loading: true,
      canSubmit: true,
      textarea: "",
      filter: {
        date_from: null,
        date_to: null,
        order_code: "",
        code_po: "",
        user_id: "",
        cause_id: "",
        type: "",
        // Lọc theo status:
        status: "",
        page: 1,
        per_page: 10,
      },
      // list
      listFine: [],
      listFineDetail: "",
      infoDetail: {},
      userDetail: {},
      listInfo: {},
      tableDataComment: [],
      fineDetailId: "",
      listUser: [],
      listCommon: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0,
      },
      listCauses: [],
      listCategory: [],
    };
  },
  mounted() {
    this.fetchFines();
    this.fetchUser();
    this.fetchCommon();
  },
  methods: {
    // chuyển hướng
    showDetail(row) {
      this.dialogFinesVisible = true;
      axios.get("fine/" + row.id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listFineDetail = response.data;
            this.infoDetail = response.data.info;
            this.userDetail = response.data.user;
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
    closeDetail() {
      this.dialogFinesVisible = false;
    },
    showUpdate(row) {
      this.$router.push({
        name: "fines-update",
        params: { fine_id: row.id },
      });
    },
    dialogComment(row) {
      this.dialogVisibleComment = true;
      this.fineDetailId = row.id;
    },
    cancelDialog() {
      this.dialogVisibleComment = false;
      if (this.dialogVisibleComment == false) {
        this.tableDataComment = [];
      }
      this.textarea = "";
      this.fetchLog();
    },
    createFines() {
      this.$router.push({
        name: "fines-create",
      });
    },
    // Lấy đữ liệu
    fetchCommon() {
      axios.get("common/fine").then((response) => {
        switch (response.code) {
          case 200:
            this.listCommon = response.data.types;
            this.listCauses = response.data.causes;
            this.listCategory = response.data.reports;
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
    fetchUser() {
      axios.get("user/list").then((response) => {
        switch (response.code) {
          case 200:
            this.listUser = response.data;
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
    fetchFines() {
      this.loading = true;
      let filter = {
        order_code: this.filter.order_code,
        code_po: this.filter.code_po,
        user_id: this.filter.user_id,
        cause_id: this.filter.cause_id,
        type: this.filter.type,
        page: this.filter.page,
        status: this.filter.status,
        per_pages: this.filter.per_page,
      };

      filter.created_at = null;

      if (this.filter.date_from !== null) {
        filter.created_at = this.filter.date_from + ",2050-01-01";
      }
      if (this.filter.date_to !== null) {
        filter.created_at = "2022-01-01," + this.filter.date_to;
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
      axios.get("fine", { params: filter }).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listFine = response.data.items;
            this.pagination.total = response.data.pagination.total;
            this.pagination.per_page = response.data.pagination.per_pages;
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
    // Click vào thanh status phía trên
    changeStatus(item) {
      this.filter.status = item.value;
      this.filter.page = 1;
      this.fetchFines();
    },
    // Hủy
    updateStatus(item) {
      this.deleteModel(item);
    },
    deleteModel(item) {
      let data = {
        status: item.status.value,
      };
      axios.patch("fine/status/" + item.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Chuyển trạng thái thành công",
              type: "success",
            });
            this.fetchFines();
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
    // ý kiến
    fetchLog() {
      axios.get("fine/comment/" + this.fineDetailId).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableDataComment = response.data;
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
    sentFeedBack() {
      if (this.textarea == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập thông tin phản hồi",
          type: "warning",
        });
        return;
      }

      this.canSubmit = false;
      let data = {
        content: this.textarea,
        attachments: [],
      };
      axios.post("fine/comment/" + this.fineDetailId, data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.fetchLog();
            this.textarea = "";
            this.fetchFines();
            this.$notify({
              title: "Thành công",
              message: "Thêm phản hồi thành công",
              type: "success",
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
    showDetailOrder(row) {
      this.$router.push({
        name: "order-detail",
        params: { order_id: row.info.order_id },
      });
    },
    // Thay đổi Current Page
    changeCurrentPage(currentPage) {
      this.filter.page = currentPage;
      this.fetchFines();
      document.getElementById("ST2022").scrollIntoView({ behavior: "smooth" });
    },
  },
  watch: {
    fineDetailId: function () {
      this.fetchLog();
    },
    "filter.date_from": function () {
      this.filter.page = 1;
      this.fetchFines();
    },
    "filter.date_to": function () {
      this.filter.page = 1;
      this.fetchFines();
    },
  },
};
</script>

<style lang="css" scoped>
.fineList {
  padding: 23px 20px 20px 20px;
}
.iconTop {
  width: 24px;
  height: 24px;
  background: #e8f3ff;
  border-radius: 4px;
  margin-right: 10px;
}
.fineList .title {
  padding-left: 10px;
}
.fineList .title span {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #0688ee;
}
.input-seach-wrap-1 {
  padding: 20px 10px 0 10px;
}
.item-filter {
  margin-right: 5px;
}
.item-filter-input {
  width: 120px;
}
.btnSearch {
  background: #0688ee;
  border-radius: 5px;
  width: 116px;
  height: 28px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
.customer-list-action img {
  margin-bottom: 10px;
  cursor: pointer;
}
.comment-fines-2022 {
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  color: #0688ee;
  padding: 5px 14px 6px 15px;
  cursor: pointer;
}
.comment-fines-2022 img {
  padding-right: 8px;
}
</style>
<style type="text/css">
.customer-common-table {
  padding-top: 0;
}
.customer-common-table .el-table th.el-table__cell {
  background: #207cdc;
  text-align: center;
}
.money {
  color: #ed1c24;
  text-align: center !important;
}
.customer-common-table .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
/* xem chi tiết  */
.list-fines-dialog-456 {
  border-radius: 10px;
}
.list-fines-dialog-456 .el-dialog__header {
  display: none;
}
.list-fines-dialog-456 .el-dialog__body {
  padding: 0;
}
.headTitle {
  background: #0688ee;
  padding: 11px 0 10px 23px;
  border-radius: 10px 10px 0 0;
}
.headTitle span {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  padding-left: 10px;
}
.content-dialog-fines {
  padding: 13px 24px 25px 22px;
}
.box-dialog {
  padding: 13px 0 16px 0;
}
.content-dialog-fines .title_1 {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.content-dialog-fines img {
  padding-right: 10px;
}
.content-dialog-fines .colorTitle {
  color: #0688ee;
}
.box-dialog .note {
  background: #e8f3ff;
  border: 0.5px solid #3f92d1;
  border-radius: 5px;
  padding: 12px 10px 8px 20px;
  margin-top: 10px;
  height: 60px;
}
.box-dialog .note span {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.close-doalog-fines span {
  background: #26b01c;
  border-radius: 5px;
  width: 101px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
/* ý kiến */
.btn-common {
  margin-top: 14px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
}
.btn-common .btn-common-cancel {
  background: #e8f3ff;
  border-radius: 5px;
  padding: 6px 16px;
  color: #0688ee;
  margin-right: 10px;
  font-weight: 400;
  cursor: pointer;
}
.btn-common .btn-common-add {
  font-weight: 700;
  background: #26b01c;
  border-radius: 5px;
  color: #fff;
  padding: 6px 16px;
  cursor: pointer;
}
.feedback-item .image {
  width: 50px;
  height: 35px;
  display: flex;
}
.feedback-item .image .temp {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
}
.feedback-item .image .temp img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.feedback-item {
  display: flex;
  margin-bottom: 10px;
  margin-right: 5px;
  margin-left: 5px;
}
.feedback-item .data {
  border: 1px solid #e8f3ff;
  border-radius: 0px 20px 20px 20px;
  background: #f7f8ff;
  padding: 8px 10px 15px 14px;
}
.feedback-item .data .name {
  font-weight: 700;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.02em;
  color: #207cdc;
}
.feedback-item .data .date {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #207cdc;
}
.feedback-item .data .content {
  padding-top: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000728;
}
/* Menu top */
/* .order-list-statistic {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-left: 50px;
  padding-right: 40px;
  background-color: #f6f8ff;
  border-bottom: 1px solid #bdd6ee;
}
.order-list-statistic-item {
  margin-right: 20px;
  cursor: pointer;
}
.order-list-statistic-item .title {
  margin-right: 5px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #767676;
} */
.frame-input-common-2022 .el-icon-arrow-up:before {
  content: "\e78f";
  color: #000728;
}
.frame-input-common-2022 .el-icon-arrow-down:before {
  content: "\e790";
  color: #000728;
}
.textTabCell span {
  padding-bottom: 9px;
}
.textTabCell .colorBlue {
  color: #0688ee;
  cursor: pointer;
}
.fine-detail-icon-status-6868amg {
  background-color: #ccc;
  border-radius: 4px;
  padding: 3px 10px;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  user-select: none;
}
.fine-detail-icon-status-6868amg.poiter {
  cursor: pointer;
}
.colorRed {
  color: red;
}
.feedback-list-data {
  height: 300px;
  overflow-y: auto;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #bdd6ee;
}

::-webkit-scrollbar-thumb {
  border-radius: 22px;
  /* background: linear-gradient(left, #fff, #e4e4e4); */
  border: 1px solid #aaa;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

/* ::-webkit-scrollbar-thumb:active {
  background: linear-gradient(left, #22add4, #1e98ba);
} */

::-webkit-scrollbar {
  width: 5px;
}
.status-withdrawal-2022 input {
  font-size: 12px;
  background: none;
  color: #fff;
  border: none !important;
}
.status-withdrawal-2022 .el-input--suffix .el-input__inner {
  height: 30px;
}
.status-withdrawal-2022 .el-input__icon {
  line-height: 30px !important;
}
.status-withdrawal-2022 .el-icon-arrow-up::before {
  color: #fff !important;
}
.status-withdrawal-2022 .el-icon-arrow-down::before {
  color: #fff !important;
}
.status-withdrawal-2022 .el-input.is-disabled .el-input__inner {
  background: none !important;
  color: #fff;
}
.status-withdrawal-2022 .el-input.is-disabled .el-input__suffix {
  display: none !important;
}
</style>

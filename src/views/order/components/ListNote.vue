<template>
  <div class="frame-dialog-no-close-1988 form-note">
    <el-dialog
      top="150px"
      width="750px"
      :close-on-click-modal="false"
      :visible.sync="dialogNoteVisible"
      :show-close="false"
    >
      <div class="header-1988">
        <img src="@/static/icon/order/list/form-note/edit.svg" />
        <span>Ghi chú</span>
      </div>
      <div class="body-1988">
        <span class="title-19122022">Ghi chú cho khách hàng</span>
        <div class="pt-2 pb-3">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Nhập"
            v-model="dialogNoteContent"
          >
          </el-input>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <div class="d-flex">
            <span
              class="btn-common frame-hover-2022 btn-cancel"
              @click="cancelNoteItem()"
              >Hủy bỏ</span
            >
            <span
              class="btn-common frame-hover-2022 btn-success"
              :class="!dialogNoteCanSubmit ? 'disable' : ''"
              @click="actionNoteItem()"
            >
              <span v-if="!dialogNoteCanSubmit">
                <i class="el-icon-loading"></i>
              </span>
              <span>Xác nhận</span>
            </span>
          </div>
        </div>
        <div class="table-element-custom-2022-v2 pt-3">
          <el-table
            :data="itemNoteArr"
            style="width: 100%"
            border
            v-loading="dialogNoteLoading"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column prop="time" label="Ngày" width="160">
            </el-table-column>
            <el-table-column label="Nhân viên" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.subject.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="Nội dung"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrderComponentListNote",
  props: {
    randomOpen: Number,
    noteId: String,
  },
  data() {
    return {
      dialogNoteVisible: false,
      dialogNoteCanSubmit: true,
      dialogNoteLoading: false, // Load dữ liệu thoại thoại
      dialogNoteContent: "",
      itemNote: {},
      itemNoteArr: [], // Mảng lưu các hội thoại của item

      openDialog: 0, // Số này nhẩy thì sẽ bật dialog lên
    };
  },
  methods: {
    // Ghi chú
    showNoteItem(item) {
      this.itemNoteArr = [];
      this.itemNote = item;
      this.dialogNoteVisible = true;
      this.fetchNoteItem();
    },
    cancelNoteItem() {
      this.dialogNoteVisible = false;
      this.dialogNoteContent = "";
    },
    actionNoteItem() {
      if (this.dialogNoteContent == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập ghi chú thông tin về khách hàng",
          type: "warning",
        });
        return;
      }
      this.dialogNoteCanSubmit = false;

      let data = {
        content: this.dialogNoteContent,
      };

      axios.post("note/order-detail/" + this.noteId, data).then((response) => {
        this.dialogNoteCanSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm ghi chú thành công",
              type: "success",
            });
            this.dialogNoteContent = "";
            this.dialogNoteVisible = false;
            this.$emit("addNoteDetailDone", false);
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

    fetchNoteItem() {
      this.dialogNoteLoading = true;
      axios.get("note/order-detail/" + this.noteId).then((response) => {
        this.dialogNoteLoading = false;
        switch (response.code) {
          case 200:
            this.itemNoteArr = response.data;
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
    randomOpen(value) {
      if (this.openDialog != value) {
        this.openDialog = value;
        this.showNoteItem();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.title-19122022 {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
/*/*Đè Dialog form ghi chú*/
.form-note .header-1988 {
  background-color: #0688ee;
}
</style>

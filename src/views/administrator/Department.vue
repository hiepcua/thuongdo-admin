<template>
  <div class="department-component-list">
    <div class="d-flex flex-row">
      <div class="title-icon">
        <img src="@/static/icon/action/department.svg" alt="" />
      </div>
      <div class="title"><span>Danh sách phòng ban</span></div>
    </div>
    <div class="d-flex flex-row justify-content-between py-2">
      <div class="content-left d-flex flex-row">
        <div
          class="d-flex flex-wrap input-seach-wrap-1 justify-content-between"
        >
          <div class="department-total d-flex align-items-center">
            Tổng số phòng ban: <span>{{ total }}</span>
          </div>
          <div class="item-search content-left-item search-by-text">
            <el-input
              v-model="filter.name"
              placeholder="Tìm theo tên"
              class="frame-select-common-2022"
              suffix-icon="el-icon-search"
              @input="search(true)"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="content-right d-flex flex-row">
        <!-- <div
          class="frame-btn-import-td-2022 d-flex justify-content-center align-items-center mr-1"
        >
          <span>Import file</span>
        </div> -->
        <div
          v-if="hasPermission('create-department')"
          class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
          @click="showAddDialog()"
        >
          <span>Thêm phòng ban</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="department-common-table">
        <el-table
          ref="multipleTable"
          :row-class-name="tableRowClassName"
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
            <template slot-scope="scope">
              <div class="department-column-text d-flex flex-column">
                <span>{{ scope.$index + 1 }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="left"
            label="Tên phòng ban"
            width="450"
          >
            <template slot-scope="scope">
              <div class="department-column-text d-flex flex-column">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Chức năng" header-align="center" align="left">
            <template slot-scope="scope">
              <div class="department-column-text d-flex flex-column">
                <span>{{
                  arrayToString(
                    scope.row.roles.length > 0
                      ? scope.row.roles[0].permissions
                      : undefined
                  )
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="Thao tác"
            width="160"
          >
            <template slot-scope="scope">
              <div class="department-list-action d-flex flex-column">
                <div
                  class="d-flex"
                  @click="showEditDialog(scope.row)"
                  v-if="hasPermission('update-department')"
                >
                  <img src="@/static/icon/action/user-blue.svg" alt="" />
                  <span>Sửa thông tin</span>
                </div>
                <div
                  class="d-flex"
                  @click="showDeleteDialog(scope.row)"
                  v-if="hasPermission('delete-department')"
                >
                  <img src="@/static/icon/action/delete-blue.svg" alt="" />
                  <span>Xoá</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="d-flex justify-content-end align-items-center py-2">
        <!-- <div class="page-count-common-2022">
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="10"></el-radio-button>
            <el-radio-button label="20"></el-radio-button>
            <el-radio-button label="50"></el-radio-button>
            <el-radio-button label="100"></el-radio-button>
          </el-radio-group>
        </div> -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="radio1"
          :current-page="currentPage"
          @current-change="changeCurrentPage"
        >
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog
        :visible.sync="dialogAddVisible"
        width="30%"
        title="Thêm phòng ban"
        center
      >
        <div>
          <el-form :model="addForm" :rules="rulesAdd" ref="add-department-form">
            <el-form-item label="Tên phòng ban" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="Tên phòng ban"
              ></el-input>
            </el-form-item>
            <el-form-item label="Chức năng" prop="permissions">
              <div class="item-search content-left-item">
                <el-select
                  v-model="addForm.permissions"
                  placeholder="-- Chọn --"
                  multiple
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.display_name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div
            class="d-flex flex-row justify-content-end align-items-end padding-modal-button"
          >
            <div
              class="frame-btn-import-td-2022 d-flex justify-content-center align-items-center mr-1"
              @click="dialogAddVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
              @click="createDepartment()"
            >
              <span>Thêm phòng ban</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="dialogEditVisible"
        width="30%"
        title="Sửa thông tin phòng ban"
        center
      >
        <div>
          <el-form :model="editForm" :rules="rules" ref="edit-department-form">
            <el-form-item label="Tên phòng ban" prop="name">
              <el-input
                v-model="editForm.name"
                placeholder="Tên phòng ban"
              ></el-input>
            </el-form-item>
            <el-form-item label="Chức năng" prop="permissions">
              <div class="item-search content-left-item">
                <el-select
                  v-model="editForm.permissions"
                  placeholder="-- Chọn --"
                  multiple
                  class="frame-select-common-2022"
                  popper-class="frame-select-popper-common-2022"
                  clearable
                  size="mini"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.display_name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div
            class="d-flex flex-row justify-content-end align-items-end padding-modal-button"
          >
            <div
              class="frame-btn-import-td-2022 d-flex justify-content-center align-items-center mr-1"
              @click="dialogEditVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
              @click="editDepartment()"
            >
              <span>Sửa thông tin</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog-delete-department">
      <el-dialog
        :visible.sync="dialogDeleteVisible"
        width="400px"
        title="Xoá phòng ban"
        center
      >
        <div class="d-flex flex-row dialog-deactive-user">
          <div class="d-flex">
            <img src="@/static/icon/action/trash.svg" alt="" />
          </div>
          <div
            class="d-flex flex-column justify-content-around align-items-start"
          >
            <span class="content">
              Xóa phòng ban khỏi danh sách phòng ban:
            </span>
            <span class="user-name">{{ selectedRow.name }}</span>
          </div>
        </div>
        <template #footer>
          <div class="d-flex flex-row justify-content-center align-items-end">
            <div
              class="d-flex button-cancle justify-content-center align-items-center mr-1"
              @click="dialogDeleteVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex button-submit-delete justify-content-center align-items-center"
              @click="deleteDepartment()"
            >
              <span>Đồng ý</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "DepartmentManagement",
  data() {
    return {
      dialogEditVisible: false,
      dialogAddVisible: false,
      dialogDeleteVisible: false,
      radio1: 15,
      value: "",
      selectedRow: {},
      filter: {
        name: "",
      },
      total: 0,
      currentPage: 1,
      options: [],
      rulesAdd: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên phòng ban",
            trigger: "blur",
          },
        ],
        permissions: [
          {
            required: false,
            message: "Vui lòng chọn phòng ban",
            trigger: "blur",
          },
        ],
      },
      rules: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên phòng ban",
            trigger: "blur",
          },
        ],
        permissions: [
          {
            required: false,
            message: "Vui lòng chọn phòng ban",
            trigger: "blur",
          },
        ],
      },
      addForm: {
        name: "",
        code: "",
        permissions: [],
      },
      editForm: {
        name: "",
        permissions: [],
      },
      tableData: [],
    };
  },
  created() {
    this.getDepartments();
    this.getPermission();
  },
  computed: {
    ...mapGetters("account", ["accountInfo"]),
  },
  methods: {
    hasPermission(permission) {
      let permissions = [];
      this.accountInfo.permissions.forEach((e) => {
        permissions.push(e.name);
      });
      return permissions.includes(permission);
    },
    getDepartments() {
      axios.get("department").then((response) => {
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.total = response.data.pagination.total;
            this.currentPage = response.data.pagination.current_page;
            break;
          default:
            break;
        }
      });
    },
    getPermission() {
      axios
        .get("permission/list", {
          params: {
            except_module_name: "Quản trị",
          },
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              // TODO: Show only Tư vấn khách hàng
              this.options = response.data.filter(
                (i) => i.name == "take-care-customer"
              );

              // Logic mới
              this.options = response.data.filter(
                (i) => i.is_show_department == 1
              );
              break;
            default:
              break;
          }
        });
    },
    arrayToString(array) {
      var res = "";
      if (undefined !== array && array.length > 0) {
        array.forEach((item) => {
          res = res + item.display_name + ", ";
        });
        return res.slice(0, -2);
      }
      return res;
    },
    getPerrmissionValueToArray(array) {
      var res = [];
      if (undefined !== array && array.length > 0) {
        array.forEach((item) => {
          res.push(item.name);
        });
      }
      return res;
    },
    showAddDialog() {
      this.addForm = {
        name: "",
        code: "",
        permissions: [],
      };
      this.dialogAddVisible = true;
      if (this.$refs["add-department-form"]) {
        this.$refs["add-department-form"].resetFields();
      }
    },
    showEditDialog(row) {
      this.selectedRow = row;
      let p = this.getPerrmissionValueToArray(
        row.roles.length > 0 ? row.roles[0].permissions : undefined
      );
      this.editForm = {
        name: row.name,
        permissions: p,
      };
      this.dialogEditVisible = true;
      if (this.$refs["edit-department-form"] != null) {
        this.$refs["edit-department-form"].resetFields();
      }
    },
    showDeleteDialog(row) {
      this.selectedRow = row;
      this.dialogDeleteVisible = true;
    },
    deleteDepartment() {
      axios.delete("department/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá thành công.",
              message: "Phòng ban " + this.selectedRow.name + " đã bị xoá.",
              type: "success",
            });
            this.dialogDeleteVisible = false;
            this.getDepartments();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message:
                response.message !== undefined
                  ? response.message
                  : "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            this.dialogDeleteVisible = false;
            break;
        }
      });
    },
    createDepartment() {
      this.$refs["add-department-form"].validate((valid) => {
        if (valid) {
          axios.post("department", this.addForm).then((response) => {
            switch (response.code) {
              case 200:
                this.$notify({
                  title: "Tạo phòng ban thành công.",
                  message:
                    "Phòng ban " +
                    this.addForm.name +
                    " đã được tạo thành công.",
                  type: "success",
                });
                this.dialogAddVisible = false;
                this.getDepartments();
                break;
              default:
                this.$notify.error({
                  title: "Error",
                  message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                });
                this.dialogAddVisible = false;
                break;
            }
          });
        }
      });
    },
    editDepartment() {
      this.$refs["edit-department-form"].validate((valid) => {
        if (valid) {
          axios
            .put("department/" + this.selectedRow.id, this.editForm)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Sửa thông tin thành công.",
                    message:
                      " Phòng ban " +
                      this.selectedRow.name +
                      " đã được sửa thông tin thành công.",
                    type: "success",
                  });
                  this.dialogEditVisible = false;
                  this.search(false);
                  break;
                default:
                  this.$notify.error({
                    title: "Error",
                    message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                  });
                  this.dialogEditVisible = false;
                  break;
              }
            });
        }
      });
    },
    search(reset) {
      if (reset) {
        this.filter.page = 1;
      }
      axios.get("department", { params: this.filter }).then((response) => {
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.total = response.data.pagination.total;
            this.currentPage = response.data.pagination.current_page;
            break;
          default:
            break;
        }
      });
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "even-row";
      } else {
        return "old-row";
      }
    },
    changeCurrentPage(val) {
      this.currentPage = val;
      this.filter.page = val;
      this.search(false);
    },
  },
};
</script>
<style>
.department-component-list {
  padding: 40px;
}
.department-component-list .title-icon {
  background-color: #e8f3ff;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 10px;
}
.department-component-list .title-icon img {
  width: 12px;
}
.department-component-list .title span {
  font-size: 14px;
  font-weight: 700;
  color: #0688ee;
  text-transform: uppercase;
}
.department-total {
  margin: 0 30px 0 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}
.department-total span {
  padding-left: 5px;
  color: #767676;
  font-size: 14px;
  font-weight: 700;
}
.content-left-item .el-input-group--append .el-input__inner {
  height: 32px;
  width: 177px;
}
.department-component-list .el-input--suffix .el-input__inner {
  height: 32px;
}

.department-component-list .el-input__icon {
  line-height: 32px !important;
}
.department-common-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
}
.department-list-action img {
  padding-right: 5px;
}
.department-list-action span {
  font-weight: 400;
  font-size: 12px;
  color: #207cdc;
  cursor: pointer;
}

/*style modal*/
.department-component-list .el-dialog__header {
  background-color: #207cdc;
  height: 25px;
  text-align: initial;
}

.department-component-list .el-dialog__title {
  color: #fff !important;
  font-size: 16px !important;
}

.department-component-list form .el-input--mini .el-input__inner {
  height: 32px;
  line-height: 28px;
  margin: 0 !important;
}

.department-component-list .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.department-component-list .el-dialog {
  border-radius: 12px;
}
.department-component-list .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
}
.department-component-list .el-form-item__content {
  width: 67%;
  display: inline-block;
}
.department-component-list form .el-select .el-input__inner {
  width: 98%;
}
.department-component-list .el-form-item__content input {
  width: 98%;
  height: 32px;
  display: inline-block;
  border: 0.5px solid #3f92d1 !important;
  border-radius: 5px;
}
.department-component-list
  .el-form-item__content
  input::-webkit-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.department-component-list .el-form-item__content input::-moz-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.department-component-list .el-form-item__content input::-ms-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}

.department-component-list .el-select {
  width: 100%;
}
.button-cancle {
  background: #e8f3ff;
  border-radius: 5px;
  color: #0688ee;
  padding: 5px 20px;
  cursor: pointer;
  height: 30px;
  border: 0.5px solid #3f92d1;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.button-submit {
  background: #0688ee;
  border-radius: 5px;
  color: #fff;
  padding: 5px 20px;
  cursor: pointer;
  height: 30px;
  border: 0.5px solid #3f92d1;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.dialog-delete-department .content {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
}
.dialog-delete-department .user-name {
  color: #767676;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
}
.department-column-text span {
  color: #000728;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

.department-component-list .dialog-delete-department .el-dialog__header {
  background-color: #df4747;
  height: 25px;
  text-align: initial;
}
.department-component-list .dialog-delete-department .el-dialog__body {
  padding: 25px !important;
}
.department-component-list .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 0px 25px;
}
.old-row {
  background-color: #e8f3ff !important;
}
.padding-modal-button {
  padding: 0px 25px;
}
.button-submit-delete {
  background: #df4747;
  border-radius: 5px;
  color: #fff;
  padding: 5px 20px;
  cursor: pointer;
  height: 30px;
  border: 0.5px solid #3f92d1;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.department-component-list .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
  color: #000728;
  font-weight: 400;
}
</style>

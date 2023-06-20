<template>
  <div class="organization-component-list">
    <div class="d-flex flex-row">
      <div class="title-icon">
        <img src="@/static/icon/action/building.svg" alt="" />
      </div>
      <div class="title"><span>Danh sách công ty</span></div>
    </div>
    <div class="d-flex flex-row justify-content-between py-2">
      <div class="content-left d-flex flex-row">
        <div
          class="d-flex flex-wrap input-seach-wrap-1 justify-content-between"
        >
          <div class="organization-total d-flex align-items-center">
            Tổng số công ty: <span>{{ total }}</span>
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
          class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
          @click="showAddForm()"
        >
          <span>Thêm công ty</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="organization-common-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :row-class-name="tableRowClassName"
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
              <div class="organization-column-text d-flex flex-column">
                <span>{{ scope.$index + 1 }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="left"
            label="Tên công ty"
          >
            <template slot-scope="scope">
              <div class="organization-column-text d-flex flex-column">
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Email" header-align="center" align="left">
            <template slot-scope="scope">
              <div class="organization-column-text d-flex flex-column">
                <span>{{ scope.row.email }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Số điện thoại"
            header-align="center"
            align="left"
          >
            <template slot-scope="scope">
              <div class="organization-column-text d-flex flex-column">
                <span>{{ scope.row.phone_number }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="left"
            label="Thao tác"
            width="160"
          >
            <template slot-scope="scope">
              <div class="organization-list-action d-flex flex-column">
                <div class="d-flex" @click="showEditForm(scope.row)">
                  <img src="@/static/icon/action/user-blue.svg" alt="" />
                  <span>Sửa thông tin</span>
                </div>
                <div class="d-flex" @click="showDeleteForm(scope.row)">
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
        title="Thêm công ty"
        center
      >
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="add-organization-form">
            <el-form-item label="Tên công ty" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="Tên công ty"
              ></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone_number">
              <el-input
                v-model="ruleForm.phone_number"
                placeholder="Số điện thoại"
              ></el-input>
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
              @click="createOrganization()"
            >
              <span>Thêm công ty</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="dialogEditVisible"
        width="30%"
        title="Sửa thông tin công ty"
        center
      >
        <div>
          <el-form
            :model="ruleEditForm"
            :rules="rules"
            ref="edit-organization-form"
          >
            <el-form-item label="Tên công ty" prop="name">
              <el-input
                v-model="ruleEditForm.name"
                placeholder="Tên công ty"
              ></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="ruleEditForm.email"
                placeholder="Email"
              ></el-input>
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone_number">
              <el-input
                v-model="ruleEditForm.phone_number"
                placeholder="Số điện thoại"
              ></el-input>
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
              @click="editOrganization()"
            >
              <span>Sửa thông tin</span>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog-delete-organization">
      <el-dialog
        :visible.sync="dialogDeleteVisible"
        width="400px"
        title="Xoá công ty"
        center
      >
        <div class="d-flex flex-row dialog-delete-company">
          <div class="d-flex">
            <img src="@/static/icon/action/trash.svg" alt="" />
          </div>
          <div
            class="d-flex flex-column justify-content-around align-items-start"
          >
            <span class="content"> Xoá công ty :</span>
            <span class="user-name">{{ selectedRow.name }}</span>
          </div>
        </div>
        <template #footer>
          <div
            class="d-flex flex-row justify-content-center align-items-end padding-modal-button"
          >
            <div
              class="d-flex button-cancle justify-content-center align-items-center mr-1"
              @click="dialogDeleteVisible = false"
            >
              <span>Huỷ bỏ</span>
            </div>
            <div
              class="d-flex button-submit-delete justify-content-center align-items-center"
              @click="deleteOrganization()"
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
  name: "OrganizationManagement",
  data() {
    var phoneNumberValidate = (rule, value, callback) => {
      var startNumber = [
        "088",
        "091",
        "094",
        "086",
        "096",
        "097",
        "098",
        "032",
        "033",
        "034",
        "035",
        "036",
        "037",
        "038",
        "039",
        "070",
        "079",
        "077",
        "076",
        "078",
        "083",
        "084",
        "085",
        "081",
        "082",
        "056",
        "058",
        "059",
        "099",
        "092",
        "093",
        "090",
        "089",
      ];
      if (/^[0]\d{9}$/.test(value) && startNumber.includes(value.slice(0, 3))) {
        callback();
      } else {
        callback(new Error("Vui lòng nhập đúng định dạng SĐT."));
      }
    };
    return {
      radio1: 15,
      total: 0,
      dialogEditVisible: false,
      dialogAddVisible: false,
      dialogDeleteVisible: false,
      selectedRow: {},
      currentPage: 1,
      value: "",
      filter: {
        name: "",
      },
      ruleForm: {
        name: "",
        email: "",
        phone_number: "",
      },
      ruleEditForm: {
        name: "",
        email: "",
        phone_number: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên công ty",
            trigger: "blur",
          },
        ],
        phone_number: [
          {
            required: true,
            message: "Vui lòng điền số điện thoại",
            trigger: "blur",
          },
          {
            validator: phoneNumberValidate,
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "Vui lòng nhập email.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email.",
            trigger: ["blur", "change"],
          },
        ],
      },
      tableData: [],
    };
  },
  created() {
    this.getListOrganization();
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
    getListOrganization() {
      axios.get("organization").then((response) => {
        switch (response.code) {
          case 200:
            this.tableData = response.data.items;
            this.total = response.data.pagination.total;
            this.currentPage = response.data.pagination.current_page;
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
    showEditForm(row) {
      this.selectedRow = row;
      this.ruleEditForm = {
        name: row.name,
        email: row.email,
        phone_number: row.phone_number,
      };
      this.dialogEditVisible = true;
    },
    showAddForm() {
      this.ruleForm = {
        name: "",
        email: "",
        phone_number: "",
      };
      if (this.$refs["add-organization-form"]) {
        this.$refs["add-organization-form"].resetFields();
      }
      this.dialogAddVisible = true;
    },
    showDeleteForm(row) {
      this.selectedRow = row;
      this.dialogDeleteVisible = true;
    },
    deleteOrganization() {
      axios.delete("organization/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá thành công.",
              message: "Công ty " + this.selectedRow.name + " đã bị xoá.",
              type: "success",
            });
            this.dialogDeleteVisible = false;
            this.getListOrganization();
            break;
          case 500:
            this.$notify({
              title: "Xoá thất bại",
              message: response.message,
              type: "warning",
            });
            this.dialogDeleteVisible = false;
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
    createOrganization() {
      this.$refs["add-organization-form"].validate((valid) => {
        if (valid) {
          axios.post("organization", this.ruleForm).then((response) => {
            switch (response.code) {
              case 200:
                this.$notify({
                  title: "Tạo công ty thành công.",
                  message:
                    "Công ty " +
                    this.ruleForm.name +
                    " đã được tạo thành công.",
                  type: "success",
                });
                this.dialogAddVisible = false;
                this.getListOrganization();
                break;
              case 422:
                var mess = Object.keys(response.data);
                this.$notify({
                  title: "Tạo công ty thất bại",
                  message: response.data[mess[0]],
                  type: "warning",
                });
                break;
              case 500:
                this.$notify({
                  title: "Tạo công ty thất bại",
                  message: response.data.message,
                  type: "warning",
                });
                break;
              default:
                this.$notify.error({
                  title: "Error",
                  message:
                    response.message !== undefined
                      ? response.message
                      : "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                });
            }
          });
        }
      });
    },
    editOrganization() {
      this.$refs["edit-organization-form"].validate((valid) => {
        if (valid) {
          axios
            .put("organization/" + this.selectedRow.id, this.ruleEditForm)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Sửa thông tin công ty thành công.",
                    message:
                      "Công ty " +
                      this.ruleEditForm.name +
                      " đã sửa thông tin công ty thành công.",
                    type: "success",
                  });
                  this.dialogEditVisible = false;
                  this.search(false);
                  // this.getListOrganization();
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Sửa công ty thất bại",
                    message: response.data[mess[0]],
                    type: "warning",
                  });
                  break;
                default:
                  this.$notify.error({
                    title: "Error",
                    message:
                      response.message !== undefined
                        ? response.message
                        : "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                  });
              }
            });
        }
      });
    },
    search(reset) {
      if (reset) {
        this.filter.page = 1;
      }
      axios.get("organization", { params: this.filter }).then((response) => {
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
.organization-component-list {
  padding: 40px;
}
.organization-component-list .title-icon {
  background-color: #e8f3ff;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 10px;
}
.organization-component-list .title-icon img {
  width: 12px;
}
.organization-component-list .title span {
  font-size: 14px;
  font-weight: 700;
  color: #0688ee;
  text-transform: uppercase;
}
.organization-total {
  margin: 0 30px 0 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}
.organization-total span {
  padding-left: 5px;
  color: #767676;
  font-size: 14px;
  font-weight: 700;
}
.content-left-item .el-input-group--append .el-input__inner {
  height: 32px;
  width: 177px;
}
.organization-component-list .el-input--suffix .el-input__inner {
  height: 32px;
}

.organization-component-list .el-input__icon {
  line-height: 32px !important;
}
.organization-common-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
}
.organization-list-action img {
  padding-right: 5px;
}
.organization-list-action span {
  font-weight: 400;
  font-size: 12px;
  color: #207cdc;
  cursor: pointer;
}

/*style modal*/
.organization-component-list .el-dialog__header {
  background-color: #207cdc;
  height: 25px;
  text-align: initial;
}

.organization-component-list .el-dialog__title {
  color: #fff !important;
  font-size: 16px !important;
}

.organization-component-list .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.organization-component-list .el-dialog {
  border-radius: 12px;
}
.organization-component-list .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
  color: #000728;
  font-weight: 400;
  font-size: 14px;
}
.organization-component-list .el-form-item__content {
  width: 67%;
  display: inline-block;
}
.organization-component-list .el-form-item__content input {
  width: 98%;
  height: 32px;
  display: inline-block;
  border: 0.5px solid #3f92d1 !important;
  border-radius: 5px;
}
.organization-component-list
  .el-form-item__content
  input::-webkit-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.organization-component-list .el-form-item__content input::-moz-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}

.organization-component-list .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 0px 25px;
}

.organization-component-list
  .el-form-item__content
  input::-ms-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}

.organization-column-text span {
  color: #000728;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
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
.organization-component-list .dialog-delete-organization .el-dialog__header {
  background-color: #df4747;
  height: 25px;
  text-align: initial;
}
.padding-modal-button {
  padding: 0px 25px 0px 25px;
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
.dialog-delete-company .content {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
}

.dialog-delete-company .user-name {
  color: #767676;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
}
</style>

<template>
  <div>
    <div v-if="isEditScreen">
      <div class="role-component-list">
        <div class="d-flex flex-row">
          <div class="title-icon">
            <img src="@/static/icon/action/building.svg" alt="" />
          </div>
          <div class="title">
            <span>
              {{ selectedRow.id === undefined ? "Thêm mới" : "Sửa vai trò" }}
            </span>
          </div>
        </div>
        <div class="d-flex py-4">
          <el-form :model="roleForm" :rules="roleFormRule" ref="edit-role-form">
            <el-form-item
              label="Tên quyền"
              prop="display_name"
              class="d-flex flex-row role-input"
            >
              <span v-if="selectedRow.id" class="input-span">
                {{ roleForm.display_name }}
              </span>
              <el-input
                v-else
                v-model="roleForm.display_name"
                placeholder="Nhập"
                class="frame-input-common-2022"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Mô tả"
              prop="description"
              class="d-flex flex-row role-input"
            >
              <span v-if="selectedRow.id" class="input-span">
                {{ roleForm.description }}
              </span>
              <el-input
                v-else
                v-model="roleForm.description"
                placeholder="Nhập"
                class="frame-input-common-2022"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Danh sách quyền"
              prop="permissions"
              class="d-flex flex-row role-tree"
            >
              <div class="d-flex checked-all">
                <el-checkbox v-model="allChecked" @change="handleCheckedAll()">
                  <span>Tất cả quyền</span>
                </el-checkbox>
              </div>
              <el-row>
                <el-col
                  v-for="(module, index) in modules"
                  :key="module.id"
                  :span="8"
                >
                  <div class="d-flex flex-column node">
                    <el-checkbox
                      v-model="module.checked"
                      @change="handleCheckedNode(index)"
                    >
                      {{ module.name }}
                    </el-checkbox>
                    <div class="d-flex flex-column child-node">
                      <el-checkbox-group
                        v-model="roleForm.permissions"
                        @change="handleCheckedChildNode(index)"
                        class="d-flex flex-column"
                      >
                        <el-checkbox
                          v-for="permission in module.children"
                          :key="permission.value"
                          :label="permission.value"
                        >
                          {{ permission.name }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="d-flex flex-row justify-content-end align-items-end">
              <div
                class="d-flex button-cancle justify-content-center align-items-center mr-1"
                @click="isEditScreen = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex button-submit justify-content-center align-items-center"
                @click="onSubmit()"
              >
                <span>
                  {{ selectedRow.id === undefined ? "Thêm" : "Sửa" }}
                </span>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="role-component-list">
        <div class="d-flex flex-row">
          <div class="title-icon">
            <img src="@/static/icon/action/building.svg" alt="" />
          </div>
          <div class="title"><span>Vai trò</span></div>
        </div>
        <div class="d-flex flex-row justify-content-between py-2">
          <div class="content-left d-flex flex-row">
            <div
              class="d-flex flex-wrap input-seach-wrap-1 justify-content-between"
            >
              <div class="role-total d-flex align-items-center">
                Tổng số vai trò: <span>{{ total }}</span>
              </div>
              <div class="item-search content-left-item search-by-text">
                <el-input
                  v-model="filter.display_name"
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
            <div
              class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
              @click="addRole()"
            >
              <span>Thêm mới</span>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="role-common-table">
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
                align="center"
                label="Tên quyền"
                width="450"
              >
                <template slot-scope="scope">
                  <div class="department-column-text d-flex flex-column">
                    <span>{{ scope.row.display_name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Mô tả"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="department-column-text d-flex flex-column">
                    <span>{{ scope.row.description }}</span>
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
                  <div class="role-list-action d-flex flex-column">
                    <div class="d-flex" @click="showEditDialog(scope.row)">
                      <img src="@/static/icon/action/user-blue.svg" alt="" />
                      <span>Phân quyền</span>
                    </div>
                    <div class="d-flex" @click="showDeleteDialog(scope.row)">
                      <img src="@/static/icon/action/delete-blue.svg" alt="" />
                      <span>Xoá</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="d-flex justify-content-end align-items-center py-2">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="radio"
              :current-page="currentPage"
              @current-change="changeCurrentPage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-delete-role">
      <el-dialog
        :visible.sync="dialogDeleteVisible"
        width="400px"
        title="Xoá vai trò"
        center
      >
        <div class="d-flex flex-row dialog-deactive-user">
          <div class="d-flex">
            <img src="@/static/icon/action/trash.svg" alt="" />
          </div>
          <div class="d-flex flex-column">
            <span class="content"> Xoá vai trò :</span>
            <span class="user-name">{{ selectedRow.display_name }}</span>
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
              @click="deleteRole()"
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

export default {
  name: "RoleManagement",
  data() {
    return {
      radio: 15,
      dialogDeleteVisible: false,
      value: "",
      isEditScreen: false,
      selectedRow: {},
      currentPage: 1,
      filter: {
        display_name: "",
        is_department: 0,
        page: 0,
        except_role: "system-admin",
      },
      roleForm: {
        display_name: "",
        description: "",
        permissions: [],
      },
      roleFormRule: {
        display_name: [
          {
            required: true,
            message: "Vui lòng điền tên quyền",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Vui lòng điền mô tả",
            trigger: "blur",
          },
        ],
        permissions: [
          {
            required: false,
            message: "Vui lòng chọn quyền",
            trigger: "blur",
          },
        ],
      },
      total: 0,
      allChecked: false,
      tableData: [],
      totalPermission: 0,
      modules: [],
    };
  },
  created() {
    this.getRoles();
    this.getModules();
  },
  methods: {
    getModules() {
      axios.get("permission/modules").then((response) => {
        switch (response.code) {
          case 200:
            this.allChecked = false;
            this.modules = this.convertTreeData(response.data);
            break;
          default:
            break;
        }
      });
    },
    getRoles() {
      axios
        .get("role", {
          params: this.filter,
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.tableData = response.data.items;
              this.currentPage = response.data.pagination.current_page;
              this.total = response.data.pagination.total;
              break;
            default:
              break;
          }
        });
    },
    search(reset) {
      if (reset) {
        this.filter.page = 1;
      }
      this.getRoles();
    },
    convertTreeData(data) {
      let treeData = [];
      let total = 0;
      if (undefined !== data && data.length > 0) {
        data.forEach((element) => {
          let permissions = element.permissions;
          let childrenPermission = [];
          let listPermission = [];
          if (permissions.length > 0) {
            total = total + permissions.length;
            permissions.forEach((permission) => {
              listPermission.push(permission.name);
              childrenPermission.push({
                id: permission.id,
                name: permission.display_name,
                value: permission.name,
              });
            });
          }
          let checkedValue = this.isIncludeArray(
            listPermission,
            this.roleForm.permissions
          );
          treeData.push({
            id: element.id,
            name: element.name,
            checked: checkedValue,
            list: listPermission,
            children: childrenPermission,
          });
        });
        if (
          this.roleForm.permissions.length === this.totalPermission &&
          this.totalPermission !== 0
        ) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      }
      this.totalPermission = total;
      return treeData;
    },
    changeCurrentPage(val) {
      this.currentPage = val;
      this.filter.page = val;
      this.search(false);
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "even-row";
      } else {
        return "old-row";
      }
    },
    showEditDialog(row) {
      this.selectedRow = row;
      this.isEditScreen = true;
      let permissions = [];
      if (row.permissions.length > 0) {
        row.permissions.forEach((permission) => {
          permissions.push(permission.name);
        });
      }
      this.roleForm = {
        display_name: row.display_name,
        description: row.description,
        permissions: permissions,
      };
      this.getModules();
    },
    showDeleteDialog(row) {
      this.selectedRow = row;
      this.dialogDeleteVisible = true;
    },
    addRole() {
      this.selectedRow = {};
      this.isEditScreen = true;
      this.roleForm = {
        display_name: "",
        description: "",
        permissions: [],
      };
      this.getModules();
    },
    handleCheckedAll() {
      if (this.allChecked) {
        let newArray = [];
        this.modules.forEach((module) => {
          newArray = newArray.concat(module.list);
        });
        for (let i = 0; i < this.modules.length; i++) {
          this.modules[i].checked = true;
        }
        this.roleForm.permissions = newArray;
      } else {
        this.roleForm.permissions = [];
        for (let i = 0; i < this.modules.length; i++) {
          this.modules[i].checked = false;
        }
      }
    },
    handleCheckedNode(index) {
      if (this.modules[index].checked) {
        this.modules[index].children.forEach((child) => {
          this.roleForm.permissions.push(child.value);
          this.roleForm.permissions = [...new Set(this.roleForm.permissions)];
        });
        if (this.roleForm.permissions.length === this.totalPermission) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      } else {
        let newArray = this.removeArray(
          this.roleForm.permissions,
          this.modules[index].list
        );
        this.roleForm.permissions = newArray;
        if (this.roleForm.permissions.length === this.totalPermission) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      }
    },
    handleCheckedChildNode(index) {
      let checked = this.isIncludeArray(
        this.modules[index].list,
        this.roleForm.permissions
      );
      if (checked) {
        this.modules[index].checked = true;
        if (this.roleForm.permissions.length === this.totalPermission) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      } else {
        this.modules[index].checked = false;
        if (this.roleForm.permissions.length === this.totalPermission) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      }
    },
    isIncludeArray(arr, arr2) {
      return arr.every((i) => arr2.includes(i));
    },
    removeArray(arr, arr2) {
      return arr.filter((element) => {
        return !arr2.includes(element);
      });
    },
    onSubmit() {
      this.$refs["edit-role-form"].validate((valid) => {
        if (valid) {
          if (this.roleForm.permissions.length === 0) {
            this.$notify({
              title: "Vui lòng chọn vai trò",
              message: "Bạn không được để trống danh sách quyền.",
              type: "warning",
            });
            return;
          }
          if (this.selectedRow.id !== undefined) {
            axios
              .put("role/" + this.selectedRow.id, this.roleForm)
              .then((response) => {
                switch (response.code) {
                  case 200:
                    this.$notify({
                      title: "Cập nhật quyền thành công.",
                      message:
                        "Vai trò " +
                        this.roleForm.display_name +
                        " đã được sửa quyền thành công.",
                      type: "success",
                    });
                    this.isEditScreen = false;
                    this.search(false);
                    break;
                  case 422:
                    var mess = Object.keys(response.data);
                    this.$notify({
                      title: "Cập nhật quyền thất bại",
                      message: response.data[mess[0]],
                      type: "warning",
                    });
                    this.isEditScreen = false;
                    break;
                  case 500:
                    this.$notify({
                      title: "Cập nhật quyền thất bại",
                      message: response.message,
                      type: "warning",
                    });
                    break;
                  default:
                    this.$notify.error({
                      title: "Error",
                      message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                    });
                    this.isEditScreen = false;
                    this.search(false);
                    break;
                }
              });
          } else {
            axios.post("role/", this.roleForm).then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Thêm vai trò thành công.",
                    message:
                      "Vai trò " +
                      this.roleForm.display_name +
                      " đã được thêm thành công.",
                    type: "success",
                  });
                  this.isEditScreen = false;
                  this.getRoles();
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Thêm vai trò thất bại",
                    message: response.data[mess[0]],
                    type: "warning",
                  });
                  this.isEditScreen = false;
                  break;
                case 500:
                  this.$notify({
                    title: "Thêm vai trò thất bại",
                    message: response.message,
                    type: "warning",
                  });
                  break;
                default:
                  this.$notify.error({
                    title: "Error",
                    message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
                  });
                  this.isEditScreen = false;
                  break;
              }
            });
          }
        }
      });
    },
    deleteRole() {
      axios.delete("role/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá thành công.",
              message:
                "Vai trò " + this.selectedRow.display_name + " đã bị xoá.",
              type: "success",
            });
            this.dialogDeleteVisible = false;
            this.getRoles();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            this.dialogDeleteVisible = false;
            break;
        }
      });
    },
  },
};
</script>
<style>
.role-component-list {
  padding: 40px;
}
.role-component-list .title-icon {
  background-color: #e8f3ff;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 10px;
}
.role-component-list .title-icon img {
  width: 12px;
}
.role-component-list .title span {
  font-size: 14px;
  font-weight: 700;
  color: #0688ee;
  text-transform: uppercase;
}

.role-total {
  margin: 0 30px 0 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}
.role-total span {
  padding-left: 5px;
  color: #767676;
  font-size: 14px;
  font-weight: 700;
}

.role-list-action img {
  padding-right: 5px;
}
.role-list-action span {
  font-weight: 400;
  font-size: 12px;
  color: #207cdc;
  cursor: pointer;
}

/* tree css */
.role-tree .node {
  border: 0.5px solid #bdd6ee;
  padding: 5px 10px;
}

.role-tree .checked-all {
  padding: 0px 10px;
}

.role-tree .child-node {
  padding-left: 36px;
}

.role-tree .child-node .el-checkbox {
  line-height: 30px;
}

.role-tree .el-checkbox__label {
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}

/* style input */
.role-component-list .el-form {
  width: 100%;
}
.role-component-list form .el-form-item__label {
  text-align: left !important;
  width: 140px;
  position: static;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000728;
  padding: 10px 0px !important;
}
.role-tree .el-form-item__content {
  width: 92%;
}
.role-component-list .role-input .el-form-item__content {
  width: 35%;
}
/*style header table*/
.role-common-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
}
.old-row {
  background-color: #e8f3ff !important;
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
.input-span {
  font-weight: 400;
  color: #000728;
}

.dialog-delete-role .el-dialog__header {
  background-color: #df4747;
  height: 25px;
  text-align: initial;
}

.dialog-delete-role el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 0px 25px;
}
.dialog-delete-role .el-dialog__title {
  color: #fff !important;
  font-size: 16px !important;
}
.dialog-delete-role .content {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
}
.dialog-delete-role span {
  padding: 5px 30px;
}
.dialog-delete-role img {
  width: 50px;
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
</style>

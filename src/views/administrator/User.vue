<template>
  <div>
    <div class="user-component-list">
      <div class="d-flex flex-row">
        <div class="title-icon">
          <img src="@/static/images/title/human.png" alt="" />
        </div>
        <div class="title justify-content-center">
          <span>Danh sách nhân viên</span>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between py-2">
        <div class="content-left d-flex flex-row">
          <div
            class="d-flex flex-wrap input-seach-wrap-1 justify-content-between"
          >
            <div class="user-total d-flex align-items-center">
              Tổng số nhân viên: <span>{{ total }}</span>
            </div>
            <div class="item-search content-left-item search-by-text">
              <el-input
                v-model="filter.name"
                placeholder="Tìm theo tên"
                class="frame-input-common-2022"
                suffix-icon="el-icon-search"
                @input="search(true)"
              >
              </el-input>
            </div>
            <div class="item-search content-left-item">
              <el-select
                v-model="filter.department_id"
                placeholder="Bộ phận"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
                @change="search(true)"
              >
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="item-search content-left-item">
              <el-select
                v-model="filter.role_name"
                placeholder="Vai trò"
                class="frame-select-common-2022"
                popper-class="frame-select-popper-common-2022"
                clearable
                size="mini"
                @change="search(true)"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.display_name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="content-right d-flex flex-row">
          <div
            class="frame-btn-import-td-2022 d-flex justify-content-center align-items-center mr-1"
          >
            <span>Import file</span>
          </div>
          <div
            v-if="hasPermission('create-user')"
            class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
            @click="showDialogAddUser()"
          >
            <span>Thêm nhân viên</span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="user-common-table">
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
                <div class="user-list-code d-flex flex-column">
                  <span>{{ scope.$index + 1 }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="left"
              label="Họ và tên"
              width="250"
            >
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Mã nhân viên"
              header-align="center"
              align="left"
              width="160"
            >
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ scope.row.code }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Số điện thoại"
              header-align="center"
              align="left"
            >
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ scope.row.phone_number }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Email" header-align="center" align="left">
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ scope.row.email }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Bộ phận" header-align="center" align="left">
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ getDepartmentValue(scope.row.department_id) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Vai trò" header-align="center" align="left">
              <template slot-scope="scope">
                <div class="user-list-code d-flex flex-column">
                  <span>{{ getRoleValue(scope.row.roles) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Trạng thái"
              header-align="center"
              align="left"
            >
              <template slot-scope="scope">
                <div class="user-list-status d-flex flex-column">
                  <div v-if="scope.row.status == 1" class="active">
                    <span>Đang hoạt động</span>
                  </div>
                  <div v-else class="deactive">
                    <span>Ngưng hoạt động</span>
                  </div>
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
                <div class="user-list-action d-flex flex-column">
                  <div
                    class="d-flex"
                    @click="showDialogEditUser(scope.row)"
                    v-if="hasPermission('update-user')"
                  >
                    <img src="@/static/icon/action/user-blue.svg" alt="" />
                    <span>Sửa thông tin</span>
                  </div>
                  <div v-if="isNotAdmin(scope.row)">
                    <div
                      class="d-flex"
                      v-if="scope.row.status === 1"
                      @click="showDialogDeactiveUser(scope.row)"
                    >
                      <img src="@/static/icon/action/ban.svg" alt="" />
                      <span>Ngưng hoạt động</span>
                    </div>
                    <div
                      v-else
                      class="d-flex"
                      @click="showDialogActiveUser(scope.row)"
                    >
                      <img src="@/static/icon/action/user-blue.svg" alt="" />
                      <span>Kích hoạt</span>
                    </div>
                  </div>
                  <div
                    class="d-flex"
                    @click="showDialogDeleteUser(scope.row)"
                    v-if="hasPermission('delete-user') && isNotAdmin(scope.row)"
                  >
                    <img src="@/static/icon/action/delete-blue.svg" alt="" />
                    <span>Xoá</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="d-flex justify-content-end align-items-cente py-2">
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
          :visible.sync="dialogEditVisible"
          width="30%"
          title="Sửa thông tin nhân viên"
          center
        >
          <div>
            <el-form
              :model="editForm"
              :rules="rulesEditForm"
              ref="edit-user-form"
            >
              <el-form-item label="Tên nhân viên" prop="name">
                <el-input
                  v-model="editForm.name"
                  placeholder="Nhập tên nhân viên"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Số điện thoại" prop="phone_number">
                <el-input
                  v-model="editForm.phone_number"
                  placeholder="Nhập số điện thoại"
                ></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="editForm.email"
                  placeholder="Nhập email"
                  autocomplete="chrome-off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Mật khẩu mới" prop="password">
                <el-input
                  type="password"
                  v-if="!isShowPassword"
                  v-model="editForm.password"
                  placeholder="Nhập mật khẩu mới"
                  autocomplete="chrome-off"
                >
                  <template slot="suffix">
                    <span @click="showPassword()">
                      <img src="@/static/icon/action/eye.svg" alt="" />
                    </span>
                  </template>
                </el-input>
                <el-input
                  v-else
                  type="text"
                  v-model="editForm.password"
                  placeholder="Nhập mật khẩu mới"
                  autocomplete="off"
                >
                  <template slot="suffix">
                    <span @click="showPassword()">
                      <img src="@/static/icon/action/eye.svg" alt="" />
                    </span>
                  </template>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="Mật khẩu" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  placeholder="Nhập mật khẩu"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="Bộ phận" prop="department_id">
                <div class="item-search content-left-item">
                  <el-select
                    v-model="editForm.department_id"
                    placeholder="-- Chọn --"
                    class="frame-select-common-2022"
                    popper-class="frame-select-popper-common-2022"
                    clearable
                    size="mini"
                  >
                    <el-option
                      v-for="item in departmentOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <div class="d-flex flex-row">
                <span class="d-flex el-form-item__label"></span>
                <span class="d-flex text-role">
                  Nhân viên có chức năng tương ứng với bộ phận trực thuộc
                </span>
              </div>
              <el-form-item label="Vai trò" prop="role_id">
                <div class="item-search content-left-item">
                  <el-select
                    v-model="editForm.role_id"
                    placeholder="-- Chọn --"
                    class="frame-select-common-2022"
                    popper-class="frame-select-popper-common-2022"
                    clearable
                    size="mini"
                  >
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.id"
                      :label="item.display_name"
                      :value="item.id"
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
                @click="editUser()"
              >
                <span>Sửa thông tin</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          :visible.sync="dialogCreateVisible"
          width="30%"
          title="Thêm nhân viên"
          center
        >
          <div class="add-user-form">
            <el-form
              :model="addForm"
              :rules="rulesCreateForm"
              ref="add-user-form"
              autocomplete="off"
            >
              <el-form-item label="Tên nhân viên" prop="name">
                <el-input
                  v-model="addForm.name"
                  placeholder="Nhập tên nhân viên"
                  class="frame-input-common-2022"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Số điện thoại" prop="phone_number">
                <el-input
                  v-model="addForm.phone_number"
                  placeholder="Nhập số điện thoại"
                  class="frame-input-common-2022"
                ></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email" autocomplete="off">
                <el-input
                  v-model="addForm.email"
                  placeholder="Nhập email"
                  autocomplete="new-email"
                ></el-input>
              </el-form-item>
              <el-form-item label="Mật khẩu" prop="password">
                <el-input
                  type="password"
                  v-if="!isShowPassword"
                  v-model="addForm.password"
                  placeholder="Nhập mật khẩu"
                  autocomplete="new-password"
                >
                  <template slot="suffix">
                    <span @click="showPassword()">
                      <img src="@/static/icon/action/eye.svg" alt="" />
                    </span>
                  </template>
                </el-input>
                <el-input
                  v-else
                  type="text"
                  v-model="addForm.password"
                  placeholder="Nhập mật khẩu"
                  autocomplete="off"
                >
                  <template slot="suffix">
                    <span @click="showPassword()">
                      <img src="@/static/icon/action/eye.svg" alt="" />
                    </span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Bộ phận" prop="department_id">
                <div class="item-search content-left-item">
                  <el-select
                    v-model="addForm.department_id"
                    placeholder="-- Chọn --"
                    class="frame-select-common-2022"
                    popper-class="frame-select-popper-common-2022"
                    clearable
                    size="mini"
                  >
                    <el-option
                      v-for="item in departmentOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <div class="d-flex flex-row">
                <span class="d-flex el-form-item__label"></span>
                <span class="d-flex text-role">
                  Nhân viên có chức năng tương ứng với bộ phận trực thuộc
                </span>
              </div>
              <el-form-item label="Vai trò" prop="role_id">
                <div class="item-search content-left-item">
                  <el-select
                    v-model="addForm.role_id"
                    placeholder="-- Chọn --"
                    class="frame-select-common-2022"
                    popper-class="frame-select-popper-common-2022"
                    clearable
                    size="mini"
                  >
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.id"
                      :label="item.display_name"
                      :value="item.id"
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
                @click="dialogCreateVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="frame-btn-create-td-2022 d-flex justify-content-center align-items-center"
                @click="addUser()"
              >
                <span>Thêm nhân viên</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
      <div class="dialog-deactive-user-main">
        <el-dialog
          :visible.sync="dialogDeactiveVisible"
          width="400px"
          title="Ngưng hoạt động"
          center
        >
          <div class="d-flex flex-row dialog-deactive-user">
            <div class="d-flex">
              <img src="@/static/icon/action/ban-red.svg" alt="" />
            </div>
            <div class="d-flex flex-column">
              <span class="content">
                Ngưng tạm thời hoạt động của tài khoản nhân viên :
              </span>
              <span class="user-name">{{ selectedRow.name }}</span>
            </div>
          </div>
          <template #footer>
            <div class="d-flex flex-row justify-content-center align-items-end">
              <div
                class="d-flex button-cancle justify-content-center align-items-center mr-1"
                @click="dialogDeactiveVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex button-submit justify-content-center align-items-center"
                @click="deactiveUser()"
              >
                <span>Đồng ý</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          :visible.sync="dialogActiveVisible"
          width="400px"
          title="Kích hoạt"
          center
        >
          <div class="d-flex flex-row dialog-active-user">
            <div class="d-flex">
              <img src="@/static/icon/action/user-blue.svg" alt="" />
            </div>
            <div class="d-flex flex-column">
              <span class="content"> Kích hoạt tài khoản nhân viên :</span>
              <span class="user-name">{{ selectedRow.name }}</span>
            </div>
          </div>
          <template #footer>
            <div class="d-flex flex-row justify-content-center align-items-end">
              <div
                class="d-flex button-cancle justify-content-center align-items-center mr-1"
                @click="dialogActiveVisible = false"
              >
                <span>Huỷ bỏ</span>
              </div>
              <div
                class="d-flex button-submit justify-content-center align-items-center"
                @click="activeUser()"
              >
                <span>Đồng ý</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
      <div class="dialog-deactive-user-main">
        <el-dialog
          :visible.sync="dialogDeleteVisible"
          width="400px"
          title="Xoá tài khoản"
          center
        >
          <div class="d-flex flex-row dialog-deactive-user">
            <div class="d-flex">
              <img src="@/static/icon/action/trash.svg" alt="" />
            </div>
            <div class="d-flex flex-column">
              <span class="content"> Xoá tài khoản nhân viên :</span>
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
                @click="deleteUser()"
              >
                <span>Đồng ý</span>
              </div>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ls from "local-storage";

export default {
  name: "UserManagement",
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
      dialogEditVisible: false,
      dialogCreateVisible: false,
      dialogActiveVisible: false,
      dialogDeactiveVisible: false,
      dialogDeleteVisible: false,
      isShowPassword: false,
      roleOptions: [],
      departmentOptions: [],
      selectedRow: {},
      total: 0,
      value: "",
      currentPage: 1,
      filter: {
        name: "",
        role_name: "",
        department_id: "",
        page: 1,
      },
      addForm: {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        role_id: "",
        department_id: "",
      },
      rulesCreateForm: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên nhân viên",
            trigger: "blur",
          },
          {
            max: 255,
            message: "Tên nhân viên phải nhỏ hơn 256 kí tự",
            trigger: ["blur", "change"],
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
        password: [
          {
            required: true,
            message: "Vui lòng điền mật khẩu.",
            trigger: "blur",
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu phải từ 6 đến 14 kí tự",
            trigger: ["blur", "change"],
          },
        ],
        role_id: [
          {
            required: true,
            message: "Vui lòng chọn vai trò",
            trigger: "change",
          },
        ],
        department_id: [
          {
            required: true,
            message: "Vui lòng chọn phòng ban",
            trigger: "change",
          },
        ],
      },
      editForm: {
        name: "",
        password: "",
        phone_number: "",
        email: "",
        role_id: "",
        department_id: "",
      },
      rulesEditForm: {
        name: [
          {
            required: true,
            message: "Vui lòng điền tên nhân viên",
            trigger: "blur",
          },
          {
            max: 255,
            message: "Tên nhân viên phải nhỏ hơn 256 kí tự",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: false,
            message: "Vui lòng điền mật khẩu.",
            trigger: "blur",
          },
          {
            min: 6,
            max: 14,
            message: "Mật khẩu phải từ 6 đến 14 kí tự",
            trigger: ["blur", "change"],
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
        role_id: [
          {
            required: true,
            message: "Vui lòng chọn vai trò",
            trigger: "change",
          },
        ],
        department_id: [
          {
            required: true,
            message: "Vui lòng chọn phòng ban",
            trigger: "change",
          },
        ],
      },
      tableData: [],
      permission: [],
    };
  },
  created() {
    this.getDepartments();
    this.getRoles();
    this.getUsers();
  },
  computed: {
    ...mapGetters(["path", "full_path"]),
    ...mapGetters("account", ["accountInfo"]),
  },
  methods: {
    hasPermission(permission) {
      let permissions = [];
      if (
        undefined !== this.accountInfo.permissions &&
        this.accountInfo.permissions.length > 0
      ) {
        this.accountInfo.permissions.forEach((e) => {
          permissions.push(e.name);
        });
      }
      return permissions.includes(permission);
    },
    getDepartments() {
      axios.get("department/list").then((response) => {
        switch (response.code) {
          case 200:
            this.departmentOptions = response.data;
            break;
          default:
            break;
        }
      });
    },
    getRoles() {
      axios
        .get("role/list", {
          params: {
            is_department: 0,
            except_role: "system-admin",
          },
        })
        .then((response) => {
          switch (response.code) {
            case 200:
              this.roleOptions = response.data;
              break;
            default:
              break;
          }
        });
    },
    getUsers() {
      axios.get("user").then((response) => {
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
    getRoleValue(data) {
      var res = "";
      if (data != undefined && data.length > 0) {
        data.forEach((element) => {
          res = res + element.display_name + ", ";
        });
        return res.slice(0, -2);
      }
      return res;
    },
    getDepartmentValue(id) {
      var res = "";
      this.departmentOptions.forEach((element) => {
        if (element.id == id) {
          res = element.name;
        }
      });
      return res;
    },
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    showDialogDeactiveUser(row) {
      this.selectedRow = row;
      this.dialogDeactiveVisible = true;
    },
    showDialogActiveUser(row) {
      this.selectedRow = row;
      this.dialogActiveVisible = true;
    },
    showDialogDeleteUser(row) {
      this.selectedRow = row;
      this.dialogDeleteVisible = true;
    },
    showDialogEditUser(row) {
      this.selectedRow = row;
      this.isShowPassword = false;
      this.dialogEditVisible = true;
      this.editForm = {
        name: row.name,
        password: "",
        phone_number: row.phone_number,
        email: row.email,
        role_id: row.roles.length > 0 ? row.roles[0].pivot.role_id : "",
        department_id: row.department_id ? row.department_id : "",
      };
      this.$refs["edit-user-form"].resetFields();
    },
    showDialogAddUser() {
      this.dialogCreateVisible = true;
      this.isShowPassword = false;
      this.addForm = {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        role_id: "",
        department_id: "",
      };
      this.$refs["add-user-form"].resetFields();
    },
    deactiveUser() {
      axios.get("user/active/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Ngưng hoạt động thành công.",
              message:
                "Tài khoản " +
                this.selectedRow.name +
                " đã bị ngưng hoạt động.",
              type: "success",
            });
            this.dialogDeactiveVisible = false;
            this.getUsers();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            this.dialogDeactiveVisible = false;
            break;
        }
      });
    },
    activeUser() {
      axios.get("user/active/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Kích hoạt thành công.",
              message: "Tài khoản " + this.selectedRow.name + "đã hoạt động.",
              type: "success",
            });
            this.dialogActiveVisible = false;
            this.getUsers();
            break;
          default:
            this.$notify.error({
              title: "Error",
              message: "Đã có lỗi xảy ra. Vui lòng liên hệ Admin !",
            });
            this.dialogActiveVisible = false;
            break;
        }
      });
    },
    deleteUser() {
      axios.delete("user/" + this.selectedRow.id).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Xoá thành công.",
              message: "Tài khoản " + this.selectedRow.name + " đã bị xoá.",
              type: "success",
            });
            this.dialogDeleteVisible = false;
            this.getUsers();
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
    editUser() {
      this.$refs["edit-user-form"].validate((valid) => {
        if (valid) {
          axios
            .put("user/" + this.selectedRow.id, this.editForm)
            .then((response) => {
              switch (response.code) {
                case 200:
                  this.$notify({
                    title: "Sửa thông tin thành công.",
                    message:
                      "Tài khoản " +
                      this.selectedRow.name +
                      " đã được sửa thông tin thành công.",
                    type: "success",
                  });
                  this.search(false);
                  this.dialogEditVisible = false;
                  break;
                case 422:
                  var mess = Object.keys(response.data);
                  this.$notify({
                    title: "Sửa thông tin thất bại",
                    message: response.data[mess[0]],
                    type: "warning",
                  });
                  break;
                case 500:
                  this.$notify({
                    title: "Sửa thông tin thất bại",
                    message: response.message,
                    type: "warning",
                  });
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
    addUser() {
      this.$refs["add-user-form"].validate((valid) => {
        if (valid) {
          const token = ls.get("authen", "");
          let organization_id = token.data.user.organization_id;
          this.addForm["organization_id"] = organization_id;
          axios.post("user/", this.addForm).then((response) => {
            switch (response.code) {
              case 200:
                this.$notify({
                  title: "Thành công.",
                  message: "Bạn đã tạo tài khoản thành công.",
                  type: "success",
                });
                this.dialogCreateVisible = false;
                this.getUsers();
                break;
              case 400:
                this.$notify({
                  title: "Tạo tài khoản thất bại.",
                  message: response.errors[0],
                  type: "warning",
                });
                this.dialogCreateVisible = false;
                break;
              case 422:
                var mess = Object.keys(response.data);
                this.$notify({
                  title: "Tạo tài khoản thất bại.",
                  message: response.data[mess[0]],
                  type: "warning",
                });
                break;
              case 500:
                this.$notify({
                  title: "Tạo tài khoản thất bại.",
                  message: response.message,
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
      });
    },
    search(reset) {
      if (reset) {
        this.filter.page = 1;
      }
      axios.get("user", { params: this.filter }).then((response) => {
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
    isNotAdmin(row) {
      if (
        this.accountInfo.roles[0].name === "admin" &&
        row.id === this.accountInfo.id
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style>
/*padding all content 40px*/
.user-component-list {
  padding: 40px;
}

/*style for title*/
.user-component-list .title-icon {
  background-color: #e8f3ff;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 10px;
}
.user-component-list .title-icon img {
  width: 12px;
}
.user-component-list .title span {
  font-size: 14px;
  font-weight: 700;
  color: #0688ee;
  text-transform: uppercase;
}

.content-left {
  width: 70%;
  justify-content: space-between;
  align-items: center;
}

.content-left-item .el-select {
  width: 100%;
}

.content-left-item .el-input--mini .el-input__inner {
  height: 32px;
  width: 132px;
  margin: 0 0 0 10px;
  line-height: 28px;
}
.content-left-item .el-input-group--append .el-input__inner {
  height: 32px;
  width: 177px;
}
.user-total {
  margin: 0 30px 0 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
}
.user-total span {
  padding-left: 5px;
  color: #767676;
  font-size: 14px;
  font-weight: 700;
}
/*style content of last column of table*/
.user-list-action img {
  padding-right: 5px;
}
.user-list-action span {
  font-weight: 400;
  font-size: 12px;
  color: #207cdc;
  cursor: pointer;
}
/*style header table*/
.user-common-table .el-table thead tr th {
  background-color: #207cdc;
  color: #fff;
}
/*style modal*/
.user-component-list .el-dialog__header {
  background-color: #207cdc;
  height: 25px;
  text-align: initial;
}
.user-component-list .el-dialog__title {
  color: #fff !important;
  font-size: 16px !important;
}

.user-component-list .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.user-component-list .el-dialog {
  border-radius: 12px;
}
.user-component-list .el-form-item__label {
  width: 30%;
  display: inline-block;
  text-align: initial;
  color: #000728;
  font-weight: 400;
}
.user-component-list .el-form-item__content {
  width: 67%;
  display: inline-block;
}

.user-component-list
  .frame-select-common-2022
  input::-webkit-input-placeholder {
  font-weight: 300;
  color: #000728;
  font-size: 12px;
}
.user-component-list .el-form-item__content input {
  width: 98%;
  height: 32px;
  display: inline-block;
  border: 0.5px solid #3f92d1 !important;
  border-radius: 5px;
}
.user-component-list .el-form-item__content input::-webkit-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.user-component-list .el-form-item__content input::-moz-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.user-component-list .el-form-item__content input::-ms-input-placeholder {
  font-weight: 300;
  color: #767676;
  font-size: 11px;
}
.user-component-list form .el-input--mini .el-input__inner {
  height: 32px;
  line-height: 28px;
  margin: 0 !important;
}
.user-component-list form .content-left-item .el-select .el-input__inner {
  width: 98%;
}
.user-component-list .el-input--suffix .el-input__inner {
  height: 32px;
}

.user-component-list .el-input__icon {
  line-height: 32px !important;
  color: #3f92d1;
}
.user-component-list .user-list-status .active span {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #26b01c;
  color: #fff;
  border-radius: 7px;
}
.user-component-list .user-list-status .deactive span {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #f09920;
  color: #fff;
  border-radius: 7px;
}
.user-component-list .dialog-deactive-user-main .el-dialog__header {
  background-color: #df4747;
  height: 25px;
  text-align: initial;
}
.user-component-list .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 0px 25px;
}
.dialog-deactive-user span {
  padding: 5px 30px;
}
.dialog-deactive-user .content {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  padding-left: 30px;
  word-break: keep-all;
}
.dialog-deactive-user img {
  width: 50px;
}
.dialog-active-user img {
  width: 50px;
}
.dialog-active-user span {
  padding: 5px 30px;
}
.dialog-active-user .content {
  color: #000728;
  font-weight: 400;
  font-size: 14px;
  word-break: keep-all;
}
.dialog-active-user .user-name {
  color: #767676;
  font-weight: 400;
  font-size: 14px;
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
.el-input__suffix-inner span img {
  width: 15px;
  padding-top: 13px;
  padding-right: 10px;
}
.user-list-code span {
  color: #000728;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.old-row {
  background-color: #e8f3ff !important;
}
.padding-modal-button {
  padding: 0px 25px;
}
.text-role {
  font-style: italic;
  font-weight: 300;
  font-size: 10px;
  line-height: 20px;
  color: #000728;
}
</style>

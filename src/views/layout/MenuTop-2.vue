<template>
  <div class="component-menu-top">
    <div
      class="d-flex flex-row category-menu justify-content-between align-items-center"
    >
      <div class="list-menu d-flex flex-row">
        <div v-for="menu in list" :key="menu.text" class="item-left item-hover">
          <div
            class="menu-item"
            v-if="hasPermission(menu)"
            :class="[moduleIsSelected(menu.url, full_path) ? 'active' : '']"
            @click="nextRouteMenu(menu, menu.url)"
          >
            {{ menu.text }}
          </div>
        </div>
      </div>
      <div class="site-filter d-flex flex-row align-items-center">
        <span>Lọc website</span>
        <div class="item-search content-left-item">
          <el-select
            v-model="value"
            placeholder="-- Chọn --"
            class="frame-select-common-2022"
            popper-class="frame-select-popper-common-2022"
            clearable
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="d-flex subcategory-menu" v-if="subCategoryLength">
      <div v-for="menu in list" :key="menu.text">
        <div
          v-if="moduleIsSelected(menu.url, full_path)"
          class="d-flex flex-row sub-category-menu"
        >
          <div
            v-for="subMenu in menu.subcategory"
            :key="subMenu.text"
            class="item-left item-hover"
          >
            <div
              v-if="hasSubPermission(subMenu)"
              class="sub-menu-item"
              @click.stop="nextRoute(subMenu.name, subMenu.url)"
              :class="[full_path == subMenu.url ? 'sub-menu-active' : '']"
            >
              {{ subMenu.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="topmenuhover">
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "LayoutMenuLeft",
  data() {
    return {
      showText: true,
      showTextSlow: true,
      value: "",
      name: "action",
      topmenuitem: -1,
      options: [],
      list: [
        {
          text: "Khách hàng",
          url: "/customer",
          name: "customer",
          rootPermission: [],
          subcategory: [
            {
              text: "Thêm khách hàng mới",
              url: "/customer/customer-lists/create",
              name: "customer-lists-create",
              rootPermission: "",
              permission: [],
            },
            {
              text: "Danh sách khách hàng",
              url: "/customer/customer-lists",
              name: "customer-lists",
              rootPermission: "",
              permission: [],
            },
            {
              text: "Cấp độ",
              url: "/customer/customer-levels",
              name: "customer-levels",
              rootPermission: "",
              permission: [],
            },
            {
              text: "Giá trị đặt hàng",
              url: "/customer/customer-prices",
              name: "customer-prices",
              rootPermission: "",
              permission: [],
            },
            {
              text: "Tiềm năng",
              url: "/customer/customer-potentials",
              name: "customer-potentials",
              rootPermission: "",
              permission: [],
            },
          ],
        },
        // {
        //   icon: "Purchase",
        //   text: "Khiếu nại",
        //   rootPermission: "list-complain",
        // },
        // {
        //   icon: "Purchase",
        //   text: "Đơn hàng",
        //   rootPermission: "list-bill",
        // },
        // {
        //   icon: "Package",
        //   text: "Kiện hàng",
        //   rootPermission: "list-package",
        // },
        // {
        //   icon: "Back Purchase",
        //   text: "Hoàn tiền",
        //   rootPermission: "list-back-purchase",
        // },
        // {
        //   icon: "Delivery",
        //   text: "Giao hàng",
        //   rootPermission: "back-purchase",
        // },
        // {
        //   icon: "Punished money",
        //   text: "Nộp phạt",
        //   count: 8921,
        // },
        // {
        //   icon: "Report",
        //   text: "Báo cáo",
        //   count: 2452,
        // },
        // {
        //   icon: "Task",
        //   text: "Công việc",
        //   count: 4582,
        //   rootPermission: "list-user",
        // },
        {
          icon: "Administrator",
          text: "Tài khoản",
          name: "administrator",
          url: "/administrator",
          rootPermission: [
            "list-user",
            "list-department",
            "list-organization",
            "list-role",
          ],
          subcategory: [
            {
              text: "Danh sách nhân viên",
              name: "user-management",
              url: "/administrator/user-management",
              rootPermission: "list-user",
              permission: [
                "create-user",
                "update-user",
                "delete-user",
                "list-user",
              ],
            },
            {
              text: "Danh sách phòng ban",
              url: "/administrator/department-management",
              name: "department-management",
              rootPermission: "list-department",
              permission: [
                "create-department",
                "update-department",
                "delete-department",
                "list-department",
              ],
            },
            {
              text: "Danh sách công ty",
              url: "/administrator/organization-management",
              name: "organization-management",
              role: "System Administrator",
              rootPermission: "list-organization",
              permission: [
                "create-organization",
                "update-organization",
                "delete-organization",
                "list-organization",
              ],
            },
            {
              text: "Vai trò",
              url: "/administrator/role-management",
              name: "role-management",
              role: "System Administrator",
              rootPermission: "list-role",
              permission: [
                "create-role",
                "update-role",
                "delete-role",
                "list-role",
              ],
            },
          ],
        },
        // nộp phạt
        {
          text: "Nộp phạt",
          url: "/fines",
          name: "fines",
          rootPermission: [],
          subcategory: [],
        },
        {
          icon: "Complain",
          text: "Khiếu nại",
          name: "complain-list",
          url: "/complain-list",
          rootPermission: [],
          subcategory: [],
        },
        //
        {
          icon: "Order",
          text: "Đơn hàng",
          name: "order-list",
          url: "/order-list",
          rootPermission: [],
          subcategory: [],
        },
        //
        // kiện hàng
        {
          icon: "Pack",
          text: "Kiện hàng",
          name: "pack-list",
          url: "/pack",
          rootPermission: [],
          subcategory: [
            {
              text: "Tất cả",
              name: "pack-list",
              url: "/pack/list",
              rootPermission: "",
              permission: [],
            },
            {
              text: "Thêm mới",
              name: "pack-create",
              url: "/pack/create",
              rootPermission: "",
              permission: [],
            },
          ],
        },
        // Giao hàng
        {
          icon: "Delivery",
          text: "Giao hàng",
          name: "delivery-list",
          url: "/delivery-list",
          rootPermission: [],
          subcategory: [],
        },
        //
        {
          icon: "Ewallet",
          text: "Rút tiền",
          name: "ewallet-list",
          url: "/ewallet-list",
          rootPermission: [],
          subcategory: [],
        },
        //
        {
          icon: "Others",
          text: "Khác",
          name: "others",
          url: "/others",
          rootPermission: [],
          subcategory: [
            {
              text: "Thông tin tài khoản",
              name: "profile-user",
              url: "/others/profile",
              rootPermission: "",
              permission: [],
            },
          ],
        },
        {
          icon: "Fund",
          text: "Tồn quỹ",
          name: "fund-list",
          url: "/fund-list",
          rootPermission: [],
          subcategory: [],
        },
        {
          icon: "FundTransaction",
          text: "Thu chi",
          name: "fund-transaction",
          url: "/fund-transaction",
          rootPermission: [],
          subcategory: [
            {
              text: "Lịch sử thu chi tiền Việt Nam",
              url: "/fund-transaction/list-vn",
              name: "fund-transaction-list-vn",
              rootPermission: "",
              permission: [],
            },
          ],
        },
        {
          icon: "FundTypePay",
          text: "Cấu hình kế toán",
          name: "fund-type-pay",
          url: "/fund-type-pay",
          rootPermission: [],
          subcategory: [
            {
              text: "Danh sách loại thanh toán",
              url: "/fund-type-pay/list",
              name: "fund-type-pay-list",
              rootPermission: "",
              permission: [],
            },
          ],
        },
      ],
      permissionInfo: [],

      // Check Menu có cái category con thì mới cho hiện thị cái Sub
      subCategoryLength: 0,
    };
  },
  created() {
    this.getListOrganization();
    this.getPermissionInfo(this.accountInfo);
  },
  computed: {
    ...mapGetters(["path", "full_path"]),
    ...mapGetters("account", ["accountInfo"]),
  },
  methods: {
    nextRoute(name, full_path) {
      if (this.full_path !== full_path) {
        if (undefined !== name) {
          this.$router.push({ name: name });
        }
      }
    },
    nextRouteMenu(menu, full_path) {
      this.subCategoryLength = menu.subcategory.length;
      if (menu.rootPermission.length === 0) {
        this.$router.push({ name: menu.name });
        return;
      }
      let permissions = [];
      if (
        undefined !== this.accountInfo.permissions &&
        this.accountInfo.permissions.length > 0
      ) {
        this.accountInfo.permissions.forEach((e) => {
          permissions.push(e.name);
        });
      }
      let listRoute = [];
      menu.subcategory.forEach((element) => {
        if (permissions.includes(element.rootPermission)) {
          listRoute.push(element.name);
        }
      });
      if (this.full_path !== full_path) {
        if (undefined !== name) {
          this.$router.push({ name: listRoute[0] });
        }
      }
    },
    moduleIsSelected(modules, path) {
      if (undefined !== path && path.includes(modules)) {
        return true;
      }
      return false;
    },
    getListOrganization() {
      axios.get("organization/list").then((response) => {
        switch (response.code) {
          case 200:
            this.options = response.data;
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
    getPermissionInfo(account) {
      let modules = [];
      account.permissions.forEach((permission) => {
        modules.push(permission.module);
      });
      modules = modules.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === value.place && t.name === value.name
          )
      );
      this.permissionInfo = modules;
      modules.forEach((module, index) => {
        this.permissionInfo[index].permissions = [];
        account.permissions.forEach((permission) => {
          if (permission.module.id === module.id) {
            this.permissionInfo[index].permissions.push(permission.name);
          }
        });
      });
    },
    hasPermission(menu) {
      if (menu.rootPermission.length == 0) {
        return true;
      }
      let permissions = [];
      if (
        undefined !== this.accountInfo.permissions &&
        this.accountInfo.permissions.length > 0
      ) {
        this.accountInfo.permissions.forEach((e) => {
          permissions.push(e.name);
        });
      }
      return permissions.some((r) => menu.rootPermission.includes(r));
    },
    hasSubPermission(subMenu) {
      if (subMenu.rootPermission === "") {
        return true;
      }
      let permissions = [];
      if (
        undefined !== this.accountInfo.permissions &&
        this.accountInfo.permissions.length > 0
      ) {
        this.accountInfo.permissions.forEach((e) => {
          permissions.push(e.name);
        });
      }
      return permissions.includes(subMenu.rootPermission);
    },
  },
};
</script>

<style lang="css" scoped>
.component-menu-top .category-menu {
  background-color: #172259;
  padding-left: 40px;
  padding-right: 40px;
  height: 40px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}
.component-menu-top .subcategory-menu {
  height: 40px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #fff;
  border-bottom: 1px solid #bdd6ee;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}
.component-menu-top .category-menu .menu-item {
  padding: 10px 10px 14px 10px;
  color: #fff;
  font-size: 14px;
}
.component-menu-top .subcategory-menu .sub-menu-item {
  padding: 10px 10px 14px 10px;
  color: #767676;
  font-size: 14px;
  font-weight: 400;
}

.active {
  background: #fff !important;
  color: #000728 !important;
  line-height: 20px;
  font-weight: 400;
}
.sub-menu-active {
  color: #0688ee !important;
  line-height: 20px;
  font-weight: 400;
}
.site-filter span {
  color: #fff;
  padding-right: 10px;
  font-weight: 400;
  font-size: 12px;
}
</style>

<template>
  <div class="component-menu-left">
    <div
      class="name-project d-flex justify-content-between align-items-center"
      :class="[showText == false ? 'name-project-lite' : '']"
    >
      <img
        src="@/static/images/logo/china.svg"
        alt=""
        v-if="showText == true"
        @click="nextRoute('home-index', '/')"
      />
      <div class="toggle-button">
        <img :src="getImgUrl(name)" alt="" @click="toggleMenu()" />
        <img
          class="back"
          src="@/static/icon/menu-left/back.svg"
          alt=""
          @click="toggleMenu()"
        />
      </div>
    </div>
    <div class="list-menu">
      <div
        class="item-left item-hover d-flex justify-content-between align-items-center"
        @click.stop="toggleShowSub()"
      >
        <div
          class="item-name d-flex justify-content-between align-items-center"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="Khách hàng"
            placement="right"
          >
            <img src="@/static/icon/menu-left/Customer.svg" alt="" />
          </el-tooltip>
          <span v-if="showTextSlow">Khách hàng</span>
        </div>
        <div
          v-if="showTextSlow"
          class="item-count d-flex justify-content-between align-items-center"
        >
          <span>1000</span>
          <img src="@/static/icon/menu-left/DropDown.svg" alt="" />
        </div>
      </div>
      <transition name="slide-down">
        <div class="list-sub" v-show="showTextSlow && showSub">
          <div
            class="item-sub item-hover d-flex justify-content-between align-items-center"
            :class="[full_path == '/customer-lists' ? 'active' : '']"
            @click.stop="nextRoute('customer-lists', '/customer-lists')"
          >
            <div class="item-name">
              <span>Danh sách khách hàng</span>
            </div>
            <div
              class="item-count d-flex justify-content-between align-items-center"
            >
              <span>690</span>
            </div>
          </div>
          <div
            class="item-sub item-hover d-flex justify-content-between align-items-center"
            :class="[full_path == '/customer-levels' ? 'active' : '']"
            @click.stop="nextRoute('customer-levels', '/customer-levels')"
          >
            <div class="item-name">
              <span>Cấp độ</span>
            </div>
            <div
              class="item-count d-flex justify-content-between align-items-center"
            >
              <span>578</span>
            </div>
          </div>
          <div
            class="item-sub item-hover d-flex justify-content-between align-items-center"
            :class="[full_path == '/customer-prices' ? 'active' : '']"
            @click.stop="nextRoute('customer-prices', '/customer-prices')"
          >
            <div class="item-name">
              <span>Giá trị đặt hàng</span>
            </div>
            <div
              class="item-count d-flex justify-content-between align-items-center"
            >
              <span>578</span>
            </div>
          </div>
          <div
            class="item-sub item-hover d-flex justify-content-between align-items-center"
            :class="[full_path == '/customer-potentials' ? 'active' : '']"
            @click.stop="
              nextRoute('customer-potentials', '/customer-potentials')
            "
          >
            <div class="item-name">
              <span>Tiềm năng</span>
            </div>
            <div
              class="item-count d-flex justify-content-between align-items-center"
            >
              <span>892</span>
            </div>
          </div>
        </div>
      </transition>
      <div
        class="item-left item-hover d-flex justify-content-between align-items-center"
      >
        <div
          class="item-name d-flex justify-content-between align-items-center"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="Khiếu nại"
            placement="right"
          >
            <img src="@/static/icon/menu-left/Complain.svg" alt="" />
          </el-tooltip>
          <span v-if="showTextSlow">Khiếu nại</span>
        </div>
        <div
          v-if="showTextSlow"
          class="item-count d-flex justify-content-between align-items-center"
        >
          <span>2888</span>
          <img src="@/static/icon/menu-left/DropDown.svg" alt="" />
        </div>
      </div>

      <div
        v-for="menu in list"
        :key="menu.text"
        class="item-left item-hover d-flex justify-content-between align-items-center"
      >
        <div
          class="item-name d-flex justify-content-between align-items-center"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="Khiếu nại"
            placement="right"
          >
            <img :src="getImgUrl(menu.icon)" alt="" />
          </el-tooltip>
          <span v-if="showTextSlow">{{ menu.text }}</span>
        </div>
        <div
          v-if="showTextSlow"
          class="item-count d-flex justify-content-between align-items-center"
        >
          <span>{{ menu.count }}</span>
          <img src="@/static/icon/menu-left/DropDown.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LayoutMenuLeft",
  data() {
    return {
      showText: true,
      showTextSlow: true,
      name: "action",
      showSub: false,
      list: [
        {
          icon: "Purchase",
          text: "Đơn hàng",
          count: 2400,
        },
        {
          icon: "Package",
          text: "Kiện hàng",
          count: 5902,
        },
        {
          icon: "Back Purchase",
          text: "ĐH quay đầu",
          count: 6882,
        },
        {
          icon: "Delivery",
          text: "Giao hàng",
          count: 1299,
        },
        {
          icon: "Punished money",
          text: "Nộp phạt",
          count: 8921,
        },
        {
          icon: "Report",
          text: "Báo cáo",
          count: 2452,
        },
        {
          icon: "Task",
          text: "Công việc",
          count: 4582,
        },
        {
          icon: "Work off",
          text: "Nghỉ phép",
          count: 5189,
        },
        {
          icon: "Help Mail",
          text: "Hòm thư góp ý",
          count: 2529,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["path", "full_path"]),
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context("@/static/icon/menu-left/", false, /\.svg$/);
      return images("./" + pet + ".svg");
    },
    nextRoute(name, full_path) {
      if (this.full_path !== full_path) {
        this.$router.push({ name: name });
      }
    },
    toggleMenu() {
      this.showText = !this.showText;
      this.$emit("toggleMenu", this.showText);
      if (this.showText) {
        setTimeout(() => {
          this.showTextSlow = this.showText;
        }, 150);
      } else {
        this.showTextSlow = this.showText;
      }
    },
    toggleShowSub() {
      this.showSub = !this.showSub;
    },
    goHome() {
      window.location.href = "/";
    },
  },
};
</script>

<style lang="css" scoped>
.component-menu-left {
  height: 100vh;
}
.name-project {
  /*padding: 0px 25px;*/
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #fff;
  padding-right: 0px;
  padding-left: 15px;
  border-bottom: 1px solid #2672ab;
}
.name-project-lite {
  padding-right: 0px;
  justify-content: center !important;
}
.name-project img {
  cursor: pointer;
  padding-top: 5px;
}
.list-menu {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 25px;
}

.item-left {
  height: 40px;
  cursor: pointer;
  transition: all 0.3s;
  color: #fff;
  padding-left: 8px;
  padding-right: 5px;
  font-size: 12px;
  border-radius: 10px;
  margin-top: 5px;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.item-left:active {
  background: #042d3a !important;
}
.item-hover:hover {
  background-color: #0b859f;
}
.item-name img {
  margin-right: 8px;
  width: 18px;
}
.item-name span {
  font-weight: 300;
  letter-spacing: 0.01em;
  font-size: 14px;
}
.item-count span {
  padding: 3px 5px;
  border-radius: 3px;
  background: #cd4b4b;
  font-size: 10px;
  margin-right: 5px;
  min-width: 26px;
  text-align: right;
  letter-spacing: 1px;
}
/*Đè*/
.list-sub {
  padding-top: 5px;
}
.item-sub {
  padding: 5px 8px 8px 8px;
  cursor: pointer;
  border-bottom: 1px solid #dfebed;
}
.item-sub.active {
  background-color: #0b859f;
}
.item-sub .item-name span {
  font-size: 12px;
  color: #fff;
}
.item-sub .item-count span {
  margin-right: 19px;
  color: #fff;
}

/*slide down vuejs site*/
/*https://stackoverflow.com/questions/64184203/vuejs-transition-css-only-slide-down*/
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease-in-out;
}

.slide-down-enter-to,
.slide-down-leave {
  overflow: hidden;
  max-height: 150px;
}

.slide-down-enter,
.slide-down-leave-to {
  overflow: hidden;
  max-height: 0;
}

.toggle-button {
  position: relative;
}
.toggle-button .back {
  position: absolute;
  top: 22px;
  left: 10px;
}
</style>

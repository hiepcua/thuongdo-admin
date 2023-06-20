<template>
  <div id="app">
    <div class="is-login d-flex" v-if="logged && path != 'delivery-note'">
      <div
        class="app-content-right"
        :class="[showText ? 'app-content-right-full' : '']"
      >
        <div class="header-top">
          <header-top></header-top>
        </div>
        <div class="menu-top">
          <menu-top></menu-top>
        </div>
        <div class="content-bottom">
          <transition name="slide-fade">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
    <div class="not-login" v-else>
      <router-view />
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import ls from "local-storage";
import MenuTop from "@/views/layout/MenuTop";
import HeaderTop from "@/views/layout/HeaderTop";
export default {
  name: "App",
  components: {
    // MenuLeft,
    MenuTop,
    HeaderTop,
  },
  computed: {
    ...mapGetters("account", ["logged"]),
    ...mapGetters(["path", "full_path"]),
  },
  data() {
    return {
      showText: true,
    };
  },
  mounted() {
    this.checkLoged();
  },
  methods: {
    ...mapActions("account", ["getAccountInfo"]),
    checkLoged() {
      let authen = ls.get("authen");
      if (!authen) {
        if (this.path !== "register") {
          this.$router.push({ name: "account-login" });
        }
      } else {
        if (!this.logged) {
          this.getAccountInfo();
        }
      }
    },

    toggleMenuParent(value) {
      this.showText = value;
    },
  },
};
</script>

<style>
.app-menu-left {
  min-height: 100vh;
  width: 50px;
  background-color: #015d71;
  transition: 0.3s;
}
.app-content-right {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}
.app-menu-left-full {
  width: 250px;
  transition: 0.3s;
}
.app-content-right-full {
  width: 100%;
  transition: 0.3s;
}
.app-content-right .header-top {
  background-color: #fff;
  height: 40px;
  background-color: #000935;
}
.app-content-right .menu-top {
  /*height: 80px;*/
  z-index: 10;
}
.app-content-right .content-bottom {
  overflow-y: scroll;
  height: calc(100vh - 55px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

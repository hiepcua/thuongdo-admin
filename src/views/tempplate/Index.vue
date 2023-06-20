<template>
  <div class="fund-list" id="ST2022">
    <div class="frame-content-common-2022">
      <span>Danh sách quỹ</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'FunList',
  metaInfo() {
    return {
      title: "Chi tiết kiện hàng",
    };
  },
  data () {
    return {

    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchOrderProduct();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    fetchOrderProduct() {
      this.loading = true;
      axios.get("fund/list").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.tableData = response.data;
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
  }
}
</script>

<style lang="css" scoped>
</style>

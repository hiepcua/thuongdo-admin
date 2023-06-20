<template>
  <div class="pack-detail" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="frame-content-title-2022-v2">
        <span class="img-wrap">
          <img src="@/static/icon/pack/create/icon-1.svg" />
        </span>
        <span class="title">Chi tiết kiện hàng</span>
      </div>
      <TimeLine :packDetail="packDetail" />
      <Table :packDetail="packDetail" />
      <Note :packDetail="packDetail" />
      <Product :packDetail="packDetail" />
      <History :packDetail="packDetail" />
      <div class="d-flex justify-content-end pt-4">
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success"
          @click="goBack()"
        >
          <span>Quay lại</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Product from "@/views/pack/detail-components/Product";
import History from "@/views/pack/detail-components/History";
import Note from "@/views/pack/detail-components/Note";
import Table from "@/views/pack/detail-components/Table";
import TimeLine from "@/views/pack/detail-components/TimeLine";
export default {
  name: "PackDetail",
  metaInfo() {
    return {
      title: "Chi tiết kiện hàng",
    };
  },
  components: {
    Product,
    History,
    Note,
    Table,
    TimeLine,
  },
  data() {
    return {
      loading: true,
      packDetail: {
        info: {},
        category: {},
        costs: {},
        transporter: {},
        receiver: {},
        status: {
          color: "",
        },
        type_of_goods: {},
        statuses: [
          { name: "Chờ xử lý", time: null },
          { name: "Đang về kho TQ", time: null },
          { name: "Đã đến kho TQ", time: null },
          { name: "Đang về VN", time: null },
          { name: "Đến kho VN", time: null },
          { name: "Đã nhận hàng", time: null },
        ],
      },
    };
  },
  mounted() {
    this.scrollTopST();
    this.fetchPack();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    fetchPack(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("package/" + this.$route.params.pack_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.packDetail = response.data;
            break;
          case 500:
            this.$notify({
              title: "Có lỗi xảy ra",
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
    },

    // Back lại trang list
    goBack() {
      this.$router.push({
        name: "pack-list",
      });
    },
  },
};
</script>

<style lang="css" scoped></style>

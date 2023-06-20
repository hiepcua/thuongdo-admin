<template>
  <div class="delivery-note">
    <div class="delivery-note-wrap">
      <div class="delivery-note-1 delivery-note-item">
        <div>
          <span class="code-title">Mã giao hàng: </span>
          <span class="code-number">{{ listDetail.code }}</span>
        </div>
        <div>
          <span>{{ listDetail.date }}</span>
        </div>
      </div>
      <div class="delivery-note-2 delivery-note-item" v-if="listDetail.sender">
        <div class="d-flex flex-column">
          <span>Người gửi</span>
          <strong class="line-2 name">{{ listDetail.sender.name }}</strong>
        </div>
        <div class="address-wrap d-flex flex-column align-items-end">
          <span class="address">Địa chỉ: <strong>{{ listDetail.sender.address }}</strong></span>
          <span class="line-2">Điện thoại: <strong>{{ listDetail.sender.phone_number }}</strong></span>
        </div>
      </div>
      <div class="delivery-note-3 delivery-note-item" v-if="listDetail.receiver">
        <div class="item">
          <span>Người nhận</span>
          <span class="line-2 name">{{ listDetail.receiver.name }}</span>
          <span class="line-2">Địa chỉ: <strong>{{ listDetail.receiver.address }}</strong></span>
          <span class="line-2">Điện thoại: <strong>{{ listDetail.receiver.phone_number }}</strong></span>
        </div>
        <div class="item item-2">
          <strong>Ghi chú của khách hàng:</strong>
          <span class="line-2">{{ listDetail.note }}</span>
        </div>
      </div>
      <div class="delivery-note-4" v-if="listDetail.cost">
        <div class="item item-2">
          <span class="title">Giao hàng</span>
          <span class="number">{{ listDetail.transporter }}</span>
        </div>
        <div class="item item-2">
          <span class="title">Phí ship</span>
          <span class="number">{{ listDetail.cost.delivery | vnd }}</span>
        </div>
        <div class="item item-2 item-last">
          <span class="title">Thu hộ</span>
          <span class="number">{{ listDetail.cost.collection | vnd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'DeliveryNote',
  metaInfo() {
    return {
      title: "Phiếu giao hàng",
    };
  },
  data () {
    return {
      listDetail: {},
    }
  },
  mounted() {
    setTimeout(() => {
      this.inBill();
    }, 1000);
    this.fetchDetai();
  },
  methods: {
    inBill() {
      window.print();
    },
    // Lấy dữ liệu
    fetchDetai(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("delivery/print/" + this.$route.params.delivery_id).then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listDetail = response.data;
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
  },
}
</script>

<style lang="css" scoped>
.delivery-note {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: #000728;
}
.delivery-note-wrap {
  width: 600px;
  border: 1px solid #767676;
}
.delivery-note-item {
  padding: 15px 17px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #767676;
}
.delivery-note-1 .code-title {
  font-size: 20px;
}
.delivery-note-1 .code-number {
  font-weight: bold;
  font-size: 20px;
}

.delivery-note-2 .line-2 {
  margin-top: 5px;
}
.delivery-note-2 .address-wrap {
  max-width: 400px;
}
.delivery-note-2 .address {
  text-align: end;
}

.delivery-note-3 .item {
  flex-grow: 10;
  width: 220px;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
}
.delivery-note-3 .item-2 {
  flex-grow: 0;
}
.delivery-note-3 .line-2 {
  margin-top: 5px;
}
.delivery-note-3 .name {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
}
.delivery-note-4 {
  display: flex;
}
.delivery-note-4 .item {
  flex-grow: 1;
  padding: 15px 15px;
  min-height: 120px;
  border-right: 1px solid #767676;
}
.delivery-note-4 .item-2 {
  display: flex;
  flex-direction: column;
}
.delivery-note-4 .item-2 .title {
  margin-bottom: 20px;
  font-weight: bold;
}
.delivery-note-4 .item-2 .number {
  font-weight: bold;
  font-size: 20px;
}
.delivery-note-4 .item-last {
  border-right: none;
}
</style>

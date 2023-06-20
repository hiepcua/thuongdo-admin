<template>
  <div class="pack-detail-component-note">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="frame-title">
          <img src="@/static/icon/pack/detail/location.svg" alt="" />
          <span>Thông tin nhận hàng</span>
        </div>
        <div class="frame-content">
          <div class="line">
            <span class="title">Địa chỉ nhận hàng:</span>
            <span>{{ packDetail.receiver.name }}</span>
          </div>
          <div class="line">
            <span class="title">Giá trị bảo hiểm:</span>
            <span>{{ packDetail.costs.insurance_cost }}</span>
          </div>
          <div class="line">
            <span class="title">Số lượng kiểm đếm:</span>
            <span>{{ packDetail.receiver.inspection_number }}</span>
          </div>
          <div class="line">
            <span class="title">Số sản phẩm trong kiện:</span>
            <span>{{ packDetail.receiver.product_number }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="frame-title">
          <img src="@/static/icon/pack/detail/edit.svg" alt="" />
          <span>Ghi chú</span>
        </div>
        <div class="frame-content">
          <span>{{
            packDetail.note == null ? "Không có" : packDetail.note
          }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DetailComponentNote",
  props: {
    packDetail: Object,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.pack-detail-component-note {
  padding: 20px;
  border: 1px solid #bdd6ee;
  margin-bottom: 25px;
  margin-top: 10px;
  border-radius: 5px;
  background: #fcfdff;
}
.pack-detail-component-note .frame-title {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  min-height: 28px;
}
.pack-detail-component-note .frame-title span {
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #207cdc;
  margin-left: 5px;
}
.pack-detail-component-note .frame-content {
  background: #ffffff;
  border: 1px dashed #3f92d1;
  border-radius: 5px;
  padding: 18px 25px;
  min-height: 150px;
}
.pack-detail-component-note .frame-content .line {
  line-height: 30px;
  /*height: 30px;*/
}
.pack-detail-component-note .frame-content .line .title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #000728;
  margin-right: 5px;
}
</style>

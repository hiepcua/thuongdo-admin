<template>
  <div class="pack-detail-component-history">
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Lịch sử thay đổi thông tin kiện hàng</span>
    </div>
    <div class="table-element-custom-2022-v-history">
      <el-table :data="listActivity.info" style="width: 100%" stripe border>
        <el-table-column
          label="Ngày thay đổi"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Người thay đổi"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.staff.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Chưa thay đổi"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.properties.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="m3 / Kg"
          header-align="left"
          align="left"
          width="130"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.properties.value }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Phí vận chuyển cũ"
          header-align="left"
          align="left"
          width="140"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.properties.international_old_cost | vnd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Phí vận chuyển mới"
          header-align="left"
          align="left"
          width="140"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.properties.international_new_cost | vnd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thay đổi" header-align="left" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.modify | vnd }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Lịch sử thay đổi loại vận chuyển</span>
    </div>
    <div class="table-element-custom-2022-v-history">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column
          label="Ngày thay đổi"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Người thay đổi"
          header-align="center"
          align="center"
        >
          <div>
            <span>Lương Thùy Linh</span>
          </div>
        </el-table-column>
        <el-table-column
          label="Loại vận chuyển"
          header-align="center"
          align="center"
        >
          <div>
            <span>Thay đổi thông tin kiện hàng</span>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Lịch sử thay đổi ghi chú</span>
    </div>
    <div class="table-element-custom-2022-v-history">
      <el-table :data="listActivity.note" style="width: 100%" stripe border>
        <el-table-column
          label="Ngày thay đổi"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Người thay đổi"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.staff.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ghi chú" header-align="center" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="frame-content-title-2022">
      <img src="@/static/icon/action/to-right.svg" alt="" />
      <span>Lịch sử thay đổi trạng thái kiện</span>
    </div>
    <div class="table-element-custom-2022-v-history">
      <el-table :data="listActivity.status" style="width: 100%" stripe border>
        <el-table-column
          label="Ngày thay đổi"
          header-align="center"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Người thay đổi"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.staff.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <span
                class="count-status-top-3388 v2"
                :style="{ backgroundColor: scope.row.content.color }"
                >{{ scope.row.content.name }}</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailComponentHistory",

  data() {
    return {
      tableData: [],

      listActivity: [],
    };
  },
  mounted() {
    this.fetchPackActivity();
  },
  methods: {
    fetchPackActivity() {
      axios
        .get("activity/package-detail/" + this.$route.params.pack_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listActivity = response.data;
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
};
</script>

<style lang="css" scoped>
.pack-detail-component-history {
  padding: 20px;
  border: 1px solid #bdd6ee;
  margin-top: 25px;
  border-radius: 5px;
  background: #fcfdff;
}
.table-element-custom-2022-v-history {
  margin-bottom: 15px;
}
</style>

<style>
.table-element-custom-2022-v-history .el-table {
  font-size: 12px;
}
.table-element-custom-2022-v-history .el-table th.el-table__cell {
  color: #000728;
  background: #f1f1f1;
  font-weight: 700;
}
.table-element-custom-2022-v-history .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #000728;
}
</style>

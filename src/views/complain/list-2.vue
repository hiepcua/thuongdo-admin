<template>
  <div class="complain-detail" id="ST2022">
    <div class="order-list-statistic" v-if="listCommon.report">
      <div
        class="order-list-statistic-item"
        v-for="item in listCommon.report.all"
        :key="item.value"
      >
        <span
          class="title"
          :style="{ color: item.value === filter.status ? item.color : '' }"
          >{{ item.name }}</span
        >
        <span
          class="count-status-top-3388"
          :style="{ backgroundColor: item.color }"
          >{{ item.quantity }}</span
        >
      </div>
    </div>
    <div class="frame-content-common-2022">
      <div class="order-update-title d-flex align-items-center">
        <img src="@/static/icon/complain/detail/list.svg" />
        <span>Chi tiết khiếu nại</span>
      </div>
      <!-- table  -->
      <div class="table-element-custom-2022 order-list-table">
        <el-table style="width: 100%" border :data="tableData">
          <el-table-column label="Mã đơn hàng" width="150" align="center">
            <template v-if="listData.order">
              <span>{{ listData.order.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Ảnh" width="130">
            <template>
              <div class="image">
                <img :src="listData.image" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Loại khiếu nại" width="160" align="center">
            <template>
              <span>{{ listData.type }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="Ngày khiếu nại" align="center">
            <template>
              <span>{{ listData.time }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="Phương án" align="center">
            <template v-if="listData.solution">
              <!-- <span>{{ listData.solution.name }}</span> -->
              <div>
                <el-select
                  v-model="listData.solution.name"
                  placeholder="chọn trạng thái"
                  class="frame-input-common-2022"
                  popper-class="frame-select-popper-customer-2022"
                  @change="updateStatus(listData)"
                >
                  <el-option
                    v-for="item in listCommon.solution"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            label="Trạng thái khiếu nại"
            align="center"
          >
            <template v-if="listData.status">
              <div>
                <el-select
                  :style="{ backgroundColor: listData.status.color }"
                  v-model="listData.status.value"
                  placeholder="chọn trạng thái"
                  class="frame-input-common-2022 status-withdrawal-2022"
                  popper-class="frame-select-popper-customer-2022"
                  @change="updateStatus(listData)"
                >
                  <el-option
                    v-for="item in listStatuses"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Hình ảnh thực tế" align="center">
            <template v-if="listData.images">
              <div
                class="d-flex align-items-center justify-content-center"
                v-if="listData.images.length > 2"
              >
                <div class="image d-flex align-items-center">
                  <img :src="listData.images[0]" />
                  <img :src="listData.images[1]" />
                  <div
                    class="imageLength d-flex align-items-center justify-content-center"
                  >
                    <span>+ {{ listData.images.length - 2 }}</span>
                  </div>
                </div>
              </div>
              <div
                class="d-flex align-items-center justify-content-center"
                v-else
              >
                <div class="image d-flex align-items-center">
                  <div v-for="i in listData.images" :key="i.key">
                    <img :src="i" />
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
        <div>
          <div class="d-flex table-detail-complain">
            <div class="d-flex">
              <div class="titleTable w150">
                <span>Mã đơn hàng</span>
              </div>
              <div class="titleTable w130">
                <span>Ảnh</span>
              </div>
              <div class="titleTable w160">
                <span>Loại khiếu nại</span>
              </div>
              <div class="titleTable w150">
                <span>Ngày khiếu nại</span>
              </div>
              <div class="titleTable w150">
                <span>Phương án</span>
              </div>
              <div class="titleTable w150">
                <span>Trạng thái khiếu nại</span>
              </div>
            </div>
            <div class="titleTable w100">
              <span>Hình ảnh thực tế</span>
            </div>
          </div>
          <!--  -->
          <div class="d-flex table-detail-complain">
            <div class="d-flex">
              <div class="textData w150">
                <span>{{ listData.order.code }}</span>
              </div>
              <div class="textData w130">
                <span>Ảnh</span>
              </div>
              <div class="textData w160">
                <span>Loại khiếu nại</span>
              </div>
              <div class="textData w150">
                <span>Ngày khiếu nại</span>
              </div>
              <div class="textData w150">
                <span>Phương án</span>
              </div>
              <div class="textData w150">
                <span>Trạng thái khiếu nại</span>
              </div>
            </div>
            <div class="textData w100">
              <span>Hình ảnh thực tế</span>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <!--  -->
      <div class="order-update-title d-flex align-items-center">
        <img src="@/static/icon/complain/detail/edit.svg" />
        <span>Sản phẩm khiếu nại</span>
      </div>
      <div class="table-element-custom-2022 order-list-table">
        <el-table style="width: 100%" border :data="listProducts">
          <el-table-column label="STT" align="center" width="50" type="index">
          </el-table-column>
          <el-table-column label="Sản phẩm">
            <template slot-scope="scope">
              <div class="d-flex align-items-center">
                <div class="imageUpload-2022">
                  <img :src="scope.row.image" />
                </div>
                <span class="ml-1">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Mô tả" width="120">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.info2 }}</span>
            </template> -->
          </el-table-column>
          <el-table-column label="Đơn giá" width="100">
            <template slot-scope="scope">
              <div class="d-flex flex flex-column">
                <span>{{ scope.row.unit_price_cny | vnd }}</span>
                <span>¥ {{ scope.row.exchange_rate }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Số lượng" width="90" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Phí ship" align="center" width="120">
            <template slot-scope="scope">
              <div class="d-flex flex flex-column">
                <span>{{ scope.row.price | vnd }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Mã vận đơn" align="center" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.bill_code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Ảnh tải lên" width="300">
            <template slot-scope="scope">
              <div
                class="imageUpload d-flex align-items-center justify-content-center"
                v-if="scope.row.images.length > 2"
              >
                <img :src="scope.row.images[0]" />
                <img :src="scope.row.images[1]" />
                <img :src="scope.row.images[2]" />
                <div
                  class="imageLength d-flex align-items-center justify-content-center"
                >
                  <span>+ {{ scope.row.images.length - 3 }}</span>
                </div>
              </div>
              <div
                class="imageUpload d-flex align-items-center justify-content-center"
                v-else
              >
                <div v-for="i in scope.row.images" :key="i.key">
                  <img :src="i" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Ghi chú" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.complain_note }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--  -->
      <div class="order-update-title d-flex align-items-center">
        <img src="@/static/icon/complain/detail/chat.svg" />
        <span>Phản hồi</span>
      </div>
      <!-- <div class="order-list-table box-feedback">
        <el-row>
          <el-col :span="6">
            <div class="box-feedback-left">
              <div class="d-flex align-items-center imgfeed">
                <img :src="imgfeed" />
                <div class="d-flex flex-column">
                  <span>Khách hàng</span>
                  <span>{{ timeFeed }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center imgfeed mt-4">
                <img :src="imgfeed" />
                <div class="d-flex flex-column">
                  <span>Nhân viên</span>
                  <span>{{ timeFeed }}</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col></el-col>
        </el-row>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComplainDetail",
  metaInfo() {
    return {
      title: "Chi tiết khiếu nại",
    };
  },
  components: {},
  data() {
    return {
      filter: {
        status: "",
      },
      loading: true,
      tableData: [],
      listData: {},
      listProducts: [],
      listCommon: {},
    };
  },
  mounted() {
    this.fetchDetail();
    this.fetchCommon();
  },
  methods: {
    // lấy dữ liệu
    fetchDetail() {
      axios
        .get("complain/" + this.$route.params.complain_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listData = response.data;
              this.listProducts = response.data.products
              console.log("listProducts", this.listProducts);
              console.log("listData", this.listData);
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
    fetchCommon() {
      axios.get("common/complain").then((response) => {
        switch (response.code) {
          case 200:
            this.listCommon = response.data;
            this.listStatuses = response.data.statuses
            console.log("lisyyy", this.listCommon);
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
    updateStatus(item) {
      this.deleteModel(item);
    },
    deleteModel(item) {
      let data = {
        status: item.status.value,
      };
      axios.patch("complain/" + item.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchDetail();
            this.tableData = [];
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
  watch: {
    listData: function () {
      let temp = {};
      this.tableData.push(temp);
    },
  },
};
</script>

<style lang="css" scoped>
.complain-detail .order-update-title span {
  margin-left: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #0688ee;
}
</style>
<style>
.complain-detail .table-element-custom-2022 .el-table th.el-table__cell {
  background: #207cdc;
  text-align: center;
}
.complain-detail .money {
  color: #ed1c24;
  text-align: center !important;
}
.complain-detail .table-element-custom-2022 .el-table td.el-table__cell div {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.complain-detail .image img {
  width: 100%;
  margin-left: 5px;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.complain-detail .image .imageLength {
  margin-left: 5px;
  width: 100px;
  height: 100px;
  background: #bdd6ee;
  font-weight: 700;
  font-size: 14px !important;
  line-height: 20px;
  color: #fff !important;
}
.complain-detail .imageUpload img {
  width: 100%;
  margin-left: 5px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.complain-detail .imageUpload-2022 img {
  width: 100%;
  margin-left: 5px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.complain-detail .imageUpload .imageLength {
  margin-left: 5px;
  width: 50px;
  height: 50px;
  background: #bdd6ee;
  font-weight: 700;
  line-height: 20px;
  color: #fff !important;
}
/* phản hồi  */
.box-feedback {
  margin-top: 16px;
  height: 500px;
  border: 1px solid #bdd6ee;
  border-radius: 5px;
}
.box-feedback-left {
  border-right: 0.5px solid #bdd6ee;
  padding: 18px 8px 8px 17px;
}
.box-feedback .imgfeed img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
/*  */
.complain-detail .status-withdrawal-2022 input {
  font-size: 12px;
  background: none;
  color: #fff;
  border: none !important;
}
.complain-detail .status-withdrawal-2022 .el-input--suffix .el-input__inner {
  height: 30px;
}
.complain-detail .status-withdrawal-2022 .el-input__icon {
  line-height: 30px !important;
}
.complain-detail .status-withdrawal-2022 .el-icon-arrow-up::before {
  color: #fff !important;
}
.complain-detail .status-withdrawal-2022 .el-icon-arrow-down::before {
  color: #fff !important;
}
/*  */
.titleTable {
  background: #207cdc;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
  /* border-left: 0.1px solid #fff; */
  border-right: 0.1px solid #fff;
}
.w150 {
  width: 150px;
}
.w160 {
  width: 150px;
}
.w130 {
  width: 150px;
}
.w100 {
  width: 100%;
}
.textData {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 12px;
}
.textData {
  border-right: 0.1px solid #BDD6EE;
  border-bottom: 0.1px solid #BDD6EE;
}
</style>

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
            <div class="titleTable w100">
              <span>Ảnh mã vận đơn</span>
            </div>
          </div>
          <!--  -->
          <div class="d-flex table-detail-complain">
            <div class="d-flex">
              <div class="textData w150" v-if="listData.order">
                <span>{{ listData.order.code }}</span>
              </div>
              <div class="textData w130">
                <div class="image">
                  <img @click="VisibleV5 = true" :src="listData.image" />
                  <el-dialog :visible.sync="VisibleV5" class="imageZom">
                    <img width="100%" :src="listData.image">
                  </el-dialog>
                </div>
              </div>
              <div class="textData w160">
                <span>{{ listData.type }}</span>
              </div>
              <div class="textData w150">
                <span>{{ listData.time }}</span>
              </div>
              <div class="textData w150">
                <div class="listSolution" v-if="listData.solution">
                  <el-select
                    v-model="listData.solution.id"
                    placeholder="chọn phương án"
                    class="frame-input-common-2022"
                    popper-class="frame-select-popper-customer-2022"
                    @change="updateSolution(listData)"
                  >
                    <el-option
                      v-for="item in listCommon.solution"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="textData w150">
                <div v-if="listData.status">
                  <el-select
                    :style="{ backgroundColor: listData.status.color }"
                    v-model="listData.status.value"
                    placeholder="chọn trạng thái"
                    class="frame-input-common-2022 status-withdrawal-2022"
                    popper-class="frame-select-popper-customer-2022"
                    @change="updateStatus(listData)"
                  >
                    <el-option
                      v-for="item in listCommon.statuses"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="textData w100" v-if="listData.images">
              <div
                class="d-flex align-items-center justify-content-center"
                v-if="listData.images.length > 1000"
              >
                <div class="image d-flex align-items-center">
                  <img @click="dialogVisibleV1 = true" :src="listData.images[0]" />
                  <img @click="dialogVisibleV2 = true" :src="listData.images[1]" />
                  <el-dialog :visible.sync="dialogVisibleV1" class="imageZom">
                    <img width="100%" :src="listData.images[0]">
                  </el-dialog>
                  <el-dialog :visible.sync="dialogVisibleV2" class="imageZom">
                    <img width="100%" :src="listData.images[0]">
                  </el-dialog>
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
                    <img @click="clickdialogVisible(i)" :src="i" />
                    <el-dialog :visible.sync="dialogVisible" class="imageZom">
                      <img width="100%" :src="dialogImageUrl">
                    </el-dialog>
                  </div>
                </div>
              </div>
            </div>
            <div class="textData w100">
              <div class="image d-flex align-items-center">
                <div v-for="i in listData.images_bill" :key="i.key">
                  <img @click="clickdialogVisible(i)" :src="i" />
                  <el-dialog :visible.sync="dialogVisible" class="imageZom">
                    <img width="100%" :src="dialogImageUrl">
                  </el-dialog>
                </div>
              </div>
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
                  <img @click="VisibleV4 = true" :src="scope.row.image" />
                  <el-dialog :visible.sync="VisibleV4" class="imageZom">
                    <img width="100%" :src="scope.row.image">
                  </el-dialog>
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
                <span>{{ (scope.row.unit_price_cny * scope.row.exchange_rate) | vnd }}</span>
                <span>¥ {{ scope.row.amount_cny }}</span>
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
          <el-table-column label="Ảnh tải lên" width="350">
            <template slot-scope="scope">
              <div
                class="imageUpload d-flex align-items-center justify-content-center"
                v-if="scope.row.images.length > 1000"
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
                <div v-for="i in scope.row.images" :key="i">
                  <img @click="clickdialogVisibleV3(i)" :src="i" />
                  <el-dialog :visible.sync="dialogVisibleV3" class="imageZom">
                    <img width="100%" :src="dialogImageUrlV3">
                  </el-dialog>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Ghi chú" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.complain_note }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--  -->
      <div class="order-update-title d-flex align-items-center">
        <img src="@/static/icon/complain/detail/chat.svg" />
        <span>Phản hồi</span>
      </div>
      <div class="order-list-table box-feedback">
        <el-row>
          <el-col :span="6">
            <div class="box-feedback-left">
              <div class="tab-wrap">
                <!-- Khách hàng -->
                <div
                  class="item"
                  :class="tabActive == 2 ? 'active' : ''"
                  @click="changeTab(2)"
                >
                  <div v-if="listLogPub.sender == null">
                    <span>Ghi chú cho khách hàng</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="info">
                      <div class="imageFB">
                        <div class="temp" v-if="listLogPub.sender">
                          <img
                            class="avatar"
                            :src="listLogPub.sender.image"
                            v-if="listLogPub.sender.image"
                          />
                          <img
                            class="avatar"
                            src="@/static/icon/header-top/account.svg"
                            v-else
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="infoUser d-flex flex-column"
                      v-if="listLogPub.sender"
                    >
                      <div class="d-flex align-items-center">
                        <span class="name">{{ listLogPub.sender.prefix }}:</span>
                        <span class="name pl-1">{{ listLogPub.sender.name }}</span>
                      </div>
                      <span class="time">{{ listLogPub.time }}</span>
                    </div>
                    <div class="quantyFB" v-if="listLogPub.quantity !== 0">
                      <span>{{ listLogPub.quantity }}</span>
                    </div>
                  </div>
                </div>
                <!-- nội bộ -->
                <div
                  class="item"
                  :class="tabActive == 1 ? 'active' : ''"
                  @click="changeTab(1)"
                >
                  <div v-if="listLogPre.sender == null">
                    <span>Phản hồi nội bộ</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="info">
                      <div class="imageFB">
                        <div class="temp" v-if="listLogPre.sender">
                          <img
                            class="avatar"
                            :src="listLogPre.sender.image"
                            v-if="listLogPre.sender.image"
                          />
                          <img
                            class="avatar"
                            src="@/static/icon/header-top/account.svg"
                            v-else
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="infoUser d-flex flex-column"
                      v-if="listLogPre.sender"
                    >
                      <div class="d-flex align-items-center">
                        <span class="name">{{ listLogPre.sender.prefix }}:</span>
                        <span class="name ml-1">{{ listLogPre.sender.name }}</span>
                      </div>
                      <span class="time">{{ listLogPre.time }}</span>
                    </div>
                    <div class="quantyFB" v-if="listLogPre.quantity !== 0">
                      <span>{{ listLogPre.quantity }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <!-- khách hàng -->
            <div class="box-feedback-right">
              <div v-show="tabActive == 2">
                <div class="content-comment">
                  <div class="mt-2" v-for="item in listLogPub.items" :key="item.key">
                    <!-- <div class="day">
                      <span>{{ item.time }}</span>
                    </div> -->
                    <div class="d-flex">
                      <div class="imageFB">
                        <div class="temp">
                          <img
                            class="avatar"
                            :src="item.sender.avatar"
                            v-if="item.sender.avatar"
                          />
                          <img
                            class="avatar"
                            src="@/static/icon/header-top/account.svg"
                            v-else
                          />
                        </div>
                      </div>
                      <div class="data">
                        <div class="name">
                          <span>{{ item.sender.name }}</span>
                        </div>
                        <div class="content d-flex">
                          <span class="text">{{ item.content }}</span>
                          <div class="created_at">
                            <span>{{ item.created_at }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div class="d-flex align-items-center mt-3">
                  <el-input
                    placeholder="Phản hồi với khách hàng"
                    class="sentfbInput"
                    v-model="input"
                    @keyup.enter.native="sentFeedBack"
                  ></el-input>
                  <div
                    class="d-flex align-items-center btnSent justify-content-center"
                    @click="sentFeedBack()"
                  >
                    <img class="pr-1" src="@/static/icon/complain/detail/sent.svg" />
                    <span>Gửi</span>
                  </div>
                </div>
              </div>
              <!-- Nội bộ -->
              <div v-show="tabActive == 1">
                <div class="content-comment">
                  <div class="mt-2" v-for="item in listLogPre.items" :key="item.key">
                    <!-- <div class="day">
                      <span>{{ item.time }}</span>
                    </div> -->
                    <div class="d-flex">
                      <div class="imageFB">
                        <div class="temp">
                          <img
                            class="avatar"
                            :src="item.sender.avatar"
                            v-if="item.sender.avatar"
                          />
                          <img
                            class="avatar"
                            src="@/static/icon/header-top/account.svg"
                            v-else
                          />
                        </div>
                      </div>
                      <div class="data">
                        <div class="name d-flex align-items-center">
                          <span>{{ item.prefix }}:</span>
                          <span class="pl-1">{{ item.sender.name }}</span>
                        </div>
                        <div class="content d-flex">
                          <span class="text">{{ item.content }}</span>
                          <div class="created_at">
                            <span>{{ item.created_at }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center mt-3">
                  <el-input
                    placeholder="Phản hồi với nhân viên"
                    class="sentfbInput"
                    v-model="input"
                    @keyup.enter.native="sentFeedBackPre"
                  ></el-input>
                  <div
                    class="d-flex align-items-center btnSent justify-content-center"
                    @click="sentFeedBackPre()"
                  >
                    <img class="pr-1" src="@/static/icon/complain/detail/sent.svg" />
                    <span>Gửi</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
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
      dialogVisible: false,
      dialogVisibleV1: false,
      dialogVisibleV2: false,
      dialogVisibleV3: false,
      VisibleV4: false,
      VisibleV5: false,
      tabActive: 2,
      input: "",
      filter: {
        status: "",
      },
      loading: true,
      tableData: [],
      listData: {},
      listProducts: [],
      listCommon: {},
      listLogPre: [],
      listLogPub: {},
      // hiện thị ảnh to
      dialogImageUrl: "",
      dialogImageUrlV3: "",
    };
  },
  mounted() {
    this.fetchDetail();
    this.fetchCommon();
    this.fetchLog();
    this.fetchLogV2();
    this.fetchSeen();
  },
  methods: {
    // Xem ảnh lớn
    clickdialogVisible(item) {
      this.dialogImageUrl = item;
      this.dialogVisible = true;
    },
    clickdialogVisibleV3(item) {
      this.dialogImageUrlV3 = item;
      this.dialogVisibleV3 = true;
    },
    changeTab(tab) {
      this.tabActive = tab;
    },
    // lấy dữ liệu
    fetchDetail() {
      axios
        .get("complain/" + this.$route.params.complain_id)
        .then((response) => {
          switch (response.code) {
            case 200:
              this.listData = response.data;
              this.listProducts = response.data.products
              // console.log("listProducts", this.listProducts);
              // console.log("listData", this.listData);
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
            // console.log("listCommon", this.listCommon);
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
    //
    updateSolution(item) {
      this.SolutionModel(item);
    },
    SolutionModel(item) {
      let data = {
        solution_id: item.solution.id,
      };
      axios.patch("complain/" + item.id, data).then((response) => {
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              type: "success",
            });
            this.fetchDetail();
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
    // ds comment
    // nội bộ
    fetchLog() {
      axios.get("complain/comment/" + this.$route.params.complain_id + "/private").then((response) => {
        switch (response.code) {
          case 200:
            this.listLogPre = response.data;
            // console.log("listLogPre", this.listLogPre);
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
    // Khách hàng
    fetchLogV2() {
      axios.get("complain/comment/" + this.$route.params.complain_id + "/public").then((response) => {
        switch (response.code) {
          case 200:
            this.listLogPub = response.data;
            // console.log("listLogPub", this.listLogPub);
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
    fetchSeen() {
      axios.get("complain/comment/" + this.$route.params.complain_id + "/public/seen").then((response) => {
        switch (response.code) {
          case 200:
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
    fetchSeenPri() {
      axios.get("complain/comment/" + this.$route.params.complain_id + "/private/seen").then((response) => {
        switch (response.code) {
          case 200:
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
    // thêm ý kiến
    sentFeedBack() {
      if (this.input == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập ý kiến của bạn",
          type: "warning",
        });
        return;
      }
      let data = {
        content: this.input,
        type: "public",
      };
      axios.post("complain/comment/" + this.$route.params.complain_id, data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm phản hồi thành công",
              type: "success",
            });
            this.input = "";
            this.fetchLogV2();
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
    // nội bộ
    sentFeedBackPre() {
      if (this.input == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập ý kiến của bạn",
          type: "warning",
        });
        return;
      }
      let data = {
        content: this.input,
        type: "private",
      };
      axios.post("complain/comment/" + this.$route.params.complain_id, data).then((response) => {
        this.canSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm phản hồi thành công",
              type: "success",
            });
            this.input = "";
            this.fetchLog();
            this.fetchSeenPri();
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
  watch: {},
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
  width: 80px;
  height: 80px;
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
  /* height: 500px; */
  border: 1px solid #bdd6ee;
  border-radius: 5px;
}
.box-feedback-left {
  border-right: 0.5px solid #bdd6ee;
  padding: 18px 8px 8px 17px;
}
.box-feedback-right {
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
  padding: 10px 5px;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
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
  font-size: 12px;
  padding: 10px 5px;
}
.textData {
  border-right: 0.1px solid #BDD6EE;
  border-bottom: 0.1px solid #BDD6EE;
}
.complain-detail .listSolution input {
  font-size: 12px;
  background: none;
}
.complain-detail .listSolution .el-input--suffix .el-input__inner {
  height: 30px;
}
.complain-detail .listSolution .el-input__icon {
  line-height: 30px !important;
}
/* phản hồi */
.complain-detail .tab-wrap .item {
  background: #f6faff;
  height: 56px;
  cursor: pointer;
  color: #1771c1;
  margin-bottom: 1px;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.complain-detail .tab-wrap .item:hover {
  opacity: 0.8;
}
.complain-detail .tab-wrap .item.active {
  background-color: #e8f3ff;
}
.complain-detail .sentfbInput input {
  background: #fff;
  border: 1px solid #3f92d1;
  border-radius: 20px;
  height: 36px;
}
.complain-detail .btnSent {
  cursor: pointer;
  margin-left: 10px;
  width: 113px;
  height: 36px;
  background: #26b01c;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #fff;
}
/* data phản hồi */
.box-feedback-right .day {
  background: #00a962;
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #fff;
  width: 160px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-feedback-right .imageFB {
  margin-top: 17px;
}
.complain-detail .imageFB {
  width: 50px;
  height: 35px;
  display: flex;
}
.complain-detail .imageFB .temp {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
}
.complain-detail .imageFB .temp img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.box-feedback-right .data {
  margin-top: 17px;
}
.box-feedback-right .data .name {
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #075970;
}
.box-feedback-right .data .content {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.box-feedback-right .data .content .text {
  background: #e8f3ff;
  border: 1px solid #fff;
  border-radius: 0px 10px 10px 10px;
  padding: 13px 6px 10px 14px;
}
.box-feedback-right .data .content .created_at {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #767676;
  margin: 15px 0 0 5px;
}
.complain-detail .infoUser .name {
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #075970;
}
.complain-detail .infoUser .time {
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #767676;
}
.complain-detail .quantyFB {
  width: 22px;
  height: 22px;
  background: #d60b4a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #fff;
  margin-left: 30px;
}
.complain-detail .imageZom img {
  cursor: pointer;
  width: 100%;
  height: auto;
}
/* Scroll phản hồi */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #bdd6ee;
}

::-webkit-scrollbar-thumb {
  border-radius: 22px;
  /* background: linear-gradient(left, #fff, #e4e4e4); */
  border: 1px solid #aaa;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

/* ::-webkit-scrollbar-thumb:active {
  background: linear-gradient(left, #22add4, #1e98ba);
} */

::-webkit-scrollbar {
  width: 5px;
}
.complain-detail .content-comment {
  height: 300px;
  overflow-y: auto;
}
</style>

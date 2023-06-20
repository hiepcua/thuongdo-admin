<template>
  <div class="delivery-bill" id="ST2022">
    <div class="frame-content-common-2022">
      <div class="bill-header-1">
        <span>Phiếu xuất kho kiêm biên bản bàn giao</span>
      </div>
      <div class="bill-header-2" v-if="listInfo.info">
        <span>{{ listInfo.info.time }}</span>
      </div>
      <div class="bill-header-3" v-if="listInfo.receiver">
        <span>Người nhận hàng: <strong>{{ listInfo.receiver.name }}</strong>Điện thoại: <strong>{{ listInfo.receiver.phone_number }}</strong>Loại đơn: <strong>{{ listInfo.info.type }}</strong></span>
        <div class="d-flex justify-content-end">
          <span>Số: {{ listInfo.info.no }}</span>
        </div>
      </div>
      <div class="bill-header-4" v-if="listInfo.receiver">
        <span>Xuất tại kho: {{ listInfo.receiver.address }}</span>
      </div>
      <div class="table-common">
        <table>
          <tr>
            <th width="50">STT</th>
            <th width="100">Mã vận đơn</th>
            <th width="110">Số lượng/đvt</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
            <th>Bảo hiểm</th>
            <th>Kiểm đếm</th>
            <th>Đóng gỗ</th>
            <th>Chống sốc</th>
            <th>Lưu kho</th>
            <th width="120">VC nước ngoài</th>
            <th width="100">Chiết khấu</th>
            <th width="100">Tổng tiền</th>
            <th width="100">Ghi chú</th>
          </tr>
          <tr v-for="(i, index) in listPack" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ i.bill_code }}</td>
            <td>{{ i.unit }}</td>
            <td>{{ i.unit_price_cost | vnd2 }}</td>
            <td>{{ i.international_shipping_cost | vnd2 }}</td> <!--thành tiền -->
            <td>{{ i.insurance_cost | vnd2 }}</td> <!--bảo hiểm -->
            <td>{{ i.inspection_cost | vnd2 }}</td> <!--kiểm đếm -->
            <td>{{ i.woodworking_cost | vnd2 }}</td> <!--đóng gỗ -->
            <td>{{ i.shock_proof_cost | vnd2 }}</td> <!--chống sốc -->
            <td>{{ i.storage_cost | vnd2 }}</td> <!--lưu kho -->
            <td>{{ i.china_shipping_cost | vnd2 }}</td> <!--vc nc ngoài -->
            <td>{{ i.discount_cost | vnd2 }}</td> <!--chiết khấu -->
            <td>{{ i.amount | vnd2 }}</td> <!--tổng tiền -->
            <td></td> <!--Ghi chú -->
          </tr>
          <tr>
            <td colspan="10"></td>
            <td colspan="2"><strong>Tổng tiền vận chuyển</strong></td>
            <td v-if="listInfo.packages">{{ listInfo.packages.total_amount | vnd2 }}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="bill-title-1">
        <span>Thông tin đơn hàng</span>
      </div>
      <div class="table-common">
        <table>
          <tr>
            <th width="50">STT</th>
            <th width="150">Mã đơn hàng</th>
            <th class="borderNone"></th>
            <th class="borderNone"></th>
            <th class="borderNone"></th>
            <th class="borderNone"></th>
            <th class="borderNone"></th>
            <th class="borderNone"></th>
            <th width="120">Tổng tiền</th>
            <th width="100">Đã thanh toán</th>
            <th width="100">Còn thiếu</th>
            <th width="100"></th>
          </tr>
          <tr v-for="(i, index) in listOrder.data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ i.code }}</td>
            <td class="borderNone"></td>
            <td class="borderNone"></td>
            <td class="borderNone"></td>
            <td class="borderNone"></td>
            <td class="borderNone"></td>
            <td class="borderNone"></td>
            <td>{{ i.amount | vnd2 }}</td>
            <td>{{ i.deposit_cost | vnd2 }}</td>
            <td>{{ i.balance | vnd2 }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="8"></td>
            <td colspan="2"><strong>Tổng tiền</strong></td>
            <td>{{ listOrder.total_amount | vnd2 }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="8"></td>
            <td colspan="2"><strong>Tổng tiền cần thanh toán</strong></td>
            <td>{{ listOrder.total_purchase | vnd2 }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="8"></td>
            <td colspan="3">{{ listOrder.str_cost }}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="bill-status-1">
        <span>Hiện trạng hàng hóa: Nguyên kiện</span>
        <span>Hình thức vận chuyển: Tại kho</span>
      </div>
      <div class="bill-assign">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="text-center">
              <strong>Người lập phiếu</strong>
            </div>
            <div class="text-center mt-5">
              <strong v-if="listInfo.info">{{ listInfo.info.staff }}</strong>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="text-center">
              <strong>Người nhận hàng</strong>
            </div>
            <div class="text-center mt-5">
              <strong v-if="listInfo.receiver">{{ listInfo.receiver.name }}</strong>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bill-note">
        <div v-if="dialogNoteContent && dialogNoteVisible == false" class="pb-2">
          <strong>Ghi chú:{{ dialogNoteContent }}</strong>
        </div>
        <!-- <span>Chú ý: Quý khách vui lòng kiểm tra lại kiện hàng ngay sau khi nhận hàng và quay lại video & chụp ảnh mã vận đơn trong quá trình mở kiểm tra hàng hóa (Trường hợp thiếu, hỏng, Thương Đô có đầy đủ căn cứ để khiếu nại đến nhà cung cấp cho quỹ khách hàng), chúng tôi chỉ tiếp nhận khiếu nại trong vòng 24h qua website thuongdo.com, Zalo, Facebook hoặc Hotline: 19006825 / 0898169666. Xin chân thành cảm ơn!</span> -->
      </div>
      <div class="d-flex justify-content-end pt-4">
        <span
          class="btn-crud-2022 frame-hover-2022 btn-goback"
          @click="showNoteItem()"
        >
          <span>Thêm ghi chú</span>
        </span>
        <span
          class="btn-crud-2022 frame-hover-2022 btn-success"
          :class="!canSubmit ? 'disable' : ''"
          @click="exportExcel()"
        >
          <span v-if="!canSubmit">
            <i class="el-icon-loading"></i>
          </span>
          <span>Xuất Excel</span>
        </span>
      </div>

      <!-- Form ghi chú -->
      <div class="frame-dialog-no-close-1988 form-note">
        <el-dialog
          width="550px"
          :close-on-click-modal="false"
          :visible.sync="dialogNoteVisible"
          :show-close="false"
        >
          <div class="header-1988">
            <img src="@/static/icon/order/list/form-note/edit.svg" />
            <span>Ghi chú khách hàng</span>
          </div>
          <div class="body-1988">
            <div class="pt-2 pb-3">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="Nhập"
                v-model="dialogNoteContent"
              >
              </el-input>
            </div>
            <div class="d-flex justify-content-end align-items-center">
              <div class="d-flex">
                <span
                  class="btn-common frame-hover-2022 btn-cancel"
                  @click="cancelNoteItem()"
                  >Hủy bỏ</span
                >
                <span
                  class="btn-common frame-hover-2022 btn-success"
                  :class="!dialogNoteCanSubmit ? 'disable' : ''"
                  @click="actionNoteItem()"
                >
                  <span v-if="!dialogNoteCanSubmit">
                    <i class="el-icon-loading"></i>
                  </span>
                  <span>Xác nhận</span>
                </span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'DeliveryBill',
  metaInfo() {
    return {
      title: "Phiếu xuất kho",
    };
  },
  data () {
    return {
      canSubmit: true,

      // Phần cho From thêm ghi chú
      dialogNoteVisible: false,
      dialogNoteCanSubmit: true,
      dialogNoteContent: "",
      listInfo: {},
      listPack: [],
      listOrder: {},
    }
  },
  mounted() {
    this.scrollTopST();
    this.fetchInfo();
  },
  methods: {
    scrollTopST() {
      setTimeout(() => {
        document.getElementById("ST2022").scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    },
    // Lấy dữ liệu
    fetchInfo(loading = true) {
      if (loading) {
        this.loading = true;
      }
      axios.get("delivery/print/" + this.$route.params.delivery_id + "/ex-warehouse").then((response) => {
        this.loading = false;
        switch (response.code) {
          case 200:
            this.listInfo = response.data;
            // console.log("list", this.listInfo);
            this.listPack = response.data.packages.data;
            this.listOrder = response.data.orders;
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

    // Ghi chú
    showNoteItem() {
      this.dialogNoteVisible = true;
    },
    cancelNoteItem() {
      this.dialogNoteVisible = false;
    },
    // actionNoteItem() {
    //   this.dialogNoteVisible = false;
    // },
    actionNoteItem() {
      if (this.dialogNoteContent == "") {
        this.$notify({
          title: "Vui lòng kiểm tra lại thông tin",
          message: "Vui lòng nhập ghi chú thông tin về khách hàng",
          type: "warning",
        });
        return;
      }
      this.dialogNoteCanSubmit = false;

      let data = {
        note: this.dialogNoteContent,
      };

      axios.patch("delivery/print/" + this.$route.params.delivery_id + "/note", data).then((response) => {
        this.dialogNoteCanSubmit = true;
        switch (response.code) {
          case 200:
            this.$notify({
              title: "Thành công",
              message: "Thêm ghi chú thành công",
              type: "success",
            });
            this.dialogNoteContent = "";
            this.dialogNoteVisible = false;
            this.$emit("addNoteDetailDone", false);
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

    // Xuất file
    exportExcel() {
      this.canSubmit = false;
      setTimeout(() => {
        this.canSubmit = true;
      }, 500);
      this.downloadItem();
    },
    downloadItem () {
      let fileName = "";
      axios({
          url: "delivery/print/" + this.$route.params.delivery_id + "/xlsx",
          method: 'GET',
          responseType: 'blob',
          file_name: fileName,
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response], {type: 'application/vnd.ms-excel'}));
          var fileLink = document.createElement('a');
        
          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName);
          document.body.appendChild(fileLink);
        
          fileLink.click();
      });
    },
  },
  watch: {}
}
</script>

<style lang="css" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  padding: 10px 2px;
  text-align: center;
  color: #000728;
}
.delivery-bill th {
  background: #767676;
  color: #fff;
  padding: 10px 0px;
}
td {
  border: 1px solid #BDD6EE;
}
th {
  border: 0.1px solid #BDD6EE;
}

.bill-header-1 {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  padding-top: 20px;
}
.bill-header-2 {
  text-align: center;
  padding-top: 10px;
}
.bill-header-3 {
  padding-top: 40px;
}
.bill-header-3 strong {
  margin-right: 10px;
}
.bill-header-4 {
  padding-top: 10px;
}
.table-common {
  padding-top: 20px;
  padding-bottom: 20px
}
.bill-title-1 {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.bill-status-1 {
  padding-top: 10px;
}
.bill-status-1 span {
  margin-right: 50px;
}
.bill-assign {
  padding-top: 20px;
}
.bill-note {
  padding-top: 100px;
}

/*Ghi chú*/
/*/*Đè Dialog form ghi chú*/
.form-note .header-1988 {
  background-color: #0688ee;
}
.borderNone {
  border: none;
}
.info-right {
  display: flex;
  flex-direction: column;
}
</style>

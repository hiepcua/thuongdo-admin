<template>
  <div class="d-flex flex-column select-search align-items-center">
    <div class="d-flex flex-row justify-content-center search-text">
      <div class="d-flex pr-3">
        <el-select
          :value="selectedCategory"
          placeholder="--Chọn vai trò--"
          class="frame-select-common-2022 category-select"
          popper-class="frame-select-popper-common-2022"
          @change="changeCategory"
          clearable
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="d-flex">
        <el-input
          v-model="textSearch"
          placeholder="Tìm theo tên"
          class="frame-input-common-2022"
          clearable
          @input="search"
          size="medium"
        ></el-input>
      </div>
    </div>
    <div class="d-flex flex-column list-item">
      <div v-for="item in data" :key="item.id">
        <div
          :class="
            undefined !== selectedValue.id && selectedValue.id === item.id
              ? 'item-search selected-item justify-content-between d-flex flex-row'
              : 'item-search justify-content-between d-flex flex-row'
          "
          @click="setSelectedValue(item)"
        >
          <span>{{ item.name }}</span>
          <img
            v-if="
              undefined !== selectedValue.id && selectedValue.id === item.id
            "
            src="@/static/icon/customer-list/Selected.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MultiSelectSearch",
  data() {
    return {
      textSearch: "",
      data: [],
      selectedValue: {},
      selectedCategory: "",
      categories: [
        {
          name: "Chăm sóc khách hàng",
          value: "care",
        },
        {
          name: "Tư vấn",
          value: "counselor",
        },
        {
          name: "Đặt hàng",
          value: "order",
        },
      ],
    };
  },
  props: {
    items: {
      type: Object,
      require: true,
    },
    value: {
      type: Object,
      require: true,
    },
  },
  created() {
    this.selectedCategory = this.categories[0].value;
    this.data = this.items[this.selectedCategory];
    if (this.value) {
      this.selectedValue = this.value;
    }
  },
  methods: {
    search(value) {
      this.data = this.items[this.selectedCategory].filter((e) =>
        e.name.toLowerCase().includes(value.toLowerCase())
      );
    },
    setSelectedValue(item) {
      this.selectedValue = item;
      this.$emit("change", item, this.selectedCategory);
    },
    changeCategory(value) {
      this.selectedCategory = value;
      this.data = this.items[this.selectedCategory];
    },
  },
};
</script>
<style lang="css" scoped>
.select-search {
  width: 80%;
  margin: auto;
}

.search-text {
  width: 100%;
}
.list-item {
  padding-top: 10px;
  width: 100%;
  height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
}
.item-search {
  padding: 5px 10px;
  width: 99%;
  border-bottom: 0.5px solid #bdd6ee;
}
.item-search span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #000728;
}
.list-item .selected-item {
  background: #e8f3ff;
}
.list-item img {
  padding-right: 10px;
}
</style>
<style>
.category-select .el-input .el-input__inner {
  height: 36px !important;
}
</style>

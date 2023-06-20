<template>
  <div class="d-flex flex-column select-search align-items-center">
    <div class="d-flex justify-content-center search-text">
      <el-input
        v-model="textSearch"
        placeholder="Tìm theo tên"
        class="frame-input-common-2022"
        clearable
        @input="search"
        size="medium"
      ></el-input>
    </div>
    <div class="d-flex flex-column list-item">
      <div v-for="item in data" :key="item.id">
        <div
          :class="
            undefined !== value.id && value.id === item.id
              ? 'item-search selected-item justify-content-between d-flex flex-row'
              : 'item-search justify-content-between d-flex flex-row'
          "
          @click="setSelectedValue(item)"
        >
          <span>{{ item.name }}</span>
          <img
            v-if="undefined !== value.id && value.id === item.id"
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
  name: "SelectSearch",
  data() {
    return {
      textSearch: "",
      data: [],
    };
  },
  props: {
    items: {
      type: Array,
      require: true,
    },
    value: {
      type: Object,
      require: true,
    },
  },
  created() {
    this.data = this.items;
    if (undefined !== this.value && this.value.id !== null) {
      this.selectedValue = this.value;
    }
  },
  methods: {
    search(value) {
      this.data = this.items.filter((e) =>
        e.name.toLowerCase().includes(value.toLowerCase())
      );
    },
    setSelectedValue(item) {
      this.selectedValue = item;
      this.$emit("change", this.selectedValue);
    },
  },
  beforeDestroy() {
    console.log("Mounted destroyed");
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

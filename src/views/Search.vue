<template>
  <div>
    <form action="/">
      <van-search
        style="
          position: fixed;
          top: 0;
          left: 0;
          background-color: white;
          z-index: 999;
          width: 100%;
        "
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="handleCancel"
      />
    </form>
    <ul>
      <li v-for="item in computedCinemaList" :key="item.cinemaId">
        <div class="cinema-info-lf">
          <p class="cinema-name">{{ item.name }}</p>
          <p class="cinema-address">{{ item.address }}</p>
        </div>
        <div class="cinema-info-rt"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";
import {mapMutations, mapState} from "vuex";
import {mapActions} from "vuex";
Vue.use(Search);
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapActions('CinemaModule',['getCinemaList']),
    handleCancel() {
      this.$router.replace("/cinema");
    },
  },
    computed: {
    ...mapState('CinemaModule',["cinemaList"]),
    ...mapState('CityModule',["cityId"]),
  
    computedCinemaList() {
      if (this.value === "") return [];
      return this.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
  mounted() {
    if (this.cinemaList.length === 0) {
      // this.$store.dispatch("getCinemaList", this.$store.state.cityId);
      this.getCinemaList(this.cityId);
    }
  },
};
</script>

<style scoped>
ul {
  margin-top: 45px;
}
li {
  height: 75px;
  padding: 15px;
  list-style: none;
  position: relative;
}
.cinema-name {
  font-size: 15px;
}
.cinema-info-lf {
  width: 280px;
  padding-right: 15px;
  height: 45px;
  position: absolute;
  left: 15px;
  top: 15px;
}
.cinema-info-rt {
  width: 70px;
  height: 45px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.cinema-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgb(121, 125, 130);
  margin-top: 5px;
}
</style>
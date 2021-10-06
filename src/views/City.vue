<template>
  <div>
    <van-nav-bar title="当前城市" left-text="返回" left-arrow> </van-nav-bar>

    <van-index-bar :index-list="computedCityList" @select="handleSelect">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="handleChangeCity(item.name, item.cityId)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Toast } from "vant";
import {mapMutations} from "vuex";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
import http from "@/util/http";
export default {
  data() {
    return {
      cityList: [],
    };
  },
  mounted() {
    http({
      url: "/gateway?k=6885511",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.handleCityData(res.data.data.cities);
      //console.log(res.data.data.cities);
    });
  },
  methods: {
    ...mapMutations('CityModule',["changeCityName","changeCityId"]),
    handleCityData(cities) {
      const letterArr = [];
      const newCities = [];
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code));
      }

      letterArr.forEach((letter) => {
        let list = cities.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        );
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list,
          });
        }

        this.cityList = newCities;
      });
    },
    handleSelect(index) {
      Toast(index);
    },
    handleChangeCity(name, cityId) {
      //this.$store.state.cityName = name
      // this.$store.commit("changeCityName", name);
      // this.$store.commit("changeCityId", cityId);
      this.changeCityId(cityId);
      this.changeCityName(name);
      this.$router.back();
    },
  },
  computed: {
    computedCityList() {
      return this.cityList.map((item) => item.type);
    },
  },
};
</script>

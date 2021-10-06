<template>
  <div>
    <filmswiper
      v-if="datalist.length > 0"
      :filmList="datalist"
      style="width: 100%; height: 195px"
    >
      <!-- <div v-for="item in datalist" :key="item.bannerId" class="swiper-slide">
                <img style="width:100%;height:100%" :src="item.imgUrl">
            </div> -->
    </filmswiper>

    <filmheader
      style="position: sticky; top: 0; background-color: #fff; z-index: 999"
    ></filmheader>

    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import filmheader from "./film/FilmHeadrer.vue";
import axios from "../../node_modules/axios/index";
import filmswiper from "./film/FilmSwiper.vue";
import http from "@/util/http";
import {mapState} from "vuex";
// Vue.component("filmheader",filmheader)
// Vue.component('filmswiper',filmswiper)
export default {
  data() {
    return {
      datalist: [],
    };
  },
  computed:{
    ...mapState('CityModule',["cityId"])
  },
  mounted() {
    http({
      url: `/gateway?type=2&cityId=${this.cityId}&k=3545357`,
      headers: {
        "X-Host": "mall.cfg.common-banner",
      },
    }).then((res) => {
      //console.log(res.data.data);
      this.datalist = res.data.data;
    });
  },
  components: {
    filmheader,
    filmswiper,
  },
};
</script>

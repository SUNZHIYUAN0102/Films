<template>
  <div>
    <van-nav-bar title="影院" left-text="返回" @click-left="onClickLeft">
      <template #left>
        {{ cityName }}
        <van-icon name="arrow-down" size="14" color="#797d82" />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="18"
          color="#797d82"
          @click="onClickRight"
        />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{ height: '{{this.height}}' }">
      <ul>
        <li v-for="item in cinemaList" :key="item.cinemaId">
          <div class="cinema-info-lf">
            <p class="cinema-name">{{ item.name }}</p>
            <p class="cinema-address">{{ item.address }}</p>
          </div>
          <div class="cinema-info-rt"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
import Vue from "vue";
import BScroll from "better-scroll";
import { NavBar } from "vant";
import { Icon } from "vant";
import {mapState} from "vuex";
import {mapMutations} from "vuex";
import {mapActions} from "vuex";
Vue.use(Icon);
Vue.use(NavBar);
export default {
  data() {
    return {
      height: 0,
    };
  },
  computed:{
    ...mapState('CityModule',["cityName","cityId"]),
    ...mapState('CinemaModule',["cinemaList"])
  },
  methods: {
    ...mapMutations('CinemaModule',["clearCinemaList","setCinemaList"]),
    ...mapActions('CinemaModule',["getCinemaList"]),
    onClickLeft() {
      this.clearCinemaList();
      // this.$store.commit("clearCinemaList");
      this.$router.push("/city");
    },
    onClickRight() {
      this.$router.push("/cinema/search");
    },
  },
  mounted() {
    if (this.cinemaList.length === 0) {
      // this.$store.dispatch("getCinemaList", this.cityId);
      this.getCinemaList(this.cityId);
    } else {
      console.log("缓存");
    }
    this.height = document.documentElement.clientHeight - 50 + "px";
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=7982670`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   //console.log(res.data.data);
    //   this.cinemaList = res.data.data.cinemas;
    //   // this.$nextTick(() => {
    //   //   new BScroll(".cinema", {
    //   //     scrollbar: true,
    //   //   });
    //   // });
    // });
  },
};
</script>

<style scoped>
.cinema {
  overflow: hidden;
}
.header {
  height: 44px;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  top: 0;
  left: 0;
}
.left {
  flex: 1;
}
.title {
  flex: 2;
  text-align: center;
}
.right {
  flex: 1;
  text-align: center;
}
ul{
  margin-bottom: 60px;
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

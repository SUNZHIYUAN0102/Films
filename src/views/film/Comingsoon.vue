<template>
  <div style="postion: fixed; left: 0; bottom: 50px">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in datalist"
        :key="item.filmId"
        @click="handleClick(item.filmId)"
      >
        <div class="all">
          <div class="pic">
            <img :src="item.poster" alt="" />
          </div>
          <div class="info">
            <h3>{{ item.name }}</h3>
            <div>
              <span class="label">观众评分</span>
              <span style="color: #ffb232">{{ item.grade }}</span>
            </div>

            <div class="actor">
              <span class="label">主演:</span>
              <!-- <span class="label" v-for="(actor,index) in item.actors" :key="index">
                    {{actor.name}}
              </span> -->
              <span class="label">
                {{ item.actors | actorFilter }}
              </span>
            </div>
            <span class="label"
              >上映日期: {{ item.premiereAt | dateFilter }}</span
            >
          </div>
          <div class="buy"></div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios/index";
import Vue from "vue";
import { List } from "vant";
import { Cell } from "vant";
import http from "@/util/http";
import moment from "../../../node_modules/moment";
import {mapState} from "vuex";

Vue.use(List);
Vue.use(Cell);
Vue.filter("actorFilter", (actors) => {
  if (actors === undefined) return "暂无主演";
  return actors.map((item) => item.name).join(" ");
});
Vue.filter("dateFilter", (date) => {
  return moment(date).format("MMMM Do YYYY");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },
  methods: {
    onLoad() {
      console.log("到底了");
      if (this.datalist.length === this.total) {
        this.finished = true;
        return;
      }
      this.current++;

      axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=5227612`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16316976691890352545923073","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films];
        this.loading = false;
      });
    },
    handleClick(id) {
      this.$router.push(`/detail/${id}`);

      // this.$router.push({name:'meowDetail', params:{
      //     myid:id
      // }})

      //this.$router.push(`/detail?id=${id}`)
    },
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=381604`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
      // console.log(res.data.data.films);
    });
  },
  computed:{
    ...mapState("CityModule",["cityId"])
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.van-list {
  list-style: none;
  margin-bottom: 70px;
}
.van-cell {
  padding: 15px;
}
.all {
  display: flex;
  justify-content: space-between;
}
ul li:last-child {
  margin-bottom: 30px;
}
.pic {
  flex: 1;
  display: inline-block;
}
.label {
  font-size: 13px;
  color: #797d82;
}
img {
  width: 66px;
  height: 100%;
}

.actor {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  overflow: hidden;
}
.buy {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buy::after {
  content: "预购";
  display: block;
  width: 50px;
  height: 25px;
  border: 1px solid #ff5f16;
  color: #ff5f16;
  text-align: center;
  line-height: 25px;
}
</style>

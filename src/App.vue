<template>
  <div>
    <router-view></router-view>
    <tabbar v-show="this.isTabbarShow"></tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import tabbar from "./components/Tabbar.vue";
import axios from "axios";
import {mapState} from "vuex";

Vue.component("tabbar", tabbar);
export default {
  data() {
    return {};
  },
  computed:{
    ...mapState('TabbarModule',["isTabbarShow"])
  },
  mounted() {
    //  axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then(res => {
    //     console.log(res.data);
    // })
    // axios.get("/ajax/movieOnInfoList?token=&optimus_uuid=E4723B80160211EC80C4B7D03B81DA30255669F55AAD4952B655F50BAA89C1CE&optimus_risk_level=71&optimus_code=10").then(res => {
    //     console.log(res.data);
    // })
    // axios({
    //     url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5227612',
    //     headers:{
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16316976691890352545923073","bc":"110100"}',
    //         'X-Host': 'mall.film-ticket.film.list'
    //     }
    // }).then(res=>{
    //     console.log(res.data);
    // })
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  touch-action: manipulation;
}
</style>

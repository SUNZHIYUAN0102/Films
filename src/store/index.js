import Vue from "vue";
import Vuex from "vuex";
import http from "../util/http";
import CityModule from "./module/CityModule"
import TabbarModule from "./module/TabbarModule"
import CinemaModule from "./module/CinemaModule"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        // cityId: "310100",
        // cityName: "上海",
        // isTabbarShow: true,
        // cinemaList: [],
    },
    mutations: {
        // changeCityName(state, name) {
        //   state.cityName = name;
        // },
        // changeCityId(state, cityId) {
        //   state.cityId = cityId;
        // },
        // hide(state) {
        //   state.isTabbarShow = false;
        // },
        // show(state) {
        //   state.isTabbarShow = true;
        // },
        // setCinemaList(state, cinemaList) {
        //   state.cinemaList = cinemaList;
        // },
        // clearCinemaList(state) {
        //   state.cinemaList = [];
        // },
    },
    actions: {
        // getCinemaList(store, cityId) {
        //   http({
        //     url: `/gateway?cityId=${cityId}&ticketFlag=1&k=7982670`,
        //     headers: {
        //       "X-Host": "mall.film-ticket.cinema.list",
        //     },
        //   }).then((res) => {
        //     //console.log(res.data);
        //     store.commit("setCinemaList", res.data.data.cinemas);
        //   });
        // },
    },
    modules: {
        CityModule,
        CinemaModule,
        TabbarModule
    },
});
<template>
  <v-touch v-on:swiperight="onSwipeRight">
    <div v-if="filmInfo">
      <detail-header v-top :name="filmInfo.name"></detail-header>
      <div
        class="filmheader"
        :style="{ backgroundImage: 'url(' + filmInfo.poster + ')' }"
        style="background-size: cover; background-position: center"
      ></div>
      <div class="filmdetail">
        <div
          style="
            font-size: 18px;
            color: rgb(25, 26, 27);
            font-weight: 400;
            height: 24px;
          "
        >
          <span>{{ filmInfo.name }}</span>
          <span class="type">{{ filmInfo.filmType.name }}</span>
          <span style="color: #ffb232; float: right; font-style: italic"
            >{{ filmInfo.grade }}分</span
          >
        </div>
        <p class="label">{{ filmInfo.category }}</p>
        <p class="label">{{ filmInfo.premiereAt | dateFilter }} 上映</p>
        <p class="label">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</p>
        <div :class="isShow ? 'font' : 'synopsis'">{{ filmInfo.synopsis }}</div>
        <span @click="isShow = !isShow" class="arrowdown"></span>
      </div>

      <div class="actors">
        <div class="actors-title">
          <span style="font-size: 16px">演职人员</span>
        </div>
        <detail-swiper :perslide="4" swiperclass="swiper-actor">
          <div
            class="swiper-slide"
            v-for="(data, index) in filmInfo.actors"
            :key="index"
          >
            <div
              :style="{ backgroundImage: 'url(' + data.avatarAddress + ')' }"
              style="
                width: 85px;
                height: 87px;
                background-size: cover;
                background-position: center;
              "
            ></div>
            <p style="font-size: 12px; text-align: center; margin-top: 2px">
              {{ data.name }}
            </p>
            <p
              style="
                font-size: 12px;
                color: rgb(121, 125, 130);
                text-align: center;
                margin-bottom: 2px;
              "
            >
              {{ data.role }}
            </p>
          </div>
        </detail-swiper>
      </div>

      <div class="photos">
        <div class="photos-title">
          <span style="font-size: 16px">剧照</span>
        </div>
        <detail-swiper :perslide="2" swiperclass="swiper-photos">
          <div
            class="swiper-slide"
            v-for="(data, index) in filmInfo.photos"
            :key="index"
          >
            <div
              :style="{ backgroundImage: 'url(' + data + ')' }"
              style="
                width: 175px;
                height: 100px;
                background-size: cover;
                background-position: center;
                margin-bottom: 15px;
              "
              @click="handleClick(index)"
            ></div>
          </div>
        </detail-swiper>
      </div>
    </div>
  </v-touch>
</template>

<script>
import http from "@/util/http.js";
import Vue from "vue";
import moment from "moment";
import detailSwiper from "./detail/DetailSwiper.vue";
import detailHeader from "./detail/DetailHeader.vue";
import { ImagePreview } from "vant";
import { mapMutations } from "vuex";
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });
Vue.use(ImagePreview);
Vue.filter("dateFilter", (dates) => {
  // var date = new Date(dates*1000);
  // return date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' + date.getDate() + ' ';
  return moment(dates * 1000).format("YYYY-MM-DD");
});
Vue.directive("top", {
  inserted(el) {
    el.style.display = "none";
    window.onscroll = () => {
      if (
        (document.body.scrollTop || document.documentElement.scrollTop) > 25
      ) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  unbind() {
    window.onscroll = "none";
  },
});
export default {
  data() {
    return {
      filmInfo: false,
      isShow: false,
    };
  },
  components: {
    detailSwiper,
    detailHeader,
  },

  mounted() {
    //console.log(this.$route.params.myid);
    //console.log(this.$route.query.id);
    this.hide();
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=9123069`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      console.log(res.data.data.film);
      this.filmInfo = res.data.data.film;
    });
  },
  beforeDestroy() {
    this.show();
  },
  methods: {
    ...mapMutations("TabbarModule", ["hide", "show"]),
    handleClick(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        closeable: true,
        startPosition: index,
        closeIconPosition: "top-left",
      });
    },
    onSwipeRight() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.filmheader {
  width: 100%;
  height: 210px;
}

.filmdetail {
  width: 100%;
  padding: 15px;
}
.type {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 4px 4px;
}

.label {
  font-size: 13px;
  color: rgb(121, 125, 130);
  margin-top: 3px;
  height: 20px;
}
.font {
  font-size: 13px;
  color: rgb(121, 125, 130);
  margin-top: 15px;
}

.synopsis {
  font-size: 13px;
  color: rgb(121, 125, 130);
  margin-top: 15px;
  height: 35px;
  overflow: hidden;
  text-overflow: clip;
  transition: 1s linear;
}
.arrowdown {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  transform: rotate(135deg);
}

.actors {
  margin-top: 10px;
  width: 100%;
}

.actors-title {
  height: 55px;
  padding: 15px;
}

.photos {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 90px;
}

.photos-title {
  height: 55px;
  padding: 15px;
}
</style>

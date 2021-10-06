<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in filmList" :key="item.bannerId">
        <img style="width: 100%; height: 100%" :src="item.imgUrl" />
      </div>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  props: ["filmList"],
  mounted() {
    const swiper = new Swiper(".swiper", {
      loop: true,
      autoplay: true,

      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
};
</script>

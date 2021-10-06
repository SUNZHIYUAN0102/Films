<template>
  <div class="swiper" :class="swiperclass">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perslide: {
      type: Number,
      default: 1,
    },
    swiperclass: {
      type: String,
      default: "swiper",
    },
  },
  mounted() {
    const swiper = new Swiper("." + this.swiperclass, {
      slidesPerView: this.perslide,
      spaceBetween: 3,
    });
  },
};
</script>

<style scoped>
.swiper {
  padding-left: 15px;
}
</style>

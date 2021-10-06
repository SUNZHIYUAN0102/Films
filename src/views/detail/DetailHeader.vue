<template>
  <div>
    <svg @click="handleClick" class="icon icon-arrow-left">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
    {{ name }}
  </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    handleClick() {
      this.$router.push("/film");
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
svg {
  vertical-align: middle;
  position: absolute;
  left: 20px;
  top: 14px;
}
</style>

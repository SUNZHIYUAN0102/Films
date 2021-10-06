<template>
  <div>
    <ul>
      <router-link to="/film/nowplaying" tag="li" active-class="meow"
        ><span>正在热映</span></router-link
      >
      <router-link to="/film/comingsoon" tag="li" active-class="meow"
        ><span>即将上映</span></router-link
      >
    </ul>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div {
  width: 100%;
  height: 50px;
}
ul {
  height: 50px;
  list-style: none;
  display: flex;
  justify-content: space-around;
}
li {
  display: flex;
  align-items: center;
}
.meow {
  color: #ff5f16;
  border-bottom: 2px solid #ff5f16;
}
span {
  font-size: 14px;
}
</style>

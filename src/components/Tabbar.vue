<template>
  <nav>
    <ul>
      <router-link to="/film" tag="li" active-class="Meow">
        <svg class="icon icon-film"><use xlink:href="#icon-film"></use></svg>
        <span>电影</span>
      </router-link>
      <router-link to="/cinema" tag="li" active-class="Meow">
        <svg class="icon icon-ticket">
          <use xlink:href="#icon-ticket"></use>
        </svg>
        <span>影院</span>
      </router-link>
      <router-link to="/center" tag="li" active-class="Meow">
        <svg class="icon icon-user"><use xlink:href="#icon-user"></use></svg>
        <span>我的</span>
      </router-link>
    </ul>
  </nav>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
nav {
  width: 100%;
  height: 60px;
  background: #fff;
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
li {
  flex: 1;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.Meow {
  color: #ff5f16;
}
nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
}
</style>

<template>
  <div id="app">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-md-4"><img src="./assets/logo.png" id="logo"></div>
        <div class="col-md-8">
          <nav class="nav justify-content-end">
            <a class="nav-link active" href="#">Developments</a>
            <a class="nav-link" href="#">Offsets</a>
            <a class="nav-link" href="#">Statistics</a>
          </nav>
        </div>
      </div>
    </div>
    
    <div id="app-container"><div class="container">
      <div>
        <router-view/>
      </div>
    </div></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app-container {
  background-color: #eff8ff;
  margin-top: 15px; 
  padding-top: 30px;
}
#app {
  margin-top: 10px;
  margin-bottom: 30px;
}
#logo {
  width: 100%;
} 
</style>

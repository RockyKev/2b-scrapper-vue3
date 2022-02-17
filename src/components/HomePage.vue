<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <working-chart />
    <footer-section />
  </div>
</template>

<script>
import WorkingChart from "./WorkingChart.vue";
import FooterSection from "./FooterSection.vue";

export default {
  name: "HomePage",
  components: {
    WorkingChart,
    FooterSection
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div>
    <canvas ref="productsBar" aria-label="data chart" role="img">
      <p>You're using a unsupported browser</p>
    </canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

export default {
  name: "WorkingChart",
  data() {
    return {
      // values: [5, 3.2, 4.4, 4.2, 5.8, 7.8, 1],
      baseUrl: process.env.VUE_APP_BASE_URL,
      jsonData: {},
      theLabels: [],
      theData: [],
      isReady: false,
    };
  },
  created() {
    Chart.register(...registerables);
    this.fetchData();
  },
  // mounted() {
  //   // let ctx = this.$refs.productsBar.getContext("2d");

  // },
  methods: {
    fetchData() {
      if (!this.isReady) {
        axios.get(this.baseUrl + "data.json").then((response) => {
          this.jsonData = response.data;
          this.cleanData();
          this.generateMap();
          this.isReady = true;
        });
      }
    },
    cleanMoney(string) {
      // turns "$150,000/year" into 150000;
      return string.slice(1).replace("/year", "").replace(",", "");
    },
    cleanData() {
      let tempLabels = [];


      let tempFEJuniorSalary = [];
      let tempFEMidSalary = [];
      let tempFESeniorSalary = [];
      let tempAutoJuniorSalary = [];
      let tempSoftwareJuniorSalary = [];
      let tempSoftwareRegularSalary = [];
      let tempSoftwareMidSalary = [];
      let tempSoftwareSeniorSalary = [];

  // { "title": "Front End SEO Developer", "salary": ["$110,000/year"] },
  //   { "title": "Junior Front-End Web Developer", "salary": ["$75,000/year"] },
  //   { "title": "Front-End Web Developer", "salary": ["$110,000/year"] },
  //   { "title": "Senior Front-End Web Developer", "salary": ["$150,000/year"] },
  //   { "title": "Marketing Content Writer", "salary": ["$60,000/year"] },
  //   { "title": "Product Manager", "salary": [] },
  //   { "title": "Junior Automation Engineer", "salary": ["$55,000/year"] },
  //   { "title": "Junior Software Engineer", "salary": ["$70,000"] },
  //   { "title": "Software Engineer", "salary": ["$85,000", "$100,000/year"] },
  //   { "title": "Mid Software Engineer", "salary": ["$140,000/year**$10,000"] },

      for (const key in this.jsonData) {

        // TODO: Do a check where you test the previous loop to see if it's the same. 
        // if it's the same, cancel it. 

        console.log("im running", key);
        const datapoint = this.jsonData[key];

        // 1 - get readable timestamp and pass it to the labels
        tempLabels.push(datapoint["readable-timestamp"]);

        // 2 - get the title of one job
        const filter = datapoint["salaries"].filter(
          (job) => job.title === "Front-End Web Developer"
        );

        // 3 - get the salary point if that filter is true
        let salary = filter ? this.cleanMoney(filter[0].salary[0]) : 0;
        tempSalary.push(salary);
      }

      this.theLabels = tempLabels;
      this.theData = tempSalary;
      // console.log("the theLabels");
      // console.log(this.theLabels);
      // console.log("the theData");
      // console.log(this.theData);
    },
    generateMap() {
      let ctx = this.$refs.productsBar.getContext("2d");
      const data = {
        labels: this.theLabels,
        datasets: [
          {
            label: "Front-End Web Developer",
            data: this.theData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
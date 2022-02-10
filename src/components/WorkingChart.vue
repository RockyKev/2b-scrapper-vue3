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
      baseUrl: process.env.VUE_APP_BASE_URL,
      jsonData: {},
      theLabels: [],
      theData: {},
      isReady: false,
    };
  },
  created() {
    Chart.register(...registerables);
    this.fetchData();
  },
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
      // check if there's a bonus

      // turns "$150,000/year" into 150000;
      return string.slice(1).replace("/year", "").replace(",", "");
    },
    cleanData() {
      
      // TODO: fix ones that have bonuses 
      let tempLabels = [];
      let finalData = [];
      let jobNames = {
        "Landing Page Designer/Developer": [],
        "Front End SEO Developer": [],
        "Junior Front-End Web Developer": [],
        "Front-End Web Developer": [],
        "Senior Front-End Web Developer": [],
        "Junior Automation Engineer": [],
        "Junior Software Engineer": [],
        "Software Engineer": [],
        // 'Mid Software Engineer': [] // FIX THIS - has bonus
        // "Senior Software Engineer (Ruby on Rails)": [] // FIX THIS - has bonus
      };

      for (const key in this.jsonData) {
        // TODO: Do a check where you test the previous loop to see if it's the same.
        // if it's the same, cancel it.
        const datapoint = this.jsonData[key];
        console.log(datapoint);

        // 1 - get readable timestamp and pass it to the labels
        tempLabels.push(datapoint["readable-timestamp"]);

        // 2 - get the title of one job
        // 3 - get the salary point if that filter is true

        // get these jobs
        for (const jobName in jobNames) {
          const jobData = datapoint["salaries"].filter(
            (job) => job.title === jobName
          );

          jobNames[jobName].push(
            jobData ? this.cleanMoney(jobData[0].salary[0]) : 0
          );
        }
      }

      // generate the chart Data
      for (const jobName in jobNames) {
        finalData.push(
          this.generateDataSet(jobName, jobNames[jobName], this.randomRGB())
        );
      }

      console.log(finalData);

      this.theLabels = tempLabels;
      // this.theData = [
      //   this.generateDataSet("Junior Front-End Web Developer", tempFEJuniorSalaryArray, this.randomRGB()),
      //   this.generateDataSet("Front-End Web Developer", tempFEMidSalaryArray, this.randomRGB()),
      // ];

      this.theData = finalData;
    },
    randomRGB() {
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      return `rgb(${r},${g},${b})`;
    },
    generateDataSet(label, salary, color) {
      return {
        label: label,
        data: salary,
        fill: false,
        borderColor: color,
        tension: 0.1,
      };
    },
    generateMap() {
      let ctx = this.$refs.productsBar.getContext("2d");
      const data = {
        labels: this.theLabels,
        datasets: this.theData,
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
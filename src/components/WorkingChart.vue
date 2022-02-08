<template>
  <div>
    <canvas ref="productsBar" aria-label="data chart" role="img">
      <p>You're using a unsupported browser</p>
    </canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  name: "RandomChart3",
  data() {
    return {
      values: [5, 3.2, 4.4, 4.2, 5.8, 7.8, 1],
    };
  },
  created() {
    Chart.register(...registerables);
  },
  mounted() {
    let ctx = this.$refs.productsBar.getContext("2d");

    // new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    //     datasets: [
    //       {
    //         label: "",
    //         data: this.values,
    //         backgroundColor: "#009444",
    //         borderColor: "#009444",
    //         borderWidth: 1,
    //         barPercentage: 0.1,
    //         borderRadius: 5,
    //       },
    //     ],
    //   },
    // });

    // const data = {
    //     labels: ["ROY", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)",
    //         ],
    //         borderColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)",
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    // }

    // new Chart(ctx, {
    //   type: "bar",
    //   data: data,
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    // const data = {
    //   "timestamp:": 1644208818443,
    //   "readable-timestamp": "2022-02-07-04-40-18",
    //   salaries: [
    //     { title: "CTO / XTO - Chieftan of tech", salary: ["$400,000"] },
    //     { title: "Chief Marketing Officer", salary: ["$350,000"] },
    //     { title: "Chief Product Officer", salary: ["$350,000"] },
    //     {
    //       title:
    //         "CSO / XSO – Chief Security Officer / Executive Security Officer",
    //       salary: ["$250,000"],
    //     },
    //     { title: "Director of Software Engineering", salary: ["$250,000."] },
    //     { title: "Security Engineer", salary: ["$175,000/year"] },
    //     {
    //       title: "Cyber Security Analyst – Information Systems and Networking",
    //       salary: ["$175,000"],
    //     },
    //     { title: "Security Analyst – Web Applications", salary: ["$175,000"] },
    //     { title: "Marketing Data Analyst", salary: ["$70,000/year"] },
    //     { title: "Landing Page Designer/Developer", salary: ["$110,000/year"] },
    //     { title: "Front End SEO Developer", salary: ["$110,000/year"] },
    //     { title: "Junior Front-End Web Developer", salary: ["$75,000/year"] },
    //     { title: "Front-End Web Developer", salary: ["$110,000/year"] },
    //     { title: "Senior Front-End Web Developer", salary: ["$150,000/year"] },
    //     { title: "Marketing Content Writer", salary: ["$60,000/year"] },
    //     { title: "Product Manager", salary: [] },
    //     { title: "Junior Automation Engineer", salary: ["$55,000/year"] },
    //     { title: "Junior Software Engineer", salary: ["$70,000"] },
    //     { title: "Software Engineer", salary: ["$85,000", "$100,000/year"] },
    //     { title: "Mid Software Engineer", salary: ["$140,000/year**$10,000"] },
    //     {
    //       title: "Senior Software Engineer (Ruby on Rails)",
    //       salary: ["$185,000/year**$25,000"],
    //     },
    //     { title: "VOIP Architect", salary: ["$190,000/year"] },
    //     { title: "VOIP Developer", salary: ["$120,000/year"] },
    //     { title: "Database Administrator", salary: ["$110,000/year"] },
    //     { title: "iOS App Developer", salary: ["$110,000/year"] },
    //     { title: "Android App Developer", salary: ["$110,000/year"] },
    //     { title: "UI/UX Designer", salary: ["$100,000/year"] },
    //     {
    //       title: "Junior Linux Systems Engineer",
    //       salary: ["$65,000", "$80,000/year"],
    //     },
    //   ],
    // };

    // X axis is the date. 
    // Y axis is how much money
    // dataset is each job title, filtered. 

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
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
};
</script>
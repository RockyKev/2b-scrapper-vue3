# 2b-web-scrapper-vue3
[![Netlify Status](https://api.netlify.com/api/v1/badges/a4112435-98fd-4b7e-a4a2-1df0657c191c/deploy-status)](https://app.netlify.com/sites/2b-web-scapper/deploys)

[Demo](https://2b-web-scapper.netlify.app/)
## How this works

1. we have a serverless function scrap data (`node_scripts/get-2b-salary-serverless.js`)

That's done using [cheerio](https://github.com/cheeriojs/cheerio).

It's using pipedream.com under the hood, which runs that code every hour. 

2. then that data gets automatically stored in S3

3. The data is then downloaded from your personal s3 bucket.

You need to set up a `.env` (read below), along with setting up your [aws S3 account](https://aws.amazon.com/getting-started/hands-on/backup-to-s3-cli/). You also need to get the aws-cli, and already set up the aws config to talk to aws from your terminal.

4. The s3 bucket is `.gz`, so we now need to unzip. Which we'll do using `node_scripts/turn-gz-into-data.js`.

5. Finally we're merging the data using `node_scripts/merge-data-into-single.js`

It moves the single data into `public/data.json` (with a backup as well)

All that code can be run with one line. `npm run get-json`

It'll automatically run steps 1-5 sequentially. 

6. Within Vue, it fetches that public data file to create the graph.

The graph is built with [ChartJS](https://www.chartjs.org/). (Originally vue-chartjs but [it has issues with Vue3](https://github.com/apertureless/vue-chartjs/issues/695#issuecomment-912446520))


## Project setup

1. Install dependencies (Use node lts)

```
npm install
```

2. create a `.env` file

```
VUE_APP_BASE_URL=http://localhost:8080/
S3_BUCKET=my_bucket/website-scraping-data/2022/
```

`VUE_APP_BASE_URL` - it's used to self-fetch your json file from the `public` folder, as the data can get massive. This stops it from blocking Vue.

3. Run all the backend scripts

`npm run get-json`

4. Build the project
Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## TODO: 

[x] - migrate node scripts over here
[x] - make the scripts be one command. 
[x] - Fix front page
[x] - rename project
[] - pop on netlify?
[] - footer?


# 2b-web-scrapper-vue3

TODO: 
[x] - migrate node scripts over here
[] - make the scripts be one command. 
[] - Fix front page
[] - rename project

## How this works

1. we have a serverless function scrap data (`get-2b-salary-serverless.js`)
It's using pipedream.com under the hood, which runs that code every hour. 

2. then that data gets automatically stored in S3

3. We want to download that s3 bucket.
You need to set up a `.env` (read below), along with setting up your [aws S3 account](https://aws.amazon.com/getting-started/hands-on/backup-to-s3-cli/). You also need to get the aws-cli, and already set up the aws config to talk to aws from your terminal.

4. The s3 bucket is `.gz`, so we now need to unzip. Which we'll do using `turn-gz-into-data.js`.

5. Finally we're merging the data using `merge-data-into-single.js`

TODO: All that code can be run with one line. TBD

6. 

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

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Links that got me here
https://medium.com/@negarjf/how-to-access-a-static-json-file-in-vue-cli-3-8943dc343f95
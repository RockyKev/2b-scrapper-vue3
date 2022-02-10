const execSync = require('child_process').execSync;
const path = require('path')
require('dotenv').config();

const outputPath = path.resolve(__dirname, "../cheerio_data/aws");

console.log("pulling from S3:", process.env.S3_BUCKET)

try {
    execSync(`aws s3 sync s3://${process.env.S3_BUCKET} ${outputPath}`)
    console.log("successfully pulled S3")
} catch {
    console.error("Something went wrong")
}

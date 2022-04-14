import { TwitterApi } from "twitter-api-v2";
// import sanitizer from "string-sanitizer"
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const twitterClient = new TwitterApi(process.env.BEARER_TOKEN);

const tweets = await twitterClient.v2.search("#indonesia", {
  max_results: 100,
  "tweet.fields": "lang",
});
await tweets.fetchLast(5000);
let tweetsIds = [];
let tweetsJSON = [];
for (const tweet of tweets) {
  if (tweet.lang == "in") {
    if (!tweetsIds.includes(tweet.id)) {
      tweetsIds.push(tweet.id);
      tweetsJSON.push(tweet);
    }
  }
}
fs.writeFile(
  "tweets.json",
  JSON.stringify(tweetsJSON, null, 2),
  function (err) {
    if (err) {
      console.log("Failed writing file");
    } else {
      console.log("Success writing file");
    }
  }
);

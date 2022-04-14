import fs from "fs";
import os from "os";
import sanitizer from "string-sanitizer";

fs.readFile("./tweets.json", "utf8", function (err, data) {
  let linesFiltered = [];
  const tweets = JSON.parse(data);
  for (const tweet of tweets) {
    let cleanedTweet = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    const splitByLine = cleanedTweet.split(/\r?\n/);
    for (const line of splitByLine) {
      if (sanitizer.sanitize(line).length > 0) {
        // remove line with only 1 word in it
        let regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
        if (regexp.test(line)) {
          if (!linesFiltered.includes(line)) {
            linesFiltered.push(line);
          }
        }
      }
    }
  }
  console.log(linesFiltered);
  let number = 1;
  for (const line of linesFiltered) {
    fs.appendFile("./corpus.txt", line + os.EOL, function (err) {
      if (err) {
        console.log("Failed to append data");
      } else {
        console.log("Added data ", number++, "to file");
      }
    });
  }
});

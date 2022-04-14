import fs from "fs";
fs.readFile("./corpus.txt", "utf8", function (err, data) {
  let arr = data.split("\n");
  console.log(arr);
});

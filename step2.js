const { default: axios } = require("axios");
const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  res = await axios.get(url);
  console.log(res);
}

function printText(path){
  if (path.startsWith("http")) {
    webCat(path);
  } else {
    cat(path);
  }
}

let path = process.argv[2];
printText(path);
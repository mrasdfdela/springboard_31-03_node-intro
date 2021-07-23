const { default: axios } = require("axios");
const fs = require("fs");

function cat(path) {
  try {
    let data = fs.readFileSync(path, "utf8");
    return data
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function webCat(url) {
  res = await axios.get(url);
  return res.data;
}

async function outputText(path) {
  if (path.startsWith("http")) {
    data = await webCat(path);
  } else {
    data = cat(path);
  }
  return data;
}

async function main() {
  let path = process.argv[2];

  if (path == '--out') {
    output = process.argv[3];
    input = process.argv[4];
    data = await outputText(input);
    
    fs.writeFile(output,data,'utf8', function(err){
      if (err){
        console.error(err);
        process.exit(1);
      }
      console.log('Success!');
    });
  } else {
    data = await outputText(path);
    console.log(data);
  }
}

main();

// let path = process.argv[2];
// outputText(path)
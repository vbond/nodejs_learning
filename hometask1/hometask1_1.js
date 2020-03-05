var stdin = process.openStdin();

stdin.addListener("data", function(data) {
    console.log("reverse: " + 
         data.toString().trim().split("").reverse().join(""));
  });

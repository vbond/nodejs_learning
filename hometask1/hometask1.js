var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log("reverse: " + 
        d.toString().trim().split("").reverse().join(""));
  });

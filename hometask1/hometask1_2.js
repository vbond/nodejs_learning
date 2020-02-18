//$ npm i linebyline --save
//$ npm i --save csvtojson

const readline = require('linebyline');
const csvtojson = require('csvtojson');
const fs = require('fs')

const outFile = "./csv/hometask1_2.txt";
fs.writeFile(outFile, "", err => {
	if (err) {
		console.error(err);
	}
})

// read all lines
const reader = readline('./csv/hometask1_2.csv');

let header;

// listen for `line` event
reader.on('line', (line, lineCount, byteCount) => {

	if(lineCount == 1) {
		header = line;
		return;
	}

	csvtojson().fromString(header + '\n' + line).subscribe((json) => {
		fs.appendFile(outFile, JSON.stringify(json) + '\n', err => {
			if (err) {
				console.error(err);
			}
		});
	});

}).on('error', (err) => {
	console.error(err);
});



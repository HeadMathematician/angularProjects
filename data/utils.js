'use strict';

const fs = require('fs-extra');
const {join} = require('path');

const loadSqlQueries = async(folderName) => {
    const filePath = join(process.cwd(), 'data', folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = await files.filter(f => f.endsWith('.sql'));
    const queries = {};

    for(const sqlFile of sqlFiles){
        const query = await fs.readFileSync(join(filePath, sqlFile), {encoding: "UTF-8"});
        queries[sqlFile.replace(".sql", "")] = query
    }
    return queries;
}


function prettyTable(data) {
    const keys = Object.keys(data[0]);
    const lengths = {};
    for (let key of keys) {
      lengths[key] = key.length;
    }
    for (let row of data) {
      for (let key of keys) {
        const length = String(row[key]).length;
        if (length > lengths[key]) {
          lengths[key] = length;
        }
      }
    }
    let header = "| ";
    let divider = "+-";
    for (let key of keys) {
      header += `${key.padEnd(lengths[key], " ")} | `;
      divider += "-".repeat(lengths[key]) + "-+-";
    }
    let output = divider + "\n" + header + "\n" + divider + "\n";
    for (let row of data) {
      let line = "| ";
      for (let key of keys) {
        line += `${String(row[key]).padEnd(lengths[key], " ")} | `;
      }
      output += line + "\n" + divider + "\n";
    }
    return output;
  }


module.exports = {
    loadSqlQueries,
    prettyTable,
}
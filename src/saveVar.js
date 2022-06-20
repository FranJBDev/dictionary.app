const saveVar = (data) => {
    var fs = require('fs');
    fs.writeFile("text.csv", data,
        {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        }, function(err) {
        if (err) console.log(err)
    });
}

const animals = require('./animals')
let dict = 'word, gn,\n'
 animals.forEach(e => {
     if (e.fs != undefined) dict += e.fs + ', fs,\n'
     if (e.ms != undefined) dict += e.ms + ', ms,\n'
     if (e.fp != undefined) dict += e.fp + ', fp,\n'
     if (e.mp != undefined) dict += e.mp + ', mp,\n'
 })

 saveVar(dict) //(Buffer.from(dict))
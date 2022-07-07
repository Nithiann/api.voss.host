const fs = require('fs')
const db = require('../firebase')

exports.CSV_Reader = function (req, res) {
    var stream = fs.createReadStream("contacts.csv")
    var reader = require("readline").createInterface({
        input: stream
    })
    var arr = []
    reader.on("line", (row) => arr.push(row.split(",")))

    reader.on("close", () => {
        const contactRef = db.collection("contacts")
        for(let i in arr) {
            let contact = arr[i]
            if (i >= 1) 
                contactRef.doc().set({
                    contact
                })
        }
    })
    res.send("DONE") 
}
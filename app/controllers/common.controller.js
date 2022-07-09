const fs = require('fs')
const bcrypt = require('bcrypt')
const db = require('../firebase')

exports.CSV_Reader = function (req, res, next) {
    var stream = fs.createReadStream("contacts.csv")
    var reader = require("readline").createInterface({
        input: stream
    })
    var arr = []
    reader.on("line", (row) => arr.push(row.split(",")))

    reader.on("close", () => {
        req.contacts = arr
        next()
    })
    
}

exports.hash = function (req, res, next) {
    const salt = 10;
    const { password } = req.body

    try { 
        bcrypt.genSalt(salt, (err, generatedSalt) => {
            req.salt = generatedSalt

            bcrypt.hash(password, generatedSalt, (err, hash) => {
                req.hash = hash
                next()
            })
        })
    } catch (e) {
        if (e) 
            res.status(500).json({ message: e.toString() })
    }
}
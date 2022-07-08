const {db, admin} = require('../firebase')
const contacts = db.collection('contacts')

exports.VERIFY = function (req, res, next) {
}

exports.GET = (req, res) => {
    println("GET");
}

exports.POST = (req, res) => {
};

exports.PUT = (req, res) => {

};

exports.DELETE = (req, res) => {};
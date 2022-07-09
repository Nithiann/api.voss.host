const { db, admin } = require('../firebase')
const assert = require('assert');

exports.VERIFY = function (req, res, next) {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var phoneRegex = /^\+[1-9]\d{1,14}$/; 
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        assert(typeof email === 'string', 'email is missing');
        assert.notEqual(email, '', 'email must have a value');
        assert.match(email, emailRegex, 'must be an email');
        assert(typeof password === 'string', 'password is missing');
        assert.notEqual(password, '', 'password must have a value');
        assert.ok(password.length > 7);
        assert(typeof firstName === 'string', 'first name is missing');
        assert.notEqual(firstName, '', 'first name must have a value');
        assert(typeof lastName === 'string', 'last name is missing');
        assert(typeof phone === 'string', 'phone is missing');
        assert.notEqual(phone, '', 'phone must have a value');
        assert.match(phone, phoneRegex, 'Must be a valid phoneNumber');
        next();
      } catch (err) {
        console.log(err, 'an error has occured: ');
        res.status(400).json({
          message: err.toString()
        });
      }
}

exports.GET = (req, res) => {
    try {
        admin.auth().listUsers().then(users => {
            res.send(users)
        }).catch(err => console.log(err));
    } catch (err) {
        console.error(err, 'an error has occured' + err.toString())
        res.status(500).json({success: false, message: err.message})
    }
}

exports.GETbyMail = (req, res, next) => {
    admin.auth().getUserByEmail(req.body.email)
    .then(users => {
        req.uid = users[0].uid
        next()  
    })
    .catch(err => res.status(500).json({success: false, message: err.message}));
}

exports.POST = (req, res) => {
    const {email, password, firstName, lastName, phone} = req.body
    try {
        console.log(req.salt) 
        admin.auth().createUser({
            email: email,
            displayName: firstName + " " + lastName,
            passwordSalt: req.salt.toString(),
            passwordHash: req.hash.toString(),
            phoneNumber: phone
        })
        .then(result => res.status(200).json({success: true, message: result}))
        .catch(err => res.status(500).json({success: false, message: err.message}))
    } catch (e) {
        console.error(e)
    }
}

exports.PUT = (req, res) => {
    const {email, password, firstName, lastName, phone} = req.body
    const id = req.params.id

    admin.auth()
    .updateUser(id, {email: email, password: password, displayName: firstName + " " + lastName, phoneNumber: phone})
    .then(result => res.status(200).json({success: true, message: result}))
    .catch(err => res.status(500).json({success: false, message: err.message}))
}

exports.DELETE = (req, res) => {
    const id = req.params.id

    try {
        console.log(id)
        admin.auth().deleteUser(id)
        .then(result => res.status(200).json({success:true, message: result}))
        .catch(err => res.status(500).json({success: false, message: err.message}))
    } catch (e) {
        console.error(e)
    }
}
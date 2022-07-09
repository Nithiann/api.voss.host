const {db, admin} = require('../firebase')
const contacts = db.collection('contacts')

exports.GET = function (req, res) {
    let id = req.params.id


        contacts.get(id)
        .then(contact => {
            console.log(contact);
            res.status(200).json({success: true, message: contact})
        })
        .catch(err =>  res.status(500).json({success: false, message: err.message}))
    
}

exports.POST = function (req, res) {
    const contactRef = db.collection("contacts")
        for(let i in req.contacts) {
            let contact = req.contacts[i]
            if (i >= 1) {
                try {
                    contactRef.doc().set({
                        contact
                    })
                    res.status(200).json({success: true, message: 'done'})
                } catch (e) {
                    res.status(500).json({success: false, message: e.message})
                }
            }
        }
}

exports.DELETE = function (req, res) {
    let id = req.params.id

    contacts.delete(id)
    .then(() => res.status(200).json({success: true, message: "done"}))
    .catch(err => res.status(500).json({success: false, message: err.message}))
}
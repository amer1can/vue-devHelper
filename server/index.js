const express = require('express');
const cors = require('cors');
const DB = require('./db');
const Notes = require('./notes');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db = new DB('userdb')
const notesDb = new Notes('notesdb')
const app = express()

app.use(cors())

//- user routes
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', function(req, res) {
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        req.body.is_admin
    ], function (err) {
        if (err) return res.status(500).send("There was a problem registering the user.")

        db.selectByEmail(req.body.email, (err, user) => {
            if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400})
            res.status(200).send({
                auth: true,
                token,
                user
            })
        })
    })
})
router.post('/register-admin', function(req, res) {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        req.body.is_admin
    ], function (err) {
        if (err) return res.status(500).send("There was a problem registering the admin.")

        db.selectByEmail(req.body.email, (err, user) => {
            if (err) return res.status(500).send("There was a problem getting admin")
            let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400})
            res.status(200).send({
                auth: true,
                token,
                user
            })
        })
    })
})
router.get('/me', function(req, res) {
    let token = req.headers['x-access-token']
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    })

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        })
        res.status(200).send(decoded)
    })
})
router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server')
        if (!user) return res.status(404).send('No user found')

        let passIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
        if (!passIsValid) return res.status(401).send({
            auth: false,
            token: null
        })

        let token = jwt.sign({id: user.id}, config.secret, { expiresIn: 86400 })
        res.status(200).send({
            auth: true,
            token,
            user
        })
    })
})

router.get('/all', (req, res) => {
    db.selectAll((err, rows) => {
        if (err) return res.status(500).send('Error on the server')
        res.status(200).send(rows)
    })
})

router.patch('/updateFavorites/:id',  (req, res) => {
    db.updateFavorites(req.body.data, req.params.id, (err) => {
        if (err) return res.status(500).send('Error on the server')
        res.status(200).send('Updated favorites')
    })
})

app.use(router)

//- notes routes
const notesRouter = express.Router()
notesRouter.use(bodyParser.urlencoded({ extended: false }))
notesRouter.use(bodyParser.json())

notesRouter.get('/', (req, res) => {
    //- Список статей
    notesDb.showAll((err, data) => {
        if (err) return res.status(500).send('Error on the server')
        res.status(200).send(data)
    })
})
notesRouter.get('/:id', (req, res) => {
    //- Статья по ID
    notesDb.findById(req.params.id, (err, data) => {
        if (err) return res.status(500).send('There was a problem finding the note.')
        res.status(200).send(data)
    })
})
notesRouter.post('/', (req, res) => {
    //- Новая статья
    notesDb.addNote([
        req.body.title,
        req.body.section,
        req.body.text,
        req.body.tags,
        0,
        0
    ], (err) => {
        if (err) return res.status(500).send("There was a problem creating the note.")
        res.status(200).send('Note created successfully')
    })
})
notesRouter.patch('/:id', (req, res) => {
    //- Изменить статью
    notesDb.updateById( [
        req.body.title,
        req.body.section,
        req.body.text,
        req.body.tags,
        req.params.id,
    ],
        (err) => {
        if (err) return res.status(500).send("There was a problem updating note.")
        res.status(200).send('Note successfully updated')
    })
})
notesRouter.delete('/:id', (req, res) => {
    //- Удалить статью
    notesDb.deleteById(req.params.id, (err) => {
        if (err) return res.status(500).send('There was a problem deleting the note.')
        res.status(200).send('Note successfully deleted')
    })
})

notesRouter.patch('/updateViews/:id', (req, res) => {
    notesDb.updateViews(req.params.id, (err) => {
        if (err) return res.status(500).send('Error on the server')
        res.status(200).send('Updated favorites')
    })
})

app.use('/notes', notesRouter)



const port = process.env.PORT || 3001
app.listen(port, ()=> {
    console.log('Express server listening on port ' + port)
})

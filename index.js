const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password // naturally, replace both with your real credentials or an application-specific password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async  (req, res) => {

    const {name, email, message} = req.body

    // let info = await transporter.sendMail({
    //     from: name, // sender address
    //     to: "alexeisamuta@gmail.com", // list of receivers
    //     subject: email, // Subject line
    //     text: "Если тебе пришло и ты читаешь это, у тебя все получится)!!!!!", // plain text body
    //     html: `<div><b>Привет</b> ${message}</div>`, // html body
    // });
    res.send('Ok!!')
    res.send(name)
    res.send(email)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
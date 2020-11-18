const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3010


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexeisamuta@gmail.com',
        pass: '725z79z32z' // naturally, replace both with your real credentials or an application-specific password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage', async  (req, res) => {
    let info = await transporter.sendMail({
        from: "HR WANTS ME", // sender address
        to: "pacanenok95@gmail.com", // list of receivers
        subject: "HR WANTS ME", // Subject line
        text: "Если тебе пришло и ты читаешь это, у тебя все получится)!!!!!", // plain text body
        html: "<b>Привет</b> Если тебе пришло и ты читаешь это, у тебя все получится)", // html body
    });

    res.send('Ok!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
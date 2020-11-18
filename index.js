const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 80

const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "HR WANTS ME",
        to: "alexeisamuta@gmail.com",
        subject: "HR WANTS ME",
        // text: "",
        html: `<div>
            <div>name: ${name}</div>
            <div>email: ${email}</div> 
            <div>${message}</div>
            </div>`,
    });
    res.send('Ok!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
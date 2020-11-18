const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN || 'alexeisamuta@gmail.com'
const smtp_password = process.env.SMTP_PASSWORD || '725z79z32z'

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

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "HR WANTS ME", // sender address
        to: "alexeisamuta@gmail.com", // list of receivers
        subject: "HR WANTS ME", // Subject line
        // text: "", // plain text body
        html: `<div>
            <div>name: ${name}</div>
            <div>email: ${email}</div> 
            <div>${message}</div>
                </div>`, // html body
    });
    res.send('Ok!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
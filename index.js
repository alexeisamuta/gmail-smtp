const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3010

const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

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
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {


    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "Message with portfolio",
        to: "alexeisamuta@gmail.com",
        subject: "Message with portfolio",
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
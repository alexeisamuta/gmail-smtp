const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3010

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "alexeisamuta@gmail.com",
        pass: "725z79z32z"
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "HR WANTS ME",
        to: "alexeisamuta@gmail.com",
        subject: "HR WANTS ME",
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
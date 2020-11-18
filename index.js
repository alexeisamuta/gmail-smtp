const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3010

const smtp_login = process.env.SMTP_LOGIN || "alexeisamuta@gmail.com"
const smtp_password = process.env.SMTP_PASSWORD || "725z79z32z"



app.use(cors())

app.use(function (req, res, next) {
    var origins = [
        'http://localhost:3000/',
        'https://alexeisamuta.github.io/',
        'https://smtp-server-for-portfolio-node.herokuapp.com/'
    ];

    for(var i = 0; i < origins.length; i++){
        var origin = origins[i];

        if(req.headers.origin.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
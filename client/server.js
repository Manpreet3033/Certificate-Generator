const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email',async (req,res)=>{
    const {name,certification,email,start,end,pdfData} = req.body;

    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'mailercertificate@gmail.com',
                pass: 'rihw cxes ckce btug'
            }
        });
        const mailOptions = {
            from: 'mailercertificate@gmail.com',
            to: email,
            subject: 'Internship Completion Certificate',
            text: 'Hey intern, \nWe wanted to extend our sincere gratitude and appreciation for the hard work and dedication you put into completing the task assigned to you. \nYour commitment to excellence and attention to detail did not go unnoticed, and we are thrilled with the results of your efforts. The task that you completed was of great significance to our organization, and we are proud to have had the opportunity to work with someone as talented as you. \nOnce again, thank you for your time and effort in completing the task assigned to you. Your dedication to excellence is a testament to your character and work ethic, and we wish you all the best in your future endeavors. \nHere is your certificate.',
            attachments: [
                {
                filename: 'Internship-Certificat.pdf',
                content: Buffer.from(pdfData,'base64')
            },
        ]
        }
        const info = transporter.sendMail(mailOptions)
        console.log('Email Sent: ',info.response);
        res.status(200).send('Email Sent Successfully')
    }
    catch(error){
        console.log(error)
        res.status(500).send('Internal Server Error occurred')
    }
});

app.listen(port,()=>{
    console.log(`Server Started at Port ${port}`)
});
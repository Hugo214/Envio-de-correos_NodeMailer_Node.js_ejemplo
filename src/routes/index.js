const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'mail.hugo.net',
        port: 587,
        secure: false,
        auth: {
            user: 'test@hugo.net',
            pass: 'testcontraseña'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Server" <test@hugo.xyz>', // sender address,
        to: 'hugo@gmail.com',
        subject: 'Website Contact Form',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    

    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   

    res.redirect('/success.html');
});

module.exports = router;
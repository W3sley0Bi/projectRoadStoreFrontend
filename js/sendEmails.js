import { render } from '@react-email/render';
import { Mailer } from 'nodemailer-react';

export const sendEmails = async (uid,folder,files) => {

    try {
        
    
    // const transporter = nodemailer.createTransport({
    //     service:'gmail',
    //     auth: {
    //       user: process.env.EMAIL_SENDER,
    //       pass: process.env.EMAIL_SENDER_PWD,
    //     }
    //   })


    const transport = {
        service:'gmail',
        auth: {
                  user: process.env.EMAIL_SENDER,
                  pass: process.env.EMAIL_SENDER_PWD,
             }
      }

// const html = `<div> <p>user ${uid} has finished his job </p> </br><h1>Notes </h1></br> <p>${req.body.textArea}</p></div>`

// let attachments = [{
//     filename: "filenameTest.pdf",
//     content: pdfBytes,
//   }]

  for(const property in req.files){
  attachments.push({
    filename: req.files[property].name,
    content: req.files[property].data
  })
}

const defaults = {
    from: process.env.EMAIL_SENDER,
  }



// const mailOptions = {
//     from: process.env.EMAIL_SENDER,
//     to: [`${process.env.EMAIL_RECEIVER1}`,`${process.env.EMAIL_RECEIVER2}`,`${process.env.EMAIL_RECEIVER3}`],
//     subject: `Images folder ${folder}`,
//     html: html,
//     attachments: attachments
//   };

// transporter.sendMail(mailOptions);

const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER1,
    subject: `Images folder ${folder}`,
    html: html,
    attachments: attachments
  };

const mailer = Mailer(
    { transport, defaults }
  )

  mailer.send(mailOptions)

} catch (error) {

    console.log(error)
        
}



}
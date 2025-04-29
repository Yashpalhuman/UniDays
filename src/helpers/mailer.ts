import User from "@/models/userModel";
import bcrypt from "bcryptjs";
const nodemailer = require("nodemailer");

export const DemoMail= async({email, emailType}:any) => {
  try{
    if(emailType==="DEMO"){
      console.log("DEMO HELPER CALLED");
      //Transport details
      var transport = nodemailer.createTransport({ 
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
          }
        });

        //calendly link
        const calendlyLink = 'https://calendly.com/your-link';

        //mail content
        const mailOptions = {
          from: 'support@unidays.io', // sender address
          to: email, // list of receivers
          subject: "Verification Link", // Subject line
          html: `
        <p>Dear Valued Partner,</p>
        
        <p>We&apos;re excited to collaborate and help you take your venture to the next level! To ensure we&apos;re aligned and ready to help you succeed, we&apos;d love to schedule a time to meet.</p>
        
        <p>Please click on the link below to book a convenient time for your meeting:</p>
        
        <p><a href="${calendlyLink}">Book a Meeting</a></p>
        
        <p>We look forward to connecting and discussing how we can craft a successful future together!</p>
        
        <p>Best regards,<br/>
        The Craft.vc Team</p>
      `, // html body
        };

        const mailResponse = await transport.sendMail(mailOptions)
        console.log("MAIL SENT");
        return mailResponse
  }
  }
  catch(error:any){
    throw new Error(error.message)
  }
}

  // async..await is not allowed in global scope, must use a wrapper
export const sendMail= async({email, emailType, userId}:any) => {
    
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        const encodedToken = encodeURIComponent(hashedToken)

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
               {$set:{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}}
            )
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                { $set:{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}}
            )
        }


        var transport = nodemailer.createTransport({ 
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            }
          });

          const mailOptions = {
            from: 'support@craftvc.io', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your mail" : "Reset your password", // Subject line
            html: emailType === 'VERIFY' ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${encodedToken}">here</a> to Verify you mail
            or copy the link in your browser ${process.env.DOMAIN}/verifyemail?token=${encodedToken}</p>` : `<p>Click <a href="${process.env.DOMAIN}/reset?token=${encodedToken}">here</a> to reset
            your password or copy the link in your browser ${process.env.DOMAIN}/verifyemail?token=${encodedToken}</p>`, // html body
          };

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }

  }
  
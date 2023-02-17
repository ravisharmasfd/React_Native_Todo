import User from "../models/user.js";
import transporter from "../nodemailer/index.js";
import bcrypt from 'bcrypt'
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
const forgot = async (req,res)=>{
    try {
        const {email} = req.body;
    const newPass = generatePassword();
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(newPass, salt);
    const update = await User.updateOne({email},{password:hash});
    let info = await transporter.sendMail({
        from: '"Todo List App 👻" <vito52@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Forgot Password ✔", // Subject line
        text: `Your new password is <${newPass}>`, // plain text body
      });
    if(info.messageId) res.json({msg:'Email with password sent to your email'})
    else res.status(500).json({msg:'server error'});
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default forgot
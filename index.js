import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT,'0.0.0.0',() => {
  console.log(`server running on port ${PORT}`);
});

app.post("/",async(req,res)=>{
    try{
        const {to,name,email,message} = req.body;
        const transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
              user:process.env.MAIL_USER,
              pass:process.env.MAIL_PASS
            }
          })
            await transporter.sendMail({
              from:`${name}`,
              to:`${to}`,
              subject:`${name} Contacted You`,
              html: `<p>Email -: ${email}  <br><h4>${message}</h4>
              <br> Sended by ${name}</p><br>
              <P>Thank you ...</P>`
            })
        //send response
        res.status(200).json({
        message:`Your Message has been successfully sent.`,
        success:true,
      });
    }
    catch(err){
        return res.json({msg:`Somethng Went Wrong ${err}`})
    }
})

app.get("/getData",async(req,res)=>{
  try{
      res.status(200).json({
      message:`You Fetched the route successfully.`,
      data:{name:"Ritik"},
      success:true,
    });
  }
  catch(err){
      return res.json({msg:`Somethng Went Wrong ${err}`})
  }
})

app.post("/addData",async(req,res)=>{
  try{
    const{name} = req.body
      res.status(200).json({
      message:`${name} fetched the route successfully.`,
      success:true,
    });
  }
  catch(err){
      return res.json({msg:`Somethng Went Wrong ${err}`})
  }
})
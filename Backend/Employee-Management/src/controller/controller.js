const EmployeeData = require("../model/model");
import regeneratorRuntime from "regenerator-runtime"
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// import bcrypt from 'bcrypt'
//create a user

exports.create = async(req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be Null" });
    return;
  }
  //new employee
  const salt = await bcrypt.genSalt(10);
  const hashedPassword =await  bcrypt.hash(req.body.password,salt)
  const user = new EmployeeData({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    statuse: req.body.statuse,
    dob: req.body.dob,
    address: req.body.address,
    mobile: req.body.mobile,
    alternateEmail: req.body.alternateEmail,
    password:hashedPassword,
    // password:req.body.password,
    sslc: req.body.sslc,
    sslcmonth: req.body.sslcmonth,
    sslcCgpa: req.body.sslcCgpa,
    hsc: req.body.hsc,
    hscmonth: req.body.hscmonth,
    hscCgpa: req.body.hscCgpa,
    degree: req.body.degree,
    degreemonth: req.body.degreemonth,
    degreeCgpa: req.body.degreeCgpa,
    cmpName: req.body.cmpName,
    TotalExp: req.body.TotalExp,
    Tech: req.body.Tech,
  });
  //save user in the database
  user.save(user)
    .then((data) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
               user: "akshaysathyanip@gmail.com",
               pass: process.env.password,
            },
         });
      
         var mailsend = {
            from: "akshaysathyanip@gmail.com",
            to: req.body.email,
            subject: "Registration Completed // sending Username and Password",
            text: `Hi, ${req.body.name} \n
                      Your Registration Completed. \n
                      PASSWORD: ${req.body.password} \n\n thank you`,
         };
         transporter.sendMail(mailsend)
      res.send(data);
      
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured in this opration",
      });
    });




};
//login

exports.login = async (req, res) => {

    EmployeeData.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(401).send("Email or Password is wrong");

                // Create and assign token
                let payload = { id: user._id , email:user.email, name:user.name};
                const token = jwt.sign(payload, 'akshay123');

                res.status(200).header("auth-token", token).send({ "token": token , id: user._id });
                
            }
            else {
                res.status(401).send('Invalid mobile')
            }

        }
    })
}

exports.findbiEmail=async(req,res)=>{
  const{username}=req.params
  try {
      const userdata=await EmployeeData.findOne({
          email:username
      })
      res.status(201).json({user:userdata,status:"ok"})
  } catch (error) {
      console.log(error)
      res.status(409).json({error:error.message,status:"not done"})

  }
    
}




//All employee/ single employee
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        EmployeeData.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message:"Error in finding by id"})
        })

    }else{
        EmployeeData.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error on find Methord"})
        })
    }
    // EmployeeData.find()
    // .then(user=>{
    //     res.send(user)
    // })
    // .catch(err=>{
    //     res.status(500).send({message:err.message||"Error on find Methord"})
    // })
};
// Get Single Employee



//Update a exsisting Employee
exports.update = async (req, res) => {
    console.log('hello')
    if(!req.body){
        return res
        .status(400)
        .send({message:"Value Cannot be Null"})
    }
    const id = req.params.id;
    const Body=req.body;
    console.log(req.body)
    const hashpassword= await bcrypt.hash(req.body.password,10)
    Body.password=hashpassword
    EmployeeData.findByIdAndUpdate(id,Body)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update Employee with ${id}.User Not Found....`})

        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error In Update Employee"})

    })

};

//Delete a  Employee with id
exports.delete = (req, res) => {
    const id = req.params.id;
    EmployeeData.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete Employee with ${id}.User Not Found....`})
        }else{
            res.send({
                message:"Employee Deleted Successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Cannot Delete Employee with id="+id
        });
    });
};

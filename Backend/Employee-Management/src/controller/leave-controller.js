const LeaveData = require('../model/leave-model');


//create a Leave Request

exports.create =(req,res)=>{
    console.log(req.body);
    if(!req.body){
        res.status(400).send({message: "cannot be null"});
        return;
    }
    //new Leave request
    const leavesreq = new LeaveData({
        email:req.body.email,
        username:req.body.username,
        subject:req.body.subject,
        leaveType:req.body.leaveType,
        reason:req.body.reason,
        fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        LeaveStatus:req.body.LeaveStatus
    });
    leavesreq
        .save(leavesreq)
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            res.status(500).send({
                message: err.message ||"error occured in this opration",

            });
        });
};

exports.update = (req, res) => {
    
    if(!req.body){
        return res
        .status(400)
        .send({message:"Value Cannot be Null"})
    }
    const id = req.params.id;

    LeaveData.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}.User Not Found....`})

        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error In Update Employee"})

    })

};

//All Leaves/ single Leaves
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        LeaveData.findById(id)
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
        LeaveData.find()
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
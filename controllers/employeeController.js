
const { status } = require('express/lib/response');
const Employee = require('../model/Employee')
const mongoose = require('mongoose');




exports.fetchAll = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees)
    }
    catch(err){
        res.status(400).json({status: false, message: err.message})
    }
}



exports.createEmployee = async (req, res) => {
    const { first_name,
            last_name,
            email,
            position, 
            salary, 
            date_of_joining, 
            department 
        } = req.body;
    
    const newEmployee = new Employee({ 
        first_name, 
        last_name, 
        email, 
        position, 
        salary, 
        date_of_joining, 
        department });
    try {
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};


exports.detailsById = async(req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.eid)) {
            return res.status(400).json({ status: false, message: "Invalid Employee ID" });
        }
        const employee = await Employee.findById(req.params.eid)
        if(!employee) {
            return res.status(400).json({status: false, message: "Employee not Found"})
        }
        res.status(200).json({employee})
    } 
    catch(err) {
        res.status(500).json({status: false, message: err.message })
    };
};


exports.updateById = async(req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.eid)) {
            return res.status(400).json({ status: false, message: "Invalid Employee ID" });
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true}); 
        if(!updatedEmployee) {
            return res.status(404).json({status: false,message: "Employee not Found"});
        }
        res.status(200).json(updatedEmployee)
    }
    catch(err){
        return res.status(404).json({status: false,message: "Employee not Found"});
    }
};


exports.deleteById = async(req, res) => {
    try{
        const { eid } = req.query;

        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({ status: false, message: "Invalid Employee ID" });
        }
        
        const deleteEmployee = await Employee.findByIdAndDelete(eid);
        if(!deleteEmployee){
            res.status(404).json({status:false, message: "Employee not Found"});
        }
        res.status(204).json({message: "Employee Successfully Deleted"})
    }
    catch(err){
        res.status(500).json({status: false, message: err.message});
    }
}
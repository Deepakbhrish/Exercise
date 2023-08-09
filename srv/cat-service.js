
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() { 
    this.before('CREATE','PersonalInformation', validateEmployeeCreate); 
    this.on('READ','PersonalInformation', readEmployees); 
    this.on('UPDATE','PersonalInformation', validateEmployeeChanges); 
    this.before('DELETE','PersonalInformation', validateEmployeeDelete);
});
const readEmployees = async (req,next) =>
{
    var entity = next();
    return entity;
}

const validateEmployeeChanges = async (req) => 
{
    console.log("Request data from UI:",req.data);
    var enEmail = req.data.Email;
    var epattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidE = epattern.test(enEmail);
    if(!isValidE)
    return req.reject({code:"500", message: "Please Provide correct Email"}); 
    else if(req.data.FirstName==="")
    return req.reject({code:"500", message: "Firs Name can not be empty"}); 
    else if(req.data.LastName==="")
    return req.reject({code:"500", message: "Last Name  can not be empty"}); 
    else if(req.data.Phone.length>10 || req.data.Phone.length<10 )
    return req.reject({code:"500", message: "Mobile can not less than 10 and greater than 10"}); 
    else
    return req.info("Data Changed..");
}

const validateEmployeeCreate = async (req) => 
{
    var enEmail = req.data.Email;
    var epattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidE = epattern.test(enEmail);
    if(req.data.ID.length>5)
    req.error({code:"400", message: "Invalid Employee Id, Cannot be more than 5 chars"}); 
    else if(req.data.FirstName==="")
    return req.reject({code:"500", message: "Firs Name can not be empty"}); 
    else if(req.data.LastName==="")
    return req.reject({code:"500", message: "Last Name  can not be empty"}); 
    else if(req.data.Phone.length>10 || req.data.Phone.length<10 )
    return req.reject({code:"500", message: "Mobile can not less than 10 and greater than 10"}); 
    else if(!isValidE)
    return req.reject({code:"500", message: "Please Provide correct Email"});
    else
    req.info({code:"200", message: "New Employee Created"}); 
}

const validateEmployeeDelete = async (req) => 
{
    var empId = req.data.ID;
    if(empId.length<2)
    return req.reject({code:"400",message:"Employee can not delete"});
    else
    req.info({code:"200",  message:"Employee Deleted"}); 
}

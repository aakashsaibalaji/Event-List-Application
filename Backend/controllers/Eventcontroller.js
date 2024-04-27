const Products = require('../model/eventbody');
const slugify =require('slugify');
const createEvent = async (req, res) => {
    try {
        const { Eventname, Eventdescription, Eventcategory, people, Conductedby, Address } = req.body;
        if (!Eventname || !Eventdescription || !Eventcategory || !people || !Conductedby || !Address) {
            return res.status(400).send({ msg: "Please fill all the fields in the Event Creation Form" });
        }
        const slug = slugify(Eventname);
        const event = new Products({ Eventname, Eventdescription, Eventcategory, people, Conductedby, Address, slug });
        await event.save();
        res.status(201).send({
            success: true,
            message: "Successfully created an Event",
            event
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong in creating an Event");
    }
}
const updatingEvent = async (req, res) => {
    try {
        const { Eventname, Eventdescription, Eventcategory, people, Conductedby, Address } = req.body;
        if (!Eventname || !Eventdescription || !Eventcategory || !people || !Conductedby || !Address) {
            return res.status(400).send({ msg: "Please fill all the fields in the Event Creation Form" });
        }
        const slug = slugify(Eventname);
        const updatedEvent = await Products.findOneAndUpdate(
            { _id: req.params.id },
            { Eventname, Eventdescription, Eventcategory, people, Conductedby, Address, slug },
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).send({ msg: "Event not found" });
        }
        res.status(200).send({
            success: true,
            message: "Successfully updated an Event",
            event: updatedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while updating event", error });
    }
}

const deletingEvent = async(req,res)=>{
    try{
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success : true,
            msg : 'Product has been deleted successfully.'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({msg:'Internal Server Error'})
    }
}
const  getAllEvents=async(req,res)=>{
    try{
        const Events = await Products.find({})
       res.status(200).send({
         sucess:true,
         message:"AllEvents",
         TotalEvents:Events.length,
         Events
       })
    }catch(error){
        console.log(error);
        res.status(500).send({msg:'Internal Server Error'})
    }
}
module.exports={createEvent,updatingEvent,deletingEvent,getAllEvents}
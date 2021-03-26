const mongoose=require('mongoose');
const schema=mongoose.Schema;


const restraunts=new schema({
   
    restroFullName: {type: String,required: true},
    restroShortName: {type: String,required: true},
    restroBrief: {type: String,required: true},
    restroType: {type: String,required: true},
    restroAddress: {type: String,required: true},
    restroAvailability: {type: Boolean,required: true},
    retroCostForTwo: {type: Number,required: true},
    menu : [{
        foodName: {type: String,required: true},
        foodPrice: {type: Number,required: true},
        foodDescription: {type: String,required: true}
    }]
});

const restrauntModel=mongoose.model('restraunt',restraunts);

module.exports=restrauntModel;
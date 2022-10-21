const mongoose = require('mongoose')
 
const BookingSchema = mongoose.Schema({
room:{
        type: String,
        required:true
    },
    roomid:{
        type: String,
        required: true
    },
  
    fromdate:{
        type: String,
        required: true
    },

    todate:{
        type: String,
        required: true
    },
    totalamt:{
        type: String,
        required: true
    },
   
    status:{
        type: String, required:true, default:'booked'
    }
},{
    timestamps:true,
    })


 
module.exports = mongoose.model('bookings', BookingSchema)
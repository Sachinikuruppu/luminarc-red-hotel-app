const express = require("express");
const router = express.Router();
const Booking = require("../model/booking")
const Room = require("../model/room")

router.post("/bookroom", async (req, res) => {
    const {
        room,
        fromdate,
        todate,
        totalamt
    } = req.body
    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            fromdate,
            todate,
            totalamt
        })
        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate , status:booking.status})
        await roomtemp.save()
        res.send('Room Booked Successfully')
    } catch (error) {
        return res.status(400).json({ error })
    }

});

router.put("/:id", async (req, res) => {
    Booking.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
        if (err)
            res.status(501).json({
                message: {
                    msgBody: "Unable to update Booking",
                    actualError: err._message,
                    msgError: true
                }
            });
        else
            res.send({isSuccess: true , response});
    });
});

module.exports = router
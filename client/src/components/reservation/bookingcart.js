import React, {useState, useEffect} from 'react'
import { createRoutesFromElements, Link,useParams } from "react-router-dom";
import axios from 'axios';
import Room from './Room';
import Reservation from './reservation';
// import moment from 'moment';
import moment, * as moments from 'moment';
import Button from '@mui/material/Button';



function Bookingcart() {
    const {roomid} = useParams();
    const {fromdate} =useParams();
    const {todate} =  useParams();
    console.log(roomid); // 👉️ {userId: '4200'}
    console.log(fromdate);
    console.log(todate);
    // const fromdate=match.params.fromdate
    // const todate=match.params.todate

// const totaldays=moment.duration(todate.diff(fromdate)).asdays()+1
// console.log(totaldays);

// // const totaldayss = todate.diff(fromdate, 'days') 
// // console.log(totaldayss);

// // Requiring the module
// const moment = require('moment');
  // var moment=moment().format('DD-MM-YYYY')
var dateOne = moment([todate]);
var dateTwo = moment([fromdate]);

  
// Function call
var result = dateOne.diff(dateTwo, 'days') 
var result2 = dateOne.diff(dateTwo, 'days') 



  
console.log("No of Days:", result)
console.log("Day 01:", dateOne)
console.log("Day 02:", dateTwo)





    const [room,setroom]=useState([]);

    useEffect(()=> {
      const bookObj = {
        roomid: roomid,
       
      }
      axios.post("http://localhost:4000/rooms/getroombyid",bookObj)
      .then(data=> {
   
       
      // room.push(data.data)
      setroom(data.data)
      console.log(room)
      }).catch((e) => {
        console.log(e);
      });
      },[]);
      const totalamt=result*room.rentpernighttypeone

      async function bookRoom(){
        const bookingDetails={
          room,
          fromdate,
          todate,
          totalamt,
          
        }
        try{
          const result=await axios.post('/bookings/bookroom',bookingDetails)
        }catch(error){}
      }
 
  return (
    <div>
       <h2>Room Id is 👉️ {roomid}</h2>
       <div className='row'>
        <div className='col-md-5'>
          {/* {room.map((row) => (
     <p>Max Count:{row.maxcount}</p>
  ))} */}
        </div>
        <div className='col-md-5'>
            <h1>Your Reservations</h1>
            <hr></hr>
            <b>
            <h1>{room.name}</h1>
            <p>Check in: {fromdate}</p>
            <p>Check out:{todate}</p> 
            <p>Max Count of Heads:{room.maxcount}</p>
            </b>
            <hr></hr>
            <h3>Amount</h3>
            <hr></hr>
            <b>
            <p>Total Days:{result/365}</p>
            <p>Rent Per Night:Rs.{room.rentpernighttypeone}</p>
            <p>Total Amount:Rs.{totalamt/365}</p>
           
            </b>
        </div>
       </div>
       <div>
       <div className='row'>
       <div className='col-md-5'>
       <Button variant="contained" onClick={bookRoom}> Make Payment</Button>
      <Button variant="contained"> Update</Button>
      <Button variant="contained"> Delete</Button>
       </div>
       </div>
       </div>
       
    </div>
  )
}

export default Bookingcart
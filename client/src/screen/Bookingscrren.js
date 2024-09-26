import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";

function Bookingscrren({ match }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState();

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-mm-YYYY");
  const todate = moment(match.params.todate, "DD-mm-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const totalamount = room ? totaldays * room.rentperday : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", {
          roomid: match.params.roomid,
        });
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData(); // Call the async function inside useEffect

    // No need to specify any clean-up function in this case
  }, [match.params.roomid]); // Ensure dependencies are correct
  
  const paymentHandler = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays: totaldays,
    };
    try {
      // setLoading(true);
      console.log(bookingDetails)
      const {
        data: { key },
      } = await axios.get("/api/getkey");
      console.log(key)
      const {
        data: { order },
      } = await axios.post("/api/bookings/bookroom", bookingDetails);
    
      console.log(order)

      var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: totalamount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: room.name, //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "/api/paymentverification/pay",
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: room.name, //your customer's name
          email: "@example.com",
          contact: "919997775551", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);

      await razor.open();
      // setLoading(false);

    } catch (error) {
      // setError(error);
      console.log(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    // setLoading(false);
  };


  // async function onToken(token) {
  //   console.log(token);
  //   const bookingDetails = {
  //     room,
  //     userid: JSON.parse(localStorage.getItem("currentUser"))._id,
  //     fromdate,
  //     todate,
  //     totalamount,
  //     totaldays,
  //     token
  //   };
  //   try {
  //     const result = await axios.post("/api/bookings/bookroom", bookingDetails);
  //   } catch (error) {}
  // }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-centre mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" />
          </div>
          <div className="col-md-5">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name :{JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                </p>
                <p>From Date : {match.params.fromdate} </p>
                <p>To Date : {match.params.todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days : {totaldays} </p>
                <p>Rent Per day : {room.rentperday}</p>
                <p>Total Amount : {totalamount}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
            <button className="btn btn-primary" onClick={paymentHandler} >
                  Pay now
                </button>
              {/* <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="INR"
                stripeKey="pk_test_51OcOWoSBEIZazWUWnyTqqIVDAMm8cL96Gj48fcqFC36cJiEwo6y2qcHvmR81QhpaHWLdDUQh9JMLfaANuawaH3tu00dk9lvWWA"
              >
                <button className="btn btn-primary">
                  Pay now
                </button>
              </StripeCheckout> */}
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscrren;

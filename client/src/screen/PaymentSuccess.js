import React, { useEffect } from "react";
import Swal from "sweetalert2";

function PaymentSuccess() {
  useEffect(() => {
    const showSuccessAlert = async () => {
      try {
        await Swal.fire(
          "Congratulations",
          "Your Room Booked Successfully",
          "success"
        );
        window.location.href = "/bookingscreen";
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    };

    showSuccessAlert();
  }, []);

  return <div>{/* Your component JSX */}</div>;
}

export default PaymentSuccess;
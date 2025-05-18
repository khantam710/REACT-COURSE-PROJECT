import { useEffect, useRef, useState } from "react";
import { getToken } from "@firebase/messaging";
import { requestForToken, onMessageListener, messaging } from "./firebase";
import CleverTap from "clevertap-web-sdk";
import { formatCleverTapDOB } from "./utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const SigninForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email addresses
  const phoneRegex = /^\+91\d{10}$/; // Regular expression for validating phone number
  const formattedDOB = formatCleverTapDOB(dob);

  useEffect(() => {
    requestForToken();
    onMessageListener()
      .then((payload) => {
        console.log("Notification Received (Background/Forground):", payload);
      })
      .catch((error) => {
        console.error("Error receiving push notification:", error);
      });
  }, []);

  // Validate Form
  const validateForm = () => {
    if (!name || !email || !phone || !dob) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error(
        "Invalid phone number! Please enter a valid Indian phone number with +91 country code.",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
      return false;
    }

    return true;
  };

  // To reset the form on submission
  const formRef = useRef(null);
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDob("");
  };

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform login action
      CleverTap.onUserLogin.push({
        Site: {
          Name: name,
          Email: email,
          Phone: phone,
          DOB: formattedDOB,
        },
      });

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      resetForm();
    }
  };

  // Profile Push Handler
  const handleProfilePush = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform profile push action
      CleverTap.profile.push({
        Site: {
          Name: name,
          Email: email,
          Phone: phone,
          DOB: formattedDOB,
        },
      });

      toast.success("Profile Push successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
      resetForm();
    }
  };

  // Notifcation Push Handler
  const handleAskForPush = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          // Permission granted, get FCM token and send the notification
          const currentToken = await getToken(messaging);

          // Send the notification using FCM token
          CleverTap.notifications.push({
            titleText: "Would you like to receive Push Notifications?",
            bodyText:
              "We promise to only send you relevant content and give you updates on your transactions",
            okButtonText: "Sign me up!",
            rejectButtonText: "No thanks",
            askAgainTimeInSeconds: 5,
            okButtonColor: "#f28046",
          });

          // Handle the success of sending the notification
          console.log("Notification Sent (Foreground):", {
            titleText: "Would you like to receive Push Notifications?",
            bodyText:
              "We promise to only send you relevant content and give you updates on your transactions",
            okButtonText: "Sign me up!",
            rejectButtonText: "No thanks",
            askAgainTimeInSeconds: 5,
            okButtonColor: "#f28046",
          });

          // Show success message to the user
          toast.success("Notification Sent!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
        } else {
          // Permission denied
          console.log("Notification permission denied.");
        }

        resetForm();
      } catch (error) {
        // Handle errors during notification sending
        console.error("Error Sending Notification:", error);
        toast.error("Error Sending Notification", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }
  };

  // Raise Event Handler
  const handleRaiseEvent = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const timestamp = new Date().toISOString();

      // Raise event for successful signup form submission
      console.log("Before Clevetap Event");
      CleverTap.event.push("Website Visited", {
        Name: name,
        Email: email,
        Phone: phone,
        DOB: formattedDOB,
        Timestamp: timestamp,
      });
      console.log("After Clevertap event");

      // Show success message to the user
      toast.success("Events Raised: Signup Form Submitted!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });

      // Reset the form fields
      resetForm();
    }
  };

  return (
    <MDBContainer fluid className="bg">
      <form ref={formRef}>
        <MDBRow className="d-flex align-items-center justify-content-center">
          <MDBCol className="d-none d-md-block animated-image">
            <img
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
              className="img-fluid"
              alt=""
            />
          </MDBCol>

          <MDBCol id="signup-form-column" className="animated-div">
            <h2 className="text-uppercase text-center mb-5">
              CLEVERTAP SIGNUP FORM
            </h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Date of Birth"
              size="lg"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contact Number"
              size="lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type=""
            />

            <div className="d-flex-lg d-flex-sm d-flex-md  align-items-center justify-content-center">
              <MDBBtn
                className="ms-2 custom-btn"
                color="warning"
                size="lg"
                noRipple
                onClick={handleLogin}
              >
                Login
              </MDBBtn>
              <MDBBtn
                className="ms-2 custom-btn"
                color="warning"
                size="lg"
                noRipple
                onClick={handleProfilePush}
              >
                Profile Push
              </MDBBtn>
              <MDBBtn
                className="ms-2 custom-btn"
                color="warning"
                size="lg"
                noRipple
                onClick={handleAskForPush}
              >
                Ask For Push
              </MDBBtn>
              <MDBBtn
                className="ms-2 custom-btn"
                color="warning"
                size="lg"
                noRipple
                onClick={handleRaiseEvent}
              >
                Raise Event
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
      <ToastContainer />
    </MDBContainer>
  );
};

export default SigninForm;

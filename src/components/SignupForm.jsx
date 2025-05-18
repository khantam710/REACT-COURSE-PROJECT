import { useState,useEffect } from 'react';
import CleverTap from 'clevertap-web-sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notificationCallback} from "./notificationCallback";

// CleverTap.notificationCallback = notificationCallback;

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  

  const handleLogin = () => {
    CleverTap.onUserLogin.push({
      Site: {
        Name: name,
        Email: email,
        Phone: phone,
        DOB: new Date(dob)
      }
    });
  };

  const handleProfilePush = () => {
    CleverTap.profile.push({
      Site: {
        Name: name,
        Email: email,
        Phone: phone,
        DOB: new Date(dob)
      }
    });
  };

  const handleAskForPush = () => {
    console.log("ask for push");
    
    // Send push notification to the user
    CleverTap.notifications.push({
      titleText: 'Would you like to receive Push Notifications?',
      bodyText: 'We promise to only send you relevant content and give you updates on your transactions',
      okButtonText: 'Sign me up!',
      rejectButtonText: 'No thanks',
      askAgainTimeInSeconds: 5,
      okButtonColor: '#f28046'
    });
    CleverTap.notificationCallback = notificationCallback;
  };


  
  const handleRaiseEvent = () => {
    CleverTap.event.push('Person Loggend In Details', {
      Name: name,
      Email: email,
      Phone: phone,
      DOB: new Date(dob),
      IntegerProperty: 42,
      FloatProperty: 3.14
    });
  };

  return (
    <div>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />

      <label>Email Address:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

      <label>Phone number:</label>
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />

      <label>Date of Birth:</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /><br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProfilePush}>Profile Push</button>
      <button onClick={handleAskForPush}>Ask For Push</button>
      <button onClick={handleRaiseEvent}>Raise Event</button>
    </div>
  );
};  

export default SignupForm;

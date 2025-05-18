import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = () => {
    const { name, email, phone, dob } = formData;
    // Your clevertap.onUserLogin.push logic here
    console.log('onLogin', name, email, phone, dob);
  };

  const onProfilePush = () => {
    const { name, email, phone, dob } = formData;
    // Your clevertap.profile.push logic here
    console.log('onProfilePush', name, email, phone, dob);
  };

  const askForPush = () => {
    // Your clevertap.notifications.push logic here
    console.log('askForPush');
  };

  const raiseEvent = () => {
    // Your clevertap.event.push logic here
    console.log('raiseEvent');
  };

  return (
    <div>
      <h1>Signup Form</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        /><br />

        <button type="button" onClick={onLogin}>Login</button>
        <button type="button" onClick={onProfilePush}>Profile Push</button>
        <button type="button" onClick={askForPush}>Ask For Push</button>
        <button type="button" onClick={raiseEvent}>Raise Event</button>
      </form>
    </div>
  );
};

export default Form;

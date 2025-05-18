// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage } from 'firebase/messaging';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7vMrbgo6TkdxMKoeprw1MiboyQ1eLoZg",
  authDomain: "clevertap-signup-form.firebaseapp.com",
  projectId: "clevertap-signup-form",
  storageBucket: "clevertap-signup-form.appspot.com",
  messagingSenderId: "381439101392",
  appId: "1:381439101392:web:24fd10e967f1c6bc2d51d5",
  measurementId: "G-PWZ06BDWZG",
  vapidKey: "BCxPZkHcsxHVNUwtPl5Iy07stXCGsXuCuxCq0Hg1Re1PKKjB40MtIseWVzkTJw2Pz5-sdT5UA1xTgvWhwH_Gvwo"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    try {
      const currentToken = await getToken(getMessaging(), { vapidKey: firebaseConfig.vapidKey });
  
      if (currentToken) {
        console.log('Current token for client:', currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('An error occurred while retrieving token:', error);
    }
  };

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });


export { app, messaging,firebaseConfig };
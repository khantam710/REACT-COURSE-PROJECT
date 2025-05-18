import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CleverTap from 'clevertap-web-sdk';
import SigninForm from './components/SigninForm';
// import Form from './components/form';


function App() {
  CleverTap.init({ accountId: 'WW4-49R-4W7Z', clearCookie: false, override: false,isOUL: false});
  CleverTap.spa = true;
  console.log('CleverTap initialized');

  if ('serviceWorker' in navigator) {
    // Unregister the previous service worker (if any)
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister().then(success => {
        if (success) {
          console.log('Previous service worker unregistered successfully.');
        } else {
          console.error('Failed to unregister the previous service worker.');
        }
  
        // Register the new service worker
        navigator.serviceWorker.register('/clevertap_sw.js', { scope: '/' })
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    });
  }
  
  
  return (
    <>
      <SigninForm/>
      {/* <Form/> */}
    </>
  )
}

export default App

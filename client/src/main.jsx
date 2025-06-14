import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure you include this
import store from './components/toolkit/store/store.js';
import { Provider } from 'react-redux';


const options = {
  position: "top-center",
  autoClose: 3000,
  theme: "dark",
  hideProgressBar: true,
  transition: Slide,
}

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ToastContainer {...options} />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);


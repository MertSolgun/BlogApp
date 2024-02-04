import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbars";
import AppRouter from "./router/AppRouter";
import { Provider } from 'react-redux'
import { persistor, store } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react'
import "./App.css"


function App() {
  return (
    <div className="App">
      <PersistGate  persistor={persistor}>
      <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <AppRouter/>
      </BrowserRouter>
      </Provider>
      <ToastContainer/>
      </PersistGate>

    </div>
  );
}

export default App;

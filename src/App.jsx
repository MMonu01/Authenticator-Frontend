import AppRoute from "./app-route";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoute />
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" closeButton={false} />
    </>
  );
}

export default App;

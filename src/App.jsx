import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientData from "./ClientData";

function App() {
  return (
    <>
      <ClientData />
      <ToastContainer />
    </>
  );
}

export default App;

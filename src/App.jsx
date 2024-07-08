import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { MyForm } from "./MyForm";

function App() {
    return (
        <>
            <MyForm />
            <ToastContainer />
            <footer>
                <p>
                    The form on this page turns the key-value pairs into query
                    parameters.
                </p>
                <p>Pressing submit makes a GET request to the computed URL.</p>
            </footer>
        </>
    );
}

export default App;

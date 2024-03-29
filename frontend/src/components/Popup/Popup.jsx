import "./popup.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export default function Popup(props) {
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button
                    className="close-btn"
                    onClick={() => props.setTrigger(false)}
                >
                    close
                </button>
                {props.children}
            </div>
            <ToastContainer />
        </div>
    ) : (
        ""
    );
}

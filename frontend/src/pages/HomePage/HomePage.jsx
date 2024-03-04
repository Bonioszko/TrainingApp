import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import "./homePage.css";
export default function HomePage() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="home-page">
                {!user ? (
                    <h1>Welcome to our app, to access content please login</h1>
                ) : (
                    <>
                        <h1>Welcome {user.name} </h1>
                        <h1>Get your workout done </h1>
                    </>
                )}
                <div className="post">
                    <div className="post-text">
                        <h1>Track your trainngs</h1>
                        <p>
                            Our application goives you opportunity to increase
                            effectivnes of your training. You can track each set
                            and compare it to previuos weeeks. Make progressive
                            overaload
                        </p>
                    </div>
                    <img
                        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="two people trainig at the gym"
                    ></img>
                </div>
                <div className="post">
                    <div className="post-text">
                        <h1>Take your tranings to the next level</h1>
                        <p>
                            Built in timer allows you to only use one
                            application to track everything in your training
                        </p>
                    </div>
                    <img src="https://images.pexels.com/photos/1537268/pexels-photo-1537268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                </div>
                <div className="post">
                    <div className="post-text">
                        <h1>Track your trainngs</h1>
                        <p>Track erach aspect of your training</p>
                    </div>
                    <img src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                </div>
            </div>
        </div>
    );
}

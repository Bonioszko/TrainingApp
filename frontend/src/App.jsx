import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import TrainingTemplate from "./components/TrainingsTemplates/TrainingTemplate.jsx";
function App() {
    return (
        <div className="main">
            <Navbar></Navbar>
            <div className="page">
                <h1>Welcome to our app, to access content please login</h1>
                <TrainingTemplate></TrainingTemplate>
            </div>
        </div>
    );
}

export default App;

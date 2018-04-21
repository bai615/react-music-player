import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/*
const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>

            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />

        </div>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
*/

class BasicExample extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />

                </div>
            </Router>
        );
    }
}

class Home extends React.Component{
    render(){
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

class About extends React.Component{
    render(){
        return (
            <div>
                <h2>About</h2>
            </div>
        );
    };
}

var oBox = document.getElementById("box");
ReactDOM.render(<BasicExample/>, oBox);

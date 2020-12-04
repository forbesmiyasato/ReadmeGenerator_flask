import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './components/react-alert-custom-template'
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// optional configuration for alerts
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 10000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

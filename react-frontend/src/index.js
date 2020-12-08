import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './components/react-alert-custom-template'
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// configurations for alerts
const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
    containerStyle: {
        zIndex: 2050
    }
};

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
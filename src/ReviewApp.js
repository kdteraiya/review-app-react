import React from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./ReviewApp.css";
import Router from "./Router";

function ReviewApp() {
  return (
    <div className="review-app">
      <Router />
    </div>
  );
}

export default ReviewApp;

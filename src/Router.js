import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import { ProgressSpinner } from "primereact/progressspinner";

const AddReview = lazy(() => import("./components/AddReview"));
const ViewListing = lazy(() => import("./components/ViewListing"));
const Error404 = lazy(() => import("./components/Error404"));

export default function Routing() {
  return (
    <>
      <Router>
        <Header />
        <Suspense
          fallback={
            <ProgressSpinner className="loading" aria-label="Loading" />
          }
        >
          <div className="main">
            <Routes>
              <Route exact path="/" element={<ViewListing />}></Route>
              <Route exact path="/add-review/" element={<AddReview />}></Route>
              <Route
                exact
                path="/view-listing/"
                element={<ViewListing />}
              ></Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </>
  );
}

import React from "react";
import classes from "./ContentBox.module.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import SubscribePage from "../../components/SubscribePage/SubscribePage";
import ContactPage from "../../components/ContactPage/ContactPage";
import Livescore from "../../components/Livescore/Livescore";
import Header from "../../components/Header/Header";
import LinksPage from "../../components/LinksPage/LinksPage";

const ContentBox = (props) => {

  return (
    <div className={classes.ContentBox}>
      <Header h={props.h} />
      <Routes>
        <Route path="/" element={<MainPage {...props}/>} />
        <Route path="/subscription" element={<SubscribePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          render={() => (
            <div style={{ textAlign: "center" }}>
              {" "}
              You don't need to login at the moment!
            </div>
          )}
        />
        <Route
          path="/livescore"
          render={(routeProps) => (
            <Livescore routeProps={routeProps} content="livescore" />
          )}
        />
        <Route
          path="/dropping-odds"
          render={(routeProps) => (
            <Livescore routeProps={routeProps} content="odds" />
          )}
        />
        <Route
          path="/partner-links"
          render={(routeProps) => (
            <LinksPage routeProps={routeProps} pageLinks={props.pageLinks} />
          )}
        />
      </Routes>
    </div>
  );
};

export default ContentBox;

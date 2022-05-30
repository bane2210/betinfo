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
        <Route
          path="/"
          exact
          render={(props) => <MainPage {...props} m={props.m} />}
        />
        <Route path="/subscription" exact component={SubscribePage} />
        <Route path="/contact" exact component={ContactPage} />
        <Route
          path="/login"
          exact
          render={() => (
            <div style={{ textAlign: "center" }}>
              {" "}
              You don't need to login at the moment!
            </div>
          )}
        />
        <Route
          path="/livescore"
          exact
          render={(props) => <Livescore {...props} content="livescore" />}
        />
        <Route
          path="/dropping-odds"
          exact
          render={(props) => <Livescore {...props} content="odds" />}
        />
        <Route
          path="/partner-links"
          exact
          render={(props) => (
            <LinksPage {...props} pageLinks={props.pageLinks} />
          )}
        />
      </Routes>
    </div>
  );
};

export default ContentBox;

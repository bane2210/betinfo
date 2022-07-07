import classes from "./ContentBox.module.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import SubscribePage from "../../components/SubscribePage/SubscribePage";
import ContactPage from "../../components/ContactPage/ContactPage";
import Livescore from "../../components/Livescore/Livescore";
import Header from "../../components/Header/Header";
import LinksPage from "../../components/LinksPage/LinksPage";

const ContentBox = (props: { m: string; h: string; f: string }) => {
  return (
    <div className={classes.ContentBox}>
      <Header h={props.h} />
      <Routes>
        <Route path="/" element={<MainPage {...props} />} />
        <Route path="/subscription" element={<SubscribePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={
            <div style={{ textAlign: "center" }}>
              {" "}
              You don't need to login at the moment!
            </div>
          }
        />
        <Route path="/livescore" element={<Livescore content="livescore" />} />
        <Route path="/dropping-odds" element={<Livescore content="odds" />} />
        <Route
          path="/partner-links"
          element={<LinksPage pageLinks={props.f} />}
        />
      </Routes>
    </div>
  );
};

export default ContentBox;

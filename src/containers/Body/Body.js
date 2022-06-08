import React, { useState, useEffect } from "react";
import classes from "./Body.module.css";

import PageCenter from "../PageCenter/PageCenter";
import TopNav from "../../components/TopNav/TopNav";
import Footer from "../../components/footer/Footer";
import Axios from "axios";
import FooterMarketing from "../../components/FooterMarketing/FooterMarketing";
import { useDispatch } from "react-redux";
import { closeBackdrop } from "../../store/createSlice";

const Body = (props) => {
  const [state, setState] = useState({
    header: "",
    middle: "",
    sidebar: "",
    footer: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // 2020-03-09

    const url = "/eng/api_stats/loadMarketing.php";


    Axios.get(url).then((response) => {
      setState({
        header: response.data.header,
        middle: response.data.middle,
        sidebar: response.data.left,
        footer: response.data.footer,
      });
    });

    const addEvent = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        window.scrollTo(0, 0 - props.yPos);

        dispatch(
          closeBackdrop({
            backdropOBJ: {
              date: "",
              time: "",
              home: "",
              away: "",
              country: "",
              competition: "",
              simpleDate: "",
            },
            backVis: 0,
          })
        );

      }
    };

    document.body.addEventListener("keydown", addEvent);

    return () => {
      document.body.removeEventListener("keydown", addEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.onscroll = () => {

    if (window.pageYOffset > 800) {
      document.getElementById("goToTop").style.display = "flex";
    } else {
      document.getElementById("goToTop").style.display = "none";
    }
  };


  const goToTopClicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Razdvajamo linkove za footer i posebnu stranicu

  let footerLinks = "";
  let pageLinks = "";

  if (state.footer.includes("<!-- Footer Links  -->")) {
    footerLinks = state.footer.split("<!-- Footer Links  -->")[1];
    pageLinks = state.footer.split("<!-- Footer Links  -->")[0];
  } else {
    footerLinks = state.footer;
    pageLinks = state.footer;
  }

  let goToTop = (
    <div id="goToTop" className={classes.scrollTop} onClick={goToTopClicked}>
      <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  );

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
    // window.history.go(1);

    /* 
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("body").style.display = "block";
    */

    // window.scrollTo(0, 0 - xx);
  };

  return (
    <div>
      <TopNav />
      <div id="body" className={classes.bodyApp}>
        <PageCenter
          s={state.sidebar}
          m={state.middle}
          h={state.header}
          f={pageLinks}
        />
      </div>
      {goToTop}
      <FooterMarketing f={footerLinks} />
      <Footer />
    </div>
  );
};

/*
const mapStateToProps = state => ({
    backdropOBJ: state.backdrop,
    yPos: state.yPos
})
*/

export default Body;

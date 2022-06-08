import React from "react";
import classes from "./Footer.module.css";
import Logo from "../Logo/Logo";

const Footer = () => {
  /*
        let c = document.createElement("script");
        c.type = "text/javascript"; c.async = !0; c.id = "CleverCoreLoader48866";  c.setAttribute("data-target",window.name); c.setAttribute("data-callback","put-your-callback-macro-here");
        c.src = "//scripts.cleverwebserver.com/9def35ba40ca680672185b7e6d96a6ae.js";
        let a = !1;
        try {
            a = document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
        } catch (e) {
            a = !1;
        }
        a || ( a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
        a.parentNode.insertBefore(c, a);
        */

  return (
    <div id="footerID" className={classes.footer}>
      <div className={classes.footerBox}>
        <div className={classes.logoImg}>
          <Logo />
        </div>
        <div className={classes.copyright}>
          Copyright © 2019-{new Date().getFullYear()} betinfo.cc <br />
          Privacy Policy & Cookie Disclaimer | Terms & Conditions, Disclaimer
        </div>
      </div>
    </div>
  );
};

export default Footer;

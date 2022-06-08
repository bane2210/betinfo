import React from "react";
import classes from "./PageCenter.module.css";
import Sidebar from "../sidebar/Sidebar";
import ContentBox from "../contentBox/ContentBox";
import { useSelector } from "react-redux";
import Backdrop from "../../components/Backdrop/Backdrop";

const PageCenter = ({ s, m, h, f }) => {
  const stateBase = useSelector((state) => {
    return state.backdropReducer;
  });

  if (stateBase.backVis === 0) {
    window.scrollTo(0, stateBase.yPos * -1);
  } else if (stateBase.backVis === 1) {
    window.scrollTo(0, 0);
  }

  let content = "";
  let content2 = "";

  if (
    stateBase.backVis === 1 &&
    stateBase.backdrop.date !== "" &&
    stateBase.backdrop.time !== ""
  ) {
    content = (
      <Backdrop
        date={stateBase.backdrop.date}
        t={stateBase.backdrop.time}
        h={stateBase.backdrop.home}
        a={stateBase.backdrop.away}
        country={stateBase.backdrop.country}
        comp={stateBase.backdrop.competition}
        simpleDate={stateBase.backdrop.simpleDate}
        yPos={stateBase.yPos}
      />
    );
  } else {
    content = <Sidebar s={s} />;
    content2 = <ContentBox m={m} h={h} pageLinks={f} />;
  }

  return (
    <div className={classes.pageCenter}>
      {content}
      {content2}
    </div>
  );
};

export default PageCenter;

import classes from "./PageCenter.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Sidebar from "../sidebar/Sidebar";
import ContentBox from "../contentBox/ContentBox";
import Backdrop from "../../components/Backdrop/Backdrop";

interface PropsInterface {
  [key: string]: string;
}

const PageCenter = ({ s, m, h, f }: PropsInterface) => {
  const stateBase = useSelector((state: RootState) => {
    return state.globalState;
  });

  if (stateBase.backVis === 0) {
    window.scrollTo(0, stateBase.yPos * -1);
  } else if (stateBase.backVis === 1) {
    window.scrollTo(0, 0);
  }

  let content: JSX.Element | string = "";
  let content2: JSX.Element | string = "";

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
    content2 = <ContentBox m={m} h={h} f={f} />;
  }

  return (
    <div className={classes.pageCenter}>
      {content}
      {content2}
    </div>
  );
};

export default PageCenter;

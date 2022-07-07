import classes from "./Sidebar.module.css";
import Marketing from "../../components/Marketing/Marketing";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

interface Props {
  s: string;
  m?: string;
}

const Sidebar = ({s}: Props) => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarTop}>
        <div className={classes.logoImg}>
          <Logo />
        </div>
      </div>
      <NavLink to="/livescore">
        <div className={classes.livescore}>Livescore</div>
      </NavLink>

      <NavLink to="/dropping-odds">
        <div className={classes.livescore}>Dropping Odds</div>
      </NavLink>

      <NavLink to="/partner-links">
        <div className={classes.livescore}>Partners</div>
        <br />
      </NavLink>

      {s === "" ? null : <Marketing m={s} type="" />}
    </div>
  );
};

export default Sidebar;

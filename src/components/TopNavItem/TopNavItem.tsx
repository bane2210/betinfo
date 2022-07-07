import classes from "./TopNavItem.module.css";
import { NavLink } from "react-router-dom";

interface Prop {
  icon: JSX.Element;
  link: string;
  exact: boolean;
  name: string;
  click: () => void;
}

const topNavItem = (props: Prop) => {
  return (
    <NavLink
      to={props.link}
      className={isActive =>
        "nav-link" + (isActive ? " " + classes.active : "")
      }
    >
      <li className={classes.NavigationItem} onClick={props.click}>
        <span style={{ marginRight: "10px", color: "orange" }}>
          {props.icon}
        </span>
        {props.name}
      </li>
    </NavLink>
  );
};

export default topNavItem;

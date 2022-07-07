import classes from "./NavDatesItem.module.css";

type Prop<T> = {
    name: T;
    date: T;
    change: (finalDate: string, pos: string) => void;
    position: number;
    pos: T;
}

const navDatesItem = (props: Prop<string>) => {

  return (
    <div
      className={
        parseInt(props.pos) === props.position
          ? classes.activ
          : classes.Items
      }
      onClick={() => props.change(props.date, props.pos)}
    >
      {props.name}
    </div>
  );
};

export default navDatesItem;

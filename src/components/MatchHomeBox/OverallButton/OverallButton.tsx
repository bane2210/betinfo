import classes from './OverallButton.module.css';

interface Prop {
    o: boolean;
    click: () => void;
    name: string;
}
const overallButton = (props: Prop) => {

    let cls = classes.button;

    if(props.o){
        cls = classes.button + " " + classes.active;
    }

    return (

        <div className={cls} onClick={props.click}>
            {props.name}
        </div>

    );
}

export default overallButton;
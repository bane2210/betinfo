import classes from './Header.module.css'
import Marketing from '../Marketing/Marketing';


const header = (props: {h: string}) => {
    console.log(props.h);

    return (
        <div data-testid='headerTest' className={classes.Header}>
            {props.h === "" ? null : <div className={classes.headerMarketing}><Marketing m={props.h} type="" /></div>}
        </div>
    );
}

export default header;
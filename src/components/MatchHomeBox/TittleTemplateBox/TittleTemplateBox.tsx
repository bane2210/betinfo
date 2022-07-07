import classes from './TittleTemplateBox.module.css';

const tittleTemplateBox = (props: {name: string}) => {
    return (
        <div className={classes.tittleTemplateBox}>
            <i style={{fontSize: "13px"}} className="fa fa-futbol-o" aria-hidden="true"></i> {props.name}
        </div>
        
    );
}

export default tittleTemplateBox;
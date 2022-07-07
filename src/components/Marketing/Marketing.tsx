import classes from './Marketing.module.css'

const marketing = ({m} : {m: string, type: string}) => {
    //        <div className={classes.baner} dangerouslySetInnerHTML={{__html: props.m}} />

    return (
        <div className={classes.baner} dangerouslySetInnerHTML={{ __html: m }} />
    );
}

export default marketing;
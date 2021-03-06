import React from 'react';
import classes from './saveButton.module.css';

const saveButton: React.FC<{save: () => void}> = (props) => {


    return (
        <div className={classes.checkAllButton} onClick={props.save}>
            {"Save"}
        </div>
    );


}

export default saveButton;
import React from 'react'
import classes from './LinksPage.module.css'


const linksPage = (props) => {

    let content = <div className={classes.allLinks} dangerouslySetInnerHTML={{ __html: props.pageLinks }} />;

    return (
        <div className={classes.linksContainer}>
            <div className={classes.header}>
                Partners
                </div>
            {content}
        </div>
    );


}


export default linksPage;
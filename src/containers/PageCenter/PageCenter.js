import React, { Component } from 'react';
import classes from './PageCenter.module.css';
import Sidebar from '../sidebar/Sidebar';
import ContentBox from '../contentBox/ContentBox';

class PageCenter extends Component {

  
    render() {
        
        return (
            <div className={classes.pageCenter}>
                <Sidebar s={this.props.s} />
                <ContentBox m={this.props.m} h={this.props.h} pageLinks={this.props.f} />
            </div>
        );
    }



}

export default PageCenter;
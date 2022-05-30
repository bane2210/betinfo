import React, { Component } from 'react'
import classes from './MarketBox.module.css';

import Save from '../saveButton/saveButton';
import MarketButton from '../CompetitionsBox/CompetitionsButton/CompetitionsButton';

class MarketBox extends Component {

    state = {
        value: [],
        checkAll: 1
    }


    componentDidMount() {
        this.setState({
            value: this.props.settingsObjectValue
        });
    }



    changeStateObject = (br) => {
        let object = [...this.state.value];

        if (object[br]["value"] === 1) {
            object[br]["value"] = 0;
        } else {
            object[br]["value"] = 1;
        }

        this.setState(
            {
                value: object
            }
        );
    }

    checkUncheckAll = () => {
        let object = [...this.state.value];

        if (this.state.checkAll === 0) {
            object.forEach(element => {
                element.value = 1;
            });

            this.setState(
                {
                    value: object,
                    checkAll: 1
                }
            );

        } else {
            object.forEach(element => {
                element.value = 0;
            });

            this.setState(
                {
                    value: object,
                    checkAll: 0
                }
            );
        }


    }

    render() {

        let settingsObjectValue = this.state.value;
        let content = "";
        let grupe = "";

        let br = -1;

        content = settingsObjectValue.map((element, index) => {
            br = br + 1;
            let aa = br;
            if (element.group !== grupe) {
                grupe = element.group;
                return [<div key={element.name} className={classes.grupe}>{element.group}</div>,
                <MarketButton key={index} click={(br) => this.changeStateObject(aa)} name={element.description} value={element.value} />];
            } else {
                return <MarketButton key={index} click={(br) => this.changeStateObject(aa)} name={element.description} value={element.value} />
            }
        });



        let selected = false;

        this.state.value.forEach(element => {
            if (element.value === 1) selected = true;
        });


        return (
            <div className={classes.Container}>
                <div className={classes.checkAllContainer}>
                    <div className={classes.checkAllButton} onClick={this.checkUncheckAll}>
                        {this.state.checkAll ? "Deselect All" : "Select All"}
                    </div>
                </div>
                {content}
                <div className={classes.saveContainer}>
                    {selected ? <Save save={() => this.props.save(this.state.value)} /> : <div className={classes.errorM}> You must select at least one type of bet. </div>}
                </div>
            </div>
        );
    }

}


export default MarketBox;
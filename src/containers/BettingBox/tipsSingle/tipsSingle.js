import React, { Component } from 'react';
import classes from './tipsSingle.module.css';
import TipSingle from './tipSingle/tipSingle';

import SingleGame from '../tipsSingle/tipSingle/singleGame/singleGame';
import Spinner from '../../../components/Spinner/Spinner';
import OverallButton from '../../../components/MatchHomeBox/OverallButton/OverallButton';

import ReactGA from 'react-ga';
import PercCount from '../percCount/percCount';

import SortBy from '../SortBy/SortBy';



class TipsSingle extends Component {

    state = {
        tips: "",
        start: 0,
        end: 6,
        recomended: true,
        couldTry: false,
        sortBy: 1
    }

    setSort = (br) => {

        this.setState({
            sortBy: br,
            start: 0,
            end: 6
        });
    }

    setTips = (name) => {

        this.setState({
            tips: name,
            sortBy: 1,
            start: 0,
            end: 6
        });
    }

    setRecomended = () => {
        this.setState({
            recomended: true,
            couldTry: false
        });
    }

    setCouldTry = () => {
        this.setState({
            recomended: false,
            couldTry: true
        });
    }


    componentDidUpdate(prevProps, prevState) {
        let find = false;

        if (!this.props.isTop) {
            this.props.arrTips.forEach(element => {

                if (this.state.tips === element) find = true;

            });

            if (find === false) {
                this.setState({
                    tips: this.props.arrTips[0],
                    start: 0,
                    end: 6,
                    sortBy: 1

                });
            }
        }


        if (this.state.tips !== prevState.tips) {
            this.setState({
                start: 0,
                end: 6,
                sortBy: 1,
                recomended: true,
                couldTry: false
            });
        }

        if (this.state.recomended !== prevState.recomended) {
            this.setState({
                start: 0,
                end: 6,
                sortBy: 1

            });
        }
    }


    load6less = (max) => {

        window.scroll(0, document.getElementById("mainPage").offsetTop - 50);

        if (this.state.end > 6 && this.state.end !== max) {
            const start = this.state.start - 6;
            const end = this.state.end - 6;
            this.setState({
                start: start,
                end: end
            });
        } else if (this.state.end === max) {
            const start = this.state.start - 6;
            let end = this.state.end - (max % 6);
            if (max % 6 === 0) {
                end = this.state.end - 6;
            }
            this.setState({
                start: start,
                end: end
            });
        }

    }

    load6more = (max) => {

        window.scroll(0, document.getElementById("mainPage").offsetTop - 50);

        if ((this.state.end + 6) < max) {

            const start = this.state.start + 6;
            const end = this.state.end + 6;
            this.setState({
                start: start,
                end: end
            });
        } else if (this.state.end !== max) {
            const start = this.state.start + 6;
            const end = max;
            this.setState({
                start: start,
                end: end
            });
        }

    }

    render() {

        const borderArray = this.props.borderArray;



        let contentTips = "";
        let contentGamesInner = "";
        let sqlContent = this.props.sqlContent;
        let arrTips = this.props.arrTips;
        let arrNames = this.props.arrNames;
        let i = -1;
        let arrImutable = [];
        let arr = [];
        let contentNext = "";
        const isTop = this.props.isTop;
        let sortElements = "";


        if (this.state.tips !== "") {
            ReactGA.event({
                category: "Tips",
                action: "Clicked",
                label: this.state.tips
            });
        }


        if (arrTips.length > 0 && !isTop) {

            let br = 0;

            contentTips = arrTips.map((element, index) => {
                i++;


                for (let ii = 0; ii < sqlContent.length; ii++) {
                    if (sqlContent[ii].name === arrTips[i]) {
                        br = sqlContent[ii].content.length;
                        break;
                    }
                }


                const brName = arrTips[i];
                return <TipSingle
                    key={index}
                    br={br}
                    current={this.state.tips}
                    nameSQL={arrTips[i]}
                    name={arrNames[i]}
                    click={() => this.setTips(brName)}
                />
            });
        }

        if (sqlContent.length > 0) {

            if (!isTop) {


                sortElements = <div className={classes.SortByLine}>
                    <div className={classes.label}>
                        Sort By:
                    </div>
                    <SortBy
                        key="Chance"
                        current={this.state.sortBy}
                        name="Chance"
                        br={1}
                        click={() => this.setSort(1)}
                    />

                    <SortBy
                        key="Time"
                        current={this.state.sortBy}
                        name="Kick-Off"
                        br={2}
                        click={() => this.setSort(2)}
                    />

                    <SortBy
                        key="Series"
                        current={this.state.sortBy}
                        name="Series"
                        br={5}
                        click={() => this.setSort(5)}
                    />

                </div>;

                sqlContent.forEach((element, index) => {
                    if (element.name === this.state.tips) {

                        if (element.content.length > 0) {
                            arrImutable = element.content;
                        }
                    }
                });

                // colTime: "18:00+02:00"
                // arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);

                if (this.state.sortBy === 1) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
                } else if (this.state.sortBy === 2) {
                    let tempDateA;
                    let tempDateB;

                    arr = [...arrImutable].sort((a, b) => {
                        tempDateA = new Date(a.colDate + "T" + a.colTime);
                        tempDateB = new Date(b.colDate + "T" + b.colTime);
                        if (tempDateA.getTime() > tempDateB.getTime()) return 1;
                        else if (tempDateA.getTime() === tempDateB.getTime()) {
                            return parseInt(a.chance) < parseInt(b.chance);
                        } else return -1;
                    });
                } else if (this.state.sortBy === 3) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a.tip) < parseInt(b.tip) ? 1 : -1);
                } else if (this.state.sortBy === 4) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total) < parseInt(b["series"].h_a_total) ? 1 : -1);
                } else if (this.state.sortBy === 5) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total_all) < parseInt(b["series"].h_a_total_all) ? 1 : -1);
                }

            } else {

                arr = [];

                sortElements = <div className={classes.SortByLine}>
                    <div className={classes.label}>
                        Sort By:
                    </div>
                    <SortBy
                        key="Chance"
                        current={this.state.sortBy}
                        name="Chance"
                        br={1}
                        click={() => this.setSort(1)}
                    />

                    <SortBy
                        key="Time"
                        current={this.state.sortBy}
                        name="Kick-Off"
                        br={2}
                        click={() => this.setSort(2)}
                    />

                    <SortBy
                        key="Tips"
                        current={this.state.sortBy}
                        name="Tips"
                        br={3}
                        click={() => this.setSort(3)}
                    />

                    <SortBy
                        key="Series"
                        current={this.state.sortBy}
                        name="Series"
                        br={5}
                        click={() => this.setSort(5)}
                    />

                </div>;



                sqlContent.forEach((element, index) => {

                    if (element.content.length > 0) {
                        element.content.forEach(el => {
                            if (parseInt(el.chance) >= 80) {
                                arrImutable.push(el);
                            }
                        });
                    }

                });

                // arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);

                // colTime: "18:00+02:00"

                if (this.state.sortBy === 1) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a.chance) < parseInt(b.chance) ? 1 : -1);
                } else if (this.state.sortBy === 2) {
                    let tempDateA;
                    let tempDateB;

                    arr = [...arrImutable].sort((a, b) => {
                        tempDateA = new Date(a.colDate + "T" + a.colTime);
                        tempDateB = new Date(b.colDate + "T" + b.colTime);
                        return tempDateA.getTime() > tempDateB.getTime() ? 1 : -1;
                    });
                } else if (this.state.sortBy === 3) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a.tip) < parseInt(b.tip) ? 1 : -1);
                } else if (this.state.sortBy === 4) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total) < parseInt(b["series"].h_a_total) ? 1 : -1);
                } else if (this.state.sortBy === 5) {
                    arr = [...arrImutable].sort((a, b) => parseInt(a["series"].h_a_total_all) < parseInt(b["series"].h_a_total_all) ? 1 : -1);
                }


            }
        }

        /*
        if(arr.length > 0) {

            console.log(arr);
            function compare (a, b) {

                if (parseInt(a.chance) > parseInt(b.chance)) {
                    return 1;
                }
                return 0;
            }

            arr.sort(compare);
            console.log(arr);
        } */


        const recomendedArr = [];
        const couldTryArr = [];

        let border = 91;

        if (!isTop) {
            borderArray.forEach(element => {
                if (element.name === this.state.tips) {
                    border = parseInt(element.br);
                }
            });
        }



        let playedRec = 0;
        let wonRec = 0;

        let playedTry = 0;
        let wonTry = 0;



        arr.forEach(element => {

            if (parseInt(element.chance) >= border) {

                if (parseInt(element.resultCount) !== -1) {
                    playedRec++;

                    if (parseInt(element.resultCount) === 1) {
                        wonRec++;
                    }

                }
                recomendedArr.push(element);

            } else {

                if (parseInt(element.resultCount) !== -1) {
                    playedTry++;

                    if (parseInt(element.resultCount) === 1) {
                        wonTry++;
                    }

                }
                couldTryArr.push(element);

            }

        });

        let tempArr = [];
        let percCount = "";

        if (this.state.recomended) {

            if (playedRec > 0) {
                const ttt = (wonRec * 100 / playedRec).toFixed(0);
                const bbb = `Tips won: ${ttt}% (${wonRec}/${playedRec})`;
                percCount = <PercCount text={bbb} />
            }

            if (recomendedArr.length > 0) {


                const max = recomendedArr.length;

                if (recomendedArr.length > 6) {
                    tempArr = recomendedArr.slice(this.state.start, this.state.end);

                    contentNext = (<div className={classes.nextPrevBox}>
                        <div style={{ opacity: this.state.end === max ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={() => this.load6more(max)}>
                            {"<< Previous"}
                        </div>
                        <div style={{ opacity: this.state.start === 0 ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={() => this.load6less(max)}>
                            {"Next >>"}
                        </div>
                    </div >);

                } else {
                    tempArr = recomendedArr;
                }

                /*
                function compare(a, b) {
                    if (a.last_nom > b.last_nom) {
                        return 1;
                    }
                    return 0;
                }

                tempArr.sort(compare);
                */



                contentGamesInner = tempArr.map((element, index) => {
                    // Ovde obradjujemo utakmice
                    return <SingleGame key={index} element={element} index={index} />
                });





            } else {
                if (this.state.tips === "") {
                    contentGamesInner = <Spinner />;
                } else {
                    contentGamesInner = <div className={classes.noTips}> There are no available tips</div>;
                }

            }
        } else if (this.state.couldTry) {
            if (couldTryArr.length > 0) {


                if (playedTry > 0) {
                    const ttt = (wonTry * 100 / playedTry).toFixed(0);
                    const bbb = `Tips won: ${ttt}% (${wonTry}/${playedTry})`;
                    percCount = <PercCount text={bbb} />
                }

                const max = couldTryArr.length;

                if (couldTryArr.length > 6) {
                    tempArr = couldTryArr.slice(this.state.start, this.state.end);

                    contentNext = (<div className={classes.nextPrevBox}>
                        <div style={{ opacity: this.state.end === max ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={() => this.load6more(max)}>
                            {"<< Previous"}
                        </div>
                        <div style={{ opacity: this.state.start === 0 ? "0.2" : "1.0" }} className={classes.nextPrev} onClick={() => this.load6less(max)}>
                            {"Next >>"}
                        </div>
                    </div >);

                } else {
                    tempArr = couldTryArr;
                }

                /*
                function compare(a, b) {
                    if (a.last_nom > b.last_nom) {
                        return 1;
                    }
                    return 0;
                }

                tempArr.sort(compare);
                */



                contentGamesInner = tempArr.map((element, index) => {
                    // Ovde obradjujemo utakmice
                    return <SingleGame key={index} element={element} index={index} />
                });





            } else {
                if (this.state.tips === "") {
                    contentGamesInner = <Spinner />;
                } else {
                    contentGamesInner = <div className={classes.noTips}> There are no available tips</div>;
                }

            }
        }

        /*
        <TipSingle
                    key={index}
                    br={br}
                    current={this.state.tips}
                    nameSQL={arrTips[i]}
                    name={arrNames[i]}
                    click={() => this.setTips(brName)}
                />
        */




        ///////////////

        const dottedLine = <div className={classes.dottedLine} />



        return (
            <div>

                <div className={classes.ContentTips}>
                    {contentTips}
                    <div className={classes.AllGamesLine}>
                        <div className={classes.overallButtons}>
                            <OverallButton o={this.state.recomended} click={this.setRecomended} name={!isTop ? "Recommended" : "Chance > 90% "} />
                            <OverallButton o={this.state.couldTry} click={this.setCouldTry} name={!isTop > 0 ? "You Could Try" : "Chance 80% - 90%"} />
                        </div>
                        {percCount}
                        {dottedLine}
                        {sortElements}
                        {contentGamesInner}
                        {contentNext}

                    </div>
                </div>
                <div>

                </div>
            </div>

        );
    }
}

export default TipsSingle;
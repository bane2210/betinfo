import React, { useEffect, useState } from "react";
import classes from "./CompetitionsBox.module.css";

import CompetitionsButton from "./CompetitionsButton/CompetitionsButton";
import Save from "../saveButton/saveButton";

const CompMarketBox = (props) => {
  const [state, setState] = useState({
    value: [],
    checkAll: 1,
  });

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        value: props.settingsObjectValue,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStateObject = (br) => {
    let object = [...state.value];

    if (object[br]["value"] === 1) {
      object[br]["value"] = 0;
    } else {
      object[br]["value"] = 1;
    }

    setState((prevState) => {
      return {
        ...prevState,
        value: object,
      };
    });
  };

  const checkUncheckAll = () => {
    let object = [...state.value];

    if (state.checkAll === 0) {
      object.forEach((element) => {
        element.value = 1;
      });

      setState((prevState) => {
        return {
          ...prevState,
          value: object,
          checkAll: 1,
        };
      });
    } else {
      object.forEach((element) => {
        element.value = 0;
      });

      setState((prevState) => {
        return {
          ...prevState,
          value: object,
          checkAll: 0,
        };
      });
    }
  };

  let settingsObjectValue = props.settingsObjectValue;
  let content = "";

  let br = -1;

  content = settingsObjectValue.map((element, index) => {
    br = br + 1;
    let aa = br;
    return (
      <CompetitionsButton
        key={index}
        click={(br) => changeStateObject(aa)}
        name={element.name}
        value={element.value}
      />
    );
  });

  let selected = false;

  state.value.forEach((element) => {
    if (element.value === 1) selected = true;
  });

  return (
    <div className={classes.Container}>
      <div className={classes.checkAllContainer}>
        <div className={classes.checkAllButton} onClick={checkUncheckAll}>
          {state.checkAll ? "Deselect All" : "Select All"}
        </div>
      </div>
      {content}
      <div className={classes.saveContainer}>
        {selected ? (
          <Save save={() => props.save(state.value)} />
        ) : (
          <div className={classes.errorM}>
            {" "}
            You must select at least one country.{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompMarketBox;

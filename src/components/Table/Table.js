import React from "react";
import "./Table.css";

const Table = (props) => {
  const setTable = () => {
    const tableFull = document.getElementsByClassName("allTableContainer")[0];

    if (tableFull.style.display === "none" || tableFull.style.display === "") {
      tableFull.style.display = "block";
      document.getElementById("closeButton").style.display = "none";
      document.getElementById("arrowUp").style.display = "none";
      document.getElementById("arrowDown").style.display = "inline-block";
    } else {
      tableFull.style.display = "none";
      document.getElementById("closeButton").style.display = "block";
      document.getElementById("arrowUp").style.display = "inline-block";
      document.getElementById("arrowDown").style.display = "none";
    }
  };

  let html = props.table;

  html = html.replace(
    '<div style="width: 100%;"><div style="width: 100%; padding: 0px 0px 0px 20px;">',
    '<div class="legendContainer"><div style="width: 100%; padding: 0px 0px 0px 20px;">'
  );

  let content = <div dangerouslySetInnerHTML={{ __html: html }} />;

  return (
    <div>
      {content}
      <div className={"tableBottom"} onClick={setTable}>
        {" "}
        Table
        <div
          id="arrowUp"
          style={{ marginLeft: "10px", display: "inline-block" }}
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
        <div id="arrowDown" style={{ marginLeft: "10px", display: "none" }}>
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Table;

import classes from "./SubscribePage.module.css";

const subscribePage = () => {
  if (
    document.getElementById("backdrop") !== null &&
    document.getElementById("body") !== null
  ) {
    document.getElementById("backdrop")!.style.display = "none";
    document.getElementById("body")!.style.display = "block";
  }
  
  return (
    window.scrollTo(0, 0),
    (
      // console.log("<subscribePage>"),
      <div className={classes.SubscribePage}>
        Enjoy, there are no subscriptions at the moment!
      </div>
    )
  );
};

export default subscribePage;

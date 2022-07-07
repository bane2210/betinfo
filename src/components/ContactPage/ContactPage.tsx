import classes from "./ContactPage.module.css";

const contactPage = () => {
  if (
    document.getElementById("backdrop") !== null &&
    document.getElementById("body") !== null
  ) {
    document.getElementById("backdrop")!.style.display = "none";
    document.getElementById("body")!.style.display = "block";
  }

  return (
    <div className={classes.contactPage}>
      If you want to share some useful info, if you have some proposals or
      ideas, or you just have something to tell us, please do not hesitate,
      write to us…
      <div className={classes.Email}>marketing@betinfo.cc</div>
    </div>
  );
};

export default contactPage;

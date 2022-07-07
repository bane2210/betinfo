import classes from "./LinksPage.module.css";

const linksPage = (props: { pageLinks: string }) => {
  let content = (
    <div
      className={classes.allLinks}
      dangerouslySetInnerHTML={{ __html: props.pageLinks }}
    />
  );

  return (
    <div className={classes.linksContainer}>
      <div className={classes.header}>Partners</div>
      {content}
    </div>
  );
};

export default linksPage;

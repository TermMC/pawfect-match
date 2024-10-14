import styles from "./Tag.module.css";

const Tag = ({title, description}) => {
  return (
    <div className={styles.tagContainer}>
      <h1 className={styles.tagTitle}>{title}</h1>
      <h2 className={styles.tagDescription}>{description}</h2>
    </div>
  );
}
export default Tag;
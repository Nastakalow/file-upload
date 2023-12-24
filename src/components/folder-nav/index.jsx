import styles from "./styles.module.css";

function FolderNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.item}>Type</li>
        <li className={styles.item}>Name</li>
        <li className={styles.item}>Size</li>
        <li className={styles.item}>Modified</li>
        <li className={styles.item}>Modified by</li>
      </ul>
    </nav>
  );
}

export default FolderNav;

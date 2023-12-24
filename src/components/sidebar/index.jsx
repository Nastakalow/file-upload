import styles from "./styles.module.css";
import { sidebarItems } from "./constants";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {sidebarItems.map((item, index) => (
          <ul className={styles.sidebarItem} key={index}>
            <Link to={item.href}>{item.label}</Link>
          </ul>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

import styles from "./assets/styles/styles.module.css";
import logo from "./assets/images/logo.svg";
import profile from "./assets/images/profile.svg";
import AddFile from "../add-file";
import { useOutsidePopup } from "../../hooks/useOutsidePopup";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ setIsPopupOpen }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nodeRef = useRef(null);
  const username = localStorage.getItem("userId") || "Username";
  const navigate = useNavigate();
  let url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets/-me-";

  useOutsidePopup(nodeRef, () => {
    setIsDropdownOpen(false);
  });

  const handleLogout = async () => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa(localStorage.getItem("token")),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img className={styles.logoImg} src={logo} alt="Logo" />
        <h1 className={styles.logoText}>Ingress / Task</h1>
      </div>

      <AddFile setIsPopupOpen={setIsPopupOpen} />

      <div ref={nodeRef} className={styles.profileWrapper}>
        <button
          className={styles.profileBtn}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img className={styles.profileImg} src={profile} alt="profile" />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <h2 className={styles.username}>{username}</h2>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

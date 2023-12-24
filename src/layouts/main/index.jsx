import styles from "./styles.module.css";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import CreatePopup from "../../components/create-popup";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      {isPopupOpen && (
        <div className={styles.popupWrapper}>
          <CreatePopup setIsPopupOpen={setIsPopupOpen} />
        </div>
      )}
      <Header setIsPopupOpen={setIsPopupOpen} />
      <main className={styles.mainWrapper}>
        <Outlet />
      </main>
      <Sidebar />
    </>
  );
}

export default MainLayout;

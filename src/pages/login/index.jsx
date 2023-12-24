import styles from "./styles.module.css";
import LoginForm from "../../components/login/form";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    navigate("/personal-files");

    localStorage.setItem("token", userData.id);
    localStorage.setItem("userId", userData.userId);
  };

  return (
    <main className={styles.loginWrapper}>
      <h1 className={styles.title}>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </main>
  );
}

export default LoginPage;

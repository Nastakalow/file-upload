import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { inputs } from "./constants";
import LoginInput from "../input";

function LoginForm({ onLogin }) {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const errMessage = "Wrong credentials invalid username or password";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets";

  const onSubmit = async (data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
        body: JSON.stringify({
          userId: data.username,
          password: data.password,
        }),
      });

      if (res.status === 403) {
        setWrongCredentials(true);
      }

      if (res.ok) {
        const json = await res.json();
        onLogin(json.entry);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputsWrapper}>
        {wrongCredentials && <p className={styles.errMessage}>{errMessage}</p>}

        {inputs.map((input) => (
          <div key={input.id}>
            <LoginInput {...input} register={register} errors={errors} />
          </div>
        ))}
      </div>
      <div className={styles.submitBtnWrapper}>
        <input className={styles.submitBtn} type="submit" />
      </div>
    </form>
  );
}

export default LoginForm;

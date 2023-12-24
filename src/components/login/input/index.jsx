import styles from "./styles.module.css";

function LoginInput({ id, label, type, name, placeholder, register, errors }) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      {errors[name] && (
        <span className={styles.errMessage}>This field is required</span>
      )}
    </>
  );
}

export default LoginInput;

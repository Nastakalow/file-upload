import styles from "./styles.module.css";
import { useOutsidePopup } from "../../hooks/useOutsidePopup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { createFolder } from "../../features/file/fileSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function CreatePopup({ setIsPopupOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes";
  let { id } = useParams();

  if (id === undefined) {
    id = "f1033e8b-2354-4a4d-a2f0-7343871b217c";
  }

  useOutsidePopup(nodeRef, () => {
    setIsPopupOpen(false);
  });

  const onSubmit = async (data) => {
    dispatch(createFolder({ url, nodeId: id, data }));
    setIsPopupOpen(false);
  };

  return (
    <div ref={nodeRef} className={styles.popupWrapper}>
      <h2 className={styles.title}>Create folder</h2>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.nameInput}
          placeholder="Name"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className={styles.errMessage}>This field is required</span>
        )}
        <input
          className={styles.titleInput}
          placeholder="Title"
          type="text"
          {...register("title")}
        />
        <textarea
          className={styles.textarea}
          placeholder="Description"
          {...register("description")}
        />
        <input className={styles.createBtn} value={"Create"} type="submit" />
      </form>
    </div>
  );
}

export default CreatePopup;

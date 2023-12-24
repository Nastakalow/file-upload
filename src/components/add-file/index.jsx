import { useRef } from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../features/file/fileSlice";
import { useDispatch } from "react-redux";

function AddFile({ setIsPopupOpen }) {
  const hiddenFileInput = useRef(null);
  let { id } = useParams();
  const dispatch = useDispatch();
  const url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes";

  if (id === undefined) {
    id = "f1033e8b-2354-4a4d-a2f0-7343871b217c";
  }

  const handleUpload = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];

    const formData = new FormData();
    formData.append("filedata", fileUploaded);
    formData.append("nodeType", "cm:content");
    formData.append("name", fileUploaded.name);

    dispatch(uploadFile({ url, id, formData }));
  };

  const handleCreate = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleCreate} className={styles.createBtn}>
        Create
      </button>
      <button onClick={handleUpload} className={styles.uploadBtn}>
        Upload
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default AddFile;

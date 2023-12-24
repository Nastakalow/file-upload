import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function FileInside() {
  const url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes";
  const { id } = useParams();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${id}/content`, {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(localStorage.getItem("token")),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const blob = await response.blob();
        const fileUrl = await URL.createObjectURL(blob);
        setFileData(fileUrl);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchData();
  }, [url, id]);

  return (
    <>
      <DocViewer
        documents={[{ uri: fileData }]}
        pluginRenderers={DocViewerRenderers}
        className={styles.docWiewer}
        theme={{
          primary: "#907bff",
          secondary: "#ffffff",
          textPrimary: "#ffffff",
          disableThemeScrollbar: false,
        }}
      />
    </>
  );
}

export default FileInside;

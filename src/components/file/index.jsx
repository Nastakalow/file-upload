import styles from "./assets/styles/styles.module.css";
import folder from "./assets/images/folder.svg";
import file from "./assets/images/file.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function File({
  id,
  name,
  content,
  modifiedAt,
  modifiedByUser: { displayName },
  isFolder,
}) {
  const kilobyte = !isFolder ? content.sizeInBytes / 1024 : null;
  const modifierDate = new Date(modifiedAt);
  const timeAgo = formatDistanceToNow(modifierDate, { addSuffix: true });
  let path = undefined;

  if (isFolder) {
    path = `/personal-files/folder/${id}`;
  } else {
    path = `/personal-files/file/${id}`;
  }

  return (
    <Link to={path} className={styles.fileWrapper}>
      <ul className={styles.fileList}>
        <li className={styles.item}>
          {isFolder ? (
            <img className={styles.icon} src={folder} alt="folder" />
          ) : (
            <img className={styles.icon} src={file} alt="file" />
          )}
        </li>
        <li className={styles.item}>{name}</li>
        <li className={styles.item}>
          {!isFolder ? `${kilobyte.toFixed(2)} KB` : ""}
        </li>
        <li className={styles.item}>{timeAgo}</li>
        <li className={styles.item}>{displayName}</li>
      </ul>
    </Link>
  );
}

export default File;

import FolderNav from "../../components/folder-nav";
import File from "../../components/file";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilesById } from "../../features/file/fileSlice";

function FolderInside() {
  const url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes";
  const maxItems = 15;
  const { id } = useParams();
  const { files, loading } = useSelector((state) => state.files);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilesById({ url, nodeId: id, maxItems }));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <FolderNav />
      <div>
        {files.map((file) => (
          <File key={file.entry.id} {...file.entry} />
        ))}
      </div>
    </>
  );
}

export default FolderInside;

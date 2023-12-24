import { useEffect } from "react";
import File from "../../components/file";
import FolderNav from "../../components/folder-nav";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../features/file/fileSlice";
import Loading from "../../components/loading";

function PersonalFiles() {
  const dispatch = useDispatch();
  const { files, loading } = useSelector((state) => state.files);
  const url =
    "https://do7liva8.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes";
  const nodeId = "f1033e8b-2354-4a4d-a2f0-7343871b217c";
  const maxItems = 15;

  useEffect(() => {
    dispatch(getFiles({ url, nodeId, maxItems }));
  }, []);

  if (loading) return <Loading />;

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

export default PersonalFiles;

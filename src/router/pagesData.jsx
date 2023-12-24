import MainLayout from "../layouts/main";
import LoginPage from "../pages/login";
import PersonalFiles from "../pages/personal-files";
import FolderInside from "../pages/folder-inside";
import FileInside from "../pages/file-inside";

const pagesData = [
  {
    path: "/login",
    title: "login",
    element: <LoginPage />,
  },
  {
    element: <MainLayout />,
    title: "mainLayout",
    children: [
      {
        path: "/personal-files",
        title: "personalFiles",
        element: <PersonalFiles />,
      },
      {
        path: "personal-files/folder/:id",
        title: "folderInside",
        element: <FolderInside />,
      },
      {
        path: "personal-files/file/:id",
        title: "fileInside",
        element: <FileInside />,
      },
    ],
  },
];

export default pagesData;

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import pagesData from "./pagesData";

const renderRoutes = (routes) => {
  return routes.map(({ path, element, title, children = [] }) => {
    return (
      <Route key={title} path={path} element={element}>
        {children.length > 0 && <Route>{renderRoutes(children)}</Route>}
      </Route>
    );
  });
};

function Router() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("token");

    if (!userId) {
      navigate("/login");
    } else if (pathname === "/login" || pathname === "/") {
      navigate(-1);
    }
  }, [pathname]);

  const pageRoutes = renderRoutes(pagesData);

  return <Routes>{pageRoutes}</Routes>;
}

export default Router;

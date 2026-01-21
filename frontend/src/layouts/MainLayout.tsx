import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="layout">
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

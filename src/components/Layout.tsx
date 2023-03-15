import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div>
			Contenido de la página
			<Outlet />
		</div>
	);
};

export default Layout;

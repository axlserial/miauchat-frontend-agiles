import { Outlet } from "react-router-dom";
import { Image } from "@mantine/core";
import { useParams } from "react-router-dom";

import bgImage from "../assets/images/Icon_MiauChat.svg";

const Layout = () => {
	let { id } = useParams();

	return (
		<div>
			{id ? (
				<Outlet />
			) : (
				<div
					style={{
						backgroundColor: "",
						width: "60vw",
						height: "88vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginLeft: "20%",
					}}
				>
					<Image width={"60%"} height={"60%"} src={bgImage} />
				</div>
			)}
		</div>
	);
};

export default Layout;

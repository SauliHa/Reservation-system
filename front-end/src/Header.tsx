import { Button } from "react-bootstrap";
import "./styles/header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./App";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";

export function Header() {

	const { t } = useTranslation();
	const userInfo = useContext(AppContext);
	const isTabletOrMobile = useMediaQuery({ maxWidth: 900 });

	return (
		<div className="superheader">
			<h3 id="headerTitle">Super-sport bowling</h3>
			{isTabletOrMobile ? 
				<MDBDropdown id="dropdownHeader">
					<MDBDropdownToggle color="dark" id="dropdownButton">{t("header.menu")}</MDBDropdownToggle>
					<MDBDropdownMenu>
						<MDBDropdownItem>
							<Link to="/" className="headerItem">
								{t("header.front-page")}
							</Link>
						</MDBDropdownItem>
						<MDBDropdownItem>
							<Link to="/user" className="headerItem">
								{t("header.user-page")}
							</Link>
						</MDBDropdownItem>
						<MDBDropdownItem>
							<Link to="/calendar" className="headerItem">
								{t("header.reservation-calendar")}
							</Link>
						</MDBDropdownItem>
						<MDBDropdownItem>
							<Link to="/login" className="headerItem">	
								{userInfo.state.loggedIn ? t("header.log-out") : t("header.log-in")}
							</Link>
						</MDBDropdownItem>
						{/*<MDBDropdownItem divider />
							<MDBDropdownItem><p className="headerItem">{userInfo.state.username}</p></MDBDropdownItem> */}
					</MDBDropdownMenu>
				</MDBDropdown>
				:
				<div className="header">
					<li>
						<Link to="/" className="headerItem">
							{t("header.front-page")}
						</Link>
					</li>
					<li>
						<Link to="/user" className="headerItem">
							{t("header.user-page")}
						</Link>
					</li>
					<li>
						<Link to="/calendar" className="headerItem">
							{t("header.reservation-calendar")}
						</Link>
					</li>
					{userInfo.state.loggedIn && (
						<li className="userName">{userInfo.state.username}</li>
					)}
					<Link to="/login" id="loginButton">	
						<Button variant="dark">
							{userInfo.state.loggedIn ? t("header.log-out") : t("header.log-in")}
						</Button>
					</Link>
				</div>
			}
		</div>
	);
}

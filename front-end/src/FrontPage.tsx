import { Link } from "react-router-dom";
import image from "./assets/ai_bowl.png";
import image2 from "./assets/Guy_bowling.jpg";
import map from "./assets/map.png";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FrontPage = () => {

	const { t } = useTranslation();

	return (
		<div className="container">

			<div id="frontPageTitle">
				<h1>{t("reservationsystem")}</h1>
				<h4>{t("super-sport_bowling")}</h4>
			</div>
			<div className="frontPageContent row">
				<div className="col frontPageContentItem">
					<h2 className="mt-3  mb-3">{t("supersports_title")}</h2>
					<p className="mt-3  mb-3">{t("location_info")}</p>
					<p className="mt-3  mb-3">{t("rental_info")}</p>
					<p className="mt-3  mb-3">{t("login_info")}</p>
					<Link to="/login"><Button variant="dark">{t("register_button")}</Button></Link>
				</div>
				<div className="col  mb-3" >
					<img src={image} className="frontImage"></img>
				</div>
				<div className="w-100"></div>
				<div className="col  mb-3">
					<img src={image2} className="frontImage"></img>
				</div>
				<div className="col mb-3">
					<h2 className="mt-3">{t("come_bowling_title")}</h2>
					<p className="mt-3">{t("come_bowling_info")}</p>
					<Link to="/calendar"><Button variant="dark">{t("book_here_button")}</Button></Link>
				</div>
				
			</div>
			<div className="mt-5">
				<h2 className="mb-3">{t("find_us_title")}</h2>
				<img src={map} className="frontImage mb-4"></img>
			</div>
		</div>
	);
};

export default FrontPage;

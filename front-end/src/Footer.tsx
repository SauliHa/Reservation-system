import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import "./styles/footer.css";

export function Footer () {
	const {t, i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("i18nextLng", lng);
	};
	return (
		<div className="footer">
			<p className="footerItem">Super-sport</p>
			<a href="#top" className="footerItem back-to-top-link">{t("back-to-top")}</a>
			<div className="footerItem">
				<MDBBtn tag='a' color='none' className='m-1' style={{ color: "#3b5998" }}>
					<MDBIcon fab icon='facebook-f' size='lg' />
				</MDBBtn>

				<MDBBtn tag='a' color='none' className='m-1' style={{ color: "#55acee" }}>
					<MDBIcon fab icon='twitter' size='lg' />
				</MDBBtn>

				<MDBBtn tag='a' color='none' className='m-1' style={{ color: "#dd4b39" }}>
					<MDBIcon fab icon='google' size='lg' />
				</MDBBtn>

				<MDBBtn tag='a' color='none' className='m-1' style={{ color: "#ac2bac" }}>
					<MDBIcon fab icon='instagram' size='lg' />
				</MDBBtn>
			</div>
			<div className="language-buttons">
				<button onClick={() => changeLanguage("en")} className="language-btn">
					<MDBIcon icon="flag" flag="us" className="flag-icon" />
					<span className="language-text">English</span>
				</button>
				<button onClick={() => changeLanguage("fi")} className="language-btn">
					<MDBIcon icon="flag" flag="finland" className="flag-icon" />
					<span className="language-text">Suomi</span>
				</button>
			</div>
		</div>
	);
}
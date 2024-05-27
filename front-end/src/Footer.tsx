import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import "./styles/footer.css";

export function Footer () {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};
	return (
		<div className="footer">
			<p className="footerItem">Super-sport</p>
			<a href="#top">Back to top</a>
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
			<div className="footerItem">
				<h1>{t("welcome")}</h1>
				<MDBIcon flag='us' /> <button onClick={() => changeLanguage("en")}>English</button>
				<MDBIcon flag='finland' /><button onClick={() => changeLanguage("fi")}>Suomi</button>
			</div>
		</div>
	);
}
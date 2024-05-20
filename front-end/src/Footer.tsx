import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "./styles/footer.css";

export function Footer () {
	return (
		<div className="footer">
			<p className="footerItem">Super-sport</p>
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
		</div>
	);
}
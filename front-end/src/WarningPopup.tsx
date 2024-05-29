import {
	MDBBtn,
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody
} from "mdb-react-ui-kit";

export function WarningPopup( { warningTitle, message, open, toggleOpen }:PropsValidation ) {


	return (
		<>
			<MDBModal open={open} tabIndex="-1" onClose={toggleOpen}>
				<MDBModalDialog size="sm">
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>{warningTitle}</MDBModalTitle>
							<MDBBtn className="btn-close" color="danger" onClick={toggleOpen}></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>{message}</MDBModalBody>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}

interface PropsValidation {
	warningTitle: string;
	message: string;
	open: boolean;
	toggleOpen: () => void;
}
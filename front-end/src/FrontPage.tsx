import { Link } from "react-router-dom";
import image from "./assets/ai_bowl.png";
import image2 from "./assets/Guy_bowling.jpg";
import map from "./assets/map.png";
import { Button } from "react-bootstrap";


const FrontPage = () => {

	return (
		<div className="container">

			<div id="frontPageTitle">
				<h1>Ajanvarausjärjestelmä</h1>
				<h4>super-sport bowling</h4>
			</div>
			<div className="frontPageContent row">
				<div className="col frontPageContentItem">
					<h2 className="mt-3  mb-3">Super-sports urheilukeskus</h2>
					<p className="mt-3  mb-3">Olemme Jyväskylässä sijaitseva urheilukeskus kaukana kaikesta ja keskellä ei mitään.</p>
					<p className="mt-3  mb-3">Meiltä voit vuokrata välineitä ja tiloja useille eri lajeille ja harrastuksille, joten voit harrastaa mitä vain kunhan mitä vain on keilaamista!</p>
					<p className="mt-3  mb-3">Kirjaudu sisään ja ala käytämään meidän tiloja vaikka heti!</p>
					<Link to="/login"><Button variant="dark">Tee uusi käyttäjä!</Button></Link>
				</div>
				<div className="col  mb-3" >
					<img src={image} className="frontImage"></img>
				</div>
				<div className="w-100"></div>
				<div className="col  mb-3">
					<img src={image2} className="frontImage"></img>
				</div>
				<div className="col mb-3">
					<h2 className="mt-3">Tule keilaamaan</h2>
					<p className="mt-3">Meillä on avoinna useita ratoja joten suurempikin porukka mahtuu keilaamaan. Kirjaudu sisään ja varaa ratoja täältä!</p>
					<Link to="/calendar"><Button variant="dark">Varaa aika täältä! </Button></Link>
				</div>
				
			</div>
			<div className="mt-5">
				<h2 className="mb-3">Löydät meidät täältä!</h2>
				<img src={map} className="frontImage mb-4"></img>
			</div>
		</div>
	);
};

export default FrontPage;

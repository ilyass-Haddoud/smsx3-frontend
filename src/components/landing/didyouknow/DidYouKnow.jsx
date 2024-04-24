import "./didyouknow.css"
import didyouknowimg from "../../../assets/landing/didyouknowimg.png"

const DidYouKnow = () => {
    return (
        <div className="didyouknow">
            <div className="img">
                <img src={didyouknowimg}/>
            </div>
            <div className="text">
                <h1>
                    Le saviez-vous ?
                </h1>
                <p>
                    Les petites entreprises consacrent 130 heures par an en moyenne aux relances de paiement et ne reçoivent souvent leur règlement que 30 jours après la date prévue.
                </p>
            </div>
        </div>
    )
}

export default DidYouKnow;
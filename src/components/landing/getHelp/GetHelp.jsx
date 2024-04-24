import gethelpimg from "../../../assets/landing/gethelpimg.png";
import "./gethelp.css";

const GetHelp = () => {
    return (
        <div className="gethelp">
            <div className="info">
                <h1>
                    Parlez avec un spécialiste Sage pour personnaliser votre logiciel de devis et facturation
                </h1>
                <p>
                    Vous souhaitez discuter avec nous des logiciels de devis et facturation ?
                </p>
                <button>
                    Demandez un rappel
                </button>
            </div>
            <div className="image">
                <img src={gethelpimg} />
            </div>
        </div>
    )
}

export default GetHelp;
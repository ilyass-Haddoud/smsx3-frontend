import heroBg from "../../../assets/landing/hero_bg.png";
import "./hero.css"

const Hero = () => {
    return(
        <div className="hero">
            <div className="text">
                <h1>
                    Gérez votre facturation en ligne avec la platforme <span>Sage InvoiceHub</span>.
                </h1>
                <p>
                    Avec Sage InvoiceHub, simplifiez la gestion de vos factures fournisseurs en automatisant le stockage et le suivi de vos documents financiers. Libérez-vous des tâches administratives fastidieuses en numérisant et en important facilement vos factures dans notre plateforme sécurisée.
                </p>
            </div>
            <div className="image">
                <img src={heroBg} alt="hero image"/>
            </div>
        </div>        
    )
}

export default Hero;
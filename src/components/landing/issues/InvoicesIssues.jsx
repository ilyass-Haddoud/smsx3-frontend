import "./invoicesissues.css"
import receipts from "../../../assets/landing/icons/receipts.svg"
import card from "../../../assets/landing/icons/card.svg"
import email from "../../../assets/landing/icons/email.svg"
import setting from "../../../assets/landing/icons/setting.svg"

const InvoicesIssues = () => {
    return (
        <div className="invoicesissues">
            <div className="text">
                <h1>
                    Les défis de la facturation
                </h1>
                <p>
                    Avez-vous le bon logiciel facturation pour répondre aux obligations légales et faciliter le pilotage votre entreprises ?
                </p>
            </div>
            <div className="cards">
                <div className="card">
                    <div className="icon">
                        <img src={receipts}/>
                    </div>
                    <div className="title">
                        Conformité facture électronique</div>
                    <div className="desc">
                        Les factures manuelles peuvent contenir des erreurs ou des incohérences. Evitez les erreurs et assurez-vous de rester en conformité avec un logiciel de facturation.
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <img src={setting} />
                    </div>
                    <div className="title">
                        Le temps et le suivi
                    </div>
                    <div className="desc">
                        Dans le monde numérique d'aujourd'hui, les entreprises doivent adopter un logiciel de facturation en ligne qui automatise le suivi et permet de gagner du temps.
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <img src={card} />
                    </div>
                    <div className="title">
                        Gestion de la trésorerie
                    </div>
                    <div className="desc">
                        Bien facturer est essentiel pour avoir un flux de trésorerie régulier. Cela vous permet de couvrir les frais généraux de base, comme la paie et les fournitures.
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <img src={email} />
                    </div>
                    <div className="title">
                        La gestion des relances
                    </div>
                    <div className="desc">
                        L'envoi, le suivi et les relances des factures sont des tâches chronophages. Avec un logiciel de facturation, faites-vous payer vos factures facilement et rapidement.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicesIssues;
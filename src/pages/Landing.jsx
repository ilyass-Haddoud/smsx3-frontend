import DidYouKnow from "../components/landing/didyouknow/DidYouKnow";
import Footer from "../components/landing/footer/Footer";
import GetHelp from "../components/landing/getHelp/GetHelp";
import Hero from "../components/landing/hero/Hero";
import InvoicesIssues from "../components/landing/issues/InvoicesIssues";

const Landing = () => {
    return (
        <div className="landing">
            <Hero/>
            <InvoicesIssues/>
            <DidYouKnow/>
            <GetHelp/>
            <Footer/>
        </div>
    )
}
export default Landing;
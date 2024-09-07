import './LandingPage.css'
import logoo from '../images/logo.png';
import icon from '../images/icon.png';

const LandingPage = () => {
    return (
        <>
            <div className="container-landing">
                <nav>
                    <img src={logoo} alt="hsh" className="logo"/>
                    <button className="btn"><img src={icon} alt="nice"/>Sign-in</button>
                </nav>
                <div className="content-container">
                    <div className="content">
                        <h1>Beautiful <br/> Dairy Farm</h1>
                        <p>Welcome to Happy Cow Dairy Farm! Discover the joy of pure,
                            farm-fresh dairy products straight from our pastures to your table
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage
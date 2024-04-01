import {Link} from "react-router-dom";
import  './AdminHeader.css'

const AdminHeader = () => {
    return (
        <>
            <div className="big">
                <div className="navbar">
                    <div className="container  flex ">
                        <Link to="#" className="logo logo-logo">lelgina<span>Investments</span></Link>

                        <nav>
                            <ul>
                                <li className="large-screen">
                                    <Link to='/admin/cows' className="nav-menu">
                                        cows
                                    </Link>
                                </li>
                                <li className="large-screen">
                                    <Link to='/admin/production' className="nav-menu">
                                        production
                                    </Link>
                                </li>
                                <li className="large-screen">
                                    <Link to='/admin/cowTree' className="nav-menu">
                                        cowTree
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminHeader
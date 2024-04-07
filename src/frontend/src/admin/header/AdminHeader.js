import {Link} from "react-router-dom";
import  './AdminHeader.css'

const AdminHeader = () => {
    return (
        <>
            <div className="big">
                <div className="navbar">
                    <div className="container  flex ">
                        <Link to="#" className="logo logo-logo">Dairy<span>Farm</span></Link>

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
                                    <Link to='/admin/breeds' className="nav-menu">
                                        breeds
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
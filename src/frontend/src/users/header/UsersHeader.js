import './UserHeader.css'
import {Link} from "react-router-dom";
const UsersHeader = () => {
  return(
      <>
          <div className="big">
              <div className="navbar">
                  <div className="container  flex ">
                      <Link to="#" className="logo logo-logo">Dairy<span>Farm</span></Link>

                      <nav>
                          <ul>
                              <li className="large-screen">
                                  <Link to='/user/cows' className="nav-menu">
                                      cows
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
export default UsersHeader
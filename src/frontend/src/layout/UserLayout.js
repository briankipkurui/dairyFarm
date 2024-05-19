import {Outlet} from "react-router-dom";
import UsersHeader from "../users/header/UsersHeader";

const UserLayout = () => {
  return(
      <main className="App">
          <UsersHeader/>
          <Outlet/>
      </main>
  )
}
export default UserLayout
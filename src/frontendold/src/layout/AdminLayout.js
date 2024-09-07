import {Outlet} from "react-router-dom";
import AdminHeader from "../admin/header/AdminHeader";

const AdminLayout = () => {
    return(
        <main className="App">
            <AdminHeader/>
            <Outlet />
        </main>
    )
}
export default AdminLayout
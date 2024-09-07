import { Sidebar } from "@/components/side_bar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
    return (
        <main className="App">
            <Sidebar/>
            <Outlet />
        </main>
    )
}
export default AdminLayout
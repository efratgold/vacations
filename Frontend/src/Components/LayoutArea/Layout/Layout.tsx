import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu"
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            <Header />
            <AuthMenu />
            {/* <Menu /> */}
            <hr />

            <Routing />
            
        </div>
    );
}

export default Layout;

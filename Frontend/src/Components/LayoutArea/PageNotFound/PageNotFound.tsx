import "./PageNotFound.css";
import notFound from "../../../Assets/images/not found.jpg"
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img src={notFound} alt="" />
        </div>
    );
}

export default PageNotFound;

import ErrorMassage from "../errorMassage/ErrorMassage"
import { Link } from "react-router-dom"
import page404 from "../../resources/img/page-not-found.jpg"

const NotFound = () => {
    return (
        <div>
            <Link to="/" style={{"display": "block", "textAlign": "center", "color": "#9F0013", "fontWeight": "bold"}}> Back to Main page</Link>
            <ErrorMassage i = {page404}/>
            {/* <img src={page404}></img> */}
        </div>
    )
}

export default NotFound;
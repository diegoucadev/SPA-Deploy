import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div>
            404 No encontrado -
            <Link to={"/"}> Regresar</Link>
        </div>
    )
}

export default NotFound;
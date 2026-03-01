import { Link } from "react-router-dom";

export default function Menu(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Produtos</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Lista</Link>
                    <Link className="nav-link" to="/novo">Adicionar</Link>
                </div>
            </div>
        </nav>
    )
}
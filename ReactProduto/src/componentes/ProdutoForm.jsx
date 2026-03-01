import { use, useEffect, useState} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ProdutoForm(){

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/${id}`).then((response) => {
                const { nome, preco, descricao } = response.data;
                setNome(nome);
                setPreco(preco);
                setDescricao(descricao);
            });
        }
    }, [id]);

    const salvarProduto = async (e) => {
        e.preventDefault();
        const produto = { nome, preco, descricao };     

        if(id){
            await api.put(`/${id}`, produto);
        }else{
            await api.post("/", produto);
        }
        navigate("/");
    }

    return(
        <div className="container card p-0 mt-5">
            <div className="card-header">
                <h3>{id ? "Editar Produto" : "Adicionar Novo Produto"}</h3>
            </div>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <h6> {nome}</h6>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Preço</label>
                        <input type="number" className="form-control" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={salvarProduto}>Salvar</button>
                    <Link to={"/"} className="btn btn-warning ms-2">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}
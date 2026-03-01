import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

export default function ProdutoGrid(){

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const response = await api.get("/");
        setProdutos(response.data);
    }

    const excluirProduto = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            await api.delete(`/${id}`);
            carregarProdutos();
        }
    }

    const formatarPreco = (valor) => {
        const numero = Number(valor);
        if (Number.isNaN(numero)) {
            return "R$ 0,00";
        }
        return numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return(
        <div className="container card p-0 mt-5">
            <div className="card-header">
                Produtos disponíveis
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>
                                    <Link to={`/editar/${produto.id}`} className="btn btn-sm btn-primary">
                                        Editar
                                    </Link>
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => excluirProduto(produto.id)}>
                                        Excluir
                                    </button>   
                                </td>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{formatarPreco(produto.preco)}</td>
                                <td>{produto.descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
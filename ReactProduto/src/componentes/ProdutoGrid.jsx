import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

export default function ProdutoGrid(){

    const [produtos, setProdutos] = useState([]);
    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const response = await api.get("/");
        setProdutos(response.data);
    }

    const abrirModalExclusao = (produto) => {
        setProdutoParaExcluir(produto);
    }

    const fecharModalExclusao = () => {
        setProdutoParaExcluir(null);
    }

    const confirmarExclusao = async () => {
        if (!produtoParaExcluir) {
            return;
        }

        await api.delete(`/${produtoParaExcluir.id}`);
        fecharModalExclusao();
        carregarProdutos();
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
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => abrirModalExclusao(produto)}>
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

            {produtoParaExcluir && (
                <>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar exclusão</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={fecharModalExclusao}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">Tem certeza que deseja excluir o produto "{produtoParaExcluir.nome}"?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={fecharModalExclusao}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={confirmarExclusao}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    )
}
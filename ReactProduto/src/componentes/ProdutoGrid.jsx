export default function ProdutoGrid(){
    return(
        <div className="container card p-0 mt-5">
            <div className="card-header">
                Produtos disponíveis
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Produto 1</td>
                            <td>R$ 10,00</td>
                            <td>Descrição do Produto 1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
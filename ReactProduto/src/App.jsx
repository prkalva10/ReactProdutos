import { BrowserRouter, Route, Routes } from "react-router-dom"
import Menu from "./componentes/Menu"
import ProdutoGrid from "./componentes/ProdutoGrid"
import ProdutoForm from "./componentes/ProdutoForm"

function App() {
    return (
        <BrowserRouter>
            <Menu />
              <Routes>
                  <Route path="/" element={<ProdutoGrid />} />
                  <Route path="/novo" element={<ProdutoForm />} />
                  <Route path="/editar/:id" element={<ProdutoForm />} />
              </Routes>
        </BrowserRouter>
  )
}

export default App

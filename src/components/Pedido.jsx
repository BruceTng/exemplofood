import { useState } from 'react'


const cardapio = [
    {
        id: 1,
        nome: 'Combo-01',
        preco: 25.00,
        descricao: "150g carne",
        disponivel: true,
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Combo-02',
        preco: 30.00,
        descricao: "200g carne",
        disponivel: true,
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Combo-03',
        preco: 35.00,
        descricao: "250g carne",
        disponivel: false,
        quantidade: 0
    },
    {
        id: 4,
        nome: 'Combo-04',
        preco: 40.00,
        descricao: "300g carne",
        disponivel: true,
        quantidade: 0
    },
]




const Pedido = () => {
    // HOOK - useState-Manipula o estado da variavel
    // Exemplos vai gerenciar a lista de items do cardapio
    const [items, setItems] = useState(cardapio)
    const [status, setStatus] = useState("")
    const [enviar, setEnviar] = useState(false)

    // Valor fixo adicionado ao total quando tiver no carrnho
    const taxaEntrega = 6.00


    // Função que altera a quantidade do pedido
    const alterarQuantidade = (id, valor) => {
        setItems(prev =>
            // Map: Percorre a lista para criar um novo Array sem modificar o original
            prev.map(item =>
                // Ternário: Verifica se o item da interação é o que deve ser alterado
                // Spread(...item) : adiciona o item à lista atual ou modifica
                // Math.max - objeto que garante que a quantidade nunca seja menor que 0
                // item: retorna o item intacto caso o id não corresponda
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    }

    // Filter: Seleciona apenas os produtos disponíveis e do carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel)
    const carrinho = items.filter(item => item.quantidade > 0)

    // Reduce: Calcula a soma dos itens (preço*quantidade)
    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0)
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    // Simulação do ciclo de vida da entrega usando temporizadores assíncronos
    const confirmarPedido = () => {
        setEnviar(true)
        setStatus("Restaurante preparando seu pedido")
        setTimeout(() => {
            setStatus("Seu pedido saiu para entrega")
            setEnviar(false)
        },5000) // 5 segundos
        setTimeout(()=>{
            setStatus("Seu pedido chegou!")
            setEnviar(false)
        },10000) // 10 segundos
    }


    return (
        <>
            <h1>Cardápio do Restaurante</h1>
            {produtosDisponiveis.map(produto => (
                <div key={produto.id}>
                    <span>{produto.nome} (R${produto.preco.toFixed(2)})</span>
                    <div>
                        <button onClick={()=>{alterarQuantidade(produto.id,-1)}}>-</button>
                        <span>{produto.quantidade}</span>
                        <button onClick={()=>{alterarQuantidade(produto.id,+1)}}>+</button>
                    </div>
                </div>
            ))}

            <hr></hr>
            <h3>Resumo da Entrega</h3>
            {carrinho.length === 0 ?(
                <p>Seu carrinho está vazio</p>
            ):(
                // Fragments
                <>
                <ul>
                    {carrinho.map(item =>(
                        <li key={item.id}>
                            {item.quantidade} X {item.nome} -R${item.preco.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p>SubTotal R${subTotal.toFixed(2)}</p>
                <p>Taxa de Entrega: R${taxaEntrega.toFixed(2)}</p>
                <button onClick={confirmarPedido} disabled={enviar}>
                    {enviar ? "Enviando...." : "Confirmar Pedido"}
                </button>
                </>
            )}
            {status && (
                <div>
                    <strong>Alerta:</strong>{status}
                </div>
            )}

        </>
    )
}

export default Pedido

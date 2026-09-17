import {useState} from 'react'


const cardapio = [
    {
        id:1,
        nome: 'Combo-01',
        preco:25.00,
        descricao: "150g carne",
        disponivel:true,
        quantidade:0
    },
    {
        id: 2,
        nome: 'Combo-02',
        preco:30.00,
        descricao: "200g carne",
        disponivel: true,
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Combo-03',
        preco:35.00,
        descricao: "250g carne",
        disponivel: false,
        quantidade: 0
    },
    {
        id: 4,
        nome: 'Combo-04',
        preco:40.00,
        descricao: "300g carne",
        disponivel: true,
        quantidade: 0
    },
]




const Pedido = () => {
    // HOOK - useState-Manipula o estado da variavel
    // Exemplos vai gerenciar a lista de items do cardapio
    const [items,setItems]=useState(cardapio)
    const [status,setStatus]=useState("")
    const [enviar, setEnviar]=useState(false)

    // Valor fixo adicionado ao total quando tiver no carrnho
    const taxasEntrega = 6.00


    // Função que altera a quantidade do pedido
    const alterarQuantidade = (id,valor)=>{
        setItems(prev=>
            // Map: Percorre a lista para criar um novo Array sem modificar o original
            prev.map(item=>
                             // Ternário: Verifica se o item da interação é o que deve ser alterado
                      // Spread(...item) : adiciona o item à lista atual ou modifica
                                                // Math.max - objeto que garante que a quantidade nunca seja menor que 0
                                                                                     // item: retorna o item intacto caso o id não corresponda
                item.id===id ? {...item,quantidade:Math.max(0,item.quatidade + valor)}: item
            )
        )
    }


  return (
    <>
      
    </>
  )
}

export default Pedido

import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };


// Criando um botão para salvar no LocalStrorage
  // const salvarLista = () => {
  //   //transformando a lista em uma string
  //   const listaString = JSON.stringify(listaCompras)
  //   //armazenando a string das listas no localStrorage
  //   localStorage.setItem("lista",listaString)
  // }


  //Usamos o useEffect para armazenar a lista de forma automática(Com ele n precisamos de botão)
  useEffect(() => {
    //É necessário criar uma condição para o useEffect conseguir pegar nossa lista salva
    if(listaCompras.length > 0){
    const listaString = JSON.stringify(listaCompras)
    //armazenando a string das listas no localStrorage
    localStorage.setItem("lista",listaString)}
  }, [listaCompras])



  // const pegarLista = () => {
  //   //primeiro temos que criar uma váriavel para armazenar a lista de compras. 
  //   //Depois transformamos ela em array novamente com o Json.parse
  //   const listaSalva = JSON.parse(localStorage.getItem("lista"));
  //   //Aqui setamos a lista no nosso estado
  //   setListaCompras(listaSalva)
  // }


  //Vamos automatizar o pegar lista com o useEffect
  useEffect(() => {
    if(listaCompras){
    const listaSalva = JSON.parse(localStorage.getItem("lista"));
    //Precisamos fazer uma verificação para checar se existe algo dentro da listaSalva
    if(listaSalva){
      //Aqui setamos a lista no nosso estado
      setListaCompras(listaSalva)
    }
  }
  },[])


  const removerItem = () => {
    localStorage.removeItem("lista")
    setListaCompras([])
  }
  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <button onClick={removerItem}>Remover</button>
      {/* <button onClick={pegarLista}>Pegar Lista</button> */}

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}

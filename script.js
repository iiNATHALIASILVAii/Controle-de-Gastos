// const matrizGastos: Declara uma variável chamada matrizGastos.
// O const significa que essa variável não pode ser reatribuída.
// Cada sub-array representa uma categoria de gasto.
// O primeiro item ("Alimentação") é o nome da categoria (uma string), e o segundo item (0) é o valor total acumulado para essa categoria (um número).
// O que faz: Cria uma estrutura de dados para armazenar todos os seus gastos.
// Cada categoria começa com um valor de 0.

const matrizGastos = [
  ["Alimentação", 0],
  ["Transporte", 0],
  ["Lazer", 0],
  ["Outros", 0],
  ["Total", 0],
];

/* Funções utilitárias */
// Essas são pequenas funções que fazem tarefas específicas e podem ser reutilizadas em outras partes do código.
const obterElemento = (id) => document.getElementById(id); // É um atalho para pegar elementos do HTML.
const valorNegativo = (valor) => valor < 0; // Verifica se um número é negativo.
const somaValor = (total, valor) => total + valor; // Declara uma função que recebe dois argumentos, total e valor. Depois retorna a soma dos dois
const limparCampos = () => (obterElemento("valor").value = "");

/* Obter valores do formulário */
// Usa a função utilitária que criamos para pegar o elemento HTML com o id="valor". Esse elemento é o seu campo de entrada (<input>).
const obterValorInformado = () => parseFloat(obterElemento("valor").value); // Retorna o elemento HTML completo onde o usuário digita o valor do gasto.
// Pega o elemento HTML do seu menu suspenso (<select>).
// Acessa a propriedade value do elemento select, que é o valor da opção que o usuário selecionou.
const obterCategoriaInformada = () => obterElemento("categoria").value; // Retorna o nome da categoria que foi escolhida no menu suspenso

/* Obter categoria da matriz */
// Declara uma função que recebe a matriz de gastos e o nome de uma categoria.
// matriz.find(...): É um método de array que percorre cada item da matriz até encontrar um que satisfaça a condição dentro dos parênteses.
// Ele retorna o primeiro item que encontra.
// (item) => item[0] === nomeCategoria: Essa é a condição de busca.
// Ela verifica se o primeiro elemento (item[0]) de cada sub-array (item) é exatamente igual ao nomeCategoria que foi passado.
const obterCategoria = (matriz, nomeCategoria) =>
  matriz.find((item) => item[0] === nomeCategoria);

/* Atualizar valor categoria */
// categoria[1] = ...: Acessa a segunda posição do sub-array categoria (onde o valor atual está armazenado) e atribui a ela um novo valor.
// Pega o valor atual de uma categoria, soma um novo valor a ele e atualiza o valor da categoria na matriz.
const atualizarValorCategoria = (categoria, valor) =>
  (categoria[1] = somaValor(categoria[1], valor));

// Este trecho de código tem a responsabilidade de "sincronizar" os dados que estão na sua matriz (matrizGastos) com o HTML.
// const atualizaInterface: Declara uma nova função de seta chamada atualizaInterface.
//() => { ... }: A função não recebe nenhum argumento. Ela é chamada para simplesmente executar a tarefa de atualizar a tela.
// É um método de array que executa uma função uma vez para cada item (sub-array, neste caso) na matrizGastos.
// ([nome, valor]) => { ... }: Esta é a função que o forEach executa. O que é especial aqui é a sintaxe [nome, valor]. Isso se chama "desestruturação de array". Para cada sub-array, como ["Alimentação", 0], o JavaScript automaticamente:
// Coloca "Alimentação" na variável nome.
// Coloca 0 na variável valor.
// Isso torna o código mais limpo, pois você não precisa escrever item[0] e item[1].
const atualizaInterface = () => {
  matrizGastos.forEach(([nome, valor]) => {
    const elemento = obterElemento(nome); // Declara uma variável para guardar o elemento HTML.
    elemento.textContent = `${nome}: R$ ${valor.toFixed(2).replace(".", ",")}`; // Ao atribuir um novo valor a ela, o texto visível na tela é alterado. // Adicionei formatação para R$
  });
};

function adicionarGasto() {
  const valorInformado = obterValorInformado();
  const categoriaInformada = obterCategoriaInformada();

  if (isNaN(valorInformado) || valorNegativo(valorInformado)) {
    // Adicionei validação para 'isNaN'
    alert("Valor inválido. O valor não pode ser negativo!");
    return;
  }

  const categoria = obterCategoria(matrizGastos, categoriaInformada);
  const total = obterCategoria(matrizGastos, "Total");

  atualizarValorCategoria(categoria, valorInformado);
  atualizarValorCategoria(total, valorInformado);
  atualizaInterface(); // Atualiza a interface para mostrar os valores
  limparCampos(); // Limpa os campos de entrada
}

function resetPag() {
  // Deve zerar os valores da matrizGastos. // Percorre cada sub-array na matriz
  matrizGastos.forEach((categoria) => {
    // Define o valor do segundo elemento [1] como 0
    categoria[1] = 0;
  });

  atualizaInterface();
  limparCampos();
}

// Carrega os dados armazenados no localStorage ou inicia o array vazio
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const nomeCliente = document.getElementById('nomeCliente').value;
    const agencia = document.getElementById('agencia').value;
    const conta = document.getElementById('conta').value;
    const saldo = parseFloat(document.getElementById('saldo').value);

    // Cria um objeto cliente
    const cliente = {
        nomeCliente,
        agencia,
        conta,
        saldo
    };

    // Adiciona o novo cliente ao array de clientes
    clientes.push(cliente);

    // Salva o array atualizado no localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Redireciona para a página da tabela
    window.location.href = "tabela.html";
});

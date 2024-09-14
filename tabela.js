// Carrega os dados armazenados no localStorage
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

// Função para renderizar a tabela de clientes
function renderTable(clientesFiltrados = clientes) {
    const tableBody = document.getElementById('clientesTableBody');
    tableBody.innerHTML = '';

    clientesFiltrados.forEach((cliente, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${cliente.nomeCliente}</td>
            <td>${cliente.agencia}</td>
            <td>${cliente.conta}</td>
            <td>R$ ${cliente.saldo.toFixed(2)}</td>
            <td><button onclick="saque(${index})">Saque</button></td>
            <td><button onclick="deposito(${index})">Depósito</button></td>
            <td><button onclick="editarCliente(${index})">Editar</button></td>
            <td><button onclick="excluirCliente(${index})">Excluir</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Função para realizar busca
function buscarCliente() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const clientesFiltrados = clientes.filter(cliente => 
        cliente.nomeCliente.toLowerCase().includes(searchTerm) ||
        cliente.agencia.includes(searchTerm) ||
        cliente.conta.includes(searchTerm)
    );
    renderTable(clientesFiltrados);
}

// Função para realizar saque
function saque(index) {
    const valorSaque = parseFloat(prompt('Digite o valor do saque:'));
    if (isNaN(valorSaque) || valorSaque <= 0) {
        alert('Valor inválido!');
        return;
    }

    if (clientes[index].saldo >= valorSaque) {
        clientes[index].saldo -= valorSaque;
        localStorage.setItem('clientes', JSON.stringify(clientes));
        renderTable();
        alert('Saque realizado com sucesso!');
    } else {
        alert('Saldo insuficiente!');
    }
}

// Função para realizar depósito
function deposito(index) {
    const valorDeposito = parseFloat(prompt('Digite o valor do depósito:'));
    if (isNaN(valorDeposito) || valorDeposito <= 0) {
        alert('Valor inválido!');
        return;
    }

    clientes[index].saldo += valorDeposito;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    renderTable();
    alert('Depósito realizado com sucesso!');
}

// Função para editar cliente
function editarCliente(index) {
    const novoNome = prompt('Digite o novo nome do cliente:', clientes[index].nomeCliente);
    const novaAgencia = prompt('Digite o novo número da agência:', clientes[index].agencia);
    const novaConta = prompt('Digite o novo número da conta:', clientes[index].conta);

    if (novoNome && novaAgencia && novaConta) {
        clientes[index].nomeCliente = novoNome;
        clientes[index].agencia = novaAgencia;
        clientes[index].conta = novaConta;

        localStorage.setItem('clientes', JSON.stringify(clientes));
        renderTable();
        alert('Cliente editado com sucesso!');
    } else {
        alert('Todos os campos são obrigatórios!');
    }
}

// Função para excluir cliente
function excluirCliente(index) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        renderTable();
        alert('Cliente excluído com sucesso!');
    }
}

// Renderiza a tabela quando a página é carregada
renderTable();

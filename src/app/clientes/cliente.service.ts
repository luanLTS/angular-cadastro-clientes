import { Cliente } from './cliente.model';

// single source of truth
export class ClienteServices {
  private clientes: Cliente[] = [];

  getClientes(): Cliente[] {
    return [...this.clientes]; // envia uma copia da lista, não a referenca dela
  }

  addCliente(nome: string, fone: string, email: string): void {
    this.clientes.push({
      nome,
      fone,
      email,
    });
  }
}

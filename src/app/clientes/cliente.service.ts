import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
// single source of truth
export class ClienteServices {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>(); // o evento vai gerar uma lista de clientes

  getClientes(): Cliente[] {
    return [...this.clientes]; // envia uma copia da lista, não a referenca dela
  }

  addCliente(nome: string, fone: string, email: string): void {
    this.clientes.push({
      nome,
      fone,
      email,
    });
    this.listaClientesAtualizada.next([...this.clientes]);
  }

  getListaClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}

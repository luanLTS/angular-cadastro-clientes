import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// single source of truth
@Injectable({ providedIn: 'root' })
export class ClienteServices {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>(); // o evento vai gerar uma lista de clientes

  constructor(private httpCliente: HttpClient) {}

  /*   getClientes(): Cliente[] {
    return [...this.clientes]; // envia uma copia da lista, não a referenca dela
  } */

  getClientes(): void {
    this.httpCliente
      .get<{ mensagem: string; clientes: Cliente[] }>(
        'http://localhost:3000/api/clientes'
      )
      .subscribe((dados) => {
        this.clientes = dados.clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  /* addCliente(nome: string, fone: string, email: string): void {
    this.clientes.push({
      nome,
      fone,
      email,
    });
    this.listaClientesAtualizada.next([...this.clientes]);
  } */

  addCliente(nome: string, fone: string, email: string) {
    const cliente = {
      nome,
      fone,
      email,
    };

    this.httpCliente
      .post<{ message: string }>(`http://localhost:3000/api/clientes`, cliente)
      .subscribe((dados) => {
        console.log(dados.message);
        this.clientes.push(cliente);
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  getListaClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}

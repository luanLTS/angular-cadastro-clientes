import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// single source of truth
@Injectable({ providedIn: 'root' })
export class ClienteServices {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>(); // o evento vai gerar uma lista de clientes

  constructor(private httpCliente: HttpClient) {}

  /*   getClientes(): Cliente[] {
    return [...this.clientes]; // envia uma copia da lista, não a referenca dela
  } */

  getCliente(id: string): any {
    // return { ...this.clientes.find((cli) => cli.id === id) };
    return this.httpCliente
      .get<{ _id: string; nome: string; fone: string; email: string }>(
        `http://localhost:3000/api/clientes/${id}`
      )
      .subscribe((dados) => {});
  }

  getClientes(): void {
    this.httpCliente
      .get<{ mensagem: string; clientes: any }>(
        'http://localhost:3000/api/clientes'
      )
      .pipe(
        map((dados) => {
          return dados.clientes.map((cliente) => {
            return {
              id: cliente._id,
              nome: cliente.nome,
              fone: cliente.fone,
              email: cliente.emai,
            };
          });
        })
      )
      .subscribe((clientes) => {
        this.clientes = clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  addCliente(nome: string, fone: string, email: string) {
    const cliente = {
      nome,
      fone,
      email,
      id: '',
    };

    this.httpCliente
      .post<{ message: string; id: string }>(
        `http://localhost:3000/api/clientes`,
        cliente
      )
      .subscribe((dados) => {
        console.log(dados.message);
        cliente.id = dados.id;
        this.clientes.push(cliente);
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  removerCliente(id: string) {
    this.httpCliente
      .delete(`http://localhost:3000/api/clientes/${id}`)
      .subscribe(() => {
        console.log(`cliente ${id} deletado`);
      });
  }

  atualizarCliente(id: string, nome: string, fone: string, email: string) {
    const cliente = { nome, fone, email };
    this.httpCliente
      .put(`http://localhost:3000/api/clientes/${id}`, cliente)
      .subscribe((res) => {
        const copiaLista = [...this.clientes];
        const indice = copiaLista.findIndex((cli) => cli.id === id);
        copiaLista[indice] = { ...cliente, id };
        this.clientes = copiaLista;
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  getListaClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}

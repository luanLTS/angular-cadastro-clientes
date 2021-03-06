import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// single source of truth
@Injectable({ providedIn: 'root' })
export class ClienteServices {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>(); // o evento vai gerar uma lista de clientes

  constructor(private httpCliente: HttpClient, private router: Router) {}

  /*   getClientes(): Cliente[] {
    return [...this.clientes]; // envia uma copia da lista, não a referenca dela
  } */

  getCliente(id: string): any {
    // return { ...this.clientes.find((cli) => cli.id === id) };
    return this.httpCliente.get<{
      _id: string;
      nome: string;
      fone: string;
      email: string;
    }>(`http://localhost:3000/api/clientes/${id}`);
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
              email: cliente.email,
              imagemURL: cliente.imagemURL
            };
          });
        })
      )
      .subscribe((clientes) => {
        this.clientes = clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      });
  }

  addCliente(nome: string, fone: string, email: string, imagem: File) {
    // quando os dados passados não sao objetos json simples
    // const cliente = {
    //   nome,
    //   fone,
    //   email,
    //   id: '',
    // };

    const dadosCliente = new FormData();
    dadosCliente.append('nome', nome);
    dadosCliente.append('fone', fone);
    dadosCliente.append('email', email);
    dadosCliente.append('imagem', imagem);

    this.httpCliente
      .post<{ message: string; cliente: Cliente }>(
        `http://localhost:3000/api/clientes`,
        dadosCliente
      )
      .subscribe((dados) => {
        console.log(dados.message);
        // cliente.id = dados.id;
        const cliente = {
          id: dados.cliente.id,
          nome: nome,
          fone: fone,
          email: email,
          imagemURL: dados.cliente.imagemURL
        }
        this.clientes.push(cliente);
        this.listaClientesAtualizada.next([...this.clientes]);
        this.router.navigate(['/']);
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
    const cliente = { nome, fone, email, imagemURL: null };
    this.httpCliente
      .put(`http://localhost:3000/api/clientes/${id}`, cliente)
      .subscribe((res) => {
        const copiaLista = [...this.clientes];
        const indice = copiaLista.findIndex((cli) => cli.id === id);
        copiaLista[indice] = { ...cliente, id };
        this.clientes = copiaLista;
        this.listaClientesAtualizada.next([...this.clientes]);
        // o objeto do router do angular consegue fazer os redirecionamentos de telas com o metodo navigate()
        this.router.navigate(['/']);
      });
  }

  getListaClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}

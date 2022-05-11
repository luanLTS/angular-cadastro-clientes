import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteServices } from '../cliente.service';
@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  private clientesSubscription: Subscription;
  clientes: Cliente[] = [];

  // a lista de parametros do construtor são as dependencias desta classe
  constructor(private clienteService: ClienteServices) {}

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService
      .getListaClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]): void => {
        this.clientes = clientes;
      });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }
}

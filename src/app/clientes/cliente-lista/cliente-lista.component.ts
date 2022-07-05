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

  public isLoading: boolean = false;

  // a lista de parametros do construtor são as dependencias desta classe
  constructor(private clienteService: ClienteServices) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.clientesSubscription = this.clienteService
      .getListaClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]): void => {
        this.isLoading = false;
        this.clientes = clientes;
      });
    this.clienteService.getClientes();
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.clienteService.removerCliente(id);
  }
}

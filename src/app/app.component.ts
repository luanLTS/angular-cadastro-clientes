import { Component } from '@angular/core';
import { Cliente } from './clientes/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  clientes: Cliente[] = [];

  onAdicionarCliente(cliente): void {
    this.clientes = [...this.clientes, cliente];
    // this.clientes.push(cliente);
  }
}

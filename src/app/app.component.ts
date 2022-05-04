import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  clientes = [];

  onAdicionarCliente(cliente): void {
    console.log(cliente);
    this.clientes = [...this.clientes, cliente];
    // this.clientes.push(cliente);
  }
}

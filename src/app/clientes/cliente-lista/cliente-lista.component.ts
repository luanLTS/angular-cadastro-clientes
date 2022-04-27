import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent {
  clientes = [
    {
      nome: 'João',
      fone: '12345678',
      email: 'joao@joao.com',
    },
    {
      nome: 'Maria',
      fone: '87654321',
      email: 'maria@maria.com',
    },
    {
      nome: 'Paulo',
      fone: '87651234',
      email: 'paulo@paulo.com',
    },
  ];
}

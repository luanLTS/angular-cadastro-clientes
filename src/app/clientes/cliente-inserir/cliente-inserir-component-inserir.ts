import { Component } from '@angular/core';

@Component({
  selector: 'app-component-inserir',
  templateUrl: './cliente-inserir-component.html',
  styleUrls: ['./cliente-inserir-component.css'],
})
export class ClienteInserirComponent {
  nome: string;
  fone: string;
  email: string;

  onAddClient() {
    console.log('Inserindo cliente...');
  }
}

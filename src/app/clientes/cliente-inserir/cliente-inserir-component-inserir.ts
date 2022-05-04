import { Component, EventEmitter, Output } from '@angular/core';

// eventEmitter -> abstração capaz de criar eventos

@Component({
  selector: 'app-component-inserir',
  templateUrl: './cliente-inserir-component.html',
  styleUrls: ['./cliente-inserir-component.css'],
})
export class ClienteInserirComponent {
  @Output()
  clienteAdicionado = new EventEmitter();

  nome: string;
  fone: string;
  email: string;

  onAddClient() {
    this.clienteAdicionado.emit({
      nome: this.nome,
      fone: this.fone,
      email: this.email,
    });
  }
}

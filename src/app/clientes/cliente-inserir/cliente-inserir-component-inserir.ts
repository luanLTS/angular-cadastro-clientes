import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../cliente.model';

// eventEmitter -> abstração capaz de criar eventos

@Component({
  selector: 'app-component-inserir',
  templateUrl: './cliente-inserir-component.html',
  styleUrls: ['./cliente-inserir-component.css'],
})
export class ClienteInserirComponent {
  @Output()
  clienteAdicionado = new EventEmitter<Cliente>();

  nome: string;
  fone: string;
  email: string;

  // onAddClient(cliente: Cliente) {
  //   this.clienteAdicionado.emit(cliente);
  // }

  onAddClient(form: NgForm) {
    if (!form.invalid) {
      const cliente: Cliente = {
        nome: form.value.nome,
        fone: form.value.fone,
        email: form.value.email,
      };
      this.clienteAdicionado.emit(cliente);
    }
  }
}

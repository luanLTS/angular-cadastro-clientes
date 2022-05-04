import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteServices } from '../cliente.service';

// eventEmitter -> abstração capaz de criar eventos

@Component({
  selector: 'app-component-inserir',
  templateUrl: './cliente-inserir-component.html',
  styleUrls: ['./cliente-inserir-component.css'],
})
export class ClienteInserirComponent {
  constructor(private clienteServices: ClienteServices) {}

  onAddClient(form: NgForm) {
    if (!form.invalid) {
      this.clienteServices.addCliente(
        form.value.nome,
        form.value.fone,
        form.value.email
      );
    }
  }
}

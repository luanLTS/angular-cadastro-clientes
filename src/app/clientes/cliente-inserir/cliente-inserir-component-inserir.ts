import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteServices } from '../cliente.service';

// eventEmitter -> abstração capaz de criar eventos

@Component({
  selector: 'app-component-inserir',
  templateUrl: './cliente-inserir-component.html',
  styleUrls: ['./cliente-inserir-component.css'],
})
export class ClienteInserirComponent implements OnInit {
  constructor(
    private clienteServices: ClienteServices,
    private route: ActivatedRoute
  ) {}

  private modo: string = 'criar';
  private idCliente: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idCliente')) {
        this.modo = 'editar';
        this.idCliente = paramMap.get('idCliente');
      } else {
        this.modo = 'criar';
        this.idCliente = null;
      }
    });
  }

  onAddClient(form: NgForm) {
    if (!form.invalid) {
      this.clienteServices.addCliente(
        form.value.nome,
        form.value.fone,
        form.value.email
      );
      form.resetForm();
    }
  }
}

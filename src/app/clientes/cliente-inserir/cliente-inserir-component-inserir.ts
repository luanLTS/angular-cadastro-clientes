import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';
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
  public cliente: Cliente;
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idCliente')) {
        this.modo = 'editar';
        this.idCliente = paramMap.get('idCliente');
        this.isLoading = true;
        this.clienteServices
          .getCliente(this.idCliente)
          .subscribe((dadosCli) => {
            this.isLoading = false;
            this.cliente = {
              id: dadosCli._id,
              nome: dadosCli.nome,
              fone: dadosCli.fone,
              email: dadosCli.email,
            };
          });
      } else {
        this.modo = 'criar';
        this.idCliente = null;
      }
    });
  }

  onSalvarClient(form: NgForm) {
    if (!form.invalid) {
      this.isLoading = true;
      if (this.modo === 'criar') {
        this.clienteServices.addCliente(
          form.value.nome,
          form.value.fone,
          form.value.email
        );
      } else {
        this.clienteServices.atualizarCliente(
          this.idCliente,
          form.value.nome,
          form.value.fone,
          form.value.email
        );
      }
      form.resetForm();
    }
  }
}

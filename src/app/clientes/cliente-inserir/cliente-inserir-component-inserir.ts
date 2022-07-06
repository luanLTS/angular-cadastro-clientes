import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteServices } from '../cliente.service';
import { mimeTypeValidator } from './mime-type.validator';

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
  public urlImagemPreview: string;

  // estrutura de dados que representa o forms do template
  // os reactives forms são utilizado mais para fazer validacoes complexas em um formulario
  // para formularios simples é mais recomendado utilizar o template driven forms por ser mais simples implementar e não ser tão custoso
  form: FormGroup;

  ngOnInit(): void {
    // new FormGroup faz a instancia do objeto raiz do reactive form
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      fone: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      imagem: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        console.log('entrou no modo de edicao');
        this.modo = 'editar';
        this.idCliente = paramMap.get('id');
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
            // setta os valores dos inputs com os valores que vieram do objeto da lista
            this.form.setValue({
              nome: this.cliente.nome,
              fone: this.cliente.fone,
              email: this.cliente.email,
            });
          });
      } else {
        console.log('entrou no modo de criar');
        this.modo = 'criar';
        this.idCliente = null;
      }
    });
  }

  onSalvarClient() {
    if (!this.form.invalid) {
      this.isLoading = true;
      if (this.modo === 'criar') {
        this.clienteServices.addCliente(
          this.form.value.nome,
          this.form.value.fone,
          this.form.value.email
        );
      } else {
        this.clienteServices.atualizarCliente(
          this.idCliente,
          this.form.value.nome,
          this.form.value.fone,
          this.form.value.email
        );
      }
      this.form.reset();
    }
  }

  onImagemSelecionada(event: Event) {
    const arquivo = (event.target as HTMLInputElement).files[0]; // pega informacoes do arquivo que a pessoa selecionou
    // o comando patch serve para alterar apenas um pedaço do objeto do forms, não ele todo
    this.form.patchValue({ imagem: arquivo });
    this.form.get('imagem').updateValueAndValidity();

    const reader = new FileReader(); // classe para fazer a leitura de arquivos
    // explica o que vai acontecer com a imagem quando ela for carregada
    reader.onload = () => {
      this.urlImagemPreview = reader.result as string;
    };
    // fala qual é o arquivo que vai ser lido
    reader.readAsDataURL(arquivo);
  }
}

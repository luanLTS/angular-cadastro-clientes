export interface Cliente {
  // ? faz com que o campo id seja opcional na hora da validacao
  id?: string;
  nome: string;
  fone: string;
  email: string;
  imagemURL: string
}

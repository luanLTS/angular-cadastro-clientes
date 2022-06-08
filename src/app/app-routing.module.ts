import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir-component-inserir';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';

const routes: Routes = [
  // localhost:porta/
  { path: '', component: ClienteListaComponent },
  // localhost:porta/criar
  { path: 'criar', component: ClienteInserirComponent },
  //localhost:porta/atualizar
  { path: 'editar/:id', component: ClienteInserirComponent },
];

// router outlate

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

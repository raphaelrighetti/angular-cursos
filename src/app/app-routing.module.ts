import { EditarPensamentoComponent } from './pensamentos/editar-pensamento/editar-pensamento.component';
import { ExcluirPensamentoComponent } from './pensamentos/excluir-pensamento/excluir-pensamento.component';
import { ListarPensamentoComponent } from './pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentoComponent } from './pensamentos/criar-pensamento/criar-pensamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pensamento/listar', pathMatch: 'full' },
  { path: 'pensamento/criar', component: CriarPensamentoComponent },
  { path: 'pensamento/listar', component: ListarPensamentoComponent },
  { path: 'pensamento/editar/:id', component: EditarPensamentoComponent },
  { path: 'pensamento/excluir/:id', component: ExcluirPensamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

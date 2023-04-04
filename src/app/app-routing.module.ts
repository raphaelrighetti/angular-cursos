import { EditarPensamentoComponent } from './pensamentos/editar-pensamento/editar-pensamento.component';
import { ExcluirPensamentoComponent } from './pensamentos/excluir-pensamento/excluir-pensamento.component';
import { ListarPensamentoComponent } from './pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentoComponent } from './pensamentos/criar-pensamento/criar-pensamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { RegistrarComponent } from './autenticacao/registrar/registrar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
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

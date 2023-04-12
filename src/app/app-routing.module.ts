import { EditarPensamentoComponent } from './components/pensamentos/editar-pensamento/editar-pensamento.component';
import { ExcluirPensamentoComponent } from './components/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/usuarios/autenticacao/login/login.component';
import { RegistrarComponent } from './components/usuarios/autenticacao/registrar/registrar.component';
import { AuthGuard } from './guard/auth.guard';
import { ListarPensamentoPublicoComponent } from './components/pensamentos/listar-pensamento-publico/listar-pensamento-publico.component';
import { HomeUsuarioComponent } from './components/usuarios/home-usuario/home-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'pensamentos/publico', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  {
    path: 'pensamentos/publico',
    component: ListarPensamentoPublicoComponent,
  },
  {
    path: 'pensamentos/criar',
    component: CriarPensamentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pensamentos/listar/:id',
    component: ListarPensamentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pensamentos/editar/:id',
    component: EditarPensamentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pensamentos/excluir/:id',
    component: ExcluirPensamentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios/:id',
    component: HomeUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

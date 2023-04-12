import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';
import { PensamentoComponent } from './components/pensamentos/pensamento/pensamento.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExcluirPensamentoComponent } from './components/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentoComponent } from './components/pensamentos/editar-pensamento/editar-pensamento.component';
import { BotaoCarregarMaisComponent } from './components/pensamentos/listar-pensamento/botao-carregar-mais/botao-carregar-mais.component';
import { LoginComponent } from './components/usuarios/autenticacao/login/login.component';
import { RegistrarComponent } from './components/usuarios/autenticacao/registrar/registrar.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PensamentoPublicoComponent } from './components/pensamentos/pensamento-publico/pensamento-publico.component';
import { ListarPensamentoPublicoComponent } from './components/pensamentos/listar-pensamento-publico/listar-pensamento-publico.component';
import { HomeUsuarioComponent } from './components/usuarios/home-usuario/home-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { ExcluirUsuarioComponent } from './components/usuarios/excluir-usuario/excluir-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    CriarPensamentoComponent,
    ListarPensamentoComponent,
    PensamentoComponent,
    ExcluirPensamentoComponent,
    EditarPensamentoComponent,
    BotaoCarregarMaisComponent,
    LoginComponent,
    RegistrarComponent,
    PensamentoPublicoComponent,
    ListarPensamentoPublicoComponent,
    HomeUsuarioComponent,
    EditarUsuarioComponent,
    ExcluirUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

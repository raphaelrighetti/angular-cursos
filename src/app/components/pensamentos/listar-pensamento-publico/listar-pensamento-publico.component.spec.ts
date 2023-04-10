import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPensamentoPublicoComponent } from './listar-pensamento-publico.component';

describe('ListarPensamentoPublicoComponent', () => {
  let component: ListarPensamentoPublicoComponent;
  let fixture: ComponentFixture<ListarPensamentoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPensamentoPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPensamentoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

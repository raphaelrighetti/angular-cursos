import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensamentoPublicoComponent } from './pensamento-publico.component';

describe('PensamentoPublicoComponent', () => {
  let component: PensamentoPublicoComponent;
  let fixture: ComponentFixture<PensamentoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensamentoPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensamentoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

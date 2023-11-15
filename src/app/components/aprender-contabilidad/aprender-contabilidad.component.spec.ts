import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprenderContabilidadComponent } from './aprender-contabilidad.component';

describe('AprenderContabilidadComponent', () => {
  let component: AprenderContabilidadComponent;
  let fixture: ComponentFixture<AprenderContabilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprenderContabilidadComponent]
    });
    fixture = TestBed.createComponent(AprenderContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

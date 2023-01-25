import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasCntComponent } from './cuentas-cnt.component';

describe('CuentasCntComponent', () => {
  let component: CuentasCntComponent;
  let fixture: ComponentFixture<CuentasCntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasCntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasCntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

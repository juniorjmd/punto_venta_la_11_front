import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdetalleComponent } from './cdetalle.component';

describe('CdetalleComponent', () => {
  let component: CdetalleComponent;
  let fixture: ComponentFixture<CdetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

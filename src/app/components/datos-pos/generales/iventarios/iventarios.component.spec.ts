import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IventariosComponent } from './iventarios.component';

describe('IventariosComponent', () => {
  let component: IventariosComponent;
  let fixture: ComponentFixture<IventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Despre } from './despre';

describe('Despre', () => {
  let component: Despre;
  let fixture: ComponentFixture<Despre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Despre]
    }).compileComponents();

    fixture = TestBed.createComponent(Despre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

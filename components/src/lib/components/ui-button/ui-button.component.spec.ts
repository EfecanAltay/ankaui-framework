import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIButtonComponent } from './ui-button.component';

describe('UIButtonComponent', () => {
  let component: UIButtonComponent;
  let fixture: ComponentFixture<UIButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

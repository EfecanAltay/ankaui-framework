import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIToastyComponent } from './ui-toasty.component';

describe('UIToastyComponent', () => {
  let component: UIToastyComponent;
  let fixture: ComponentFixture<UIToastyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIToastyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIToastyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIHeaderComponent } from './ui-header.component';

describe('UIHeaderComponent', () => {
  let component: UIHeaderComponent;
  let fixture: ComponentFixture<UIHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

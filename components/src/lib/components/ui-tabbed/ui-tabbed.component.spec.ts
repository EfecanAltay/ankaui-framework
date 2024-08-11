import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UITabbedComponent } from './ui-tabbed.component';

describe('UITabbedComponent', () => {
  let component: UITabbedComponent;
  let fixture: ComponentFixture<UITabbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITabbedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UITabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

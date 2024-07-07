import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UITreeComponent } from './ui-tree.component';

describe('UITreeComponent', () => {
  let component: UITreeComponent;
  let fixture: ComponentFixture<UITreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UITreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

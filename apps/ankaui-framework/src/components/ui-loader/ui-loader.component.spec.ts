import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UILoaderComponent } from './ui-loader.component';

describe('UILoaderComponent', () => {
  let component: UILoaderComponent;
  let fixture: ComponentFixture<UILoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UILoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UILoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

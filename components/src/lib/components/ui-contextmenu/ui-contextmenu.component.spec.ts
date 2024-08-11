import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIContextMenuComponent } from './ui-contextmenu.component';

describe('UIContextMenuComponent', () => {
  let component: UIContextMenuComponent;
  let fixture: ComponentFixture<UIContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

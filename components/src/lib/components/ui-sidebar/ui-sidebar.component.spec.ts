import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UISidebarComponent } from './ui-sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UISidebarComponent', () => {
  let component: UISidebarComponent;
  let fixture: ComponentFixture<UISidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UISidebarComponent, BrowserModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UISidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

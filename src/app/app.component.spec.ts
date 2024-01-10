import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  AsyncTableComponent,
  LoadingSpinnerComponent,
  RatingComponent,
  RatingDonutChartComponent,
  SearchTableComponent,
  SelectComponent,
  ToastService
} from 'avid-ui-lib';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(RatingDonutChartComponent),
        MockComponent(AsyncTableComponent),
        MockComponent(RatingComponent),
        MockComponent(LoadingSpinnerComponent),
        MockComponent(SearchTableComponent),
        MockComponent(SelectComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testing-ang'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testing-ang');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('testing-ang app is running!');
  });
});

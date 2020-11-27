import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewExpensePage } from './view-expense.page';

describe('ViewExpensePage', () => {
  let component: ViewExpensePage;
  let fixture: ComponentFixture<ViewExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAmountPage } from './add-amount.page';

describe('AddAmountPage', () => {
  let component: AddAmountPage;
  let fixture: ComponentFixture<AddAmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAmountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

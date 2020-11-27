import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReceiptPage } from './view-receipt.page';

describe('ViewReceiptPage', () => {
  let component: ViewReceiptPage;
  let fixture: ComponentFixture<ViewReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

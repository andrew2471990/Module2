import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddInfoPage } from './add-info.page';

describe('AddInfoPage', () => {
  let component: AddInfoPage;
  let fixture: ComponentFixture<AddInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

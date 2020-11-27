import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPicturePage } from './add-picture.page';

describe('AddPicturePage', () => {
  let component: AddPicturePage;
  let fixture: ComponentFixture<AddPicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

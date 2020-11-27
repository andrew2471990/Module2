import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDatePage } from './add-date.page';

describe('AddDatePage', () => {
  let component: AddDatePage;
  let fixture: ComponentFixture<AddDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

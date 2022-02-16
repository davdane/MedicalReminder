import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAppointPage } from './add-appoint.page';

describe('AddAppointPage', () => {
  let component: AddAppointPage;
  let fixture: ComponentFixture<AddAppointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAppointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

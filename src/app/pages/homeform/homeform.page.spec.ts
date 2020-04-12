import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeformPage } from './homeform.page';

describe('HomeformPage', () => {
  let component: HomeformPage;
  let fixture: ComponentFixture<HomeformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

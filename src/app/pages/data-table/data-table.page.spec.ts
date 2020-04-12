import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataTablePage } from './data-table.page';

describe('DataTablePage', () => {
  let component: DataTablePage;
  let fixture: ComponentFixture<DataTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

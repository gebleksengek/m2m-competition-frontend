import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoBottomSheetComponent } from './contact-info-bottom-sheet.component';

describe('ContactInfoBottomSheetComponent', () => {
  let component: ContactInfoBottomSheetComponent;
  let fixture: ComponentFixture<ContactInfoBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

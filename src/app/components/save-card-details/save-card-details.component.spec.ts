import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCardDetailsComponent } from './save-card-details.component';

describe('SaveCardDetailsComponent', () => {
  let component: SaveCardDetailsComponent;
  let fixture: ComponentFixture<SaveCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

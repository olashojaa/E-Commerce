import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselUpdateComponent } from './carousel-update.component';

describe('CarouselUpdateComponent', () => {
  let component: CarouselUpdateComponent;
  let fixture: ComponentFixture<CarouselUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

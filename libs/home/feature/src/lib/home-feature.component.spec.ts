import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeFeatureComponent from './home-feature.component';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeFeatureComponent],
    });

    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

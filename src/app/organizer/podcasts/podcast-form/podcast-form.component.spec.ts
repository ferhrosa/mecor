import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastFormComponent } from './podcast-form.component';

describe('PodcastFormComponent', () => {
  let component: PodcastFormComponent;
  let fixture: ComponentFixture<PodcastFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

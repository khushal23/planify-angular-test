import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProcessTasksComponent } from './in-process-tasks.component';

describe('InProcessTasksComponent', () => {
  let component: InProcessTasksComponent;
  let fixture: ComponentFixture<InProcessTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProcessTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProcessTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

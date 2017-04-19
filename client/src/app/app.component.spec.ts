import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IndexService } from './service/index.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [IndexService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render tags field', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.indexService.getModelData().subscribe(data=> {
      expect(data.hasOwnProperty('tag'))

    });
  }));

  it('should render content field', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.indexService.getModelData().subscribe(data=> {
      expect(data.hasOwnProperty('content'))

    });
  }));

});

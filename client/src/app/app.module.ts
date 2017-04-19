import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IndexService } from './service/index.service';
import { AppComponent } from './app.component';
import { KeysPipe } from './keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [IndexService],
  bootstrap: [AppComponent]
})
export class AppModule { }

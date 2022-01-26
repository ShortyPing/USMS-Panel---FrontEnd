import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {AuthService} from "./_services/auth/auth.service";
import {User} from "../dto/user.dto";
import {Constants} from "../constants";
import {DutyService} from "./_services/duty/duty.service";
import { UsernamePipe } from './_pipes/username.pipe';
import { WingPipe } from './_pipes/wing.pipe';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [UsernamePipe],
  exports: [

  ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private http: HttpClient, private authService: AuthService, private dutyService: DutyService) {
    let token = localStorage.getItem("token");

    this.authService.request();
    this.dutyService.requestCurrentDuty()

    //alert("Vergiss nicht, deine Schicht zu starten, wenn du online gehst.") TODO: ADD LATER WHEN FINISHED

    setInterval(() => {
      this.authService.request()
    }, 1000 * 60 * 30)
  }
}

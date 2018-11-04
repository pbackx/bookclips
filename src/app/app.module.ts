import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Camera } from '@ionic-native/camera';
import {File} from "@ionic-native/file";
import {EditNotePage} from "../pages/edit-note/edit-note";
import { NotesServiceProvider } from '../providers/notes-service/notes-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditNotePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditNotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesServiceProvider
  ]
})
export class AppModule {}

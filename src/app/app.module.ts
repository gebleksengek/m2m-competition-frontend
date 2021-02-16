import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NgxMatFileInputModule } from '@angular-material-components/file-input'
import { NguCarouselModule } from '@ngu/carousel'
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig } from 'ngx-ui-loader'
import { CarouselModule } from 'ngx-owl-carousel-o'

import { NgxMasonryModule } from 'ngx-masonry'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial'
import { LazyLoadImageModule } from 'ng-lazyload-image'

import { AppRoutingModule } from "./app-routing.module";
import { AppMaterialUIModule } from './app.material-ui.module'

import { AppComponent } from "./app.component";
import { ShowcaseComponent } from './containers/showcase/showcase.component';
import { UploadComponent } from './containers/upload/upload.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ContactInfoBottomSheetComponent } from './components/contact-info-bottom-sheet/contact-info-bottom-sheet.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { CarouselComponent } from './containers/showcase/components/carousel/carousel.component';
import { PreviewComponent } from './containers/preview/preview.component';
import { GalleryItemComponent } from './containers/showcase/components/gallery-item/gallery-item.component';

import { environment } from '../environments/environment';
import { GalleryModalComponent } from './containers/showcase/components/gallery-modal/gallery-modal.component'

const loaderConfig: NgxUiLoaderConfig = {
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "#007ea7",
  fgsPosition: "center-center",
  fgsSize: 90,
  fgsType: "square-jelly-box",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "007EA7",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
}

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    UploadComponent,
    PageNotFoundComponent,
    ContactInfoBottomSheetComponent,
    CarouselComponent,
    PreviewComponent,
    GalleryItemComponent,
    GalleryModalComponent,
  ],
  imports: [
    AppMaterialUIModule,
    ReactiveFormsModule,

    NgxMasonryModule,
    NgxMatFileInputModule,
    NguCarouselModule,
    CarouselModule,

    EcoFabSpeedDialModule,
    LazyLoadImageModule,

    NgxUiLoaderHttpModule.forRoot({
      loaderId: "master",
      showForeground: true,
      exclude: [
        `${environment.apiUrl}/gallery`,
        `${environment.apiUrl}/carousel`
      ]
    }),
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule.forRoot({
      loaderId: "master",
    }),
    NgbModule,

    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    StoreModule.forRoot({
      reducers: reducers
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

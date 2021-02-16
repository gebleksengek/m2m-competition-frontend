import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./containers/page-not-found/page-not-found.component";
import { ShowcaseComponent } from "./containers/showcase/showcase.component";
import { UploadComponent } from "./containers/upload/upload.component";
import { PreviewComponent } from './containers/preview/preview.component'

const routes: Routes = [
  {
    path: "", component: ShowcaseComponent,
  },
  {
    path: "upload", component: UploadComponent
  },
  {
    path: "preview/:id", component: PreviewComponent
  },
  {
    path: "404", component: PageNotFoundComponent,
  },
  {
    path: "**", redirectTo: "404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

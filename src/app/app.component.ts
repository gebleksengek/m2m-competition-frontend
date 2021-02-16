import { Component } from "@angular/core";
import { Title } from '@angular/platform-browser'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { Router, NavigationEnd } from '@angular/router'
import { Store } from '@ngrx/store'

import { AppReducer } from './reducers'

import { ContactInfoBottomSheetComponent } from './components/contact-info-bottom-sheet/contact-info-bottom-sheet.component'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title_page_suffix = "- SMK Muh 2 Moyudan"
  showPreviewNav = false

  header_title$: string
  loader_text$: string

  constructor(
    private store: Store<AppReducer>,
    private titleService: Title,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {
    this.store.select("reducers").subscribe((state) => {
      this.header_title$ = state.title
      this.titleService.setTitle(`${state.title} ${this.title_page_suffix}`)

      this.loader_text$ = state.loader.text
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const splitUrl = event.url.split("/")
        splitUrl.shift()
        if (splitUrl.length === 2) {
          if (splitUrl[0] === 'preview') {
            this.showPreviewNav = true
          }
        } else {
          this.showPreviewNav = false
        }
      }
    })
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ContactInfoBottomSheetComponent)
  }
}

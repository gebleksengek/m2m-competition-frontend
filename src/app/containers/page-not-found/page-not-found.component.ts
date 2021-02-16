import { Component } from '@angular/core';

import { Store } from '@ngrx/store'
import { AppReducer } from '../../reducers'
import { SetTitle } from '../../actions/app.actions'

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent {
  header_title = "Page Not Found"

  constructor(
    private store: Store<AppReducer>
  ) {
    this.store.dispatch(new SetTitle(this.header_title))
  }
}

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Store } from '@ngrx/store'

import { NgxUiLoaderService } from 'ngx-ui-loader'
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry'

import { AppReducer } from '../../reducers'
import { SetTitle } from '../../actions/app.actions'

import { GalleryModalComponent } from './components/gallery-modal/gallery-modal.component'

import { environment } from '../../../environments/environment'

export interface GalleryDetail {
  id: string,
  created_at: string,
  updated_at: string,
  uploader: {
    name: string,
    username: string,
    profileImageUrl: string,
  },
  content: {
    title: string,
    description: string,
    id: string,
    url: string,
  }
}

interface GalleryResponse {
  status: boolean,
  data: GalleryDetail[] | null
  errorMsg: string,
}



@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.sass']
})
export class ShowcaseComponent implements OnInit {
  @ViewChild('modal') modal: GalleryModalComponent
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  pos: number
  max: number

  hasNext = true
  current_page = 1
  masonryOptions: NgxMasonryOptions = {
  }

  masonryItems: GalleryDetail[] = []

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    // this.pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.pos = window.innerHeight + window.pageYOffset
    this.max = document.documentElement.scrollHeight;
    if ((this.pos + 20) >= this.max) {
      if (this.hasNext && !this.ngxService.hasRunningTask(true, "getGalleryLoader")) {
        this.showLoader()
        void this.getGallery(-1, 9, this.current_page).then(data => {
          this.masonryItems.push(...data)
        })
        this.hideLoader()
      }
    }
  }

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppReducer>,
    private ngxService: NgxUiLoaderService
  ) {
    this.store.dispatch(new SetTitle("Showcase"))
  }

  async ngOnInit(): Promise<void> {
    this.showLoader()
    this.masonryItems.push(...(await this.getGallery()))
    this.hideLoader()
  }

  layout(): void {
    this.masonry.layout()
  }

  showLoader(): void {
    this.ngxService.startLoader("getGalleryLoader")

  }

  hideLoader(): void {
    this.ngxService.stopLoader("getGalleryLoader")
  }

  handleGalleryClick(galleryDetail: GalleryDetail): void {
    this.modal.open(galleryDetail)
  }



  async getGallery(sort: number = -1, limit: number = 9, page: number = 1): Promise<GalleryDetail[]> {
    const url = `${environment.apiUrl}/gallery?sort=${sort}&page=${page}&limit=${limit}`
    const res = await this.httpClient.get<GalleryResponse>(url).toPromise()
    if (res.status) {
      if (res.data.length === 0) {
        this.hasNext = false
      } else {
        this.current_page += 1
      }
      return res.data
    }
    return []
  }

  // getGallery(sort: number = 1, limit: number = 9, page: number = 1): GalleryDetail[] {
  //   const url = `${environment.apiUrl}/gallery?sort=${sort}&page=${page}&limit=${limit}`

  //   const gallery: GalleryDetail[] = []

  //   this.httpClient.get<GalleryResponse>(
  //     url
  //   ).pipe(
  //     catchError((err: Observable<never>) => {
  //       return throwError(err)
  //     })
  //   ).subscribe(
  //     res => {
  //       if (res.status) {
  //         gallery.push(...res.data)
  //       }
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   )

  //   return gallery
  // }

}

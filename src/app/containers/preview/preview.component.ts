import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Clipboard } from '@angular/cdk/clipboard'
import { Platform } from '@angular/cdk/platform'

import { environment } from '../../../environments/environment'

import { AppReducer } from '../../reducers'
import { SetTitle } from '../../actions/app.actions'

interface VideoDetailResult {
  status: boolean,
  data: {
    name: string,
    email: string,
    phone: string,
    school: string,
    title: string,
    created_at: string,
    updated_at: string,
    video: {
      url: string,
      id: string
    }
  }
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  header_title = "Video Preview"
  videoDetail: VideoDetailResult = {
    status: false,
    data: {
      name: "",
      email: "",
      phone: "",
      school: "",
      title: "",
      created_at: "",
      updated_at: "",
      video: {
        url: "",
        id: ""
      }
    }
  }
  // title = ''
  // name = ''
  // school = ''
  // created_at = ''
  // embedUrl = ''

  @ViewChild("copyLink") private copyLinkIcon: ElementRef

  constructor(
    private store: Store<AppReducer>,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private clipboard: Clipboard,
    private platform: Platform
  ) {
    this.store.dispatch(new SetTitle(this.header_title))
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")

    this.getVideoDetail(id).subscribe(
      res => {
        if (res.status) {
          this.videoDetail = res
          // const { title, name, school, created_at, video } = res.data

          // this.title = title
          // this.name = name
          // this.school = school
          // this.created_at = created_at
          // this.embedUrl = video.url
        } else {
          console.log(res.status)
          void this.router.navigate(["404"])
        }
      },
      () => {
        void this.router.navigate(["404"])
      }
    )
  }

  handleShareButton(
    type: "facebook" |
      "twitter" |
      "instagram" |
      "copy-link" |
      "whatsapp",

  ): void {
    const url = location.href

    if (type === "facebook") {
      const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(encodeURI(facebookURL), "_blank", "width=800, height=500")
    } else if (type === 'whatsapp') {
      let whatsappURL = "https://web.whatsapp.com/send?text="
      if (this.platform.ANDROID) {
        whatsappURL = "whatsapp://send?text="
      } else if (this.platform.IOS) {
        whatsappURL = "https://api.whatsapp.com/send?text="
      }
      whatsappURL = `${whatsappURL}${url}`
      window.open(encodeURI(whatsappURL), "_blank", "width=800, height=500")
    } else if (type === "twitter") {
      const twitterURL = `https://twitter.com/intent/tweet?url=${url}&text=${this.videoDetail.data.title}`
      window.open(encodeURI(twitterURL), "_blank", "width=800, height=500")
    } else if (type === "copy-link") {
      this.clipboard.copy(url)
      const icon = this.copyLinkIcon.nativeElement as { name: string }
      icon.name = "checkmark-outline"
      const iconChangeInterval = setInterval(() => {
        icon.name = "link-outline"
        clearInterval(iconChangeInterval)
      }, 1000)
    }
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }

  getVideoDetail(id: string): Observable<VideoDetailResult> {
    const { apiUrl } = environment

    return this.httpClient.get<VideoDetailResult>(
      `${apiUrl}/contest/video/${id}`
      // eslint-disable-next-line @typescript-eslint/unbound-method
    ).pipe(catchError(this.handleError))
  }

}

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { environment } from '../../../../../environments/environment'

export interface CarouselDetail {
  id: string;
  created_at: string;
  updated_at: string;
  uploader: {
    name: string;
    username: string;
    profileImageUrl: string;
  };
  content: {
    title: string;
    description: string;
    duration: number
    id: string;
    url: string | SafeResourceUrl;
  }
}

interface CarouselResponse {
  status: boolean
  data: CarouselDetail[] | null
  errorMsg: string
}


@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.sass"]
})
export class CarouselComponent implements OnInit, AfterViewInit {
  carouselItems: CarouselDetail[] = []
  @ViewChild("carouselItemContainer", { static: true }) caroselItemContainer: ElementRef

  constructor(
    private httpClient: HttpClient,
    private dom: DomSanitizer
  ) {

  }

  async ngOnInit(): Promise<void> {
    const carousels = await this.getCarousel()
    this.carouselItems = carousels.map(v => {
      if (typeof v.content.url === 'string') {
        return {
          ...v,
          content: {
            ...v.content,
            url: this.dom.bypassSecurityTrustResourceUrl(v.content.url)
          }
        } as CarouselDetail
      }
      return v
    })
  }

  ngAfterViewInit(): void {
    console.log(this.caroselItemContainer)
  }

  async getCarousel(sort: number = -1): Promise<CarouselDetail[]> {
    const url = `${environment.apiUrl}/carousel?sort=${sort}`
    const res = await this.httpClient.get<CarouselResponse>(url).toPromise()
    if (res.status) {
      return res.data
    }
    return []
  }
}


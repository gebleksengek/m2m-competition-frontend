import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GalleryDetail } from '../../showcase.component'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.sass']
})
export class GalleryItemComponent {
  apiURL = environment.apiUrl
  @Input() galleryDetail: GalleryDetail
  @Output() layout = new EventEmitter<unknown>()
}

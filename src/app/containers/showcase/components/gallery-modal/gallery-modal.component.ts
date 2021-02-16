import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { GalleryDetail } from '../../showcase.component'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.sass']
})
export class GalleryModalComponent {
  apiURL = environment.apiUrl
  @ViewChild("modal") private modal: ElementRef<GalleryModalComponent>
  @Input() data: GalleryDetail = {
    id: "",
    created_at: "",
    updated_at: "",
    uploader: {
      name: "",
      username: "",
      profileImageUrl: "",
    },
    content: {
      title: "",
      description: "",
      id: "",
      url: "",
    }
  }

  constructor(
    private modalService: NgbModal
  ) {
  }

  handleImageClick(): void {
    const divModal = document.getElementById('modalZoomer')
    const imgModal = document.getElementById('modalZoomerImg') as HTMLImageElement
    divModal.style.display = "block"
    imgModal.src = this.data.content.url
  }

  handleImageClose(): void {
    const divModal = document.getElementById('modalZoomer')
    const imgModal = document.getElementById('modalZoomerImg') as HTMLImageElement
    divModal.style.display = "none"
    imgModal.src = ""
  }

  open(data: GalleryDetail): void {
    this.data = data
    this.modalService.open(this.modal, {
      size: 'lg',
      centered: true,
    })
  }
}

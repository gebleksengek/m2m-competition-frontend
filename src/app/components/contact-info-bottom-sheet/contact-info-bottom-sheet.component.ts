import { Component } from '@angular/core';

interface ContactSection {
  name: string,
  icon: string,
  value: string,
  url: string,
  target: string
}

@Component({
  selector: 'app-contact-info-bottom-sheet',
  templateUrl: './contact-info-bottom-sheet.component.html',
  styleUrls: ['./contact-info-bottom-sheet.component.sass']
})
export class ContactInfoBottomSheetComponent {
  contacts: ContactSection[] = [
    {
      name: "phone",
      icon: 'phone',
      value: '0274-6497077',
      url: "tel:0274-6497077",
      target: ""
    },
    {
      name: "map",
      icon: "place",
      value: "Open In Google Maps",
      url: "https://goo.gl/maps/ux8dguQkRMxsMGxy7",
      target: "_blank"
    }
  ]
}

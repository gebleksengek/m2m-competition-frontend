import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms'
import { HttpClient, HttpEventType } from '@angular/common/http'
import { Router } from '@angular/router'

import { environment } from "./../../../environments/environment"

import Swal from 'sweetalert2'

import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber'

import { Store } from '@ngrx/store'
import { AppReducer } from '../../reducers'
import { SetTitle, SetLoaderText } from '../../actions/app.actions'

interface ResultUpload {
  status: boolean,
  data: {
    id: string,
    created_at: string,
    updated_at: string,
    name: string,
    email: string,
    phone: string,
    school: string,
    title: string,
    video: {
      url: string,
      id: string
    }
  } | null,
  errorMsg: string
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
  header_title = "Upload Your Video"

  uploadForm: FormGroup

  constructor(
    private store: Store<AppReducer>,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.store.dispatch(new SetTitle(this.header_title))
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      name: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(3)
      ]),
      school: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(8)
      ]),
      email: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.pattern(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
        )
      ]),
      phone: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        this.phoneNumberValidation()
      ]),
      title: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required
      ]),
      video: new FormControl("", [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        this.mimeTypeValidation("video/mp4"),
        this.fileExtensionValidation("mp4"),
        this.fileMaxSizeValidation(524288000)
      ])
    })
  }

  public phoneNumberValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const simpleRegex = /^(0|62|\+62)[0-9]*$/
      if (typeof control.value === "string") {
        const value = control.value
        if (simpleRegex.test(value)) {
          const phoneUtil = PhoneNumberUtil.getInstance()
          let parsed: PhoneNumber
          try {
            parsed = phoneUtil.parse(value, "ID")
          } catch (e) {
            return { phonenumber: control.value }
          }

          if (!phoneUtil.isValidNumberForRegion(parsed, "ID")) {
            return { phonenumber: control.value }
          }

          if (!phoneUtil.isPossibleNumber(parsed)) {
            return { phonenumber: control.value }
          }

          return null
        }
      }
      return { phonenumber: control.value }
    }
  }

  public fileMaxSizeValidation(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      if (control.value instanceof File) {
        const value = control.value
        const { size } = value
        if (size < maxSize) {
          return null
        }
      }
      return { maxsize: control.value }
    }
  }

  public fileExtensionValidation(...extensions: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      if (control.value instanceof File) {
        const value = control.value
        const ext = value.name.split(".").pop()
        if (extensions.includes(ext)) {
          return null
        }
      }
      return { extension: control.value }
    }
  }

  public mimeTypeValidation(...mimeTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      if (control.value instanceof File) {
        const value = control.value
        if (mimeTypes.includes(value.type)) {
          return null
        }
      }
      return { mimetype: control.value }
    }
  }

  public errorHandling(control: string, error?: string): boolean {
    if (error != undefined) {
      return this.uploadForm.controls[control].hasError(error)
    }

    return (
      this.uploadForm.controls[control].invalid &&
      (
        this.uploadForm.controls[control].dirty ||
        this.uploadForm.controls[control].touched
      )
    )
  }

  successUploadHandler(result: ResultUpload): void {
    if (result.status) {
      const { id } = result.data
      void Swal.fire({
        title: "Upload Video Success",
        text: "We'll redirect you to the video preview page in 5 seconds",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowEnterKey: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: "success",
        didClose: () => {
          void this.router.navigate(["/preview", id])
        }
      })
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {

      const formData = new FormData()

      formData.append("name", this.uploadForm.get("name").value)
      formData.append("school", this.uploadForm.get("school").value)
      formData.append("email", this.uploadForm.get("email").value)
      formData.append("phone", this.uploadForm.get("phone").value)
      formData.append("title", this.uploadForm.get("title").value)
      formData.append("video", this.uploadForm.get("video").value)

      this.httpClient.post(
        `${environment.apiUrl}/contest/uploadVideo`,
        formData,
        { reportProgress: true, observe: "events" }
      ).subscribe(
        (event) => {
          let percentage = "0"
          switch (event.type) {
            case HttpEventType.UploadProgress:
              percentage = Math.round(event.loaded / event.total * 100).toString()
              if (percentage === "100") {
                this.store.dispatch(new SetLoaderText(`Checking file...`))
              } else {
                this.store.dispatch(new SetLoaderText(`Uploaded ${percentage}%`))
              }
              break;

            case HttpEventType.Response:
              this.store.dispatch(new SetLoaderText(""))
              this.successUploadHandler(event.body as ResultUpload)
              break

            default:
              break;

          }
        },
        (err) => {
          console.log(err)
        }
      )
    }

  }

}

import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _isMobile = false
  private _isTablet = false
  private _isDark = false

  constructor (
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
  ) {
    breakpointObserver.observe(['(max-width: 761.98px)'])
      .subscribe((state) => (this._isMobile = state.matches ? true : false))

    breakpointObserver.observe(['(max-width: 991.98px)'])
      .subscribe((state) => (this._isTablet = state.matches ? true : false))

    breakpointObserver.observe(['(prefers-color-scheme: dark)']).subscribe({
      next: (state) => (this._isDark = state.matches ? true : false)
    })
  }

  get isMobile (): boolean {
    return this._isMobile
  }

  get isTablet (): boolean {
    return this._isTablet
  }

  get isDark (): boolean {
    return this._isDark
  }

  get isDarkObserver (): Observable<boolean> {
    return this.breakpointObserver.observe(['(prefers-color-scheme: dark)'])
      .pipe(map((state) => state.matches))
  }

  presentSnackBar (message: string, data?: { duration?: number }): void {
    this.snackBar.open(message, 'Ok', {
      duration: data?.duration ?? 3500
    })
  }

  setDataStorage (key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, value)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  getDataStorage (key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.getItem(key)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteDataStorage (key: string): void {
    return localStorage.removeItem(key)
  }

  patternValidator (regex: RegExp, error: { [key: string]: boolean }): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error
    }
  }

  matchValidator (
    controlName: string,
    matchingControlName: string,
    options?: { required?: boolean }
  ): ValidatorFn | null {
    return (abstractControl: AbstractControl): { [key: string]: boolean } | null => {
      const _control = abstractControl.get(controlName)
      const _controlConfirmation = abstractControl.get(matchingControlName)

      if (!_control || !_controlConfirmation) {
        return null
      }

      if (!_controlConfirmation.value && options?.required) {
        _controlConfirmation.setErrors({ required: true })
        return null
      }

      if (_control.value === _controlConfirmation.value) {
        _controlConfirmation.setErrors(null)
      } else {
        _controlConfirmation.setErrors({ confirmed: true })
      }

      return null
    }
  }

  /**
   * Valida que sean los campos obligatorios dependiendo de la seleccion
   * del campo principal
   * @param controlName Nombre del control principal
   * @param requiredControlName Nombre del control a aplicar validador
   * @param textIncludes texto que debe coincidir con el valor del control principal
   * @returns null
   */
  ifRquiredValidator (controlName: string, requiredControlName: string, textIncludes: string[]): ValidatorFn | null {
    return (abstractControl: AbstractControl): { [key: string]: boolean } | null => {
      const _control = abstractControl.get(controlName)
      const _controlRequired = abstractControl.get(requiredControlName)

      if (!_control || !_control.value || !_controlRequired) { return null }

      const value: string = _control.value.name?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || ''

      const existsArray: boolean[] = []

      textIncludes.forEach(text => {
        const exists = value.includes(text)
        existsArray.push(exists)
      })

      if (_controlRequired.value) {
        _controlRequired.setErrors(null)
      } else if (existsArray.includes(true)) {
        _controlRequired.setErrors({ required: true })
      } else {
        _controlRequired.setErrors(null)
      }

      return null
    }
  }

  /**
   * Toma el error y obtiene el mensaje a mostrar
   * @param err Respuesta de error de petición HTTP
   * @param message Mensaje a mostrar en algunos casos
   * @returns Mensaje
   */
  getMessageErrorHttp (err: any, message?: string): string {
    let _message = ''

    if (err.error.errors && typeof err.error.errors === 'object') {

      _message = Object.values(<[]>err.error.errors)
        .map((err: string[]) => err.join(' <br /> '))
        .join(' <br />')

    } else if (err.error.message && typeof err.error.message === 'string') {

      _message = err.error.message

    } else if (message) {
      _message = message
    }

    if (!_message) {
      _message = err.statusText
    }

    return _message
  }

  /**
   * Convierte un objecto en HttpParams
   * @param paramsObject Objecto - parámetros
   * @returns HttpParmas
   */
  objectToHttpParams (paramsObject?: { [key: string]: string | boolean | number | string[] }): HttpParams {
    let params = new HttpParams()

    if (paramsObject) {
      Object.keys(paramsObject).forEach((key) => {
        const value = paramsObject[key]

        if (value && Array.isArray(value)) {
          value.forEach((value) => {
            params = params.append(`${key}[]`, value)
          })
        } else {
          params = params.append(key, value)
        }

      })
    }

    return params
  }

  isNumber (value: string): boolean {

    if ((/\D/).test(value)) {
      return false
    } else {
      return true
    }

  }

  isValidURL (url?: string) {
    if (!url) return false;

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  }

  /**
   * Crea un nuevo identificador aleatorio de longitud fija.
   * @param len Logitud para el uid, por defecto 11
   * @returns uid
   */
  uid (len?: number): string {
    let IDX = 256, HEX = [], SIZE = 256, BUFFER;
    while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

    let i = 0, tmp = (len || 11);

    if (!BUFFER || ((IDX + tmp) > SIZE * 2)) {
      for (BUFFER = '', IDX = 0; i < SIZE; i++) {
        BUFFER += HEX[Math.random() * 256 | 0];
      }
    }

    return BUFFER.substring(IDX, IDX++ + tmp);
  }

  toTitleCase (value: string) {
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  }

}


export interface RequestParams {
  paramsObject?: { [key: string]: string | boolean | number | string[] }
}

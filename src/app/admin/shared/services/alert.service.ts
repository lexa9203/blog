import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type AlertType = 'success' | 'warning' | 'danger'

export interface Alert {
  text: string
  type: AlertType
}

@Injectable()

export class AlertService {

  public alertStream$ = new Subject<Alert>()

  success(text: string) {
    this.alertStream$.next({type: 'success', text})
  }

  warning(text: string) {
    this.alertStream$.next({type: 'warning', text})
  }

  danger(text: string) {
    this.alertStream$.next({type: 'danger', text})
  }

}

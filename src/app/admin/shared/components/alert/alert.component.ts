import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 3000

  public text: string = ''

  public type: string = 'success'

  alertSub!: Subscription

  constructor( private alert: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alert.alertStream$.subscribe(res => {
      this.text = res.text
      this.type = res.type

      const interval = setTimeout(() => {
        clearTimeout(interval)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}

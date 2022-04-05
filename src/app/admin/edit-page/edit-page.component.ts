import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interface';
import { PostService } from 'src/app/shared/post-service.service';
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  updateSub?: Subscription

  getPostSub?: Subscription

  id!: string

  form!: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private alert: AlertService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = params['id']
    })


    this.getPostSub = this.postService.getPost(this.id).subscribe((res: IPost) => {
      this.form = new FormGroup({
        author: new FormControl({value: res.author, disabled: true}),
        title: new FormControl(res.title, Validators.required),
        text: new FormControl(res.text, Validators.required)
      })
    })
  }

  ngOnDestroy(): void {
    if(this.getPostSub) {
      this.getPostSub.unsubscribe()
    }

    if(this.updateSub) {
      this.updateSub.unsubscribe()
    }
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    const post: IPost = {
      title: this.form.value.title,
      author: this.form.getRawValue().author,
      text: this.form.value.text,
      date: new Date()
    }

    this.updateSub = this.postService.editPost(this.id, post).subscribe(() => {
      this.alert.warning('Изменения сохранены')
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}

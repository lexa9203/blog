import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../../interface';
import { PostService } from '../../post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  idPost: string = ''

  paramsSub!: Subscription
  
  postSub!: Subscription

  post!:IPost

  constructor(private route:ActivatedRoute, private postService: PostService) { }
  
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((res) => this.idPost = res['id'])
    this.postSub = this.postService.getPost(this.idPost).subscribe((res) => {
      this.post = res
      console.log(this.post.text)
    })
  }
  
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe()
    this.postSub.unsubscribe()
  }
  

}

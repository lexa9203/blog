import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interface';
import { PostService } from 'src/app/shared/post-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  searchTitle = ''

  loadPosts = true

  posts: IPost[] = []

  subcribePost!: Subscription

  constructor(private postService: PostService) { }
  
  ngOnInit(): void {
    this.subcribePost = this.postService.getPosts().subscribe(
      (res) => {
        this.loadPosts = false
        return this.posts = res;
      }, 
      (err) => {
        this.loadPosts = false;
        console.log(err)
      })
  }

  ngOnDestroy(): void {
    if(this.subcribePost) {
      this.subcribePost.unsubscribe()
    }
  }

  deletePost(id: string | undefined) {
    this.postService.deletePost(id!).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id)
    })
  }

}

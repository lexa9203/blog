import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../shared/interface';
import { PostService } from '../shared/post-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$?: Observable<IPost[]>

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts()
  }

}

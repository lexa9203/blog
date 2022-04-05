import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../shared/interface';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  @Input() postPage!:IPost

  constructor() { }
  

  ngOnInit(): void {}
}

import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from 'src/app/shared/interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(posts: IPost[], search: string):IPost[] {
    if (search.trim() === "") {
      return posts
    }
    return posts.filter((post:any) => {
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}

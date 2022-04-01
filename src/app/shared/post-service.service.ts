import { keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { fbResponse, IPost } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${environment.fbUrl}/posts.json`, post)
      .pipe(map((response: fbResponse | any) => {        
        const newPost: IPost = {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
        return newPost
      }))
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get(`${environment.fbUrl}/posts.json`)
      .pipe(
        map((res: {[key:string]: any}) => {
          return Object.keys(res).map((key) => ({
             ...res[key],
             id: key,
             date: new Date(res[key].date) 
          }))
        })
      )
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/posts/${id}.json`)
  }
}

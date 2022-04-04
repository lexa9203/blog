import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getPost(id: string):Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbUrl}/posts/${id}.json`)
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/posts/${id}.json`)
  }

  editPost(id: string, post: IPost):Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbUrl}/posts/${id}.json`, post)/* частичное обновление обьекта */
/*     return this.http.put<IPost>(`${environment.fbUrl}/posts/${id}.json`, post)
 */  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(postsText: string):string {
    const subString = postsText.slice(postsText.indexOf('>') + 1, postsText.indexOf('<', 2))
    if(subString.length > 10) {
        return subString.slice(0, 9) + '...'
    }
    return subString
  }
}
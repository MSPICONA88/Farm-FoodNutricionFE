import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const users = [];
    if(value.length===0 || arg===''){
      return value;
    }
  
  
  for (const user of value){
    if (user.nombreApellido.toLowerCase().indexOf(arg.toLowerCase())>-1){
      users.push(user);

    }

  }
  return users;
}

}

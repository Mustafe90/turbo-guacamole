import {fromEvent, of} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {flatMap} from "rxjs/operators";

import { filter,map,debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";


const searchInput = document.querySelector("input");

let input = fromEvent(searchInput,"keyup");

input.pipe(filter(e => e.target.value.length > 2),
      map(e => e.target.value),
      debounceTime(500),
      distinctUntilChanged(), 
      fromFetch(x => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${x}}&key=AIzaSyCTH6Zu-mG4DtZ73JYtz0OH9uT5eLh-73w`),
      switchMap(Success,Error))
      .subscribe(x => console.log(x));


//TODO: investigate a way to not share youtube key in github. 

//TODO: Construct this string yourself. 

function Error(err){
     return catchError(err => {
            //network or other client error
            console.log(err);
            return of({error : true, message: `Error ${err.message}`});
      })
}
function Success (Response) {

      return(Response) => {
                        if(Response.ok){
                              //cool 200
                              return Response.json(); //cast this into an object that we want
                        }
                        else{
                              //server error
                              return of({error : true, message: `Error: ${Response.status}`});
      
                              };
                        };
                        
}




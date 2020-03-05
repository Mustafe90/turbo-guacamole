import {fromEvent, of} from "rxjs";
import {fromFetch} from "rxjs/fetch";

import { filter,map,debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";


const searchInput = document.querySelector("input");

let input = fromEvent(searchInput,"keyup");

input.pipe(filter(e => e.target.value.length > 2),
      map(e => e.target.value.trim()),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(x => console.log(x) );


//TODO: investigate a way to not share youtube key in github. 
var apiObservable =  fromFetch("Youtube Url").pipe(
      switchMap(
            Response => {
                  if(Response.ok){
                        //cool 200
                        return Response.json(); //cast this into an object that we want
                  }
                  else{
                        //server error
                        return of({error : true, message: `Error: ${Response.status}`});

                        };
                  }
            
      ),
      catchError(err => {
            //network or other client error
            console.log(err);
            return of({error : true, message: `Error ${err.message}`});
      })
);



import {fromEvent, of,from} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {mergeMap} from "rxjs/operators";

import { filter,map,debounceTime, distinctUntilChanged,switchMap, catchError } from "rxjs/operators";


const searchInput = document.querySelector("input");

let input = fromEvent(searchInput,"keyup");

let videos = from([]);

class Product{};

input.pipe(filter(e => e.target.value.length > 2),
      map(e => e.target.value),
      debounceTime(600),
      distinctUntilChanged(),
      //TODO: Understand what mergeMap/SwitchMap/CatchError deeper
      mergeMap(query =>  fromFetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyCTH6Zu-mG4DtZ73JYtz0OH9uT5eLh-73w`)),
      switchMap(
       Response => Response.ok ? from(Response.json())  :  of({error : true, message: `Error: ${Response.status}`})            
      ),
      map(data => {
            //TODO: Errors will stop the observable
            const {etag,
                   regionCode,
                   nextPageToken,
                   pageInfo: {totalResults,resultsPerPage},
                   items} = data;
            return {
                  etag,
                  regionCode,
                  nextPageToken,
                  pageInfo: {
                        totalResults,
                        resultsPerPage
                  },
                  items
            };
      }), 
      catchError(err => {
            //network or other client error
            console.log(err);
            return of({error : true, message: `Error ${err.message}`});
      }))  
      .subscribe({
            next: response => console.log(response),
            error: error => console.log(error),
            complete: complete => console.log("Compelet")
      });
   
//TODO: Construct this string yourself 



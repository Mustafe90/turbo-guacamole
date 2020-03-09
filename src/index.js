import { fromEvent, of, from, combineLatest } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  mergeMap
} from "rxjs/operators";

const searchInput = document.querySelector("input");

let input = fromEvent(searchInput, "keyup").pipe(
      filter(e => e.target.value.length > 2),
      map(e => e.target.value),
      debounceTime(600),
      distinctUntilChanged()
    );

//TODO: Emit this event elsewhere to allow us to render the results


let SearchInput = query =>  {
  //TODO: Understand what mergeMap/SwitchMap/CatchError deeper
  return fromFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyCTH6Zu-mG4DtZ73JYtz0OH9uT5eLh-73w`
  ).pipe(
    switchMap(Response =>
      Response.ok
        ? from(Response.json())
        : of({ error: true, message: `Error: ${Response.status}` })
    ),
    map(data => {
      //TODO: Errors will stop the observable
      const {
        etag,
        regionCode,
        nextPageToken,
        pageInfo: { totalResults, resultsPerPage },
        items
      } = data;
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
      return of({ error: true, message: `Error ${err.message}` });
    })
  );
};

let CreateResultArea = data => {

      let container = document.createElement("div");

      container.classList = ["container"];

      if(!data || !data.items){
            return of(container);
      }

      for(let item of data.items){
            
            let result = document.createDocumentFragment("div");

            console.log({item});

            result.classList = ["video"];

            container.appendChild(result);
      }

      return of(container);
};

//TODO: Construct this string yourself

//TODO: ON input change react and update the search, take that input and listen to it

let resultArea = document.querySelector("#result");

let data = input.pipe(mergeMap(x => SearchInput(x)));

let newDivElementOnUserSearch = data.pipe(mergeMap(x => CreateResultArea(x))).subscribe({
      next: container => {

            //TODO: on input search create a spinner, when data is loading keep the spinner! 
           let searchResultArea = document.getElementById("result");

           if(searchResultArea.childElementCount > 0 && container.childElementCount > 0){
                 searchResultArea.innerHTML = ""; //TODO such a shit move! do it probably through recursion son!
           }
           searchResultArea.appendChild(container);
      },
      closed: console.log("closed"),
      error: error => console.log(error),
      completed: console.log("Completed")
});

//TODO: Write a document element generating method to generate divs / elements

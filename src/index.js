import {mergeMap} from "rxjs/operators";
import {search} from "./search";
import {seachInput} from "./searchInput";
import {seachResult} from "./searchArea";

const inputElement = document.querySelector("input");

let youtubeSearch = seachInput(inputElement)
            .pipe(mergeMap(x => search(x)));

let newDivElementOnUserSearch = youtubeSearch.pipe(mergeMap(x => seachResult(x))).subscribe({
      next: container => {

            //TODO: on input search create a spinner, when youtubeSearch is loading keep the spinner! 
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

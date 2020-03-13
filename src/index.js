import { mergeMap } from "rxjs/operators";
import search from "./search";
import seachInput from "./searchInput";
import seachResult from "./searchArea";

const inputElement = document.querySelector("input");

let youtubeSearch = seachInput(inputElement).pipe(mergeMap(x => search(x)));

let newDivElementOnUserSearch = youtubeSearch
  .pipe(mergeMap(x => seachResult(x)))
  .subscribe({
    next: container => {
      console.log(container);
      //TODO: on input search create a spinner, when youtubeSearch is loading keep the spinner!
      let searchResultArea = document.getElementById("result");
      console.log({ container });

      searchResultArea.appendChild(container);
    },
    closed: console.log("closed"), //TODO: this closes on init why?
    error: error => console.log(error),
    completed: console.log("Completed") //TODO: how to only close when expected This gets closed even though it is not completed (more data coming in)
  });

//TODO: Write a document element generating method to generate divs / elements

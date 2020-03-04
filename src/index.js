import {fromEvent} from "rxjs";
import { filter,map,debounceTime, distinctUntilChanged } from "rxjs/operators";


const searchInput = document.querySelector("input");

let input = fromEvent(searchInput,"keyup");

input.pipe(filter(e => e.target.value.length > 2),
      map(e => e.target.value.trim()),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(x => console.log(x) );

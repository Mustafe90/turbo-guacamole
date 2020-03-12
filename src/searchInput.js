import {fromEvent} from "rxjs";
import {filter,map,debounceTime,distinctUntilChanged} from "rxjs/operators";

export default function (inputElement)
{
    return fromEvent(inputElement, "keyup")
    .pipe(
    filter(e => e.target.value.length > 2),
    map(e => e.target.value),
    debounceTime(600),
    distinctUntilChanged()
  );
 }
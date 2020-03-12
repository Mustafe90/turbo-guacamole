import {fromFetch} from "rxjs";
import {switchMap,map,catchError} from "rxjs/operators";

export default function SearchInput(query) {
    //TODO: Understand what mergeMap/SwitchMap/CatchError deeper
    //TODO: Construct this string yourself
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
        //TODO: Create a inner observable and resolve the error there (defer)
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
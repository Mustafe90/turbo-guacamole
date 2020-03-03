import {fromEvent} from "rxjs";
import { filter,map,debounceTime, distinctUntilChanged } from "rxjs/operators";


const searchInput = document.querySelector("input");

let input = fromEvent(searchInput,"keyup");

input.pipe(filter(e => e.target.value.length > 2),
      map(e => e.target.value.trim()),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(x => console.log(x) );
  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
        //Todo: Place this api key in a more secure place
    gapi.client.setApiKey("//Todo:Add your api key HERE");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "snippet",
      "order": "date",
      "q": "dogs"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });

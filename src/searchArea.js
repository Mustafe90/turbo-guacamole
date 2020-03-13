import { of, from } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";

export default function CreateResultArea(data) {
  //TODO: potentially off load this to the worker
  //TODO: there is a lot of data we are not utilising do use it
  return of(data).pipe(
    filter(x => x && x.items),
    mergeMap(x => x.items),
    map(x => {
      const {
        publishedAt,
        channelId,
        title,
        description,
        thumbnails,
        channelTitle,
        liveBroadcastContent
      } = x.snippet;

      let result = document.createDocumentFragment("div");

      let image = document.createElement("img");

      let { default: defaulTumbnail, medium, high } = thumbnails;

      let { url, width, height } = high;

      image.src = url;
      image.height = width;
      image.width = height;

      let details = document.createElement("p");
      details.innerText = `${title} - ${publishedAt}`;

      let moreDescription = document.createElement("p");
      moreDescription.innerText = description;

      result.appendChild(image);
      result.appendChild(details);
      result.appendChild(moreDescription);

      return result;
    })
  );
}

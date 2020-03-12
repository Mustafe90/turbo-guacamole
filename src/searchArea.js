import {of} from "rxjs";

export default  function CreateResultArea (data) {
    //TODO: potentially off load this to the worker
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
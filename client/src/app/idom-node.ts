export class IDomNode {
  tag: string | undefined;
  attributes: {[key: string]: string};
  content: IDomNode[];
  text?: string;
  constructor(obj: any) {
    this.content = [];
    this.attributes = {};
    // If JSON is not good break
    if (!obj || !obj.tag) {
      return;
    }
    this.tag = obj.tag;
    var property;
    for (property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (property === 'tag') {
          continue;
        }
        if (property === 'text') {
          if (typeof obj[property] === 'string' ||
            typeof obj[property] === 'number') {
            this.text = obj[property];
            //elm.appendChild(document.createTextNode(obj[property]));
          }
        }
        if (property === 'content') {
          if (Array.isArray(obj[property])) {
            var tempArray = obj[property];
            var i = 0, l = tempArray.length;
            for (; i < l; i++) {
              if (typeof tempArray[i].text === 'string') {
               // elm.innerHTML += tempArray[i].text;
              } else {
                this.content.push(new IDomNode(tempArray[i]));
                //elm.appendChild(this.constructDomElemens(tempArray[i]));
              }
            }
          } else {
            this.content.push(new IDomNode(obj[property]));
           // elm.appendChild(this.constructDomElemens(obj[property]));
          }
        } else {
          for (var attr in obj[property] ) {
            this.attributes[attr] = obj[property][attr];
          }
        }
      }
    }
  }
}

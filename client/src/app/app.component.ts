import { Compiler, Component, NgModule, OnInit, ViewChild, ViewContainerRef }  from '@angular/core';
import {IndexService} from "./service/index.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private compiler: Compiler, public indexService: IndexService) {}

  ngOnInit() {
    this.indexService.getModelData().subscribe(data=> {
     var dom = this.constructDomElemens(data);
     this.addComponent(dom.innerHTML);
    })
  }


  private constructDomElemens(obj: any) {

    // If JSON is not good break
    if (!obj || !obj.tag) {
      return;
    }
    var elm = document.createElement(obj.tag), property;
    for (property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (property === 'tag') {
          continue;
        }
        if (property === 'text') {
          if (typeof obj[property] === 'string' ||
            typeof obj[property] === 'number') {
            elm.appendChild(document.createTextNode(obj[property]));
          }
        }
        if (property === 'content') {
          if (Array.isArray(obj[property])) {
            var tempArray = obj[property];
            var i = 0, l = tempArray.length;
            for (; i < l; i++) {
              if (typeof tempArray[i].text === 'string') {
                elm.innerHTML += tempArray[i].text;
              } else {
                elm.appendChild(this.constructDomElemens(tempArray[i]));
              }
            }
          } else {
            elm.appendChild(this.constructDomElemens(obj[property]));
          }
        } else {
          for (var attr in obj[property] ) {
            elm.setAttribute(attr, obj[property][attr]);
          }
        }
      }
    }
    return elm;
  }

  private addComponent(template: string) {
    @Component({
      template: template
    })
    class TemplateComponent {

    }
    @NgModule({
      declarations: [TemplateComponent]
    })

    class TemplateModule {}
    const module = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = module.componentFactories.find(comp=>
      comp.componentType === TemplateComponent
    );
    this.container.createComponent(factory);
  }
}

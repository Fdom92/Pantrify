import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper;
  @Input('expanded') expanded;

  constructor(public renderer: Renderer) {

  }

  ngAfterViewInit() {
    const expandHeight = this.expandWrapper.nativeElement.childNodes[2].children.length * 55;
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', expandHeight + 'px');
  }
}

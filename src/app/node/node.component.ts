import {Component, Input, OnInit} from '@angular/core';
import {accessRights} from '../app.component';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input()
  node: accessRights | any;
  allThings: any[] = [];
  children: any[] = [];

  ngOnInit(): void {
    this.allThings = this.nodeArray('input');

    addEventListener('change',  (e: any) => {
      let check = e.target;

      if(this.allThings.indexOf(check) === -1) {
        return;
      }

      this.children = this.nodeArray('input', check.parentNode);

      this.children.forEach(child => child.checked = check.checked);

      while(check){
        let parent = (check.closest(['node']).parentNode).querySelector('input');

        const siblings: any[] = this.nodeArray('input', parent.closest('li').querySelector(['ul']));

        const checkStatus = siblings.map(check => check.checked);
        const every  = checkStatus.every(Boolean);
        const some = checkStatus.some(Boolean);

        parent.indeterminate = !every && every !== some;

        check = check !== parent ? parent : 0;
      }
    });
  }

  nodeArray(selector: string, parent: Document = document) {
    return [].slice.call(parent.querySelectorAll(selector));
  }
}

import {Component, Input} from '@angular/core';
import {accessRights} from '../app.component';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {
  @Input()
  node: accessRights | any;
}

import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {DestroyService} from './destroy.service';
import {takeUntil} from 'rxjs/operators';

export interface accessRights {
  id: number,
  parentId: number,
  name: string,
  checked: boolean,
  children: accessRights[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tree: accessRights[] = []

  constructor(
    private data: DataService,
    private destroy$: DestroyService
  ) {}

  ngOnInit() {
    this.data.getData()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.tree = this.dataToTree(data);
      });
  }

  dataToTree(data: any[]) {
    let map: any = {}, node, roots = [], i;

    for (i = 0; i < data.length; i++) {
      map[data[i].id] = i;
      data[i].children = [];
    }

    for (i = 0; i < data.length; i++) {
      node = data[i];
      if (node.parentId !== 0) {
        data[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

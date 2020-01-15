import { SparqlService } from './../../services/sparql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  myData: any;
  constructor(
    private router: Router,
  ) { }

  public navigate() {
    if (this.router.url !== '/quiz') {
      this.router.navigate(['']);
    }
  }

}

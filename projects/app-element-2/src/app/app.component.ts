import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { concat, fromEvent, of, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

import { AppService } from './app.service';

@Component({
  selector: 'app-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit, OnDestroy {
  name$ = this.service.name$.asObservable();

  @ViewChild('input', { static: true }) input: ElementRef;

  private destroy$ = new Subject<void>();

  constructor(public service: AppService) { }

  ngOnInit() {
    const keyup$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(200), map((event: any) => event.target.value), takeUntil(this.destroy$))
      .subscribe(name => this.service.name$.next(name));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

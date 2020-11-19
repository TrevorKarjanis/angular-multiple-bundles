import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


// Demonstrate a simple service that could be injected into multiple components.
@Injectable()
export class AppService {
  name$ = new BehaviorSubject<string>($localize`Custom Element One`);
}

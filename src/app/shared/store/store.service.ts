import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
    public registrationFormSuccess$: Subject<boolean> = new Subject();

    getRegistrationFormSuccess(): Observable<boolean> {
        return this.registrationFormSuccess$.asObservable();
    }

    setRegistrationFromSuccess(value: boolean) {
        this.registrationFormSuccess$.next(value);
    }
}

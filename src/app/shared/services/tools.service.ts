import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {
  public getArray(object: any): any[] {
    const arr = [];
    if (object) {
      Object.keys(object).forEach((name: string) => {
        arr.push(object[name]);
      });
    }
    return arr;
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
// TODO: Should probably just learn lodash
// and use it for these object manipulation tasks
export class ObjService {
  static filteredNoNulls(object: any, keepKeys: string[]): any {
    return ObjService.removeNulls(ObjService.filtered(object, keepKeys));
  }

  static filtered(originalObject: any, keepKeys: string[]): any {
    return Object.keys(originalObject)
      .filter((key) => keepKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = originalObject[key];
        return obj;
      }, {});
  }

  static hasMissingValues(object: any): boolean {
    const missingValues: any = [];
    const keys = Object.keys(object);
    keys.forEach((key) => object[key] == null && missingValues.push(key));
    return missingValues.length > 0;
  }

  // https://stackoverflow.com/a/38340730/2422826
  static removeNulls(obj: any, recurse = true): any {
    for (const i in obj) {
      if (obj[i] === null) {
        delete obj[i];
      } else if (recurse && typeof obj[i] === "object") {
        ObjService.removeNulls(obj[i], recurse);
      }
    }
    return obj;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
// TODO: Should probably just learn lodash
// and use it for these object manipulation tasks
export class ObjService {
  static filteredNoNulls(object: Object, keepKeys: String[]): Object {
    return ObjService.removeNulls(ObjService.filtered(object, keepKeys));
  }

  static filtered(originalObject: Object, keepKeys: String[]): Object {
    return Object.keys(originalObject)
      .filter(key => keepKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = originalObject[key];
        return obj;
      }, {});
  }

  static hasMissingValues(object: Object): Boolean {
    const missingValues: any = [];
    const keys = Object.keys(object);
    keys.forEach(key => object[key] == null && missingValues.push(key));
    return missingValues.length > 0;
  }

  // https://stackoverflow.com/a/38340730/2422826
  static removeNulls(obj: Object, recurse: boolean = true): Object {
    for (var i in obj) {
      if (obj[i] === null) {
        delete obj[i];
      } else if (recurse && typeof obj[i] === 'object') {
        ObjService.removeNulls(obj[i], recurse);
      }
    }
    return obj;
  }
}

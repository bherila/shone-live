import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjService {
  filteredNoNulls(object: Object, keepKeys: String[]): Object {
    return this.removeNulls(this.filtered(object, keepKeys));
  }

  filtered(originalObject: Object, keepKeys: String[]): Object {
    return Object.keys(originalObject)
      .filter(key => keepKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = originalObject[key];
        return obj;
      }, {});
  }

  hasMissingValues(object: Object): Boolean {
    const missingValues: any = [];
    const keys = Object.keys(object);
    keys.forEach(key => object[key] == null && missingValues.push(key));
    return missingValues.length > 0;
  }

  // https://stackoverflow.com/a/38340730/2422826
  removeNulls(object: Object): Object {
    return Object.keys(object)
      .filter(k => object[k] != null) // Remove undef. and null.
      .reduce(
        (newObj, k) =>
          typeof object[k] === 'object'
            ? { ...newObj, [k]: this.removeNulls(object[k]) } // Recurse.
            : { ...newObj, [k]: object[k] }, // Copy value.
        {},
      );
  }
}

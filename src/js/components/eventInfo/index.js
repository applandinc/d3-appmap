<<<<<<< HEAD:src/model/eventInfo.js
import { getLabel } from '../util';
=======
import { getLabel } from '../../util';
>>>>>>> Reorganize project file structure:src/js/components/eventInfo/index.js

function mapFunctionLocations(memo, obj) {
  if (obj.type === 'function') {
    memo[obj.location] = obj;
  }

  if (obj.children) {
    obj.children.reduce(mapFunctionLocations, memo);
  }

  return memo;
}

export default class EventInfo {
  constructor(classMap) {
    this.functionObjects = classMap.reduce(mapFunctionLocations, {});
  }

  getName(event) {
    const label = getLabel(event);
    if (label) {
      return label;
    }

    const codeObj = this.getCodeObject(event);
    if (codeObj) {
      return codeObj.display_name;
    }

    // Fallback algorithm
    const separator = event.static ? '.' : '#';
    return [event.defined_class, separator, event.method_id].join('');
  }

  getLabels(event) {
    const labels = [];

    if (event.labels) {
      labels.push(...event.labels);
    }

    const codeObj = this.getCodeObject(event);
    if (codeObj && codeObj.labels.length) {
      labels.push(...codeObj.labels);
    }

    return labels;
  }

  getCodeObject(event) {
    return this.functionObjects[`${event.path}:${event.lineno}`];
  }
}

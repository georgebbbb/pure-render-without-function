
/**
 * @author ChuanbaoYang <jarvanycb@gmail.com>
 * @license MIT
 */
'use strict';
const is from "immutable"

function shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
}


function pureRenderDecorator(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}



function shallowEqualImmutable(objA, objB) {


  if (objA === objB || is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
        console.log(8889994);
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
        console.log(8889994);
    return false;

  }

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if(!bHasOwnProperty(keysA[i]) ){
      return false
    }else {
      if(typeof objB[keysA[i]] === 'function'&& typeof objA[keysA[i]] === 'function'){
      }else {
        if(objA[keysA[i]] !==objB[keysA[i]]&&!is(objA[keysA[i]], objB[keysA[i]])){
          return false
        }
      }
    }
  }

  return true;
}




module.exports = pureRenderDecorator;

var is =require("immutable").is


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
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;

  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
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


module.exports = pureRenderDecorator

import toLower from 'lodash/toLower';
import Maybe from './maybe';

const evaluate = (data, compareVal, evalProp = 'name', def = false) => {
    return Maybe(def, data)
        .map(info => toLower(info[evalProp]))
        .flatMap(value => value === compareVal);
};

export default evaluate;

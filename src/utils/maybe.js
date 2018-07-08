/*
* Maybe has two concrete subtypes: Some (also Just) and None (also Nothing).
* Can be used to create chainable computations which might take care of null or undefined value
* eg:
* const person1 = {
*   name: 'adam',
*   id: 45,
*   }
*   const default = 'default value to return when null or undefined occurs in the chain'
*   const result = Maybe(default, person1)
*       .map(person => person.name)
*       .map(upperFirst)
*       .flatMap(name => `${name} Tester`);
*
* expect(result).toBe('Adam Tester');
*
* */

const Maybe = function Maybe (def, value) {
    const Nothing = function Nothing (val) {
        return {
            // eslint-disable-next-line no-unused-vars
            map: fn => Nothing(val),
            flatMap: () => val,
            isNothing: () => true,
            val: () => {
                throw new Error('Maybe:cannot call val');
            },
        };
    };

    // eslint-disable-next-line no-shadow
    const Just = function Just (def, value) {
        return {
            map: fn => Maybe(def, fn.call(this, value)),
            filter: fn => (fn(value) ? Maybe(def, value) : Nothing(def)),
            flatMap: fn => fn(value),
            isNothing: () => false,
            val: () => value,
        };
    };

    if (typeof value === 'undefined' || value === null) {
        return Nothing(def);
    }

    return Just(def, value);
};

export default Maybe;

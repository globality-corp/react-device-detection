import { evaluate, Singleton } from '../utils';

class Mock {
    name = 'Mock1';
}
class Mock2 {
    name = 'Mock2';
}

class Mock3 {
    name = 'Mock3';
}

describe('reactDeviceDetection utils', () => {

    describe('evaluate', () => {

        it('should evaluate data info and return boolean value based on requested info type', () => {
            const fakeBrowserData = {
                name: 'Firefox',
                version: 64,
            };
            const fakeDeviceData = {
                type: 'mobile',
            };

            expect(evaluate(fakeBrowserData, 'firefox')).toBe(true);
            expect(evaluate(fakeDeviceData, 'mobile', 'type')).toBe(true);
            expect(evaluate(null, 'mobile', 'type')).toBe(false);
            expect(evaluate(fakeDeviceData, 'desktop', 'type')).toBe(false);
            expect(evaluate(fakeBrowserData, 'chrome', 'type')).toBe(false);
        });
    });

    describe('Singleton', () => {

        it('should create an instance of the given UAParser class param and should return that instance', () => {
            expect(Singleton.instance(Mock)).toBeInstanceOf(Mock);
            expect(Singleton.instance(Mock)).toEqual(new Mock());
            expect(Singleton.instance(Mock)).not.toBe(new Mock());
        });

        it('should create the instance only once', () => {
            const instance1 = Singleton.instance(Mock3);
            const instance2 = Singleton.instance(Mock3);
            expect(instance1).toEqual(instance2);
            expect(Singleton.instance(Mock2)).not.toEqual(new Mock2());
            expect(Singleton.instance(Mock2)).not.toBe(new Mock2());
        });
    });

});

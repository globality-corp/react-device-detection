export default class Singleton {
    static singleton = null;

    static instance (ClassRef) {
        if (this.singleton === null) {
            try {
                this.singleton = new ClassRef();
            } catch (e) {
                console.log(e); // eslint-disable-line no-console
            }
        }
        return this.singleton;
    }
}

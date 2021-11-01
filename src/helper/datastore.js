class DataStore {
    /*
     * NOTE
     * This class is an abstract class
     * @abstract
     */

    constructor(path) {
        this.path = path;
        this.data_base = {}; // can be overriden
    }
    add(email, order) {
        throw new Error("Method add(email, order) needs to be implemented");
    }
    get(email) {
        throw new Error("Method get(email) needs to be implemented");
    }
    getAll() {
        /*
         * Get all elements of the data store
         */
        throw new Error("Method getAll() needs to be implemented");
    }
    remove(email) {
        throw new Error("Method remove(email) needs to be implemented");
    }
}

const _DataStore = DataStore;
export { _DataStore as DataStore };

const base_data_store = require("./datastore.js");

class LocalDataStore extends base_data_store.DataStore {
    constructor(path) {
        super(path);
    }
    add(email, order) {
        this.data_base[email] = order;
    }
    get(email) {
        return this.data_base[email];
    }
    getAll() {
        return this.data_base;
    }
    remove(email) {
        delete this.data_base[email];
    }
}
module.exports.LocalDataStore = LocalDataStore;

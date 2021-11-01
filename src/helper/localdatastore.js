const base_data_store = require("./datastore.js");

class LocalDataStore extends base_data_store.DataStore {
  constructor(path) {
    super(path);
    console.log(path);
    this.data_base = {
      "jareddyreson@csu.fullerton.edu": "password",
      "williammccarthy@csu.fullerton.edu": "i_love_vim"
    };
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
  contains(email) {
    return email in this.data_base;
  }
}

const _LocalDataStore = LocalDataStore;
export { _LocalDataStore as LocalDataStore };

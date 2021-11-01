import {
  doc,
  setDoc,
  query,
  getDocs,
  where,
  getFirestore,
  collection,
  DocumentSnapshot,
  writeBatch
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { DataStore } from "./datastore.js";

class FirebaseStore extends DataStore {
  constructor(path) {
    super(path);
    // if (admin.apps.length === 0) {
    //   // Stupid freaking react issues
    //   // https://github.com/firebase/firebase-tools/issues/1532#issuecomment-812562512
    //   admin.initializeApp(config);
    // }
    const fireBaseApp = initializeApp({
      // this is probably bad practice in like 99% of use cases but
      // I don't care :)

      apiKey: "AIzaSyA7RlUev9QF-28_vVFdjPpJQVpDVeM1ANU",

      authDomain: "coffeerunbackend.firebaseapp.com",

      projectId: "coffeerunbackend",

      storageBucket: "coffeerunbackend.appspot.com",

      messagingSenderId: "808358809443",

      appId: "1:808358809443:web:65ee44e006515414a00d56",

      measurementId: "G-TFHDTLZNTL"
    });

    this.data_base = getFirestore();
  }
  async add(value, _collection) {
    await setDoc(doc(this.data_base, _collection, this.makeDocHash(20)), {
      value
    });
  }
  async getAll(_collection) {
    /*
     * Get all documents from a collection
     */

    const querySnapshot = await getDocs(
      collection(this.data_base, _collection)
    );
    var documents = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    return await documents;
  }

  async _get(key, _collection, attr) {
    const current_query = await query(
      collection(this.data_base, _collection),
      where(attr, "==", key)
    );
    //var container = [];
    //const docRef =

    return await getDocs(current_query);
    //docRef.forEach((doc) => {
    // console.log(doc.data());
    //container.push(doc.data());
    //});
    //return container;
  }

  async get(key, _collection, attr) {
    var container = [];

    (await this._get(key, _collection, attr)).forEach((doc) => {
      container.push(doc.data());
    });
    return await container;
  }
  async remove(key, _collection, attr) {
    const batch = writeBatch(this.data_base);
    (await this._get(key, _collection, attr)).forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    // const batch = this.db.batch();
    // const snapshot = await docRef.where("emailAddress", "==", key).get();
  }

  makeDocHash(len) {
    // Create a document hash for Firebase
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

const _FirebaseStore = FirebaseStore;
export { _FirebaseStore as FirebaseStore };

import firebase from "firebase/app";
import "firebase/remote-config";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCRAX8LunfO4aQgRXyWiqwzaZPGQbe7pmQ",
  authDomain: "remote-config-demo-3eb4c.firebaseapp.com",
  databaseURL: "https://remote-config-demo-3eb4c.firebaseio.com",
  projectId: "remote-config-demo-3eb4c",
  storageBucket: "remote-config-demo-3eb4c.appspot.com",
  messagingSenderId: "232509884210",
  appId: "1:232509884210:web:450c48e117af09a89d792b"
}

export class RemoteConfig {

  // should be private, yet javascript does not have private visibility yet.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  _remoteConfig = null;
  static _instance = null;

  static default = {
    "title": "My Remote Config Proof of Concept Default",
    "showButton": false,
    "loop": 3,
  };

  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    if (this._remoteConfig === null) {
      this._remoteConfig = firebase.remoteConfig();
      this._remoteConfig.settings = {
        minimumFetchIntervalMillis: 60000, // one minute
        fetchTimeoutMillis: 30000, // 30 seconds
      };
      this._remoteConfig.defaultConfig = RemoteConfig.deffault;
    }
  }

  static get instance() {
    if (RemoteConfig._instance) {
      return RemoteConfig._instance;
    }
    const r = new RemoteConfig();
    RemoteConfig._instance = r;
    return RemoteConfig._instance;
  }

  get values() {
    return new Promise(async (resolve, reject) => {
      try {
        const firebaseRemoteConfig = RemoteConfig.instance._remoteConfig;
        await firebaseRemoteConfig.fetchAndActivate();
        const _values = firebaseRemoteConfig.getAll();
        if (_values) {
          resolve({
            "title": _values["title"].asString(),
            "showButton": _values["showButton"].asBoolean(),
            "loop": _values["loop"].asNumber(),
          })
          return;
        }
        resolve(RemoteConfig.deffault);
      } catch (e) {
        resolve(RemoteConfig.deffault);
      }
    });
  }

}
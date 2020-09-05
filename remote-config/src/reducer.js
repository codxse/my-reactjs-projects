import { combineReducers } from "redux";

const INJECT_REMOTE_CONFIG = "INJECT_REMOTE_CONFIG";

export const injectRemoteConfig = (remoteConfig) => {
  return {
    type: INJECT_REMOTE_CONFIG,
    payload: remoteConfig,
  }
};

const remoteConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case INJECT_REMOTE_CONFIG: return { 
      ...state, remoteConfig: action.payload
    };
    default: return state;
  }
}

export const rootReducer = combineReducers({ remoteConfigReducer });
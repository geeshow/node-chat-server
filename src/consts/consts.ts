const USER_STATUS = {
  CONNECTED: 'CONNECTED',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

const USER_STATUS_IN_CHANNEL = {
  IN: 'IN',
  OUT: 'OUT',
  INVITED: 'INVITED',
  INVITING: 'INVITING',
  REFUSED: 'REFUSED',
  REFUSE: 'REFUSE',
  READY: 'READY',
  BLOCKING: 'BLOCKING',
  REPORTED: 'REPORTED',
  UNAVAILABLE: 'UNAVAILABLE',
  CLOSE: 'CLOSE',
  CLOSED: 'CLOSED',
  CANCEL: 'CANCEL',
  CANCELED: 'CANCELED',
}

const CHANNEL_DATA = {
  IN: 'IN',
  OUT: 'OUT',
  READY: 'READY',
  INVITED: 'INVITED',
  CLOSED: 'CLOSED',
}

const ERRORS = {
  COMMON_ERROR: {
    code: 'E000'
  },
  EXIST_USER_ID: {
    code: 'E001'
  }
}

const GROUPS = {
  ERRORS: 'ERRORS',
  USER: 'USER',
  USER_FCM: 'USER_FCM',
  USER_LIST: 'USER_LIST',
  BLOCK_USER_LIST: 'BLOCK_USER_LIST',
  REPORT_USER_LIST: 'REPORT_USER_LIST',
  CHANNEL_DATA: 'CHANNEL_DATA',
  CHANNEL_MESSAGE: 'CHANNEL_MESSAGE',
  CHANNEL_MESSAGE_RESTORED: 'CHANNEL_MESSAGE_RESTORED',
}

const MESSAGE_TYPES = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  CHANNEL_LIST: 'CHANNEL_LIST',
  CHANNEL_REQ: 'CHANNEL_REQ',
  CHANNEL_ACCEPT: 'CHANNEL_ACCEPT',
  CHANNEL_REFUSE: 'CHANNEL_REFUSE',
  CHANNEL_IN: 'CHANNEL_IN',
  CHANNEL_OUT: 'CHANNEL_OUT',
  CHANNEL_MESSAGE: 'CHANNEL_MESSAGE',
  USER_BLOCK: 'USER_BLOCK',
  USER_REPORT: 'USER_REPORT',
  CHANNEL_CLOSE: 'CHANNEL_CLOSE',
  CHANNEL_CANCEL: 'CHANNEL_CANCEL',
  PING: 'PING',
}
const MESSAGE_RECEIVE_TYPE = {
  OK_CHANNEL_LIST: 'OK_CHANNEL_LIST',
  OK_CHANNEL_REQ: 'OK_CHANNEL_REQ',
  RECEIVE_CHANNEL_REQ: 'RECEIVE_CHANNEL_REQ',
  OK_CHANNEL_ACCEPT: 'OK_CHANNEL_ACCEPT',
  RECEIVE_CHANNEL_ACCEPT: 'RECEIVE_CHANNEL_ACCEPT',
  OK_CHANNEL_REFUSE: 'OK_CHANNEL_REFUSE',
  RECEIVE_CHANNEL_REFUSE: 'RECEIVE_CHANNEL_REFUSE',
  OK_CHANNEL_IN: 'OK_CHANNEL_IN',
  OK_CHANNEL_OUT: 'OK_CHANNEL_OUT',
  OK_CHANNEL_MESSAGE: 'OK_CHANNEL_MESSAGE',
  RECEIVE_CHANNEL_MESSAGE: 'RECEIVE_CHANNEL_MESSAGE',
  OK_USER_BLOCK: 'OK_USER_BLOCK',
  RECEIVE_USER_UNAVAILABLE: 'RECEIVE_USER_UNAVAILABLE',
  OK_USER_REPORT: 'OK_USER_REPORT',
  OK_CHANNEL_CLOSE: 'OK_CHANNEL_CLOSE',
  RECEIVE_CHANNEL_CLOSE: 'RECEIVE_CHANNEL_CLOSE',
  OK_CHANNEL_CANCEL: 'OK_CHANNEL_CANCEL',
  RECEIVE_CHANNEL_CANCEL: 'RECEIVE_CHANNEL_CANCEL',
  PONG: 'PONG',
  DISCONNECTED: 'DISCONNECTED',
}

export {
  USER_STATUS,
  USER_STATUS_IN_CHANNEL,
  CHANNEL_DATA,
  ERRORS,
  GROUPS,
  MESSAGE_TYPES,
  MESSAGE_RECEIVE_TYPE,
}

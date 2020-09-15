export enum AuthErrorCode {
  INVALID_PASSWORD = 'auth/invalid-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  WEAK_PASSWORD = 'auth/weak-password',
  WRONG_PASSWORD = 'auth/wrong-password',
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_VERIFICATION_CODE = 'auth/invalid-verification-code',
  EMAIL_ALREADY_EXISTS = 'auth/email-already-in-use',
  NETWORK_ERROR = 'auth/network-request-failed',
  POPUP_CLOSED = 'auth/popup-closed-by-user'
}

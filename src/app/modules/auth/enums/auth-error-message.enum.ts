export enum AuthErrorMessage {
  INVALID_PASSWORD = 'You have entered incorrect password',
  USER_NOT_FOUND = 'No user exists with this email',
  WEAK_PASSWORD = 'Password should contain at least 6 characters',
  WRONG_PASSWORD = 'You have entered incorrect password',
  INVALID_EMAIL = 'You have entered invalid email',
  INVALID_VERIFICATION_CODE = 'It seems, the link has been tampered',
  EMAIL_NOT_VERIFIED = 'You need to verify your email',
  EMAIL_ALREADY_EXISTS = 'User already exists with this email',
  NETWORK_ERROR = 'Seems like your internet connection is down',
  POPUP_CLOSED = 'You have terminated the request'
}

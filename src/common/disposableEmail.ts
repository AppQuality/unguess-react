import MailChecker from 'mailchecker';

export function isDisposableEmail(email: string): any {
  return !MailChecker.isValid(email);
}

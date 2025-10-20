import { isFakeEmail } from 'fakefilter';

export function isDisposableEmail(email: string): any {
  return isFakeEmail(email);
}

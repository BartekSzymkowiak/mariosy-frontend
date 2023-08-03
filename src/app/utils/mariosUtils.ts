import { Marios } from 'src/app/interfaces/marios';

export function compareByCreationTimestampDesc(a: Marios, b: Marios) {
  if (a.creationTimestamp > b.creationTimestamp) {
    return -1;
  }
  if (a.creationTimestamp < b.creationTimestamp) {
    return 1;
  }
  return 0;
}


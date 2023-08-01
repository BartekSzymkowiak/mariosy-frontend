import { Marios } from 'src/app/interfaces/marios';

export function compareByCreationInstantDesc(a: Marios, b: Marios) {
  if (a.creationInstant > b.creationInstant) {
    return -1;
  }
  if (a.creationInstant < b.creationInstant) {
    return 1;
  }
  return 0;
}

export interface Marios {
    externalId: string,
    creatorExternalId: string,
    receiversExternalIds: string[],
    title: string,
    comment: string,
    type: string,
    creatorFirstName: String,
    creatorLastName: String
    creationInstant: Date
}

export function compareByCreationInstantDesc( a: Marios, b: Marios ) {
    if ( a.creationInstant > b.creationInstant ){
      return -1;
    }
    if ( a.creationInstant < b.creationInstant ){
      return 1;
    }
    return 0;
  }
  
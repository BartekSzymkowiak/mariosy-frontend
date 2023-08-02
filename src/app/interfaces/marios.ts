export interface Marios {
  externalId: string;
  creatorExternalId: string;
  receiversExternalIds: string[];
  title: string;
  comment: string;
  type: string;
  creatorFirstName: String;
  creatorLastName: String;
  creationInstant: Date;
}

export interface MariosPayload {
  creatorExternalId: string;
  receiversExternalIds: string[];
  title: string;
  comment: string;
  type: number;
}

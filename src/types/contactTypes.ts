export type Contact = {
  contact_name: string;
  id: string;
  canReply?: boolean
}

export type ContactId = Contact["id"];

export type ContactName = Contact["contact_name"];
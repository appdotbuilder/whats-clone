import { z } from 'zod';

// Contact schema
export const contactSchema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  status: z.string().nullable(), // Nullable field for optional status
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Contact = z.infer<typeof contactSchema>;

// Input schema for creating contacts
export const createContactInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  status: z.string().nullable().optional() // Can be null or omitted
});

export type CreateContactInput = z.infer<typeof createContactInputSchema>;

// Input schema for updating contacts
export const updateContactInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").optional(),
  phoneNumber: z.string().min(1, "Phone number is required").optional(),
  status: z.string().nullable().optional() // Can be null, undefined, or a string
});

export type UpdateContactInput = z.infer<typeof updateContactInputSchema>;

// Message schema
export const messageSchema = z.object({
  id: z.number(),
  senderContactId: z.number(),
  receiverContactId: z.number(),
  content: z.string(),
  timestamp: z.coerce.date(),
  created_at: z.coerce.date()
});

export type Message = z.infer<typeof messageSchema>;

// Input schema for creating messages
export const createMessageInputSchema = z.object({
  senderContactId: z.number(),
  receiverContactId: z.number(),
  content: z.string().min(1, "Message content is required"),
  timestamp: z.coerce.date().optional() // Optional, will default to current time if not provided
});

export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;

// Input schema for getting messages between contacts
export const getMessagesInputSchema = z.object({
  contactId1: z.number(),
  contactId2: z.number()
});

export type GetMessagesInput = z.infer<typeof getMessagesInputSchema>;

// Input schema for getting contact by ID
export const getContactByIdInputSchema = z.object({
  id: z.number()
});

export type GetContactByIdInput = z.infer<typeof getContactByIdInputSchema>;

// Input schema for deleting contact
export const deleteContactInputSchema = z.object({
  id: z.number()
});

export type DeleteContactInput = z.infer<typeof deleteContactInputSchema>;
import { serial, text, pgTable, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const contactsTable = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  status: text('status'), // Nullable by default, matches Zod schema
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const messagesTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderContactId: integer('sender_contact_id').notNull(),
  receiverContactId: integer('receiver_contact_id').notNull(),
  content: text('content').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Define relations
export const contactsRelations = relations(contactsTable, ({ many }) => ({
  sentMessages: many(messagesTable, {
    relationName: 'senderMessages',
  }),
  receivedMessages: many(messagesTable, {
    relationName: 'receiverMessages',
  }),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  sender: one(contactsTable, {
    fields: [messagesTable.senderContactId],
    references: [contactsTable.id],
    relationName: 'senderMessages',
  }),
  receiver: one(contactsTable, {
    fields: [messagesTable.receiverContactId],
    references: [contactsTable.id],
    relationName: 'receiverMessages',
  }),
}));

// TypeScript types for the table schemas
export type Contact = typeof contactsTable.$inferSelect; // For SELECT operations
export type NewContact = typeof contactsTable.$inferInsert; // For INSERT operations
export type Message = typeof messagesTable.$inferSelect; // For SELECT operations
export type NewMessage = typeof messagesTable.$inferInsert; // For INSERT operations

// Important: Export all tables and relations for proper query building
export const tables = { 
  contacts: contactsTable, 
  messages: messagesTable 
};

export const tableRelations = {
  contactsRelations,
  messagesRelations
};
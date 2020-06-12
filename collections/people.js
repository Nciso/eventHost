import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const People = new Mongo.Collection('people');

People.schema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String },
  title: { type: String },
  companyName: { type: String },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  isCheckedIn: { type: Boolean, defaultValue: false },
});

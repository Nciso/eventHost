import { Meteor } from 'meteor/meteor';
import { loadInitialData } from './initial-data';
import { People } from '../collections/people';
import updatePerson from './methods/updatePerson';
import getAggregatedEvents from './methods/getAggregatedEvents';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  if (Meteor.isServer) {
    People.allow({
      update() {
        return true;
      },
    });
  }

  Meteor.publish('people', () => People.find({}));

  Meteor.methods({
    updatePerson,
    getAggregatedEvents,
  });
});

/**
 * This file is the glue between meteor and react for the event selector
 * and event details component
 * To gather all the information we use a Meteor method that is called
 * every time the People collection is updated. The returned info is
 * stored in a Meteor session in order to support reactivity.
 *
 * I used a Meteor method because I wanted to have all the info from the DB
 * with one trip, and make the mongodb engine to handle all the queries and
 * aggregations
 */

import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { People } from '../../collections/people';
import Dashboard from './Dashboard';

function setDataInSession(err, data) {
  if (err) {
    // todo:  Handle error
  } else {
    // we set the aggregated events from mongo into the session for reactiveness
    Session.set('aggregatedEvents', data);
  }
}

export default withTracker(() => {
  // suscribe to people collection, it is the only two-way connection that we need
  Meteor.subscribe('people');
  const query = People.find();

  query.observeChanges({
    /*
     * Observe any change to the people collection,
      so we can request the aggregated data to meteor by using `getAggregatedEvents` method
      so the ui will be reactive
     */
    changed() {
      /**
       * getAggregatedEvents is the method that pulls the info in the needed format
       * by doing this, all the heavy lifting of gatthering the data is made by mongodb
       */
      Meteor.call('getAggregatedEvents', setDataInSession);
    },
  });

  // It sets the initial information at Page load
  Meteor.call('getAggregatedEvents', setDataInSession);

  return {
    /**
     * Events info is pulled from session, if is not defined an empy array is given as a fallback
     */
    events: Session.get('aggregatedEvents') || [],
  };
})(Dashboard);

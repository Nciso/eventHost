import { withTracker } from 'meteor/react-meteor-data';
import { People } from '../../../collections/people';
import AttendeeList from './AttendeeList';

const AttendeeListContainer = withTracker(({ eventId = '' }) => {
  // We need to suscribe because we need instant feedback
  Meteor.subscribe('people');

  const query = People.find({ communityId: eventId });
  /**
   * This method calls a Meteor method to update a Person, the only value that is going
   * to update is the variable checkedIn, the related dates (check-in date and check-out date)
   * are computed in the server
   * @name changeValueChecked
   * @param {string} userId a valid id for a record in the collection People
   */
  const changeValueChecked = userId => {
    // Updates are only allowed in the server
    Meteor.call('updatePerson', userId, err => {
      /* eslint-disable no-console */

      if (err) {
        console.log(err);
      }
    });
  };

  return {
    attendeeList: query.fetch(),
    onChecked: changeValueChecked,
  };
})(AttendeeList);

export default AttendeeListContainer;

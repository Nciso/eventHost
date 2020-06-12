import { People } from '../../collections/people';

/**
 * This function checks if a user has checked in or checked out,
 * if  it has already  checked in, it sets a checkout date to the user
 * If it has not checked in, it sets a checked in date to the user
 * @name updatePerson
 * @param {string} id a mongo id for a people instance
 */
async function updatePerson(id) {
  const [user] = People.find({ _id: id }).fetch();
  /**
   * We haven't made any changes to the current user,
   * so checkin here is going to be checkout
   */
  const setDates = !user.isCheckedIn
    ? { checkInDate: new Date() }
    : { checkOutDate: new Date() };

  await People.update(
    { _id: id },
    { $set: { isCheckedIn: !user.isCheckedIn, ...setDates } }
  );
}

export default updatePerson;

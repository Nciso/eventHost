import { People } from '../../collections/people';
import { Communities } from '../../collections/communities';

/**
 * This function searches for people checked in into an event that have
 * a company, then group the company and make the sum of the set.
 * @param {String} eventId a valid id of an event
 */

async function getGroupedCompanies(eventId) {
  try {
    const result = await People.rawCollection()
      .aggregate([
        {
          $match: {
            $and: [
              { communityId: eventId },
              { companyName: { $ne: null } },
              { isCheckedIn: true },
            ],
          },
        },
        { $group: { _id: '$companyName', count: { $sum: 1 } } },
      ])
      .toArray();
    return result;
  } catch (e) {
    // Todo: change to a better logger like winston
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
}

/**
 * This function counts all people that have already checked in.
 * @param {String} eventId a valid id of an event
 */
async function getCheckedInPeople(eventId) {
  try {
    const result = await People.rawCollection()
      .aggregate([
        {
          $match: {
            $and: [{ communityId: eventId }, { isCheckedIn: true }],
          },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
      ])
      .toArray();
    return result;
  } catch (e) {
    // Todo: change to a better logger like winston
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
}

/**
 * Make the count of the total people registed for an event
 *  @param {String} eventId a valid id of an event
 */
async function getTotalPeopleInEvent(eventId) {
  try {
    const result = await People.rawCollection()
      .aggregate([
        {
          $match: {
            communityId: eventId,
          },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
      ])
      .toArray();
    return result;
  } catch (e) {
    // Todo: change to a better logger like winston
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
}

/**
 *
 * This function aggregates all the info required for the frontend to
 * render the details part and the selector
 */

async function agrregateEvent({ _id: eventId, name }) {
  const peopleByCompany = await getGroupedCompanies(eventId);
  const totalCheckedInCursor = await getCheckedInPeople(eventId);
  const totalPeopleCursor = await getTotalPeopleInEvent(eventId);

  // Makes array destructuring with fallback in case of empty or falsy values
  const [totalCheckedIn] = totalCheckedInCursor || [];
  const { count: totalCheckedInCount } = totalCheckedIn || { count: 0 };
  const [totalPeople] = totalPeopleCursor || [];
  const { count: totalPeopleCount } = totalPeople || { count: 0 };

  const renamedProperties = peopleByCompany.map(({ _id, count }) => ({
    name: _id,
    count,
  }));
  return {
    _id: eventId,
    name,
    companyArray: renamedProperties,
    totalPeople: totalPeopleCount,
    totalCheckedIn: totalCheckedInCount,
  };
}
/**
 * This is the only function exported
 * Queries all the events
 * And return it as an array of objects defined by the function aggregateEvent
 */
const getAggregatedEvents = async () =>
  Promise.all(Communities.find({}).map(agrregateEvent));

export default getAggregatedEvents;

let usersQueryResult = [
  {
    firstName: 'Ted',
    lastName: 'Gonzalez',
    title: 'Engineer',
    companyName: 'Propeller Heads',
  },
];

export const Mongo = {
  Collection: jest.fn().mockImplementation(() => ({
    _ensureIndex: jest.fn(),
    find: jest.fn().mockImplementation(() => ({
      fetch: jest.fn().mockReturnValue(usersQueryResult),
      count: jest.fn(),
    })),
    update: jest.fn(),
  })),
};

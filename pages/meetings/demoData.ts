import { faker } from "@faker-js/faker";
import { Meeting } from ".";

let cachedMeetings = [] as Meeting[];

function makeRandomPerson(num: number) {
  const people = [];
  for (let i = 0; i < num; i++) {
    const person = faker.person;
    people.push(
      `${person.fullName()}, ${person.jobTitle()} at ${faker.company.name()}`
    );
  }
  return people;
}

function makeRandomMeetings() {
  const meetings = [];
  for (let i = 0; i < 25; i++) {
    const meeting = {
      id: i,
      title: faker.lorem.sentence(),
      participants: makeRandomPerson(faker.number.int({ min: 1, max: 3 })),
      meetingOn: faker.date.past(),
    };
    meetings.push(meeting);
  }
  return meetings;
}

if (cachedMeetings.length === 0) {
  cachedMeetings = makeRandomMeetings();
}

export const meetings = cachedMeetings;

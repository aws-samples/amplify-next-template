// Make a json with 25 tasks with random data; each record has the following fields: id, title, project, dueDate, and a done flag
import { faker } from "@faker-js/faker";
import { Tasks } from ".";

let cachedTasks = [] as Tasks[];

function makeRandomTasks() {
  const tasks = [];
  for (let i = 0; i < 25; i++) {
    const task = {
      id: i,
      title: faker.lorem.sentence(),
      project: faker.lorem.word(),
      due: faker.date.future(),
      done: faker.datatype.boolean(),
    };
    tasks.push(task);
  }
  return tasks;
}

if (cachedTasks.length === 0) {
  cachedTasks = makeRandomTasks();
}

export const tasks = cachedTasks;

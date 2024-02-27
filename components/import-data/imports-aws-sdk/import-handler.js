const AWS = require("aws-sdk");
const { getTable, userPools } = require("./tables");
const uuid = require("./uuid");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Count all records of a DynamoDB table.
 *
 * @param {"dev" | "prod"} env The environment in which the operation should be proceeded ('dev' or 'prod')
 * @param {String} tableName The name of the DynamoDB table where you would like to count the records
 * @returns number of records in DynamoDB table
 */
const _countRecords = async (env, tableName) => {
  const TableName = getTable(tableName, env);

  const existingRecords = await docClient
    .scan({
      TableName,
    })
    .promise();
  const count = existingRecords.Count;
  console.log("Count", tableName, TableName, count);
  return count;
};

/**
 * Creates records in a many to many relationship table.
 *
 * @param {"dev" | "prod"} env The environment in which the operation should be proceeded ('dev' or 'prod')
 * @param {String} manyToManyTableName The name of the DynamoDB table where you would like to create the many to many relationship
 * @param {String} sourceJsonFileName The name of the JSON file that holds the original data with the link information
 * @param {Array} sourceArray The source array containing the original data.
 * @param {Array} targetArray The target array where we want to link to.
 * @param {String} arrayLinkFieldName The name of the field in the JSON file that links to the source array's notionId.
 * @param {String} sourceFieldName The name of the new field to be created that links to the target array's id.
 * @param {String} targetFieldName The name of the new field to be created that links to the source array's id.
 * @param {Function} mapArrayToDdb A function to map the fields from the import data to the schema of the DynamoDB table
 * @returns the imported data
 */
const createManyToManyTable = async (
  env,
  manyToManyTableName,
  sourceJsonFileName,
  sourceArray,
  targetArray,
  arrayLinkFieldName,
  sourceFieldName,
  targetFieldName,
  mapArrayToDdb
) => {
  const count = await _countRecords(env, manyToManyTableName);
  if (count > 0) {
    console.log("Count", manyToManyTableName, count);
    console.log("Imported already", manyToManyTableName);
    return null;
  }

  const fs = require("fs");
  const importDataArray = JSON.parse(
    fs.readFileSync(`../${sourceJsonFileName}`, "utf8")
  );

  const jsonData = importDataArray
    .filter(
      (item) => item[arrayLinkFieldName] && item[arrayLinkFieldName].length > 0
    )
    .reduce((prev, curr) => {
      curr[arrayLinkFieldName].map((id) => {
        const sourceItem = sourceArray.find(({ notionId }) => notionId === id);
        if (!sourceItem) return;
        const targetItem = targetArray.find(
          ({ notionId }) => notionId === curr.notionId
        );
        if (!targetItem) return;
        prev.push({
          [sourceFieldName]: sourceItem.id,
          [targetFieldName]: targetItem.id,
        });
      });
      return prev;
    }, []);

  const result = await _importHandlerArr(
    env,
    manyToManyTableName,
    jsonData,
    mapArrayToDdb
  );
  return result;
};

/**
 * From an object that maps notionIds to an Array of notionIds search in the array for a specific ID and return the key of that property.
 *
 * @param {[key: string]: number[]} objectMap Object mapping notionIds to an array of notionIds
 * @param {number} id
 * @returns {number | null} the notionId which maps to id
 */
const searchValInArrayAndReturnObjKey = (objectMap, id) => {
  for (const [key, val] of Object.entries(objectMap)) {
    if (val.includes(id)) {
      return parseInt(key, 10);
    }
  }
  return null;
};

/**
 * Updates records in a DynamoDB table to link to another DynamoDB table.
 *
 * @param {"dev" | "prod"} env The environment in which the operation should be proceeded ('dev' or 'prod')
 * @param {String} tableName The name of the DynamoDB table where you would like to update the records to link to another table
 * @param {String} sourceJsonFileName The name of the JSON file that holds the original data with the link information
 * @param {Array} sourceArray The source array containing the original data.
 * @param {Array} targetArray The target array where we want to link to.
 * @param {String} linkFieldName The name of the field in the source array that links to the target array's notionId.
 * @param {String} newFieldName The name of the new field to be created that links to the target array's id.
 * @param {(mappedObject: Array, itemNotionId: number) => number} mapTargetNotionId A mapping function to retrieve the notionId for the targetArray
 * @returns the updated data
 */
const createRelation = async (
  env,
  tableName,
  sourceJsonFileName,
  sourceArray,
  targetArray,
  linkFieldName,
  newFieldName,
  mapTargetNotionId
) => {
  const TableName = getTable(tableName, env);
  const findItemsParams = {
    TableName,
    FilterExpression: "attribute_exists(#targetField)",
    ExpressionAttributeNames: {
      "#targetField": newFieldName,
    },
  };

  try {
    const result = await docClient.scan(findItemsParams).promise();
    if (result.Items && result.Items.length > 0) {
      console.log("Table already up to date", tableName);
      return;
    }
  } catch (error) {
    console.error("Error scanning table", TableName, error);
    return;
  }

  const fs = require("fs");
  const importDataArray = JSON.parse(
    fs.readFileSync(`../${sourceJsonFileName}`, "utf8")
  );

  const linkDataMap = targetArray.reduce(
    (prev, curr) => ({ ...prev, [curr.notionId]: curr.id }),
    {}
  );
  const importDataMap = importDataArray.reduce(
    (prev, curr) =>
      !curr[linkFieldName]
        ? prev
        : { ...prev, [curr.notionId]: curr[linkFieldName] },
    {}
  );

  for (const item of sourceArray) {
    const linkFieldId = mapTargetNotionId(importDataMap, item.notionId);
    const targetId = linkDataMap[linkFieldId];

    if (targetId && linkFieldId) {
      const params = {
        TableName,
        Key: { id: item.id },
        UpdateExpression: `set ${newFieldName} = :targetId`,
        ExpressionAttributeValues: {
          ":targetId": targetId,
        },
      };

      try {
        await docClient.update(params).promise();
        console.log(
          `Item ${item.id} (notionId: ${item.notionId}) updated with '${newFieldName}': ${targetId} (notionId: ${linkFieldId})`
        );
      } catch (error) {
        console.error(`Error updating item ${item.id}`, error);
      }
    }
  }
};

/**
 * Iterates through all DayPlans, finds the one's with more than one context and then splits them by context.
 *
 * @param {"dev" | "prod"} env The environment in which the operation should be proceeded ('dev' or 'prod')
 */
const createAndRemapDayPlans = async (env) => {
  const dayPlans = await returnTableRecords(getTable("DayPlan", env));
  const projectTasks = await returnTableRecords(
    getTable("DayProjectTask", env)
  );
  const projects = await returnTableRecords(getTable("Projects", env));
  const nonProjectTasks = await returnTableRecords(
    getTable("NonProjectTask", env)
  );
  for (let i = 0; i < dayPlans.length; i++) {
    const dayplan = dayPlans[i];
    const npt = nonProjectTasks.filter(
      ({ dayPlanTasksId }) => dayPlanTasksId === dayplan.id
    );
    const pt = projectTasks.filter(
      ({ dayPlanProjectTasksId }) => dayPlanProjectTasksId === dayplan.id
    );
    const contexts = [
      ...npt.map((task) => task.context),
      ...pt.map(
        (task) =>
          projects.find((project) => task.projectsDayTasksId === project.id)
            ?.context
      ),
    ].reduce(
      (prev, context) =>
        !context || prev.includes(context) ? prev : [...prev, context],
      []
    );

    if (contexts && contexts.length > 0) {
      // Update existing DayPlan with the first context
      const updateDayPlanParams = {
        TableName: getTable("DayPlan", env),
        Key: { id: dayplan.id },
        UpdateExpression: `set context = :context`,
        ExpressionAttributeValues: { ":context": contexts[0] },
      };
      try {
        await docClient.update(updateDayPlanParams).promise();
      } catch (error) {
        console.error(`Error updating item ${dayplan.id}`, error);
      }

      // Iterate through DayPlans with more than one context
      for (let i = 1; i < contexts.length; i++) {
        const context = contexts[i];

        // Collect all tasks with this context
        const contextProjectTasks = pt.filter(
          (task) =>
            projects.filter(
              (project) =>
                task.projectsDayTasksId === project.id &&
                project.context === context
            ).length > 0
        );
        const contextNonProjectTasks = npt.filter(
          (task) => task.context === context
        );

        // Create a new DayPlan for this context
        const newDayPlanId = uuid();
        const createDayPlanParams = {
          TableName: getTable("DayPlan", env),
          Item: {
            id: newDayPlanId,
            day: dayplan.day,
            dayGoal: dayplan.dayGoal,
            done: dayplan.done,
            owner: dayplan.owner,
            createdAt: dayplan.createdAt,
            updatedAt: new Date().toISOString(),
            context,
          },
        };
        try {
          await docClient.put(createDayPlanParams).promise();

          // iterate through DayProjectTask and update link to DayPlan
          for (let i = 0; i < contextProjectTasks.length; i++) {
            const cpt = contextProjectTasks[i];
            const updatePtParams = {
              TableName: getTable("DayProjectTask", env),
              Key: { id: cpt.id },
              UpdateExpression: `set dayPlanProjectTasksId = :newId`,
              ExpressionAttributeValues: { ":newId": newDayPlanId },
            };
            try {
              await docClient.update(updatePtParams).promise();
            } catch (error) {
              console.error(
                `Error updating DayProjectTask with id ${cpt.id} to new DayPlan with id ${newDayPlanId}`,
                error
              );
            }
          }

          // iterate through NonProjectTask and update link to DayPlan
          for (let i = 0; i < contextNonProjectTasks.length; i++) {
            const cnpt = contextNonProjectTasks[i];
            const updateNptParams = {
              TableName: getTable("NonProjectTask", env),
              Key: { id: npt.id },
              UpdateExpression: `set dayPlanTasksId = :newId`,
              ExpressionAttributeValues: { ":newId": newDayPlanId },
            };
            try {
              await docClient.update(updateNptParams).promise();
            } catch (error) {
              console.error(
                `Error updating NonProjectTask with id ${cnpt.id} to new DayPlan with id ${newDayPlanId}`
              );
            }
          }
        } catch (error) {
          console.error(
            `Error creating Dayplan for day ${dayplan.day} with context ${context}`,
            error
          );
        }
      }
    }
  }
};

const _importHandlerArr = async (env, tableName, jsonData, mapArrayToDdb) => {
  const TableName = getTable(tableName, env);
  const owner = userPools[env].ownerId;
  const existingRecords = await docClient
    .scan({
      TableName,
    })
    .promise();
  const count = existingRecords.Count;
  console.log("Count", tableName, count);
  if (count > 0) {
    console.log("Imported already", tableName);
    return returnTableRecords(TableName);
  }

  for (let i = 0; i < jsonData.length; i += 25) {
    const chunk = jsonData.slice(i, i + 25);
    const putRequests = chunk.map(({ ...item }) => ({
      PutRequest: {
        Item: {
          ...mapArrayToDdb(item),
          id: uuid(),
          owner,
          __typename: tableName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    }));
    const params = {
      RequestItems: {
        [TableName]: putRequests,
      },
    };
    try {
      const importResult = await docClient.batchWrite(params).promise();
      console.log("Batch write successful");
      if (importResult.UnprocessedItems.length > 0) {
        console.log("UnprocessedItems", importResult.UnprocessedItems);
      }
    } catch (error) {
      console.error("Error importing data", error);
    }
  }

  const result = await returnTableRecords(TableName);
  console.log(
    tableName,
    result.map(({ id, notionId }) => ({
      id,
      notionId,
    }))
  );
  return result;
};

const returnTableRecords = async (TableName) => {
  const result = await docClient.scan({ TableName }).promise();
  return result.Items;
};

/**
 * Imports data from a JSON file into the desired DynamoDB table in dev or prod environment.
 *
 * @param {"dev" | "prod"} env The environment in which the operation should be proceeded ('dev' or 'prod')
 * @param {String} tableName The name of the DynamoDB table to which the data should be imported
 * @param {String} jsonFileName The name of the JSON file that holds the data to be imported
 * @param {Function} mapArrayToDdb A function to map the fields from the import data to the schema of the DynamoDB table
 * @returns the imported data
 */
const importHandler = (env, tableName, jsonFileName, mapArrayToDdb) => {
  const fs = require("fs");
  const jsonData = JSON.parse(fs.readFileSync(`../${jsonFileName}`, "utf8"));

  return _importHandlerArr(env, tableName, jsonData, mapArrayToDdb);
};

module.exports = {
  importHandler,
  createManyToManyTable,
  createRelation,
  searchValInArrayAndReturnObjKey,
  createAndRemapDayPlans,
};

function compareJSON(obj1, obj2, path = "") {
  const result = {
    deleted: [],
    updated: [],
    added: [],
  };

  for (const key in obj1) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in obj2)) {
      result.deleted.push(currentPath);
    } else if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      const subResult = compareJSON(obj1[key], obj2[key], currentPath);
      result.deleted.push(...subResult.deleted);
      result.updated.push(...subResult.updated);
      result.added.push(...subResult.added);
    } else if (obj1[key] !== obj2[key]) {
      result.updated.push(`${currentPath}: "${obj1[key]}" to "${obj2[key]}"`);
    }
  }

  for (const key in obj2) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in obj1)) {
      result.added.push(`${currentPath}: "${obj2[key]}"`);
    }
  }

  return result;
}

// Example usage
const config = require("../amplifyconfiguration.json");
const configNew = require("../amplifyconfiguration_new.json");

const differences = compareJSON(config, configNew);

console.log("# Deleted:");
differences.deleted.forEach((d) => console.log(`- ${d}`));
console.log("# Updated:");
differences.updated.forEach((u) => console.log(`- ${u}`));
console.log("# Added:");
differences.added.forEach((a) => console.log(`- ${a}`));

const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");

const commitMsgFilePath = process.argv[2];
const docsDir = path.join(__dirname, "..", "docs", "releases");
const templateFilePath = path.join(docsDir, "template.md");
const releaseNotesFilePath = path.join(docsDir, "next.md");
const repoUrl = "https://github.com/cabcookie/personal-crm/commit";

const typeMappings = {
  feat: "Feature",
  fix: "Bug Fixes",
  docs: "Documentation",
  style: "Styling",
  refactor: "Refactoring",
  test: "Tests",
  chore: "Miscellaneous",
};

const getCurrentCommitHash = () => {
  try {
    const hash = execSync("git rev-parse HEAD").toString().trim();
    return hash;
  } catch (error) {
    console.error("Error obtaining current commit hash:", error);
    return "";
  }
};

const formatCommitMessage = (commitMsg) => {
  const regex = /^(feat|fix|docs|style|refactor|test|chore)\(?(.*?)\)?\: (.*)$/;
  const match = commitMsg.trim().match(regex);
  if (!match) return null; // If the commit message doesn't match, return null

  const type = typeMappings[match[1]] || match[1];
  const scope = match[2];
  const message = match[3];
  const hash = getCurrentCommitHash();
  const commitLink = hash
    ? `[${hash.substring(0, 7)}](${repoUrl}/${hash})`
    : "";
  return { type, scope, message, commitLink };
};

const appendToSection = ({ type, scope, message, commitLink }) => {
  fs.readFile(releaseNotesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading next.md:", err);
      process.exit(1);
    }

    let newData = data;
    const sectionHeader = `### ${type}\n\n`;
    const scopeHeader = scope ? `#### ${scope}\n\n` : "";
    const listItem = `- ${message} ${commitLink}\n`;

    if (!data.includes(sectionHeader)) {
      newData += `\n${sectionHeader}`;
    }

    if (scope && !data.includes(scopeHeader)) {
      const insertIndex = newData.indexOf(sectionHeader) + sectionHeader.length;
      newData =
        newData.slice(0, insertIndex) +
        scopeHeader +
        newData.slice(insertIndex);
    }

    const insertPoint = scope
      ? newData.indexOf(scopeHeader) + scopeHeader.length
      : newData.indexOf(sectionHeader) + sectionHeader.length;
    newData =
      newData.slice(0, insertPoint) + listItem + newData.slice(insertPoint);

    fs.writeFile(releaseNotesFilePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Error updating next.md:", err);
        process.exit(1);
      }
      console.info("next.md updated with commit message");
      stageReleaseNotes();
    });
  });
};

const stageReleaseNotes = () => {
  exec(`git add ${releaseNotesFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error staging next.md:", error);
      process.exit(1);
    }
    console.info("next.md staged for commit.");
  });
};

fs.access(releaseNotesFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.copyFile(templateFilePath, releaseNotesFilePath, (err) => {
      if (err) {
        console.error("Error creating next.md from template", err);
        process.exit(1);
      }
      console.info("Created next.md from template.md.");
    });
  }
  fs.readFile(commitMsgFilePath, "utf8", (err, commitMsg) => {
    if (err) {
      console.error("Error reading commit message file", err);
      process.exit(1);
    }
    const formattedCommitMsg = formatCommitMessage(commitMsg);
    if (formattedCommitMsg) appendToSection(formattedCommitMsg);
  });
});

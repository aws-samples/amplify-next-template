const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");

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

const getLatestCommitInfo = () => {
  try {
    const hash = execSync("git rev-parse HEAD").toString().trim();
    const message = execSync("git log -1 --pretty=%B").toString().trim();
    return { hash, message };
  } catch (error) {
    console.error("Error obtaining current commit hash:", error);
    return { hash: "", message: "" };
  }
};

const formatCommitMessage = () => {
  const { hash, message: commitMsg } = getLatestCommitInfo();
  const regex = /^(feat|fix|docs|style|refactor|test|chore)\(?(.*?)\)?\: (.*)$/;
  const match = commitMsg.trim().match(regex);
  if (!match) return null; // If the commit message doesn't match, return null

  const type = typeMappings[match[1]] || match[1];
  const scope = match[2];
  const message = match[3];
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

    const sectionHeader = `### ${type}\n`;
    const scopeHeader = scope ? `#### ${scope}\n` : "";
    const listItem = `- ${message} ${commitLink}\n`;

    let newData = data;
    if (!newData.includes(sectionHeader)) {
      // Add new type section at the end
      newData += `\n${sectionHeader}`;
    }
    if (scope && !newData.includes(scopeHeader)) {
      // Add new scope under type at the end
      if (!newData.includes(sectionHeader)) {
        newData += scopeHeader;
      } else {
        const pattern = new RegExp(`${sectionHeader}(?:.|\\n)*?(?=###|$)`, "g");
        newData = newData.replace(pattern, (match) => `${match}${scopeHeader}`);
      }
    }

    // Append listItem at the end of the section or scope
    const insertPattern = scope
      ? new RegExp(`#### ${scope}\\n(?:.|\\n)*?(?=####|$)`, "g")
      : new RegExp(`### ${type}\\n(?:.|\\n)*?(?=###|$)`, "g");
    newData = newData.replace(insertPattern, (match) => `${match}${listItem}`);

    fs.writeFile(releaseNotesFilePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Error updating next.md:", err);
        process.exit(1);
      }
      console.log("next.md updated with commit message.");
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

  const formattedCommitMsg = formatCommitMessage();
  if (formattedCommitMsg) appendToSection(formattedCommitMsg);
});

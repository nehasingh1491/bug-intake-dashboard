import { pathToFileURL } from "url";
import db, { databasePath } from "./database.js";

export const seedBugs = [
  {
    title: "Login button does not respond on Safari",
    description:
      "QA can enter valid credentials, but clicking the primary login button has no visible effect in Safari 17.",
    status: "open",
    priority: "high",
    assignedTo: "Maya Chen",
    area: "auth",
    stepsToReproduce:
      "Open Safari, visit the login page, enter a known test account, and click Log in.",
  },
  {
    title: "Notifications drawer shows duplicate entries",
    description:
      "The notification drawer repeats the same deployment alert after the page is refreshed.",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Jon Bell",
    area: "notifications",
    stepsToReproduce:
      "Trigger a deployment alert, refresh the dashboard, and open the notifications drawer.",
  },
  {
    title: "Search results do not update after changing filters",
    description:
      "Changing the area filter leaves the old result set visible until the page is manually refreshed.",
    status: "blocked",
    priority: "high",
    assignedTo: "Priya Shah",
    area: "search",
    stepsToReproduce:
      "Search for a customer name, change the area filter, and compare the result list with a refreshed page.",
  },
  {
    title: "Password reset email is not sent",
    description:
      "The password reset form reports success, but no email arrives in the test inbox.",
    status: "open",
    priority: "high",
    assignedTo: "Andre Lewis",
    area: "auth",
    stepsToReproduce:
      "Submit the forgot-password form with qa.reset@example.com and inspect the test inbox.",
  },
  {
    title: "Profile image upload fails for large files",
    description:
      "Uploading a JPEG larger than 5 MB fails without a clear error message.",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Nora Patel",
    area: "frontend",
    stepsToReproduce:
      "Open profile settings, choose a 6 MB JPEG, and click Save profile.",
  },
  {
    title: "Status badge color is inconsistent on detail page",
    description:
      "Resolved bugs use a green badge in the list but a neutral badge on the detail page.",
    status: "resolved",
    priority: "low",
    assignedTo: "Theo Martin",
    area: "frontend",
    stepsToReproduce:
      "Open a resolved bug from the list and compare the status badge color with the table row.",
  },
  {
    title: "Error message disappears too quickly",
    description:
      "Validation errors in the bug intake form disappear before users can read the full message.",
    status: "open",
    priority: "medium",
    assignedTo: "Elena Gomez",
    area: "frontend",
    stepsToReproduce:
      "Submit the bug intake form with a missing title and wait two seconds.",
  },
  {
    title: "Dashboard count does not match filtered results",
    description:
      "The summary count still shows all open bugs when a priority filter is applied.",
    status: "blocked",
    priority: "medium",
    assignedTo: "Sam Okafor",
    area: "performance",
    stepsToReproduce:
      "Filter the bug list to high priority and compare the visible rows with the open count.",
  },
  {
    title: "Keyboard navigation skips the priority dropdown",
    description:
      "Tab order jumps from the title field to the area dropdown and skips priority.",
    status: "open",
    priority: "low",
    assignedTo: "Iris Wong",
    area: "frontend",
    stepsToReproduce:
      "Open the new bug form and use the Tab key to move through each field.",
  },
  {
    title: "API returns outdated assignee after status update",
    description:
      "The status update endpoint returns the previous assignee value when a reassignment happened shortly before the request.",
    status: "in_progress",
    priority: "high",
    assignedTo: "Marco Silva",
    area: "backend",
    stepsToReproduce:
      "Reassign a bug, immediately update its status, and inspect the response payload.",
  },
];

const insertBug = db.prepare(`
  INSERT INTO bugs (
    title,
    description,
    status,
    priority,
    assignedTo,
    area,
    stepsToReproduce,
    createdAt,
    updatedAt
  )
  VALUES (
    @title,
    @description,
    @status,
    @priority,
    @assignedTo,
    @area,
    @stepsToReproduce,
    @createdAt,
    @updatedAt
  )
`);

const runSeed = db.transaction((records, { reset = true } = {}) => {
  if (reset) {
    db.prepare("DELETE FROM bugs").run();
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'bugs'").run();
  }

  const baseTime = Date.parse("2026-04-20T09:00:00.000Z");

  records.forEach((bug, index) => {
    const timestamp = new Date(baseTime + index * 60 * 60 * 1000).toISOString();
    insertBug.run({
      ...bug,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  });
});

export const seedDatabase = ({ reset = true } = {}) => {
  runSeed(seedBugs, { reset });
  return seedBugs.length;
};

export const seedIfEmpty = () => {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM bugs").get();

  if (count > 0) {
    return 0;
  }

  return seedDatabase({ reset: false });
};

const isDirectRun = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isDirectRun) {
  const seededCount = seedDatabase({ reset: true });
  console.log(`Seeded ${seededCount} bugs in ${databasePath}`);
}

import db from "../db/database.js";

const bugFields = [
  "title",
  "description",
  "status",
  "priority",
  "assignedTo",
  "area",
  "stepsToReproduce",
];

const textFields = [
  "title",
  "description",
  "assignedTo",
  "area",
  "stepsToReproduce",
];

const bugSelect = `
  SELECT
    id,
    title,
    description,
    status,
    priority,
    assignedTo,
    area,
    stepsToReproduce,
    createdAt,
    updatedAt
  FROM bugs
`;

const normalizePayload = (data) => {
  const payload = {};

  bugFields.forEach((field) => {
    if (data[field] === undefined) {
      return;
    }

    payload[field] = textFields.includes(field) && typeof data[field] === "string"
      ? data[field].trim()
      : data[field];
  });

  return payload;
};

export const findAll = ({ status, priority } = {}) => {
  const where = [];
  const params = {};

  if (status) {
    where.push("status = @status");
    params.status = status;
  }

  if (priority) {
    where.push("priority = @priority");
    params.priority = priority;
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  return db
    .prepare(`
      ${bugSelect}
      ${whereClause}
      ORDER BY
        CASE priority
          WHEN 'high' THEN 1
          WHEN 'medium' THEN 2
          ELSE 3
        END,
        updatedAt DESC,
        id DESC
    `)
    .all(params);
};

export const findById = (id) => {
  return db.prepare(`${bugSelect} WHERE id = ?`).get(Number(id)) || null;
};

export const create = (data) => {
  const timestamp = new Date().toISOString();
  const payload = {
    status: "open",
    priority: "medium",
    area: "other",
    ...normalizePayload(data),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = db
    .prepare(`
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
    `)
    .run(payload);

  return findById(result.lastInsertRowid);
};

export const update = (id, data) => {
  const existing = findById(id);

  if (!existing) {
    return null;
  }

  const payload = {
    ...existing,
    ...normalizePayload(data),
    updatedAt: new Date().toISOString(),
  };

  db.prepare(`
    UPDATE bugs
    SET
      title = @title,
      description = @description,
      status = @status,
      priority = @priority,
      assignedTo = @assignedTo,
      area = @area,
      stepsToReproduce = @stepsToReproduce,
      updatedAt = @updatedAt
    WHERE id = @id
  `).run(payload);

  return findById(id);
};

export const updateStatus = (id, status) => {
  const existing = findById(id);

  if (!existing) {
    return null;
  }

  db.prepare(`
    UPDATE bugs
    SET status = @status, updatedAt = @updatedAt
    WHERE id = @id
  `).run({
    id: Number(id),
    status,
    updatedAt: new Date().toISOString(),
  });

  return findById(id);
};

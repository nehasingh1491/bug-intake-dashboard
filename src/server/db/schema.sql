CREATE TABLE IF NOT EXISTS bugs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'blocked', 'resolved')),
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),
  assignedTo TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT 'other'
    CHECK (area IN (
      'frontend',
      'backend',
      'auth',
      'notifications',
      'search',
      'performance',
      'other'
    )),
  stepsToReproduce TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bugs_status ON bugs(status);
CREATE INDEX IF NOT EXISTS idx_bugs_priority ON bugs(priority);
CREATE INDEX IF NOT EXISTS idx_bugs_updated_at ON bugs(updatedAt);

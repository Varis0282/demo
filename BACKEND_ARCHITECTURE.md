# Backend Architecture & Schema Design - Coaching Institute Platform

## 1. Overview
This document outlines the database schema and access control architecture for the Coaching Institute Platform. It is designed to support **Phase 1** (Public Website + Admin Dashboard) immediately while providing a robust foundation for **Phase 2** (Student LMS & Test Series).

### Tech Stack
- **Database:** MongoDB (via Mongoose ODM)
- **Backend:** Next.js (API Routes / Server Actions)
- **Authentication:** Custom JWT or NextAuth (using the User schema defined below)

---

## 2. Role-Based Access Control (RBAC) System

We define strict constants for roles to avoid "magic strings" in the codebase.

```typescript
// models/constants.ts
export enum ROLES {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}
```

### Access Matrix

| Feature | Public | Student | Admin |
| :--- | :---: | :---: | :---: |
| **View Courses/Teachers/Toppers** | ✅ | ✅ | ✅ |
| **Manage C/T/T (CRUD)** | ❌ | ❌ | ✅ |
| **Login/Auth** | ❌ (Phase 2) | ✅ (Phase 2) | ✅ |
| **View Test Series List** | ❌ | ✅ (Assigned only) | ✅ |
| **Download Test PDF** | ❌ | ✅ (Active only) | ✅ |
| **Upload Test PDF** | ❌ | ❌ | ✅ |
| **View Own Results** | ❌ | ✅ | ✅ |
| **View All Student Results** | ❌ | ❌ | ✅ |

---

## 3. Schema Design

All schemas will include automatic timestamps (`createdAt`, `updatedAt`).

### A. Authentication & Identity

#### 1. User Schema (Collection: `users`)
The lightweight core identity record. Used for login authentication.

```typescript
const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true, 
    select: false // Never return password by default
  },
  role: { 
    type: String, 
    enum: Object.values(ROLES), 
    default: ROLES.STUDENT 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });
```

#### 2. StudentProfile Schema (Collection: `student_profiles`)
Separating profile data from credentials allows fetching the user object quickly for auth checks without loading heavy profile data.

```typescript
const StudentProfileSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  name: { type: String, required: true },
  phone: { type: String },
  parentPhone: { type: String },
  
  // Array of Course ObjectIDs the student has access to
  enrolledCourses: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Course' 
  }],
  
  batch: { type: String }, // e.g., "JEE-Mains-2025-A"
  joinDate: { type: Date, default: Date.now }
}, { timestamps: true });
```

---

### B. Public Content (Phase 1 Core)

#### 3. Course Schema (Collection: `courses`)
Represents what the institute sells (e.g., "Class 12 Math", "JEE Advanced Crash Course").

```typescript
const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // SEO friendly URL
  description: { type: String },
  targetExam: { type: String }, // e.g., "NEET", "JEE", "Board"
  duration: { type: String }, // e.g., "6 Months"
  feaureHighlights: [String], // Key points for the specific course page
  thumbnailUrl: { type: String }, 
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

#### 4. Teacher Schema (Collection: `teachers`)

```typescript
const TeacherSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String }, // e.g., "M.Sc Mathematics"
  experience: { type: String }, // e.g., "10+ Years"
  photoUrl: { type: String },
  order: { type: Number, default: 0 }, // For sorting display order
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

#### 5. Topper/Result Schema (Collection: `toppers`)

```typescript
const TopperSchema = new Schema({
  name: { type: String, required: true },
  exam: { type: String, required: true }, // "NEET 2024"
  score: { type: String }, // "720/720" or "99.9%ile"
  rank: { type: String }, // "AIR 1"
  year: { type: Number, required: true },
  photoUrl: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course' } // Optional link
}, { timestamps: true });
```

---

### C. Learning Management System (Phase 2)

#### 6. Test Series Schema (Collection: `test_series`)
A container for multiple tests (e.g. "Full Syllabus Mock Tests 2025").

```typescript
const TestSeriesSchema = new Schema({
  title: { type: String, required: true },
  course: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  description: { type: String },
  totalTests: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

#### 7. Test Paper Schema (Collection: `test_papers`)
The actual test unit.

```typescript
const TestPaperSchema = new Schema({
  testSeries: { 
    type: Schema.Types.ObjectId, 
    ref: 'TestSeries', 
    required: true 
  },
  title: { type: String, required: true }, // "Mock Test 1"
  pdfUrl: { type: String, required: true }, // Secured URL
  answerKeyPdfUrl: { type: String }, // Optional, release later
  
  maxMarks: { type: Number },
  durationMinutes: { type: Number },
  
  // Visibility Control
  availableFrom: { type: Date, default: Date.now },
  availableTill: { type: Date }, // Optional expiry
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

#### 8. Student Test Attempt (Collection: `student_attempts`)
Tracks performance.

```typescript
const StudentAttemptSchema = new Schema({
  student: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  testPaper: { 
    type: Schema.Types.ObjectId, 
    ref: 'TestPaper', 
    required: true 
  },
  score: { type: Number },
  maxMarks: { type: Number }, // Snapshot in case paper changes
  attemptedAt: { type: Date, default: Date.now },
  
  // If uploading a physical answer sheet scan
  studentAnswerSheetUrl: { type: String },
  
  remarks: { type: String }
}, { timestamps: true });
```

---

## 4. API Security & Phase 2 Integration

### Protected Routes Design
We will use a higher-order function or middleware `server-only` utility to check roles.

**Example Logic:**
```typescript
// lib/auth.ts pseudocode
async function getSession() { ... }

export async function protect(allowedRoles: ROLES[]) {
  const session = await getSession();
  if (!session || !allowedRoles.includes(session.user.role)) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
```

### Preventing Data Leaks
1. **Course Access:** In Phase 2, when fetching `TestSeries`, the API must first check if `StudentProfile.enrolledCourses` contains the `courseId` linked to that `TestSeries`.
2. **Field Selection:** Always use `.select('-password')` on user queries.
3. **PDF Security:** The `pdfUrl` should ideally be a temporary signed URL (e.g., AWS S3 presigned URL) generated at runtime, rather than a permanent public link, to prevent students sharing links with non-students.

---

## 5. Implementation Roadmap

### Phase 1 (Immediate)
1. Setup MongoDB connection (`lib/db.ts`).
2. Create `User` (Admin only), `Teacher`, `Course`, `Topper` models.
3. Build Admin Dashboard to CRUD these entities.
4. Build Public pages to `find({ isActive: true })` these entities.

### Phase 2 (Future)
1. Create `StudentProfile` model.
2. Build Admin flow to "Add Student" -> creates `User` & `Profile`.
3. Create `TestSeries` & `TestPaper` models.
4. Implement "My Classroom" logic where students see tests only for their `enrolledCourses`.

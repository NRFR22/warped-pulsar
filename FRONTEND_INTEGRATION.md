# Frontend Integration Guide

## Overview

This document describes how to integrate the Personality Typing Pipeline API into a Next.js frontend. The API is a conversational Q&A system that determines a user's personality type through a series of questions.

---

## API Base URL

```
https://question-pipeline-production.up.railway.app
```

**API Documentation (Swagger UI):**
```
https://question-pipeline-production.up.railway.app/docs
```

---

## User Flow

```
1. User visits /typing-test page
2. User enters access code (pre-distributed via DM)
3. If valid → conversation begins with first question
4. User answers questions (text input)
5. After each answer → next question is returned
6. Max 20 questions OR pipeline reaches confidence
7. Show results with confidence levels
8. User selects their "known type" from dropdown (32 options)
9. Session complete → data logged for analysis
```

---

## API Endpoints

### 1. Start Session

**POST** `/api/session/start`

Validates access code and starts a new session.

**Request:**
```json
{
  "access_code": "E61282A4"
}
```

**Response (200):**
```json
{
  "session_id": "5a6b6da0-25c0-40dd-a26f-faf1a286f78a",
  "first_question": "What's the best way to learn something new?",
  "question_number": 1
}
```

**Error (400):**
```json
{
  "detail": "Invalid or already used access code"
}
```

---

### 2. Submit Answer

**POST** `/api/session/answer`

Submits user's answer and gets the next question.

**Request:**
```json
{
  "session_id": "5a6b6da0-25c0-40dd-a26f-faf1a286f78a",
  "answer": "I like to dive in and try things hands-on, experimenting until I figure it out"
}
```

**Response (200) - Conversation continues:**
```json
{
  "next_question": "What's something you've learned that way recently?",
  "question_number": 2,
  "is_complete": false,
  "signals_summary": {
    "total_signals": 7,
    "seni_count": 1,
    "nesi_count": 0,
    "tefi_count": 1,
    "feti_count": 0,
    "od_count": 0
  },
  "phase": 1
}
```

**Response (200) - Conversation complete:**
```json
{
  "next_question": null,
  "question_number": 15,
  "is_complete": true,
  "signals_summary": { ... },
  "phase": 2,
  "result": {
    "type": "Ne/Ti",
    "confidence": {
      "observer_axis": "HIGH",
      "decider_axis": "MODERATE",
      "oi_oe": "HIGH",
      "di_de": "MODERATE"
    }
  }
}
```

---

### 3. Complete Session (Submit Known Type)

**POST** `/api/session/complete`

Called after results are shown. User selects their known type for comparison.

**Request:**
```json
{
  "session_id": "5a6b6da0-25c0-40dd-a26f-faf1a286f78a",
  "user_known_type": "Ne/Ti"
}
```

**Response (200):**
```json
{
  "message": "Session completed",
  "pipeline_result": { ... },
  "user_known_type": "Ne/Ti",
  "match": true
}
```

---

### 4. Get Session Status (Optional - for reconnection)

**GET** `/api/session/{session_id}/status`

Retrieves current session state. Useful if user refreshes page.

**Response (200):**
```json
{
  "session_id": "5a6b6da0-25c0-40dd-a26f-faf1a286f78a",
  "status": "in_progress",
  "question_count": 5,
  "current_question": "Tell me about a time you had to make a difficult decision",
  "created_at": "2025-12-12T20:57:13Z"
}
```

---

## 32 Types Dropdown

For the "known type" selection at the end:

```javascript
const PERSONALITY_TYPES = [
  // Fi savior
  "Fi/Ni", "Fi/Se", "Fi/Si", "Fi/Ne",
  // Ti savior
  "Ti/Ni", "Ti/Se", "Ti/Si", "Ti/Ne",
  // Si savior
  "Si/Ti", "Si/Fe", "Si/Fi", "Si/Te",
  // Ni savior
  "Ni/Ti", "Ni/Fe", "Ni/Fi", "Ni/Te",
  // Se savior
  "Se/Fi", "Se/Te", "Se/Ti", "Se/Fe",
  // Ne savior
  "Ne/Fi", "Ne/Te", "Ne/Ti", "Ne/Fe",
  // Fe savior
  "Fe/Si", "Fe/Ne", "Fe/Ni", "Fe/Se",
  // Te savior
  "Te/Si", "Te/Ne", "Te/Ni", "Te/Se"
];
```

---

## Frontend Implementation Example (Next.js + React)

### Basic Component Structure

```tsx
// app/typing-test/page.tsx
"use client";

import { useState } from "react";

const API_BASE = "https://question-pipeline-production.up.railway.app";

type SessionState = "code_entry" | "conversation" | "results" | "complete";

export default function TypingTest() {
  const [state, setState] = useState<SessionState>("code_entry");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Start session with access code
  const handleCodeSubmit = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/session/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_code: code }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Invalid code");
      }

      const data = await res.json();
      setSessionId(data.session_id);
      setCurrentQuestion(data.first_question);
      setQuestionNumber(data.question_number);
      setState("conversation");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit answer and get next question
  const handleAnswerSubmit = async () => {
    if (!answer.trim() || !sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/session/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          answer: answer
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Error submitting answer");
      }

      const data = await res.json();
      setAnswer(""); // Clear input

      if (data.is_complete) {
        setResult(data.result);
        setState("results");
      } else {
        setCurrentQuestion(data.next_question);
        setQuestionNumber(data.question_number);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit known type after seeing results
  const handleKnownTypeSubmit = async (knownType: string) => {
    if (!sessionId) return;

    try {
      await fetch(`${API_BASE}/api/session/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          user_known_type: knownType
        }),
      });
      setState("complete");
    } catch (e) {
      console.error("Failed to save known type", e);
    }
  };

  // Render based on state...
  return (
    <div>
      {/* Implement UI for each state */}
    </div>
  );
}
```

---

## Key Implementation Notes

### 1. CORS
The API has CORS enabled for all origins, so frontend requests should work without issues.

### 2. Session Persistence
Store `session_id` in localStorage so users can continue if they refresh:
```javascript
// On session start
localStorage.setItem("typing_session_id", sessionId);

// On page load
const savedSession = localStorage.getItem("typing_session_id");
if (savedSession) {
  // Call /api/session/{session_id}/status to check if still valid
}
```

### 3. Loading States
The API calls to `/api/session/answer` can take 3-10 seconds (AI is generating questions). Show a loading indicator.

### 4. Error Handling
- Invalid code → Show "Invalid or expired code" message
- Session expired → Prompt to start over
- Network error → Retry button

### 5. Max Questions
The pipeline runs up to 20 questions max, but usually completes in 12-18.

---

## UI Recommendations

### Code Entry Screen
- Simple input field for 8-character code
- "Start Test" button
- Error message area

### Conversation Screen
- Show question prominently
- Text area for answer (allow multi-line)
- "Submit" button
- Progress indicator (Question X of ~20)
- Subtle loading state while waiting for next question

### Results Screen
- Show the determined type (e.g., "Ne/Ti")
- Show confidence levels for each axis
- Dropdown to select "What is your actual known type?"
- "Submit" button to complete

### Complete Screen
- Thank you message
- Option to start over (would need new code)

---

## Testing

**Test Access Codes (one-time use each):**
```
E61282A4
83B7F297
32130132
974AE572
5C4F9C63
9E9BF08C
0C5762DB
6134F3B1
FA462623
```

Use the Swagger UI to generate more codes if needed:
```
POST /api/admin/generate-codes?count=10&admin_key=your-secret-key
```

---

## Questions?

Refer to the full API documentation at:
```
https://question-pipeline-production.up.railway.app/docs
```

# VISION.md

## 1. Project Mission

`attend` is a fast, mobile-first web application designed to securely track student attendance at school games. Its purpose is to power a grade-level competition, increasing student engagement through a simple and trustworthy system.

## 2. The Core Experience

The user journey is designed for maximum speed and minimum friction. The entire process is two steps:

1.  **Arrival:** A student scans a QR code at the event entrance, which directs them to a specific URL for that game (e.g., `/game-vs-rivals`).
2.  **Authentication:** The page displays a single, prominent "Sign In with School" button. Tapping this button initiates the secure school login process.
3.  **Confirmation:** Upon successful login, the student is directed to a "Checked In" confirmation page. At this moment, their attendance is securely logged in the Supabase backend.

## 3. Key Components

-   **Student Check-in Flow:** A simple, two-screen process for students to authenticate their presence.
-   **Data Analytics Dashboard:** A private, password-protected route for organizers to view a real-time leaderboard of attendance counts, broken down by grade level.

## 4. Technical Vision

The application will be a modern, server-rendered web app built for reliability and speed. It will leverage a secure, industry-standard authentication flow (OAuth) to ensure data integrity, making the competition fair and the results verifiable. The system is built to be a simple, single-purpose tool that does one thing exceptionally well.
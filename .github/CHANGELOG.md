# CHANGELOG

## 0.1.9
- Added JMDM26 routes and controllers
- Added authMiddleware

## 0.1.8
- Improved authentication and authorization flow
- Bug fixes and performance improvements

## 0.1.7
- Added authentication and authorization

## 0.1.6
- Added Sentry error tracking
- Fixed non-graceful shutdown on SIGTERM and SIGINT
- Fixed deploy workflow

## 0.1.5
- Added middleware to prevent requests before DB is ready

## 0.1.4
- Correcting MongoDB connection race condition

## 0.1.3
- Corrected deploy workflow
- Added MongoDB connect and close functions

## 0.1.2
- Temporarily disabling pino file logging

## 0.1.1
- refactor: Temporarily removed jdt-apps-workouts routes and controllers

## 0.1.0
- Added routes and controllers for Workouts, Rideshare, and temp JMDM vanilla website.
- Added logging
- Added connection to MonboDB
- Removed better-sqlite3 dependency

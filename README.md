# Global Me AI: Production Plan & Interactive Checklist

This document outlines the complete plan for building a production-ready, monetizable AI image generation application. We will use this as an interactive checklist to track progress.

**Legend:** `[x]` = Done, `[/]` = In Progress / Partially Implemented, `[ ]` = Not Started

---

## Part 1: Comprehensive Firebase Production Plan

This plan details the technical architecture and requirements to build a secure, scalable, and feature-rich application.

### 1.1. Project Overview & Core Objective

- **[x] Project Name:** Global Me AI
- **[x] Objective:** To provide users with a fun, shareable, AI-powered experience of seeing themselves in different cultural and creative contexts. The service will be monetized through a credit-based system, allowing users to purchase generations and download high-resolution images.

### 1.2. Technology Stack

- **[x] Frontend:** React (using Vite)
- **[/] Backend & Database:** Google Firebase (Frontend services structure created)
- **[/] Authentication:** Firebase Authentication (Context and UI Modal created)
- **[ ] Database:** Firestore
- **[ ] Storage:** Firebase Storage
- **[ ] Serverless Logic:** Cloud Functions
- **[ ] Payments:** Polar
- **[x] AI Model:** Google Gemini Flash Image Model

### 1.3. Production-Ready Features & Architecture

#### A. Secure User Authentication
- **[/] Implement Firebase Authentication with Email/Password.** (UI and Context in place)
- **[/] Implement Firebase Authentication with Google Sign-In.** (UI and Context in place)
- **[ ] (Future)** Consider LinkedIn Login via custom Cloud Function.
- **[ ] Implement Firestore Security Rules:**
    - [ ] Users can only read/write their own data in the `users` collection.
    - [ ] Users can only create/read/delete `image` documents linked to their `userId`.

#### B. Firestore Database Schema
- **[ ] Create `users` collection:**
    - `uid` (Document ID)
    - `email` (String)
    - `createdAt` (Timestamp)
    - `credits` (Number)
- **[ ] Create `images` collection:**
    - `imageId` (Auto-generated Document ID)
    - `userId` (String)
    - `originalImageRef` (String) - Path in Firebase Storage
    - `generatedImageURL` (String) - Public URL from Firebase Storage
    - `targetStyle` (String)
    - `createdAt` (Timestamp)

#### C. Cloud Functions (Backend Logic)
- **[ ] Create `generateImage` HTTPS callable function**
- **[ ] Create `polarWebhook` HTTPS endpoint**

#### D. Image Handling & Storage
- **[ ] Store all user-uploaded and AI-generated images in Firebase Storage.**
- **[/] Implement a download button in the gallery to get full-resolution images.** (UI added to card)

#### E. Privacy & Legal
- **[ ] Create a static page at `/privacy`.**
- **[ ] Create a static page at `/terms`.**

---

## Part 2: Branding

- **[x] Chosen Name:** Global Me AI
- **[ ] Domain Strategy:**
    - Primary: `globalme.ai`
    - Alternatives: `getglobalme.com`, `globalme.art`

---

## Part 3: UX Information Architecture & UI Design

### 3.1. Theme & Design Preferences
- **[x] Implement a Minimalist & Clean theme.**
- **[x] Support both Light and Dark modes.**
- **[x] Use `Manrope` font for all text.**
- **[x] Dark Mode Palette:**
    - Background: `#111827`
    - Text: `#E5E7EB`
    - Accent: Gradient `Indigo (#4F46E5)` to `Purple (#7C3AED)`
- **[x] Light Mode Palette:**
    - Background: `#F9FAFB`
    - Text: `#1F2937`
    - Accent: Gradient `Indigo (#4F46E5)` to `Purple (#7C3AED)`
- **[/] Implement subtle animations on hover/load.** (Some animations added)
- **[x] Use rounded corners on elements.**
- **[/] Use glassmorphism/frosted glass effects for modals and headers.** (Implemented in Modal)

### 3.2. Information Architecture (Site Map)
- **[/] `/` (Landing Page)** (Created)
- **[ ] `/gallery` (User's private gallery, requires login)**
- **[ ] `/pricing` (Credit packs page/modal)**
- **[ ] `/privacy` (Legal page)**
- **[ ] `/terms` (Legal page)**

### 3.3. UI Component Design
- **[/] Homepage Hero Section:** (Refactored into new Homepage)
  > "A hero section for a website called 'Global Me AI'. It needs to support both a light and dark theme using a minimalist design and Manrope font. A large, compelling headline 'See Yourself in a New World'. Subheading: 'Upload a selfie and our AI will create your portrait in different corners of the globe and beyond.' Include a prominent file upload component that looks like a button. The background should be a subtle, abstract gradient mesh in shades of blue and purple."
- **[x] Image Gallery Card:**
  > "A card component for an image gallery, designed for both light and dark themes. Manrope font. The card displays a portrait. On hover, a semi-transparent overlay appears with two icons: a download icon and a trash can icon. The card must have rounded corners and a subtle border that adapts to the theme."
- **[ ] Pricing Page/Modal:**
- **[x] Authentication Modal:**
  > "A modal popup for user authentication with a frosted glass (glassmorphism) effect. It must work on both light and dark backgrounds. Include a toggle for 'Login' and 'Sign Up' forms, fields for email/password, a primary action button with a gradient background, and a 'Sign in with Google' button."

---

## Part 4: Monetization & Credit System

### 4.1. Key Features
- **[ ] Free Tier:**
    - [ ] Allow generation of 2 free images on the landing page.
    - [ ] Images should be blurred or watermarked previews.
    - [ ] Require sign-up to unlock high-resolution, watermark-free images.
- **[/] Credit-Based System:** 1 Credit = 1 New AI Image Generation. (Auth context now tracks credits)
- **[/] Implement download functionality for generated images.** (UI implemented)

### 4.2. Credit Packs & Payment Flow
- **[ ] Credit Packs**
- **[ ] Payment Flow**

### 4.3. Upsell Strategy
- **[ ] (Future)** Implement limited-time bonus credits on larger packs.
- **[ ] (Future)** Implement an exit-intent offer on the pricing page.

# GitHub Copilot Instructions - Next.js Project

## Role

Act as a senior Next.js developer and mentor.
Help me build production-quality code while teaching me the reasoning behind important decisions.

The project should follow modern Next.js best practices and maintain clean, scalable architecture.

---

# General Rules

- Always choose the most updated and recommended technical solution.
- Follow official Next.js, React, TypeScript, and Tailwind CSS best practices.
- Prefer maintainable, scalable, and readable solutions over quick hacks.
- Avoid deprecated APIs, outdated patterns, and unnecessary dependencies.
- Consider performance, accessibility, SEO, and developer experience.
- Write code suitable for a professional portfolio project.

---

# Explanation Style

I am learning while building this project.

For every important decision:

1. Explain WHY the solution is chosen.
2. Explain the alternatives briefly.
3. Explain possible trade-offs.

Explain complex concepts as if you were teaching a beginner:

- Use simple language.
- Use analogies when useful.
- Break complex ideas into small steps.
- Do not assume advanced knowledge.

However, keep technical terminology and provide the correct professional vocabulary.

---

# Next.js Specific Guidelines

Follow modern Next.js App Router architecture.

Prefer:

- Server Components by default.
- Client Components only when required.
- Server Actions when appropriate.
- Static generation when possible.
- Proper metadata API for SEO.
- Optimized images using next/image.
- Optimized fonts using next/font.
- Route handlers instead of unnecessary external APIs.
- Proper loading and error states.

Avoid:

- Using "use client" unnecessarily.
- Fetching data on the client when server-side fetching is better.
- Over-engineering simple features.
- Old Pages Router patterns unless explicitly requested.

---

# TypeScript Guidelines

Always use TypeScript properly.

Prefer:

- Explicit interfaces/types for complex objects.
- Strong typing instead of any.
- Reusable types.
- Type-safe functions.

Avoid:

- any unless absolutely necessary.
- duplicated types.
- unnecessary type complexity.

---

# React Guidelines

Follow React best practices:

- Prefer functional components.
- Keep components small and focused.
- Extract reusable logic into custom hooks.
- Avoid unnecessary re-renders.
- Use meaningful component names.
- Keep business logic separated from UI logic.

---

# Styling Guidelines

Use Tailwind CSS following best practices.

Prefer:

- Reusable utility patterns.
- Consistent spacing.
- Responsive-first design.
- Accessible colors and contrast.
- Clean component styling.

Avoid:

- Huge unreadable className strings when extraction improves readability.
- Inline styles unless necessary.

---

# Project Architecture

Keep the project organized and scalable.

Prefer structures like:

- app/ → routes and layouts
- components/ → reusable UI components
- features/ → domain-specific functionality
- hooks/ → custom React hooks
- lib/ → utilities and configurations
- types/ → shared TypeScript types
- public/ → static assets

Before creating new files:
- Explain where the file should live.
- Explain why that location is appropriate.

---

# Code Quality

Before suggesting code:

Check:

- readability
- maintainability
- security
- accessibility
- performance
- scalability

Prefer:

- Clean Code principles.
- SOLID principles when relevant.
- DRY principles but avoid premature abstraction.

---

# Debugging Rules

When fixing errors:

Do not only provide the fix.

Explain:

1. What caused the problem.
2. Why the solution works.
3. How to avoid similar problems in the future.

---

# Portfolio Project Context

This is a professional developer portfolio.

Prioritize:

- excellent UX/UI
- accessibility
- performance
- responsive design
- SEO
- clean animations
- professional code organization

The final result should demonstrate senior frontend development practices.

---

# Communication Format

For every answer:

1. Start with a short explanation.
2. Provide the recommended solution.
3. Explain important code sections.
4. Mention possible improvements for future scalability.

Avoid unnecessary verbosity for simple questions.


# Project Context

Before making architectural decisions, read and consider:

PROJECT_CONTEXT.md

This file contains:
- project goals
- target audience
- technology choices
- quality expectations


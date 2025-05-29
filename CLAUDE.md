# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `npx docusaurus start`
- **Build for production**: `npm run build`
- **Type checking**: `npm run typecheck`
- **Serve built site**: `npm run serve`
- **Clear cache**: `npm run clear`

## Architecture Overview

This is a Docusaurus-based documentation website for Querator.io, a high-throughput almost exactly once queue service. 
The site structure includes:

- **Main documentation** in `/docs/` with auto-generated sidebar from filesystem structure
- **API Reference** at `/api/` route generated from `openapi.yaml` using Redocusaurus plugin
- **Blog** in `/blog/` for announcements and articles
- **Homepage** with custom React components in `/src/`

The site is configured for dark mode by default and includes:
- OpenAPI spec integration via Redocusaurus for API documentation
- Custom branding for Querator.io with links to GitHub, Discord, and Trello
- TypeScript configuration throughout

Key configuration files:
- `docusaurus.config.ts`: Main site configuration including OpenAPI integration
- `sidebars.ts`: Documentation sidebar structure (currently auto-generated)
- `openapi.yaml`: API specification that generates the `/api/` documentation

The site deploys to querator.io domain and has edit links pointing to the GitHub repository at kapetan-io/querator.html.
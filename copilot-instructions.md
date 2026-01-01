# Salesforce DX Project Instructions

## Architecture Overview

This is a Salesforce DX project using the standard `force-app/main/default/` structure. Lightning Web Components (LWCs) in `lwc/` communicate with Apex controllers in `classes/` for server-side data operations. Custom objects are defined in `objects/`. Data flows from LWC JavaScript to Apex via `@salesforce/apex` imports, using imperative calls for user-initiated actions or `@wire` for reactive data binding.

Example: `lwc/speakersearch/` component imports `SpeakerController.getSpeakers` and calls it imperatively on input change to query `Speaker__c` records. `lwc/speakersessions/` uses `@wire` to reactively fetch sessions for a selected speaker.

Component composition: `lwc/conferenceManager/` orchestrates `c-speakersearch` and `c-speakersessions`, handling speaker selection events.

## Key Patterns

- **Apex Controllers**: Use `@AuraEnabled(cacheable=true)` for methods called from LWCs. Queries use SOQL with LIKE for search, limited to prevent governor limits (e.g., `LIMIT 20` in `SpeakerController.cls`).
- **LWC Structure**: Components expose via `js-meta.xml` for `lightning__AppPage`. Handle user input with `onchange` events, update tracked properties for reactivity. Use `@wire` for automatic data fetching on property changes.
- **Error Handling**: Basic `console.error` in LWC for client-side errors; Apex uses `with sharing` for security.
- **API Versions**: Keep consistent across `sfdx-project.json` (65.0) and component `js-meta.xml` files (currently 59.0 in existing components).

## Development Workflows

- **Deploy/Retrieve**: Use `sfdx force:source:deploy` to push changes, `sfdx force:source:retrieve` to pull. Target scratch orgs created via `sfdx force:org:create`.
- **Testing**: Run LWC tests with `npm run test:unit` (Jest via `sfdx-lwc-jest`). Apex tests via `sfdx force:apex:test:run`. Placeholder tests in `__tests__/` need implementation.
- **Debugging**: Execute anonymous Apex from `scripts/apex/` files. Run SOQL from `scripts/soql/` files.
- **Formatting/Linting**: `npm run prettier` formats code. `npm run lint` checks JS. Pre-commit hooks auto-run via `lint-staged`.

## Conventions

- **Naming**: PascalCase for classes/components, camelCase for methods/properties. Custom objects end with `__c`.
- **Imports**: Use `@salesforce/apex/ClassName.methodName` for Apex calls.
- **File Structure**: LWCs bundle HTML, JS, meta.xml. Tests in `__tests__/` subfolder.
- **Dependencies**: Managed via `package.json`; custom objects `Speaker__c` and `Session__c` defined in `objects/`, but relationships (e.g., Session**c lookup to Speaker**c) may need creation.

Reference: `sfdx-project.json` for config, `package.json` for scripts, `lwc/speakersearch/` and `lwc/speakersessions/` for component examples.</content>
<parameter name="filePath">c:\Users\Nandini\OneDrive\Desktop\Salesforce Project\Salesforce Project\.github\copilot-instructions.md

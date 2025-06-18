# Changelog

## v1.7.0
- The company name field in the header now only appears when the Customer Form tab is selected.
- Confirmation output uses the company name value if set, otherwise defaults to "Thailand Tours".
- Improved mobile responsiveness: header layout adapts for small screens, stacking elements vertically.

## v1.0.0 - Initial Release
- Operator Form and Customer Form implemented as separate pages
- Responsive, minimal UI with Material-UI (MUI)
- Confirmation output with copy-to-clipboard

## v1.1.0
- Added persistent side menu for navigation
- Customer page: form for tour date, name, pick up, pickup time, "Send Now" checkbox, and FEE fields
- Confirmation email preview and auto-copy to clipboard
- "With Fee" button reveals FEE Adult/Child fields
- Output includes FEE values if present

## v1.2.0
- Style/layout improvements: 1- and 2-column layouts, field size tweaks, label changes
- Privacy: disabled browser autofill, word wrap for output
- Tour date defaults to tomorrow in Bangkok timezone
- README updated for branding, usage, and AI assistant credit

## v1.3.0
- All forms moved to index page, removed redirect and forms.js
- Side menu replaced with top tab navigation
- State lifted to index for persistent form data
- Name field syncs between forms
- CLEAR button resets all fields and shared name

## v1.4.0
- Added dark/light mode toggle (with icon) in top right
- All elements use theme palette for true dark/light mode
- Improved button UI: same size, contained, styled for both modes
- Hotel field in Operator Form auto-fills Pick Up in Customer Form (unless Send Later/No Transfer)
- PWA manifest updated for PWA Builder compliance (id, launch_handler, screenshots, categories)
- Dark/light mode toggle moved into header with form menu

## v1.5.0
- Bug fixes and polish: improved sync logic, fixed build errors, removed unused pages
- README and changelog updated

## v1.6.0
- Confirmation/preview output now always greets the customer by name ("Hello [Name]") after submission
- Improved copy/share button for confirmation output
- Phone input improvements (with country flag)

## v1.6.1
- Fix: Customer form confirmation output now always shows the Name after 'Hello'.

---

For a full commit history, see the [GitHub repo](https://github.com/majidorc/text-generator/commits/main). 
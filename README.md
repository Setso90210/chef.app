https://github.com/Setso90210/chef.app
## 📜 Changelog

### [2.0.0] - 2025-11-11
**Added**
- Introduced multiple screens using React Navigation:
  - **Home Screen**: Displays the complete menu and shows the *average price per course* (Entrée, Mains, Desserts).
  - **Chef Screen**: Allows the chef to *add and remove menu items* from the shared list.
  - **Guest Screen**: Enables guests to *filter menu items* by course.
- Added persistent array storage for menu items (data stays shared between screens).
- Background image and overlay styling for a polished visual experience.

**Changed**
- Moved menu item creation logic from the home screen to a dedicated Chef screen.
- Improved UI layout for readability and consistent design.
- Updated styling for buttons, input fields, and containers.

**Fixed**
- Corrected input validation for dish price (prevents invalid or negative values).
- Fixed layout overlapping issues when the keyboard appears on smaller screens.

---

### [1.2.0] - 2025-11-05
**Added**
- Added menu management (add/remove items) on the main screen.
- Basic input validation for name and price fields.
- Implemented FlatList for efficient menu item rendering.

**Changed**
- Updated fonts, colors, and background transparency for a cleaner look.

---

### [1.0.0] - 2025-10-25
**Initial Release**
- Created base React Native app using Expo.
- Implemented background image, safe area layout, and initial form for menu item input.
- Displayed menu list and item deletion functionality.

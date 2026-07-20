# Screen Component

Enterprise screen wrapper used throughout the application.

## Features

- SafeAreaView
- ScrollView support
- Optional non-scroll layout
- Theme-aware background
- KeyboardAvoidingView
- Fade-in animation
- Configurable padding
- Safe Area edge control
- Custom styles
- ScrollView prop forwarding

---

## Usage

### Default

```tsx
<Screen>...</Screen>
```

### Fixed screen

```tsx
<Screen
    scrollable={false}
>
```

### Login screen

```tsx
<Screen
    keyboard
>
```

### Map screen

```tsx
<Screen
    scrollable={false}
    padded={false}
>
```

### Custom background

```tsx
<Screen
    backgroundColor="#F5F7FA"
>
```

### Disable animation

```tsx
<Screen
    animated={false}
>
```

---

## Notes

All application screens should use this wrapper.

It provides a consistent layout, spacing, keyboard handling, and theming across the app.

# Copilot Instructions

## Package Manager

This project uses **pnpm** as the package manager. You must always use `pnpm` (not `npm` or `yarn`) when installing or managing packages in this repository.

## Animation Library

This project uses **tailwindcss-animated** for all animations. DO NOT create custom CSS animations unless absolutely necessary.

### tailwindcss-animated Usage

**Installation**: Already installed and configured via `@import 'tailwindcss-animated';` in `apps/web/src/app/globals.css`

**Key Features**:

- Ready-to-use animations: `animate-fade-up`, `animate-fade-down`, `animate-fade-left`, `animate-fade-right`, `animate-jump-in`, `animate-wiggle`, `animate-shake`, `animate-bounce-in`, `animate-zoom-in`, etc.
- Animation utilities: duration, delay, timing functions, fill modes, iteration count
- Responsive support: `lg:animate-fade-up`, `hover:animate-bounce`, etc.
- Arbitrary values: `animate-delay-[85ms]`, `animate-duration-[2s]`

**Common Patterns**:

```html
<!-- Basic fade animations -->
<div class="animate-fade-up">Fades up on load</div>
<div class="animate-fade-right">Fades from right</div>

<!-- With delays and durations -->
<div class="animate-fade-up animate-delay-200 animate-duration-500">Delayed fade</div>

<!-- Responsive animations -->
<div class="lg:animate-fade-up animate-delay-300">Desktop only animation</div>

<!-- Hover animations -->
<button class="hover:animate-wiggle animate-duration-200">Hover to wiggle</button>

<!-- Combined with fill modes -->
<div class="animate-jump-in animate-fill-forwards animate-once">Jump in once</div>
```

**Available Animation Classes**:

- **Fade**: `animate-fade-up`, `animate-fade-down`, `animate-fade-left`, `animate-fade-right`
- **Jump**: `animate-jump-in`, `animate-jump-out`
- **Zoom**: `animate-zoom-in`, `animate-zoom-out`
- **Bounce**: `animate-bounce-in`, `animate-bounce-out`
- **Interactive**: `animate-wiggle`, `animate-shake`, `animate-heartbeat`

**Animation Utilities**:

- **Duration**: `animate-duration-75` to `animate-duration-1000` (ms)
- **Delay**: `animate-delay-75` to `animate-delay-1000` (ms)
- **Timing**: `animate-ease-linear`, `animate-ease-in`, `animate-ease-out`, `animate-ease-in-out`
- **Fill Mode**: `animate-fill-forwards`, `animate-fill-backwards`, `animate-fill-both`
- **Iteration**: `animate-once`, `animate-twice`, `animate-infinite`
- **Direction**: `animate-normal`, `animate-reverse`, `animate-alternate`

**When to use each approach**:

1. **Use tailwindcss-animated**: For standard animations (fade, slide, bounce, etc.)
2. **Custom CSS**: Only for very specific animations not available in the library
3. **JavaScript libraries**: For complex scroll-triggered animations or advanced interactions

**ClassName Management**:

- If your class list becomes long or you need conditional classes, use the `cn` utility from `packages/utils/src/cn.ts`:
- For readability, try to keep animation classes separate from style/layout classes in your `className` usage. This can be done by grouping animation-related classes together and style/layout classes together within the `cn` call.

```tsx
import { cn } from '@internal/utils';

<div
  className={cn(
    // Animation classes
    'animate-fade-up animate-delay-200',
    // Style/layout classes
    'bg-gradient-to-b',
    condition && 'text-4xl',
    anotherCondition ? 'text-white' : 'text-gray-400',
  )}
>
  ...
</div>;
```

- This keeps your code readable and maintainable.

**Documentation**: https://tailwindcss-animated.com/
**GitHub**: https://github.com/new-data-services/tailwindcss-animated

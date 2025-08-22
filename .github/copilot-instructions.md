# Copilot Instructions

## NativeWind className TypeScript Errors

If a user reports TypeScript errors related to `className` props in React Native components (using NativeWind), or if you discover such errors, follow these steps:

1. Check if the package is extending the NativeWind TypeScript configuration:
   - Look in the package's `tsconfig.json`
   - It should extend `@internal/tsconfig/nativewind.json`
   - Example: `"extends": ["@internal/tsconfig/internal-package.json", "@internal/tsconfig/nativewind.json"]`

2. If not, update the package's `tsconfig.json` to extend the NativeWind configuration:
   ```json
   {
     "extends": [
       "@internal/tsconfig/internal-package.json",
       "@internal/tsconfig/nativewind.json"
     ]
     // rest of config...
   }
   ```
3. Restart the TypeScript server if changes don't take effect immediately.

Note: The monorepo has a centralized NativeWind TypeScript configuration in `tooling/typescript/nativewind.json` that should be extended by any package using NativeWind.

## Package Manager

This project uses **pnpm** as the package manager. You must always use `pnpm` (not `npm` or `yarn`) when installing or managing packages in this repository.

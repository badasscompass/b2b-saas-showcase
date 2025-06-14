
# Development Guidelines

## Code Organization

### File Structure
- `/components` - Reusable UI components
- `/pages` - Route-level components
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/services` - API and external service integrations
- `/types` - TypeScript type definitions
- `/config` - Configuration files

### Naming Conventions
- Components: PascalCase (e.g., `MyComponent.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMyHook.ts`)
- Utilities: camelCase (e.g., `myUtility.ts`)
- Types: PascalCase (e.g., `MyType.ts`)

## Performance Guidelines

### Image Optimization
- Use `OptimizedImage` component for all images
- Implement lazy loading for below-the-fold content
- Use appropriate image formats (WebP, AVIF)

### Bundle Optimization
- Use React.lazy() for route-level code splitting
- Implement component-level lazy loading where appropriate
- Monitor bundle size with performance monitoring

### Caching Strategy
- Implement service worker caching
- Use React Query for API response caching
- Implement image caching with OptimizedImageService

## Accessibility Guidelines

### ARIA Standards
- Use semantic HTML elements
- Implement proper ARIA labels and roles
- Ensure keyboard navigation support

### Color and Contrast
- Maintain WCAG AA color contrast ratios
- Provide alternative text for images
- Support reduced motion preferences

## Testing Strategy

### Unit Tests
- Test utility functions
- Test custom hooks
- Test component logic

### Integration Tests
- Test user workflows
- Test API integrations
- Test routing behavior

### Performance Tests
- Monitor Core Web Vitals
- Test loading performance
- Monitor memory usage

## Code Quality

### TypeScript
- Use strict mode
- Define proper interfaces
- Avoid `any` type usage

### ESLint Rules
- Follow configured ESLint rules
- Use Prettier for code formatting
- Implement pre-commit hooks

## Performance Monitoring

### Metrics to Track
- Page load times
- Core Web Vitals
- Bundle sizes
- API response times

### Tools
- Use PerformanceMonitor utility
- Implement error boundary logging
- Monitor console errors

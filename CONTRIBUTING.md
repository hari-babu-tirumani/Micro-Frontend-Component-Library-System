# Contributing Guide

Thank you for your interest in contributing to the Micro-Frontend Component Library System! This guide will help you get started.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/micro-frontend-system.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### 1. Making Changes

#### Adding a New Component

When adding a new component to the UI library:

```bash
# Create component directory
mkdir packages/ui/src/components/YourComponent

# Create component files
touch packages/ui/src/components/YourComponent/YourComponent.tsx
touch packages/ui/src/components/YourComponent/YourComponent.module.css
touch packages/ui/src/components/YourComponent/index.ts
```

Component structure:
```tsx
// YourComponent.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './YourComponent.module.css';

export interface YourComponentProps {
  /** Component description */
  children: React.ReactNode;
  className?: string;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.component, className)}>
      {children}
    </div>
  );
};
```

Don't forget to:
1. Export from `packages/ui/src/index.ts`
2. Create a Storybook story in `apps/storybook/stories/`
3. Add accessibility features (ARIA, keyboard navigation)
4. Include TypeScript types

#### Creating a Storybook Story

```tsx
// apps/storybook/stories/YourComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '@micro-frontend/ui';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Your Component',
  },
};
```

### 2. Testing Your Changes

```bash
# Lint your code
npm run lint

# Run tests
npm run test

# Build packages
npm run build

# Test in Storybook
npm run storybook
```

### 3. Accessibility Checklist

Ensure your component meets these requirements:

- [ ] Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- [ ] Proper ARIA attributes (role, aria-label, aria-describedby, etc.)
- [ ] Focus visible indicators
- [ ] Color contrast meets WCAG AA standards
- [ ] Works with screen readers
- [ ] Error states are announced
- [ ] Loading states are indicated
- [ ] Semantic HTML elements used

Test in Storybook with the Accessibility addon!

### 4. Commit Guidelines

We follow conventional commits:

```
feat: add new button variant
fix: resolve modal focus trap issue
docs: update component API documentation
style: format code with prettier
refactor: simplify navigation logic
test: add tests for input validation
chore: update dependencies
```

### 5. Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm run test`
4. Ensure linting passes: `npm run lint`
5. Create a pull request with a clear description

## Project Structure

```
micro-frontend-system/
├── apps/                   # Applications
│   ├── dashboard/         # Dashboard micro-frontend
│   ├── settings/          # Settings micro-frontend
│   ├── reports/           # Reports micro-frontend
│   └── storybook/         # Component documentation
│
├── packages/              # Shared packages
│   ├── ui/               # Component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── store/            # State management
│       ├── src/
│       │   ├── userStore.ts
│       │   ├── themeStore.ts
│       │   └── index.ts
│       └── package.json
│
├── k8s/                  # Kubernetes configs
├── .github/workflows/    # CI/CD
└── docs/                 # Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type
- Use strict mode

### React

- Use functional components with hooks
- Use React.FC or explicit return types
- Destructure props
- Use meaningful variable names

### Styling

- Use CSS Modules for component styles
- Follow BEM-like naming in CSS
- Use CSS variables for theming
- Ensure responsive design

### Example Component

```tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Example.module.css';

export interface ExampleProps {
  /** Primary variant */
  variant?: 'primary' | 'secondary';
  /** Size of component */
  size?: 'small' | 'medium' | 'large';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Child elements */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ variant = 'primary', size = 'medium', disabled = false, onClick, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.example,
          styles[variant],
          styles[size],
          { [styles.disabled]: disabled },
          className
        )}
        onClick={disabled ? undefined : onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={disabled}
      >
        {children}
      </div>
    );
  }
);

Example.displayName = 'Example';
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Example } from './Example';

describe('Example', () => {
  it('renders children', () => {
    render(<Example>Test</Example>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Example onClick={handleClick}>Click me</Example>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Example onClick={handleClick} disabled>Click me</Example>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## Documentation

### Component Documentation

Include JSDoc comments for all props:

```tsx
export interface ComponentProps {
  /**
   * The variant of the component
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';

  /**
   * Callback fired when the component is clicked
   */
  onClick?: (event: React.MouseEvent) => void;
}
```

### Storybook Stories

Create comprehensive stories showing all variants:

```tsx
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
};
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag
4. Push to main branch
5. CI/CD will handle deployment

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues and PRs first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing!

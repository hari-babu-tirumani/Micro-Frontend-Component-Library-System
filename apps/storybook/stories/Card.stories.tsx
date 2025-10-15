import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '@micro-frontend/ui';

/**
 * Card component for displaying content in a contained format.
 *
 * ## Accessibility Features
 * - Semantic structure
 * - Keyboard navigation for interactive cards
 * - Focus visible indicators
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>This is a simple card with default styling.</p>
      </CardContent>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <CardContent>
        <p>This card has an outlined variant.</p>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <CardContent>
        <p>This card has an elevated variant with shadow.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Card Title</h3>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>
          This card includes a header and footer section. The content area can contain any
          elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="small">
          Cancel
        </Button>
        <Button size="small">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card onClick={() => alert('Card clicked!')} variant="elevated">
      <CardContent>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 600 }}>Interactive Card</h3>
        <p style={{ marginBottom: 0 }}>
          This card is interactive. Click it to trigger an action.
        </p>
      </CardContent>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '300px' }}>
      <CardHeader>
        <div
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: '#e5e7eb',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Image Placeholder
        </div>
      </CardHeader>
      <CardContent>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
          Product Name
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
          Product description goes here. This is a sample product card.
        </p>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>$99.99</p>
      </CardContent>
      <CardFooter>
        <Button fullWidth>Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

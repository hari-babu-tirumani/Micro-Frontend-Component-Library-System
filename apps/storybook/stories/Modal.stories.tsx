import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, Button } from '@micro-frontend/ui';

/**
 * Modal component with backdrop and keyboard navigation.
 *
 * ## Accessibility Features
 * - Focus trap within modal
 * - Escape key to close
 * - ARIA dialog role
 * - Body scroll lock when open
 * - Focus restoration on close
 */
const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper title="Modal Title">
      <p>This is the modal content. You can put any content here.</p>
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Confirm Action"
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>
      }
    >
      <p>Are you sure you want to proceed with this action?</p>
    </ModalWrapper>
  ),
};

export const Small: Story = {
  render: () => (
    <ModalWrapper title="Small Modal" size="small">
      <p>This is a small modal.</p>
    </ModalWrapper>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalWrapper title="Large Modal" size="large">
      <p>
        This is a large modal with more content. It can accommodate longer text and more complex
        layouts.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>
    </ModalWrapper>
  ),
};

export const FullScreen: Story = {
  render: () => (
    <ModalWrapper title="Full Screen Modal" size="full">
      <p>This modal takes up most of the screen.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris.
      </p>
    </ModalWrapper>
  ),
};

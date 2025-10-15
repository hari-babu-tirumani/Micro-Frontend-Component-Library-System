import { useState } from 'react';
import { Card, CardHeader, CardContent, Input, Button, Modal } from '@micro-frontend/ui';
import { useUserStore, useThemeStore } from '@micro-frontend/store';
import './App.css';

function App() {
  const { user, setUser } = useUserStore();
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, ...formData });
      setShowModal(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <div className="container">
          <h1 className="logo">Settings</h1>
          <Button variant="outline" size="small" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h2>Account Settings</h2>
            <p className="page-description">Manage your account preferences and settings</p>
          </div>

          <div className="settings-grid">
            <Card variant="elevated">
              <CardHeader>
                <h3 className="card-title">Profile Information</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="settings-form">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    fullWidth
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    fullWidth
                    required
                  />
                  <div className="form-actions">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3 className="card-title">Appearance</h3>
              </CardHeader>
              <CardContent>
                <div className="settings-section">
                  <div className="setting-item">
                    <div>
                      <p className="setting-label">Theme</p>
                      <p className="setting-description">
                        Choose your preferred color theme
                      </p>
                    </div>
                    <div className="theme-options">
                      <Button
                        variant={theme === 'light' ? 'primary' : 'outline'}
                        size="small"
                        onClick={() => setTheme('light')}
                      >
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'primary' : 'outline'}
                        size="small"
                        onClick={() => setTheme('dark')}
                      >
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3 className="card-title">Notifications</h3>
              </CardHeader>
              <CardContent>
                <div className="settings-section">
                  <div className="setting-item">
                    <div>
                      <p className="setting-label">Email Notifications</p>
                      <p className="setting-description">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Button variant="outline" size="small">
                      Enable
                    </Button>
                  </div>
                  <div className="setting-item">
                    <div>
                      <p className="setting-label">Push Notifications</p>
                      <p className="setting-description">
                        Receive push notifications on your devices
                      </p>
                    </div>
                    <Button variant="outline" size="small">
                      Enable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3 className="card-title">Security</h3>
              </CardHeader>
              <CardContent>
                <div className="settings-section">
                  <div className="setting-item">
                    <div>
                      <p className="setting-label">Password</p>
                      <p className="setting-description">
                        Change your password regularly for better security
                      </p>
                    </div>
                    <Button variant="outline" size="small">
                      Change Password
                    </Button>
                  </div>
                  <div className="setting-item">
                    <div>
                      <p className="setting-label">Two-Factor Authentication</p>
                      <p className="setting-description">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="small">
                      Setup 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Success"
        size="small"
        footer={
          <Button onClick={() => setShowModal(false)} variant="primary">
            Close
          </Button>
        }
      >
        <p>Your settings have been saved successfully!</p>
      </Modal>
    </div>
  );
}

export default App;

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Navigation,
  NavigationItem,
} from '@micro-frontend/ui';
import { useUserStore, useThemeStore } from '@micro-frontend/store';
import './App.css';

function App() {
  const { user, setUser, logout, isAuthenticated } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();
  const [selectedNav, setSelectedNav] = useState('dashboard');

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      href: '#dashboard',
      active: selectedNav === 'dashboard',
      onClick: (e) => {
        e.preventDefault();
        setSelectedNav('dashboard');
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      label: 'Analytics',
      href: '#analytics',
      active: selectedNav === 'analytics',
      onClick: (e) => {
        e.preventDefault();
        setSelectedNav('analytics');
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
  ];

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    });
  };

  const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%', trend: 'up' },
    { label: 'Revenue', value: '$45,231', change: '+8%', trend: 'up' },
    { label: 'Active Sessions', value: '1,234', change: '-3%', trend: 'down' },
    { label: 'Conversion Rate', value: '3.24%', change: '+5%', trend: 'up' },
  ];

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <div className="container">
          <h1 className="logo">Dashboard</h1>
          <div className="header-actions">
            <Button variant="outline" size="small" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            {isAuthenticated ? (
              <>
                <span className="user-name">{user?.name}</span>
                <Button variant="outline" size="small" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="small" onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <Navigation items={navigationItems} vertical />
        </aside>

        <main className="main-content">
          <div className="container">
            <div className="page-header">
              <h2>Dashboard Overview</h2>
              <p className="page-description">
                Welcome to your dashboard. Here&apos;s what&apos;s happening with your application.
              </p>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <Card key={index} variant="elevated">
                  <CardContent>
                    <div className="stat-card">
                      <p className="stat-label">{stat.label}</p>
                      <p className="stat-value">{stat.value}</p>
                      <p className={`stat-change ${stat.trend}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="content-grid">
              <Card variant="elevated">
                <CardHeader>
                  <h3 className="card-title">Recent Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">📊</div>
                      <div className="activity-content">
                        <p className="activity-title">New report generated</p>
                        <p className="activity-time">2 hours ago</p>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">👥</div>
                      <div className="activity-content">
                        <p className="activity-title">5 new users registered</p>
                        <p className="activity-time">5 hours ago</p>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">💰</div>
                      <div className="activity-content">
                        <p className="activity-title">Revenue milestone reached</p>
                        <p className="activity-time">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <h3 className="card-title">Quick Actions</h3>
                </CardHeader>
                <CardContent>
                  <div className="actions-list">
                    <Button fullWidth variant="primary">
                      Create New Report
                    </Button>
                    <Button fullWidth variant="outline">
                      View Analytics
                    </Button>
                    <Button fullWidth variant="outline">
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

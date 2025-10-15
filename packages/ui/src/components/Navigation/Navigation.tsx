import React from 'react';
import clsx from 'clsx';
import styles from './Navigation.module.css';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavigationProps {
  /** Navigation items */
  items: NavigationItem[];
  /** Vertical layout */
  vertical?: boolean;
  /** Custom class name */
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  vertical = false,
  className,
}) => {
  return (
    <nav
      className={clsx(styles.navigation, { [styles.vertical]: vertical }, className)}
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <a
              href={item.href}
              className={clsx(styles.link, { [styles.active]: item.active })}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

import { Link, useMatch } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  to: string;
}

export const CustomLink = ({ children, to, ...props }: CustomLinkProps) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link
      to={to}
      style={{
        color: match ? 'var(--color-active)' : 'white',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

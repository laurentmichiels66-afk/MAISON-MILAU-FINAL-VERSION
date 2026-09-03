// Validated Link Component
// Rule: "Validate every link before rendering. If a route does not exist, show an error instead of creating one."

import React from 'react';
import { isValidRoute } from '../config';

interface ValidatedLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
}

export const ValidatedLink: React.FC<ValidatedLinkProps> = ({
  to,
  className = '',
  children,
  onClick,
  id,
}) => {
  const valid = isValidRoute(to);

  const handleClick = (e: React.MouseEvent) => {
    if (!valid) {
      e.preventDefault();
      alert(`[Configuratie Fout] De route "${to}" bestaat niet in de goedgekeurde sitemap en kan niet worden geladen.`);
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  if (!valid) {
    return (
      <span
        id={id}
        title={`Ongeldige route: ${to}`}
        className={`inline-flex items-center text-red-600 line-through opacity-70 cursor-not-allowed ${className}`}
        onClick={handleClick}
      >
        {children} (Configuratie vereist)
      </span>
    );
  }

  return (
    <a
      id={id}
      href={to}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

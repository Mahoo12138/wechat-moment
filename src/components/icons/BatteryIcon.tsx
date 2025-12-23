import React from 'react';

export const BatteryIcon = ({ level = 100, className = "" }: { level?: number; className?: string }) => {
  // Ensure level is between 0 and 100
  const validLevel = Math.max(0, Math.min(100, level));
  
  // Calculate fill width based on level
  // The fill area starts at x=2, width=21. So max fill width is 21.
  const fillWidth = (validLevel / 100) * 21;

  // Determine fill color based on level (optional, but typical for batteries)
  // For this requirement, we'll stick to 'currentColor' or black to match the design.
  
  return (
    <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect opacity="0.35" x="0.5" y="0.5" width="24" height="12" rx="3.8" stroke="currentColor"/>
      <path opacity="0.4" d="M26 4.5V8.57547C26.8047 8.2303 27.328 7.42734 27.328 6.53774C27.328 5.64813 26.8047 4.84517 26 4.5Z" fill="currentColor"/>
      <rect x="2" y="2" width={fillWidth} height="9" rx="2.5" fill="currentColor"/>
    </svg>
  );
};

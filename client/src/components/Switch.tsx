import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onToggle, leftLabel, rightLabel }) => {
  return (
    <div className="flex items-center gap-3">
      <span 
        className={`text-sm ${!isChecked ? 'font-medium' : 'text-gray-500'}`}
        style={{ color: !isChecked ? '#343B5D' : undefined }}
      >
        {leftLabel}
      </span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{ 
          backgroundColor: isChecked ? '#343B5D' : '#E5E7EB',
          '--tw-ring-color': '#343B5D'
        } as React.CSSProperties}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span 
        className={`text-sm ${isChecked ? 'font-medium' : 'text-gray-500'}`}
        style={{ color: isChecked ? '#343B5D' : undefined }}
      >
        {rightLabel}
      </span>
    </div>
  );
};

export default Switch;

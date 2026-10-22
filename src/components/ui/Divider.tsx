import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  ornament?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ ornament = true, className = '', ...props }) => {
  return (
    <div className={`relative flex items-center justify-center my-6 ${className}`} {...props}>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#c99738]/40 to-transparent" />
      {ornament && (
        <div className="px-3 shrink-0 flex items-center gap-1.5 text-[#c99738]">
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c99738] bg-[#070d18]" />
          <span className="w-2 h-2 rotate-45 border border-[#e6be6c] bg-[#c99738]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c99738] bg-[#070d18]" />
        </div>
      )}
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#c99738]/40 to-transparent" />
    </div>
  );
};

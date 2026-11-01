import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  ornament?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ ornament = true, className = '', ...props }) => {
  return (
    <div className={`relative flex items-center justify-center my-6 ${className}`} {...props}>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#A87924]/50 to-transparent" />
      {ornament && (
        <div className="px-3 shrink-0 flex items-center gap-1.5 text-[#A87924]">
          <span className="w-1.5 h-1.5 rotate-45 border border-[#A87924] bg-[#FFFCF5]" />
          <span className="w-2 h-2 rotate-45 border border-[#54351F] bg-[#A87924]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#A87924] bg-[#FFFCF5]" />
        </div>
      )}
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#A87924]/50 to-transparent" />
    </div>
  );
};

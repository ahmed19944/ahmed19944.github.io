import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun 
        className={`w-5 h-5 transition-all duration-300 ${
          theme === 'light' 
            ? 'rotate-0 scale-100 text-orange-500' 
            : 'rotate-90 scale-0 absolute'
        }`} 
      />
      <Moon 
        className={`w-5 h-5 transition-all duration-300 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 text-orange-400' 
            : '-rotate-90 scale-0 absolute'
        }`} 
      />
    </Button>
  );
}

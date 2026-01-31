import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Heart, User, BarChart3, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'properties';
  onViewChange: (view: 'dashboard' | 'properties') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('properties')}>
            <Logo size={36} />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                ImmoPulse
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === 'properties' ? 'default' : 'ghost'}
              onClick={() => onViewChange('properties')}
              className="gap-2"
            >
              <Home className="size-4" />
              Annonces
            </Button>
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onViewChange('dashboard')}
              className="gap-2"
            >
              <BarChart3 className="size-4" />
              Dashboard
            </Button>
          </nav>

          {/* Search bar - Only on properties view */}
          {currentView === 'properties' && (
            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Ville, code postal, département..."
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="size-5" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="size-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {currentView === 'properties' && (
          <div className="mt-4 lg:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Ville, code postal, département..."
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

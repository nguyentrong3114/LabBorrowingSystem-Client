import { X } from 'lucide-react';
import { Button } from './ui/button';
import GlobalSearch from './GlobalSearch';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearch = ({ isOpen, onClose }: MobileSearchProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Search</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Content */}
      <div className="p-4">
        <GlobalSearch onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileSearch;
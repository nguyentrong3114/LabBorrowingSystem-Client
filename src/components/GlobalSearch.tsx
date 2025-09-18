import { useState, useEffect, useRef } from 'react';
import { Search, X, Building, Package, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'lab' | 'equipment' | 'booking' | 'user';
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

interface GlobalSearchProps {
  onClose?: () => void;
}

const GlobalSearch = ({ onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample data for search - in a real app, this would come from an API
  const allData: SearchResult[] = [
    // Labs
    {
      id: '1',
      type: 'lab',
      title: 'Biology Lab A',
      subtitle: 'Building 1, Floor 2',
      description: 'Equipped with microscopes and lab benches for 30 students',
      url: '/labs'
    },
    {
      id: '2', 
      type: 'lab',
      title: 'Chemistry Lab B',
      subtitle: 'Building 2, Floor 1',
      description: 'Advanced chemistry lab with fume hoods and safety equipment',
      url: '/labs'
    },
    {
      id: '3',
      type: 'lab',
      title: 'Physics Lab C',
      subtitle: 'Building 3, Floor 3',
      description: 'Physics laboratory with specialized measurement equipment',
      url: '/labs'
    },
    // Equipment
    {
      id: '4',
      type: 'equipment',
      title: 'Microscope Set A',
      subtitle: 'Biology Lab A',
      description: 'Digital microscopes with 1000x magnification',
      url: '/equipment'
    },
    {
      id: '5',
      type: 'equipment',
      title: 'Centrifuge Machine',
      subtitle: 'Biology Lab A',
      description: 'High-speed centrifuge for sample preparation',
      url: '/equipment'
    },
    {
      id: '6',
      type: 'equipment',
      title: 'Spectrometer',
      subtitle: 'Chemistry Lab B',
      description: 'UV-Vis spectrometer for chemical analysis',
      url: '/equipment'
    },
    // Bookings
    {
      id: '7',
      type: 'booking',
      title: 'Biology Practical Session',
      subtitle: 'Dr. Sarah Johnson - Oct 15, 2024',
      description: 'Cell biology practical for 25 students',
      url: '/bookings'
    },
    {
      id: '8',
      type: 'booking',
      title: 'Chemistry Research',
      subtitle: 'Dr. Michael Chen - Oct 18, 2024',
      description: 'Advanced organic chemistry research session',
      url: '/bookings'
    },
    // Users
    {
      id: '9',
      type: 'user',
      title: 'Dr. Sarah Johnson',
      subtitle: 'Faculty - Biology Department',
      description: 'Professor of Biology, molecular research specialist',
      url: '/users'
    },
    {
      id: '10',
      type: 'user',
      title: 'Dr. Michael Chen',
      subtitle: 'Lab Manager - Chemistry Department',
      description: 'Chemistry lab manager and research coordinator',
      url: '/users'
    },
    {
      id: '11',
      type: 'user',
      title: 'Emily Davis',
      subtitle: 'Student - Chemistry Department',
      description: 'Graduate student in organic chemistry',
      url: '/users'
    }
  ];

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (_result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'lab':
        return <Building className="h-4 w-4" />;
      case 'equipment':
        return <Package className="h-4 w-4" />;
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'lab':
        return 'text-blue-600';
      case 'equipment':
        return 'text-green-600';
      case 'booking':
        return 'text-purple-600';
      case 'user':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search labs, equipment, bookings, users..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            {results.map((result, index) => (
              <Link
                key={result.id}
                to={result.url}
                onClick={() => handleResultClick(result)}
                className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className={`flex-shrink-0 mt-0.5 ${getTypeColor(result.type)}`}>
                  {getIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {result.title}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      result.type === 'lab' ? 'bg-blue-100 text-blue-700' :
                      result.type === 'equipment' ? 'bg-green-100 text-green-700' :
                      result.type === 'booking' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {result.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{result.subtitle}</p>
                  <p className="text-xs text-gray-500 truncate">{result.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="px-4 py-8 text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No results found for "{query}"</p>
            <p className="text-xs text-gray-400 mt-1">
              Try searching for labs, equipment, bookings, or users
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
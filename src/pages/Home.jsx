import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import { fetchCharacters } from '../services/api';
import { AlertTriangle } from 'lucide-react';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    status: 'all',
    species: 'all',
    type: 'all',
    gender: 'all',
    page: 1
  });
  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null
  });
  
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Update filters when search changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, name: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  // Fetch characters
  const loadCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters(filters);
      setCharacters(data.results || []);
      setPagination(data.info || { count: 0, pages: 0, next: null, prev: null });
    } catch (error) {
      console.error('Error loading characters:', error);
      setCharacters([]);
      setPagination({ count: 0, pages: 0, next: null, prev: null });
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-black">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Moving cosmic elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-96 h-96 bg-gradient-radial from-green-400/5 to-transparent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: '6s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
          {/* Search and Filters */}
          <div className="space-y-6">
            <SearchBar 
              search={search} 
              setSearch={setSearch}
              onClear={handleClearSearch}
            />
            <Filters filters={filters} setFilters={setFilters} />
          </div>

          {/* Results */}
          {loading ? (
            <LoadingSpinner message="Scanning the multiverse..." />
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8 max-w-md mx-auto">
                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-yellow-400 font-mono text-lg font-semibold mb-2">
                  No Characters Found
                </h3>
                <p className="text-yellow-300/80 font-mono text-sm">
                  Try adjusting your search criteria or exploring different dimensions.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results info */}
              <div className="text-center">
                <p className="text-green-300/80 font-mono text-sm">
                  Found {pagination.count} characters across {pagination.pages} dimensional pages
                </p>
              </div>

              {/* Character Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={handleCharacterClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={filters.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* Character Modal */}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
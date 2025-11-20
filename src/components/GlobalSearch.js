// src/components/GlobalSearch.js
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components'; 
import Fuse from 'fuse.js';
import { buildSearchIndex } from '../utils/searchDataBuilder';
import { Images } from './images';

// --- Styled Components ---

const SearchOverlay = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  z-index: 1000;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #2a2a2a;
  border-radius: 25px;
  padding: 5px 15px;
  border: 2px solid ${props => props.isFocused ? '#FFEB3B' : '#444'};
  box-shadow: ${props => props.isFocused ? '0 0 15px rgba(255, 235, 59, 0.3)' : 'none'};
  transition: all 0.3s ease;
`;

const SearchIcon = styled.span`
  color: #aaa;
  font-size: 1.2rem;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  padding: 8px 0;
  outline: none;

  &::placeholder {
    color: #777;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #777;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
  
  &:hover {
    color: #fff;
  }
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  background: #1e1e1e;
  border: 1px solid #444;
  border-radius: 12px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  display: ${props => props.show ? 'block' : 'none'};

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a2a2a;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultImage = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  margin-right: 15px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ResultContent = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const ResultType = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #FFEB3B;
  margin-bottom: 4px;
  font-weight: 700;
`;

const ResultTitle = styled.div`
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 4px;
`;

const ResultSubtitle = styled.div`
  font-size: 0.9rem;
  color: #bbb;
  margin-bottom: 4px;
`;

const ResultDescription = styled.div`
  font-size: 0.85rem;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #777;
`;

// --- Modal Styles ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  position: relative;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover { color: #fff; }
`;

const ModalImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  padding: 5px;
`;

const ModalTitle = styled.h2`
  color: #FFEB3B;
  margin-bottom: 10px;
`;

const ModalSubtitle = styled.h4`
  color: #e0e0e0;
  margin-bottom: 15px;
  font-weight: 400;
`;

const ModalDesc = styled.p`
  color: #ccc;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
`;

const ExternalLink = styled.a`
  color: #81d4fa;
  margin-top: 15px;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover { text-decoration: underline; }
`;

// --- Component ---

function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null); // State for Modal

  // 1. Build Index
  useEffect(() => {
    const data = buildSearchIndex();
    setSearchData(data);
  }, []);

  // 2. Configure Fuse
  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      includeScore: true,
      threshold: 0.3,
      keys: [
        { name: 'combinedCodes', weight: 2 },
        { name: 'title', weight: 1 },
        { name: 'keywords', weight: 0.8 },
        { name: 'description', weight: 0.3 }
      ]
    });
  }, [searchData]);

  // 3. Search
  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item).slice(0, 20));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (item) => {
    setSelectedResult(item);
    // Optionally clear query or close dropdown? 
    // For now we keep dropdown state but the modal covers it.
  };

  const handleNavigate = () => {
    if (selectedResult && onNavigate && selectedResult.pageRoute) {
      onNavigate(selectedResult.pageRoute);
      setSelectedResult(null); // Close modal
      setIsFocused(false); // Close dropdown
      setQuery(''); // Clear search
    }
  };

  return (
    <>
      <SearchOverlay>
        <SearchInputWrapper isFocused={isFocused}>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search '8204', 'Prefix 10', 'Electrified'..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} 
          />
          {query && <ClearButton onClick={handleClear}>×</ClearButton>}
        </SearchInputWrapper>

        <ResultsContainer show={isFocused && (query.length > 1)}>
          {results.length > 0 ? (
            results.map((item) => (
              <ResultItem key={item.id} onClick={() => handleResultClick(item)}>
                <ResultImage>
                  <img 
                      src={item.image || Images.placeholder} 
                      alt={item.title} 
                      onError={(e) => { e.target.src = Images.placeholder; }}
                  />
                </ResultImage>
                <ResultContent>
                  <ResultType>{item.type}</ResultType>
                  <ResultTitle>{item.title}</ResultTitle>
                  {item.subtitle && <ResultSubtitle>{item.subtitle}</ResultSubtitle>}
                  <ResultDescription>{item.description}</ResultDescription>
                </ResultContent>
              </ResultItem>
            ))
          ) : (
            <NoResults>No matches found</NoResults>
          )}
        </ResultsContainer>
      </SearchOverlay>

      {/* --- Details Modal --- */}
      {selectedResult && (
        <ModalOverlay onClick={() => setSelectedResult(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseModalButton onClick={() => setSelectedResult(null)}>×</CloseModalButton>
            
            <ModalImage 
               src={selectedResult.image || Images.placeholder} 
               onError={(e) => { e.target.src = Images.placeholder; }}
            />
            
            <ResultType style={{ marginBottom: '5px' }}>{selectedResult.type}</ResultType>
            <ModalTitle>{selectedResult.title}</ModalTitle>
            <ModalSubtitle>{selectedResult.subtitle}</ModalSubtitle>
            <ModalDesc>{selectedResult.description}</ModalDesc>

            {/* Context Navigation Button */}
            <ActionButton onClick={handleNavigate}>
               Go to {selectedResult.type === 'Prefix' ? 'Prefixes' : 
                      selectedResult.type.includes('Mortise') ? 'Mortise Locks' : 
                      selectedResult.type.includes('Bored') ? 'Bored Locks' : 
                      'Exit Devices'} Page
            </ActionButton>

            {/* External Catalog Link (if exists) */}
            {selectedResult.link && (
              <ExternalLink href={selectedResult.link} target="_blank" rel="noopener noreferrer">
                Open Official Catalog PDF ↗
              </ExternalLink>
            )}

          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default GlobalSearch;
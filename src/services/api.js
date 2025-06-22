const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (filters) => {
  try {
    const query = new URLSearchParams();
    
    if (filters.name) query.append('name', filters.name);
    if (filters.status && filters.status !== 'all') query.append('status', filters.status);
    if (filters.species && filters.species !== 'all') query.append('species', filters.species);
    if (filters.type && filters.type !== 'all') query.append('type', filters.type);
    if (filters.gender && filters.gender !== 'all') query.append('gender', filters.gender);
    if (filters.page) query.append('page', filters.page);
    
    const queryString = query.toString();
    const url = `${BASE_URL}/character${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
};

export const fetchCharacterEpisodes = async (episodeUrls) => {
  try {
    const promises = episodeUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    });
    
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};

export const fetchAllSpecies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/character`);
    const data = await response.json();
    const species = [...new Set(data.results.map(char => char.species))].sort();
    return species;
  } catch (error) {
    console.error('Error fetching species:', error);
    return [];
  }
};
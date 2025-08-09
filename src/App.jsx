import { useState, useEffect } from 'react';

export default function App() {
  const [quote, setQuote] = useState(
    'Click "Get Quote" to fetch a random quote!'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quoteCount, setQuoteCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [particles, setParticles] = useState([]);

  // Get environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Random Quote Generator';

  // Set document title dynamically
  useEffect(() => {
    document.title = APP_TITLE;
  }, [APP_TITLE]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  // Generate animated particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.speedX;
        const newY = particle.y + particle.speedY;
        return {
          ...particle,
          x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
          y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  async function fetchQuote() {
    setLoading(true);
    setError('');

    try {
      // Call the API using environment variable
      const fullUrl = `${API_URL}/quote`;
      console.log("Calling API at:", fullUrl);
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error('Failed to fetch quote.');
      const data = await res.json();
      setQuote(data.quote);
      setQuoteCount(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite() {
    if (favorites.includes(quote)) {
      setFavorites(prev => prev.filter(fav => fav !== quote));
    } else {
      setFavorites(prev => [...prev, quote]);
    }
  }

  function toggleTheme() {
    setIsDark(prev => !prev);
  }

  const isFavorite = favorites.includes(quote);

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      {/* Animated Background Particles */}
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.x + 'px',
              top: particle.y + 'px',
              width: particle.size + 'px',
              height: particle.size + 'px',
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="header">
          <h1>{APP_TITLE}</h1>
          <div className="stats">
            <span className="stat">Quotes fetched: {quoteCount}</span>
            <span className="stat">Favorites: {favorites.length}</span>
          </div>
        </div>

        <div className="controls">
          <button
            className="quote-button"
            onClick={fetchQuote}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Get Quote'}
          </button>
          
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
            disabled={quote === 'Click "Get Quote" to fetch a random quote!'}
          >
            {isFavorite ? '❤️' : '🤍'} Favorite
          </button>

          <button className="theme-button" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'} Theme
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {!error && (
          <div className="quote-display">
            <blockquote>{quote}</blockquote>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="favorites-section">
            <h3>Your Favorite Quotes</h3>
            <div className="favorites-list">
              {favorites.slice(-3).map((fav, index) => (
                <div key={index} className="favorite-item">
                  <p>"{fav}"</p>
                  <button
                    className="remove-favorite"
                    onClick={() => setFavorites(prev => prev.filter(f => f !== fav))}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




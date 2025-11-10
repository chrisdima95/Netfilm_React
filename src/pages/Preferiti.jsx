import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, removeFavorite, subscribeToFavorites } from '../utils/favorites';
import { getPosterForTodo } from '../utils/posters';
import './ListaTodos.css';

export default function Preferiti() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    const unsubscribe = subscribeToFavorites(setFavorites);
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">I Miei Preferiti</h1>

        {favorites.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>❤️</div>
            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Nessun preferito</h2>
            <p className="muted" style={{ fontSize: '16px' }}>
              Aggiungi film ai preferiti dalla pagina "Lista Film" cliccando sull'icona a cuore.
            </p>
          </div>
        ) : (
          <div className="todos-list">
            {favorites.map((film) => (
              <div key={film.id} className="todo-card">
                <div className="todo-card-content">
                  <div
                    className="todo-card-image-wrapper"
                    onClick={() => navigate(`/home/film/${film.id}`)}
                  >
                    <img
                      src={film.image || getPosterForTodo(film)}
                      alt={film.title}
                      className="todo-card-image"
                    />
                  </div>
                  <div className="todo-card-info">
                    <h3 className="todo-card-title">{film.title}</h3>
                    <div className="todo-card-footer">
                      <div className="todo-card-status">
                        <span className="todo-status-badge completed">Preferito</span>
                      </div>
                      <div className="todo-card-actions">
                        <button
                          onClick={() => handleRemove(film.id)}
                          className="todo-button todo-button-delete"
                          style={{ flex: 'none', minWidth: '120px' }}
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


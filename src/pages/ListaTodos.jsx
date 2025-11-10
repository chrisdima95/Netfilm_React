import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/jsonplaceholder';
import { addFavorite, removeFavorite, getFavorites, isFavorite, subscribeToFavorites } from '../utils/favorites';
import { getPosterForTodo } from '../utils/posters';
import './ListaTodos.css';

export default function ListaTodos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => getFavorites());

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Stati per il form di creazione
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Stati per la modifica
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToFavorites(setFavorites);
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  function toggleFavorite(todo) {
    const poster = getPosterForTodo(todo, todos);
    if (isFavorite(todo.id)) {
      removeFavorite(todo.id);
    } else {
      addFavorite({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        image: poster
      });
    }

    setFavorites(getFavorites());
  }

  function loadTodos() {
    let active = true;
    setLoading(true);
    setError('');
    getTodos(10)
      .then(data => { if (active) setTodos(data); })
      .catch(err => { if (active) setError(err.message || 'Errore'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }

  // POST: Crea un nuovo todo
  async function handleCreate() {
    if (!newTodoTitle.trim()) {
      alert('Inserisci un titolo per il todo');
      return;
    }

    setIsCreating(true);
    try {
      const newTodo = {
        title: newTodoTitle.trim(),
        completed: newTodoCompleted,
        userId: 1
      };
      
      const created = await createTodo(newTodo);
      
      // Aggiungi il nuovo todo alla lista (JSONPlaceholder restituisce un ID fittizio)
      setTodos(prev => [created, ...prev]);
      
      // Reset form
      setNewTodoTitle('');
      setNewTodoCompleted(false);
      setShowAddForm(false);
      
      alert('Todo creato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nella creazione del todo');
      alert('Errore: ' + (err.message || 'Errore nella creazione del todo'));
    } finally {
      setIsCreating(false);
    }
  }

  // PUT/PATCH: Modifica un todo
  function startEdit(todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditCompleted(todo.completed);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditCompleted(false);
  }

  async function handleUpdate(id) {
    if (!editTitle.trim()) {
      alert('Il titolo non può essere vuoto');
      return;
    }

    setIsUpdating(true);
    try {
      // Usa PATCH per aggiornare solo i campi modificati
      const updated = await patchTodo(id, {
        title: editTitle.trim(),
        completed: editCompleted
      });
      
      // Aggiorna il todo nella lista
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, ...updated } : todo
      ));
      
      cancelEdit();
      alert('Todo aggiornato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nell\'aggiornamento del todo');
      alert('Errore: ' + (err.message || 'Errore nell\'aggiornamento del todo'));
    } finally {
      setIsUpdating(false);
    }
  }

  // DELETE: Elimina un todo
  async function handleDelete(id) {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo elemento?');
    if (!confirmed) return;

    try {
      await deleteTodo(id);
      
      // Rimuovi il todo dalla lista
      setTodos(prev => prev.filter(todo => todo.id !== id));

      if (isFavorite(id)) {
        removeFavorite(id);
        setFavorites(getFavorites());
      }
      
      alert('Todo eliminato con successo!');
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del todo');
      alert('Errore: ' + (err.message || 'Errore nell\'eliminazione del todo'));
    }
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'inProgress' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="container">
        <div className="todos-toolbar">
          <div className="todos-toolbar-left">
            <h1 className="page-title">Lista Film</h1>
            <div className="todos-filters">
              <div className="todos-search">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca film..."
                  aria-label="Cerca film"
                />
              </div>
              <div className="todos-filter-wrapper">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filtra per stato"
                  className="todos-filter-select"
                >
                  <option value="all">Tutti</option>
                  <option value="completed">Completati</option>
                  <option value="inProgress">In corso</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`todos-add-button ${showAddForm ? 'is-open' : ''}`}
          >
            {showAddForm ? 'Annulla' : '+ Nuovo Todo'}
          </button>
        </div>

        {/* Form per creare un nuovo todo (POST) */}
        {showAddForm && (
          <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Crea Nuovo Todo</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#b3b3b3' }}>
                  Titolo *
                </label>
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Inserisci il titolo del todo"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2f2f2f',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  id="newTodoCompleted"
                  checked={newTodoCompleted}
                  onChange={(e) => setNewTodoCompleted(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="newTodoCompleted" style={{ fontSize: '14px', color: '#b3b3b3', cursor: 'pointer' }}>
                  Completato
                </label>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleCreate}
                  disabled={isCreating}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#e3b23c',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: isCreating ? 'not-allowed' : 'pointer',
                    opacity: isCreating ? 0.6 : 1
                  }}
                >
                  {isCreating ? 'Creazione...' : 'Crea Todo'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTodoTitle('');
                    setNewTodoCompleted(false);
                  }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#6c757d',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && <div className="loading">Caricamento...</div>}
        {error && <div className="error" style={{ padding: '20px', textAlign: 'center' }}>Errore: {error}</div>}
        
        {!loading && !error && (
          <div className="todos-list">
            {filteredTodos.length === 0 ? (
              <div className="todo-card" style={{ padding: '40px', textAlign: 'center' }}>
                <p className="muted">Nessun todo disponibile</p>
              </div>
            ) : (
              filteredTodos.map(todo => {
                const poster = getPosterForTodo(todo, todos);
                const favorite = favorites.some((fav) => fav.id === todo.id);
                return (
                  <div key={todo.id} className="todo-card">
                    {editingId === todo.id ? (
                      // Form di modifica
                      <div className="todo-edit-form">
                        <div>
                          <label className="todo-label">
                            Titolo *
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="todo-input"
                          />
                        </div>
                        <div className="todo-checkbox-container">
                          <input
                            type="checkbox"
                            id={`editCompleted-${todo.id}`}
                            checked={editCompleted}
                            onChange={(e) => setEditCompleted(e.target.checked)}
                            className="todo-checkbox"
                          />
                          <label htmlFor={`editCompleted-${todo.id}`} className="todo-checkbox-label">
                            Completato
                          </label>
                        </div>
                        <div className="todo-edit-buttons">
                          <button
                            onClick={() => handleUpdate(todo.id)}
                            disabled={isUpdating}
                            className="todo-button todo-button-primary"
                          >
                            {isUpdating ? 'Salvataggio...' : 'Salva'}
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={isUpdating}
                            className="todo-button todo-button-secondary"
                          >
                            Annulla
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Visualizzazione normale con card
                      <div className="todo-card-content">
                        <div 
                          className="todo-card-image-wrapper"
                          onClick={() => navigate(`/home/film/${todo.id}`)}
                        >
                          <img 
                            src={poster} 
                            alt={todo.title} 
                            className="todo-card-image"
                          />
                        </div>
                        <div className="todo-card-info">
                          <h3 className="todo-card-title">{todo.title}</h3>
                          <div className="todo-card-footer">
                            <div className="todo-card-status">
                              <span className={`todo-status-badge ${todo.completed ? 'completed' : 'in-progress'}`}>
                                {todo.completed ? '✓ Completato' : '○ In corso'}
                              </span>
                            </div>
                            <div className="todo-card-actions">
                              <button
                                type="button"
                                onClick={() => toggleFavorite(todo)}
                                className={`todo-favorite-button ${favorite ? 'active' : ''}`}
                                aria-label={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                                title={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                              >
                                {favorite ? '♥' : '♡'}
                              </button>
                              <button 
                                onClick={() => startEdit(todo)}
                                className="todo-button todo-button-edit"
                              >
                                Modifica
                              </button>
                              <button 
                                onClick={() => handleDelete(todo.id)}
                                className="todo-button todo-button-delete"
                              >
                                Elimina
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}


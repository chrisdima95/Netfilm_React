import { POSTERS, POSTER_SEQUENCE, POSTERS_BY_TITLE } from '../constants/posters';

const FALLBACK_POSTER = POSTERS[POSTER_SEQUENCE[0]];

export function getPosterForTodo(todo, allTodos = []) {
  if (!todo) {
    return FALLBACK_POSTER;
  }

  const normalizedTitle = todo.title ? todo.title.trim().toLowerCase() : '';
  if (normalizedTitle && POSTERS_BY_TITLE[normalizedTitle]) {
    return POSTERS_BY_TITLE[normalizedTitle];
  }

  const todos = Array.isArray(allTodos) ? allTodos : [];
  if (todos.length > 0) {
    const index = todos.findIndex((item) => item?.id === todo.id);
    if (index !== -1) {
      const posterId = POSTER_SEQUENCE[index % POSTER_SEQUENCE.length];
      return POSTERS[posterId] ?? FALLBACK_POSTER;
    }
  }

  if (Number.isInteger(todo.id)) {
    const offset = ((todo.id - 1) % POSTER_SEQUENCE.length + POSTER_SEQUENCE.length) % POSTER_SEQUENCE.length;
    const posterId = POSTER_SEQUENCE[offset];
    if (posterId && POSTERS[posterId]) {
      return POSTERS[posterId];
    }
  }

  return FALLBACK_POSTER;
}


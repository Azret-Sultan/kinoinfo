import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const fakeUser = { login: "user", password: "1234" };

const movies = [
  { id: 1, title: "Дюна", year: 2021, poster: "https://image.tmdb.org/t/p/w200/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg" },
  { id: 2, title: "Оппенгеймер", year: 2023, poster: "https://image.tmdb.org/t/p/w200/nLBRD7UPR6GjmWQp6ASAfCTaWKX.jpg" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (form.login === fakeUser.login && form.password === fakeUser.password) {
      navigate('/');
    } else {
      setError('Неверные данные');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      <input placeholder="Логин" className="border p-2 mb-2 w-64" onChange={e => setForm({ ...form, login: e.target.value })} />
      <input placeholder="Пароль" type="password" className="border p-2 mb-2 w-64" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Войти</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">КиноИнфо: Афиша</h1>
      <div className="grid grid-cols-2 gap-4">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="block border rounded overflow-hidden">
            <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-2">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p>{movie.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MoviePage({ id }) {
  const movie = movies.find(m => m.id === parseInt(id));
  if (!movie) return <p className="p-4">Фильм не найден</p>;

  return (
    <div className="p-4">
      <img src={movie.poster} alt={movie.title} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
      <p className="text-lg">Год выпуска: {movie.year}</p>
      <Link to="/" className="text-blue-500">← Назад</Link>
    </div>
  );
}

function MovieWrapper() {
  const id = window.location.pathname.split('/').pop();
  return <MoviePage id={id} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movie/:id" element={<MovieWrapper />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
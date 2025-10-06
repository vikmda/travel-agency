import React, {useState, useEffect} from 'react';
import {supabase} from '../../lib/supabase';
import {useNavigate} from 'react-router-dom';

/**
 * Страница входа администратора.
 * При наличии активной сессии — сразу редиректит в /admin/dashboard.
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем активную сессию при загрузке
  useEffect(() => {
    const checkSession = async () => {
      const {data} = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin/dashboard', {replace: true});
      }
    };
    checkSession();
  }, [navigate]);

  // Обработка входа
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError('Неверный email или пароль');
      console.error('Ошибка входа:', error);
      return;
    }

    if (data.session) {
      navigate('/admin/dashboard', {replace: true});
    }
  };

  // Выход
  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) console.error('Ошибка выхода:', error);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Вход администратора
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            className="border p-2 rounded"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {/* Кнопка выхода (если пользователь уже вошёл) */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-600 underline hover:text-gray-800"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

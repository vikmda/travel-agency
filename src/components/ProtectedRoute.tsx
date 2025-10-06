import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {supabase} from '../lib/supabase';

/**
 * Компонент защищает маршруты.
 * Если нет активной сессии — редирект на /admin/login.
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (error) console.error('Ошибка проверки сессии:', error.message);
      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    // Подписываемся на изменения сессии (например, выход)
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Проверка авторизации...
      </div>
    );
  }

  // Если нет сессии — отправляем на логин
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // Если есть — показываем компонент
  return <>{children}</>;
}

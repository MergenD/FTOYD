import { Button, Image } from 'antd';
import style from './navbar.module.scss';
import Refresh from '/public/Refresh.svg';
import { useMatches } from '../../hooks/matches';
import { useMatchStore } from '../../store/store';
import Alert from '/alert-triangle.svg';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { getMatches } = useMatches();
  const { setMatches } = useMatchStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMatches = () => {
    setLoading(true);
    getMatches()
      .then((res) => {
        setMatches(res.matches);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <nav className={style.navbar}>
      <p className={style.title}>Match Tracker</p>
      <div className={style.buttons}>
        {error ? (
          <div className={style.error}>
            <Image src={Alert} preview={false} width={28} height={28} />{' '}
            <span style={{ fontSize: '18px' }}>
              Ошибка: не удалось загрузить информацию
            </span>
          </div>
        ) : (
          ''
        )}
        <Button
          className={style.refresh}
          type='primary'
          onClick={() => fetchMatches()}
        >
          <div className={style.refreshContainer}>
            <span>Обновить</span>{' '}
            <Image
              preview={false}
              src={Refresh}
              className={loading ? style.rotating : ''}
            />
          </div>
        </Button>
      </div>
    </nav>
  );
};

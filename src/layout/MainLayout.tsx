import { Layout, Spin } from 'antd';
import { Navbar } from '../components/navbar/Navbar';
import style from './mainLayout.module.scss';
import { useEffect, useState } from 'react';
import { useMatches } from '../hooks/matches';
import Collapse from '../components/collapse/Collapse';
import { useMatchStore } from '../store/store';
import { LoadingOutlined } from '@ant-design/icons';

const MainLayout = () => {
  const { getMatches } = useMatches();
  const { matches, setMatches } = useMatchStore();
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
        console.log('Ошибка: не удалось загрузить информацию', error);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMatches();
  }, [setMatches]);

  const { Content } = Layout;

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <div className={style.loading}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <Content className={style.layout}>
          {matches?.map((match, index) => (
            <Collapse
              key={index}
              firstCommandName={match.homeTeam.name}
              secondCommandName={match.awayTeam.name}
              score={match.homeScore + ':' + match.awayScore}
              status={match.status}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
          ))}
        </Content>
      )}
    </Layout>
  );
};

export default MainLayout;

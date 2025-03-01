import { Button, Image } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import style from './collapse.module.scss';
import CommandIcon from '/public/illustrations_role.svg';
import { TTeam } from '../../types/matches';
import Avatar from '/public/avatar_global.svg';

const Collapse = ({
  firstCommandName,
  secondCommandName,
  score,
  status,
  key,
  homeTeam,
  awayTeam,
}: {
  firstCommandName: string;
  secondCommandName: string;
  score: string;
  status: string;
  key: string | number;
  homeTeam: TTeam;
  awayTeam: TTeam;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div>
      <div
        className={style.container}
        key={key}
        style={{
          marginBottom: collapsed ? '0' : '14px',
          borderRadius: collapsed ? '5px 5px 0 0' : '5px',
        }}
      >
        <div className={style.team}>
          <Image preview={false} src={CommandIcon} width={48} height={48} />
          <div className={style.teamName}>{firstCommandName}</div>
        </div>
        <div className={style.score}>
          <div>{score}</div>
          <div
            className={style.status}
            style={{
              backgroundColor:
                status === 'Scheduled'
                  ? '#EB6402'
                  : status === 'Ongoing'
                  ? '#43AD28'
                  : '#EB0237',
            }}
          >
            {status}
          </div>
        </div>
        <div className={style.team}>
          <div className={style.teamName}>{secondCommandName}</div>
          <Image preview={false} src={CommandIcon} width={48} height={48} />
          <Button
            icon={collapsed ? <UpOutlined /> : <DownOutlined />}
            className={style.collapseButton}
            onClick={toggleCollapse}
          />
        </div>
      </div>
      {collapsed ? (
        <div className={style.colContainer}>
          <div className={style.column}>
            <div className={style.row}>
              {homeTeam.players.map((player) => (
                <div className={style.player}>
                  <div className={style.playerInfo}>
                    <div
                      style={{
                        gap: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={Avatar}
                        width={32}
                        height={32}
                        preview={false}
                      />
                      <span>{player.username}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Убийств: {player.kills}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.row2}>
              <span>Points: +{homeTeam.points}</span>
              <span>Место: {homeTeam.place}</span>
              <span>Всего убийств: {homeTeam.total_kills}</span>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.row}>
              {awayTeam.players.map((player) => (
                <div className={style.player}>
                  <div className={style.playerInfo}>
                    <div
                      style={{
                        gap: '5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={Avatar}
                        width={32}
                        height={32}
                        preview={false}
                      />
                      <span>{player.username}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>Убийств: {player.kills}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.row2}>
              <span>Points: +{awayTeam.points}</span>
              <span>Место: {awayTeam.place}</span>
              <span>Всего убийств: {awayTeam.total_kills}</span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Collapse;

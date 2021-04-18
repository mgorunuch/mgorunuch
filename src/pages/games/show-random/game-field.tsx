import React, {useEffect, useState} from 'react';
import styles from './game-field.module.scss';
import cn from 'classnames';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAvailableItem(idx: number, items: number, disabledItems: number[]): number {
  let cIdx = 0;
  for (let i = 0; i < items; i++) {
    if (disabledItems.findIndex((v) => v === i) !== -1) {
      continue;
    }

    if (cIdx === idx) {
      return i;
    }

    cIdx++;
  }

  return 0;
}

const GameItem: React.FC<{
  user: string, items: string[],
  fakeItemIdx: number, selectedIdx: number,
  disabledItems: number[],
}> = ({ user, items, fakeItemIdx, selectedIdx, disabledItems }) => {
  return (
    <div className={styles.user}>
      <h4 className={styles.userTitle}>{user}</h4>
      <div>
        {
          items.map((it, i) => {
            const itemStyle = (
              (selectedIdx == i && styles.itemSelected)
              || (fakeItemIdx == i && styles.itemFake)
              || (disabledItems.findIndex(v => v === i) !== -1 && styles.itemDisabled)
            );
            return (
              <div className={cn(styles.item, itemStyle)}>
                {it}
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

interface Props {
  className?: string;
  users: string[];
  items: string[];
}

const GameField: React.FC<Props> = ({ className, users, items }) => {
  const [fakeSelectItems, setFakeSelectItems] = useState<number[]>((new Array(users.length)).fill(-1));
  const [selectedItems, setSelectedItems] = useState<number[]>((new Array(users.length)).fill(-1));
  const [disabledItems, setDisabledItems] = useState<number[][]>((new Array(users.length)).fill([]));

  const onStart = async () => {
    let lsi = selectedItems;
    let ldi = disabledItems;
    let lfsi = fakeSelectItems;

    const setSi = (idx: number, val: number) => {
      const si = lsi.map((v) => v);
      si[idx] = val;
      setSelectedItems(si);
      lsi = si;
    };

    const setDi = (idx: number, val: number) => {
      const di = ldi.map((v) => v.map(vv => vv));
      for (let i = idx; i < users.length; i++) {
        di[i].push(val);
      }
      setDisabledItems(di);
      ldi = di;
    };

    const setFsi = (idx: number, val: number) => {
      const fsi = lfsi.map((v) => v);
      fsi[idx] = val;
      setFakeSelectItems(fsi);
      lfsi = fsi;
    }

    for (let ui = 0; ui < users.length; ui++) {
      const i = users[ui];

      const value = getRandomInt(items.length);
      for (let s = 0; s < 50; s++) {
        await sleep(100);
        const selectIdx = getRandomInt(items.length - ldi[ui].length);

        const fv = getAvailableItem(selectIdx, items.length, ldi[ui]);
        setFsi(ui, fv);
      }

      setFsi(ui, -1);
      setSi(ui, value);
      setDi(ui+1, value);
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      {
        users.map((v, i) => (
          <GameItem user={v} items={items}
                    fakeItemIdx={fakeSelectItems[i]}
                    selectedIdx={selectedItems[i]}
                    disabledItems={disabledItems[i]} />
        ))
      }
      <button onClick={onStart}>Start</button>
    </div>
  );
}

export default GameField;

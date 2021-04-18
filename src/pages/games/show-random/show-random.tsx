import React, {FormEvent, useState} from 'react';
import styles from './show-random.module.scss';
import cn from 'classnames';
import GameField from './game-field';

interface FormProps {
  inputPlaceholder: string;
  initialItems?: string[];
  onChange: (v: string[]) => void;
}

const SelectedFormItem: React.FC<{
  className?: string;
  item: string;
  onRemoveClick: () => void;
}> = ({ className, item, onRemoveClick }) => {
  return (
    <div className={cn(styles.userItem, className)}>
      {item}
      <button className={styles.userItemDeleteButton} onClick={onRemoveClick}>❌</button>
    </div>
  );
}

const FormItemForm: React.FC<FormProps> = ({ inputPlaceholder, initialItems, onChange }) => {
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>(initialItems || []);

  const onAddClick = (e: FormEvent | MouseEvent) => {
    e.preventDefault();

    if (value.trim() === "") {
      return
    }

    setItems([...items, value.trim()]);
    onChange([...items, value.trim()]);
    setValue("");
  };

  const onUserRemoveClick = (idx: number) => {
    setItems(items.filter((v, i) => i !== idx))
    onChange(items.filter((v, i) => i !== idx))
  };

  return (
    <div>
      <h4 className={styles.subtitle}>{inputPlaceholder}</h4>
      <form onSubmit={onAddClick} className={styles.userAddForm}>
        <input value={value} className={styles.userInput} onChange={(e) => e.target.value.trim() && setValue(e.target.value)} placeholder={inputPlaceholder} type="text"/>
        <button className={styles.userSubmitAdd} onClick={onAddClick}>✔️</button>
      </form>
      <div className={styles.usersList}>
        {items.map((item, i) =>
          <SelectedFormItem item={item} onRemoveClick={() => onUserRemoveClick(i)} />
        )}
      </div>
    </div>
  );
};


interface Props {
  className?: string;
}

const ShowRandom: React.FC<Props> = ({ className }) => {
  const [users, setUsers] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.app}>
        <h3 className={styles.title}>Select random</h3>
        <FormItemForm
          inputPlaceholder="Enter users"
          initialItems={users}
          onChange={setUsers}
        />
        <FormItemForm
          inputPlaceholder="Enter items"
          initialItems={items}
          onChange={setItems}
        />
        <div>
          {users.length < items.length && <GameField users={users} items={items} />}
        </div>
      </div>
    </div>
  );
}

export default ShowRandom;

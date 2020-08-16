import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {WordForm} from './utils';
import './table.scss';

interface ComponentProps {
  words: WordForm[];
  onTableClose: () => void;
}
type Props = ComponentProps & WithBemProps;

class Table extends React.Component<Props, any> {
  goBack = () => {
    const {
      onTableClose,
    } = this.props;

    onTableClose();
  };

  render() {
    const {
      words,
      bem,
    } = this.props;

    const $table = words.map(word => {
      return (
        <tr className={bem.element('row')} key={word.forms.join('-')}>
          {word.forms.map(form => {
            return (
              <td className={bem.element('col')} key={form}>{form}</td>
            )
          })}
        </tr>
      );
    })

    const $backButton = <button className={bem.element('back-button')} type="button" onClick={this.goBack}>Go back ⬅️</button>;

    return (
      <div className={bem.block()}>
        <div className={bem.element('button-block')}>
          {$backButton}
        </div>
        <table className={bem.element('table')}>
          {$table}
        </table>
        <div className={bem.element('button-block')}>
          {$backButton}
        </div>
      </div>
    );
  }
}

export default withThemedBem('irregular-table')(Table);

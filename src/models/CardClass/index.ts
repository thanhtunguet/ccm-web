import {CardClass} from './CardClass';
import {ObjectField} from 'react3l';
import {Bank} from 'src/models/Bank';

ObjectField(Bank)(CardClass.prototype, nameof(CardClass.prototype.bank));

export * from './CardClass';

export * from './CardClassFilter';

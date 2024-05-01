import {Transaction} from './Transaction';

import {ObjectField} from 'react3l';

import {TransactionStatus} from 'src/models/TransactionStatus';

import {Store} from 'src/models/Store';

ObjectField(TransactionStatus)(Transaction.prototype, nameof(Transaction.prototype.status));

ObjectField(Store)(Transaction.prototype, nameof(Transaction.prototype.store));

export * from './Transaction';

export * from './TransactionFilter';
  
  

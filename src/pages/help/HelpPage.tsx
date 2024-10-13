import BankHelp from '../docs/BankHelp.md';
import CardClassHelp from '../docs/CardClassHelp.md';
import CardHelp from '../docs/CardHelp.md';
import CustomerHelp from '../docs/CustomerHelp.md';
import StoreHelp from '../docs/StoreHelp.md';
import TransactionHelp from '../docs/TransactionHelp.md';
import './HelpPage.scss';

const HelpPage = () => {
  return (
    <div>
      <div id="bank">
        <BankHelp />
      </div>

      <div id="card">
        <CardHelp />
      </div>

      <div id="card-class">
        <CardClassHelp />
      </div>

      <div id="customer">
        <CustomerHelp />
      </div>

      <div id="store">
        <StoreHelp />
      </div>

      <div id="transaction">
        <TransactionHelp />
      </div>
    </div>
  );
};

export default HelpPage;

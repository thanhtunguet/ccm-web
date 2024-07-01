import BankHelp from './BankHelp.md';
import CardClassHelp from './CardClassHelp.md';
import CardHelp from './CardHelp.md';
import CustomerHelp from './CustomerHelp.md';
import './HelpPage.scss';
import StoreHelp from './StoreHelp.md';
import TransactionHelp from './TransactionHelp.md';

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

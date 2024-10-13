import {Card, Col, DatePicker, Row} from 'antd';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {firstValueFrom} from 'rxjs';
import RevenueDonutChart from '../components/RevenueDonutChart';
import {Transaction, TransactionFilter} from '../models/Transaction';
import {TransactionStatus} from '../models/TransactionStatus';
import {transactionRepository} from '../repositories/transaction-repository';

const HomeDashboard: React.FC = () => {
  const [completedAmount, setCompletedAmount] = useState<number>(0);
  const [pendingAmount, setPendingAmount] = useState<number>(0);

  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());

  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [pendingMonthlyRevenue, setPendingMonthlyRevenue] = useState<number>(0);

  const fetchTransactions = React.useCallback(async () => {
    try {
      const transactions = await firstValueFrom(
        transactionRepository.list(new TransactionFilter()),
      );

      const completed = transactions
        .filter((t: Transaction) => t.statusId === TransactionStatus.DONE)
        .reduce((sum: number, t: Transaction) => sum + (t.amount || 0), 0);

      const pending = transactions
        .filter((t: Transaction) => t.statusId !== TransactionStatus.DONE)
        .reduce((sum: number, t: Transaction) => sum + (t.amount || 0), 0);

      const monthlyCompleted = transactions
        .filter(
          (t: Transaction) =>
            t.statusId === TransactionStatus.DONE &&
            t.createdAt &&
            dayjs(t.createdAt.toDate()).isSame(selectedMonth, 'month'),
        )
        .reduce((sum: number, t: Transaction) => sum + (t.amount || 0), 0);

      const monthlyPending = transactions
        .filter(
          (t: Transaction) =>
            t.statusId !== TransactionStatus.DONE &&
            t.createdAt &&
            dayjs(t.createdAt.toDate()).isSame(selectedMonth, 'month'),
        )
        .reduce((sum: number, t: Transaction) => sum + (t.amount || 0), 0);

      setCompletedAmount(completed);
      setPendingAmount(pending);
      setMonthlyRevenue(monthlyCompleted);
      setPendingMonthlyRevenue(monthlyPending);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card
          title="Tổng quan doanh thu"
          bordered={false}>
          <RevenueDonutChart
            completedAmount={completedAmount}
            pendingAmount={pendingAmount}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="Doanh thu tháng"
          bordered={false}>
          <DatePicker
            value={selectedMonth}
            picker="month"
            onChange={(date) => {
              setSelectedMonth(date);
            }}
            placeholder="Select month"
          />
          <RevenueDonutChart
            completedAmount={monthlyRevenue}
            pendingAmount={pendingMonthlyRevenue}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default HomeDashboard;

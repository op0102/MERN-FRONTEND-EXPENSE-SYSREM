import React from 'react';
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {

    // category
    const categories = ['salary', 'tip', 'project', 'food', 'movie', 'bills', 'medical', 'fee', 'tax', 'travel', 'grocery', 'personal-stuf', 'room-rent', 'online-order'];


    //total transaction
    const totalTransaction = allTransaction.length;

    const totalIncomeTransaction = allTransaction.filter((transaction) => transaction.type === "income");

    const totalExpenseTransaction = allTransaction.filter((transaction) => transaction.type === "expense");

    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;

    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100;

    // total turnover
    const totalTurnOver = allTransaction.reduce((accumulate, transaction) => transaction.amount + accumulate, 0);

    const totalIncomeTurnOver = allTransaction
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenseTurnOver = allTransaction
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnOverPercent = (totalIncomeTurnOver / totalTurnOver) * 100;

    const totalExpenseTurnOverPercent = (totalExpenseTurnOver / totalTurnOver) * 100;


    return (
        <>
            <div className='main row m-4'>


                <div className='col-sm-3'>
                    <div className='totaltrans card'>
                        <div className='card-header'>
                            <h4>Total Transaction : {totalTransaction}</h4>
                        </div>
                        <div className='card-body d-flex'>
                            <div className="mx-2">
                                <h5 className='text-success'>Income : {totalIncomeTransaction.length}
                                </h5>
                                <Progress type='circle'
                                    strokeColor={"green"}
                                    className='mx-2'
                                    percent={totalIncomePercent.toFixed(0)} width={80} height={80} />
                            </div>

                            <div>
                                <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                                <Progress type='circle'
                                    strokeColor={"red"}
                                    className='mx-2'
                                    percent={totalExpensePercent.toFixed(0)} width={80} height={80} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-sm-3'>
                    <div className='totaltrans card'>
                        <div className='card-header'>
                            <h4>Total TurnOver : {totalTurnOver} Rs.</h4>
                        </div>
                        <div className='card-body d-flex'>
                            <div className='mx-3'>
                                <h5 className='text-success'>Total Income </h5>
                                <h5>{totalIncomeTurnOver} Rs.</h5>
                                <Progress type='circle'
                                    strokeColor={"green"}
                                    className='mx-2'
                                    percent={totalIncomeTurnOverPercent.toFixed(0)} width={80} height={80}
                                />
                            </div>
                            <div>
                                <h5 className='text-danger'>Total Expense </h5>
                                <h5>{totalExpenseTurnOver} Rs.</h5>
                                <Progress type='circle'
                                    strokeColor={"red"}
                                    className='mx-2'
                                    percent={totalExpenseTurnOverPercent.toFixed(0)} width={80} height={80} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className='col-sm-3'>

                    <div className='totaltrans card'>
                        <div className='card-header'>
                            <h4> Categorywise Income</h4>
                        </div>
                        <div className='card-body'>
                            {
                                categories.map((category) => {
                                    const amount = allTransaction
                                        .filter((transaction) => transaction.type === 'income' && transaction.category === category
                                        )
                                        .reduce((acc, transaction) => acc + transaction.amount, 0);
                                    return (
                                        amount > 0 && (
                                            <div>
                                                <div className='catcard'>
                                                    <div className='d-flex'>
                                                        <h5 className='catcard1'>{category}
                                                        </h5> <Progress type='line' percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)} strokeWidth={5} />
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='col-sm-3'>

                    <div className='totaltrans card'>
                        <div className='card-header'>
                            <h4> Categorywise Expense</h4>
                        </div>
                        <div className='card-body'>
                            {
                                categories.map((category) => {
                                    const amount = allTransaction
                                        .filter((transaction) => transaction.type === 'expense' && transaction.category === category
                                        )
                                        .reduce((acc, transaction) => acc + transaction.amount, 0);
                                    return (
                                        amount > 0 && (
                                            <div>
                                                <div className='catcard'>
                                                    <div className='d-flex'>
                                                        <h5 className='catcard1'>{category}
                                                        </h5>
                                                        <Progress percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)} strokeWidth={5} />
                                                    </div>


                                                </div>

                                            </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>









            </div>


            {/* <div className='col-md-4'>
                <div className='totaltrans card'>
                    <div className='card-header'>
                        <h4> Categorywise Income</h4>
                    </div>
                    <div className='card-body'>
                        {
                            categories.map((category) => {
                                const amount = allTransaction
                                    .filter((transaction) => transaction.type === 'income' && transaction.category === category
                                    )
                                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    amount > 0 && (
                                        <div>
                                            <div className='catcard'>
                                                <h5>{category}</h5>
                                                <Progress percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)} />
                                            </div>

                                        </div>
                                    )
                                )
                            })
                        }
                    </div>
                </div>
            </div> */}
















































        </>
    )
}

export default Analytics
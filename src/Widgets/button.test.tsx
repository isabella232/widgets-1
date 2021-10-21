import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'
import React from 'react'
import PaymentPlanWidget from './PaymentPlan'
import { ApiMode } from 'consts'
jest.mock('utils/fetch', () => {
  return {
    fetchFromApi: async () => [
      {
        customer_total_cost_amount: 0,
        customer_total_cost_bps: 0,
        deferred_days: 0,
        deferred_months: 1,
        eligible: true,
        installments_count: 1,
        payment_plan: [
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1637498000,
            purchase_amount: 45000,
            total_amount: 45000,
          },
        ],
        purchase_amount: 45000,
      },
      {
        customer_total_cost_amount: 0,
        customer_total_cost_bps: 0,
        deferred_days: 0,
        deferred_months: 0,
        eligible: true,
        installments_count: 1,
        payment_plan: [
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1634819600,
            purchase_amount: 45000,
            total_amount: 45000,
          },
        ],
        purchase_amount: 45000,
      },
      {
        customer_total_cost_amount: 135,
        customer_total_cost_bps: 30,
        deferred_days: 0,
        deferred_months: 0,
        eligible: true,
        installments_count: 3,
        payment_plan: [
          {
            customer_fee: 135,
            customer_interest: 0,
            due_date: 1634819600,
            purchase_amount: 15000,
            total_amount: 15135,
          },
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1637498000,
            purchase_amount: 15000,
            total_amount: 15000,
          },
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1640090000,
            purchase_amount: 15000,
            total_amount: 15000,
          },
        ],
        purchase_amount: 45000,
      },
      {
        customer_total_cost_amount: 1202,
        customer_total_cost_bps: 267,
        deferred_days: 0,
        deferred_months: 0,
        eligible: true,
        installments_count: 4,
        payment_plan: [
          {
            customer_fee: 1202,
            customer_interest: 0,
            due_date: 1634819600,
            purchase_amount: 11250,
            total_amount: 12452,
          },
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1637498000,
            purchase_amount: 11250,
            total_amount: 11250,
          },
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1640090000,
            purchase_amount: 11250,
            total_amount: 11250,
          },
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1642768400,
            purchase_amount: 11250,
            total_amount: 11250,
          },
        ],
        purchase_amount: 45000,
      },
      {
        annual_interest_rate: 1719,
        customer_total_cost_amount: 2667,
        customer_total_cost_bps: 593,
        deferred_days: 0,
        deferred_months: 0,
        eligible: true,
        installments_count: 10,
        payment_plan: [
          {
            customer_fee: 0,
            customer_interest: 0,
            due_date: 1634819600,
            purchase_amount: 4773,
            refunded_interest: 0,
            total_amount: 4773,
          },
          {
            customer_fee: 0,
            customer_interest: 492,
            due_date: 1637498000,
            purchase_amount: 4274,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 472,
            due_date: 1640090000,
            purchase_amount: 4294,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 429,
            due_date: 1642768400,
            purchase_amount: 4337,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 371,
            due_date: 1645446800,
            purchase_amount: 4395,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 281,
            due_date: 1647866000,
            purchase_amount: 4485,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 250,
            due_date: 1650544400,
            purchase_amount: 4516,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 183,
            due_date: 1653136400,
            purchase_amount: 4583,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 127,
            due_date: 1655814800,
            purchase_amount: 4639,
            refunded_interest: 0,
            total_amount: 4766,
          },
          {
            customer_fee: 0,
            customer_interest: 62,
            due_date: 1658406800,
            purchase_amount: 4704,
            refunded_interest: 0,
            total_amount: 4766,
          },
        ],
        purchase_amount: 45000,
      },
    ],
  }
})
jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01').getTime())
describe('Button', () => {
  beforeEach(async () => {
    render(
      <PaymentPlanWidget
        purchaseAmount={40000}
        apiData={{ domain: ApiMode.TEST, merchantId: '11gKoO333vEXacMNMUMUSc4c4g68g2Les4' }}
      />,
    )
    await waitFor(() => expect(screen.getByTestId('widget-button')).toBeInTheDocument())
  })
  it('displays the button', () => {
    expect(screen.getByTestId('widget-button')).toBeInTheDocument()
  })

  it('displays all available payment plans', () => {
    expect(screen.getByText('J+30')).toBeInTheDocument()
    expect(screen.getByText('1x')).toBeInTheDocument()
    expect(screen.getByText('3x')).toBeInTheDocument()
    expect(screen.getByText('4x')).toBeInTheDocument()
    expect(screen.getByText('10x')).toBeInTheDocument()
  })
  it('display iterates on each message every 3 seconds then returns to the beginning', () => {
    expect(screen.getByText('450 € à payer le 31 janvier')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('1 mensualités de 450 € (sans frais)')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('3 mensualités de 150 € (+ frais)')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('4 mensualités de 112.5 € (+ frais)')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('10 mensualités de 47.73 € (+ frais)')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('450 € à payer le 31 janvier')).toBeInTheDocument()
  })
  it('displays the message corresponding to the payment plan hovered', () => {
    expect(screen.getByText('450 € à payer le 31 janvier')).toBeInTheDocument()
    act(() => {
      fireEvent.mouseOver(screen.getByText('3x'))
    })
    expect(screen.getByText('3 mensualités de 150 € (+ frais)')).toBeInTheDocument()
    act(() => {
      fireEvent.mouseOver(screen.getByText('10x'))
    })
    expect(screen.getByText('10 mensualités de 47.73 € (+ frais)')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
  })
  it('Stops iterating when a element has been hovered', () => {
    act(() => {
      fireEvent.mouseOver(screen.getByText('3x'))
    })
    expect(screen.getByText('3 mensualités de 150 € (+ frais)')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('3 mensualités de 150 € (+ frais)')).toBeInTheDocument()
  })
  //TODO test modal open
})

import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

 const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
 };

 return (
    <div className={styles.container}>
      <Head>
        <title>Payment Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Payment Method</h1>

        <label htmlFor="paymentMethod">Choose a payment method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={selectedPaymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value="">Select a payment method</option>
          <option value="wallet">Pay with Wallet</option>
          <option value="creditCard">Pay with Credit Card</option>
          <option value="cashOnDelivery">Cash on Delivery</option>
        </select>

        {selectedPaymentMethod === 'creditCard' && (
          <div>
            <p>Please enter your credit card details:</p>
            {/* Include a form for collecting credit card details here */}
          </div>
        )}
      </main>
    </div>
 );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await axios.get('http://localhost:3000/invoices');
      setInvoices(response.data);
    };
    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.invoice_id}>
            User ID: {invoice.user_id}, Amount: ${invoice.amount}, Date: {invoice.issued_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;

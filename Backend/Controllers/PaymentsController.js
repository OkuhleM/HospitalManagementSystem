const { Payment, invoices } = require("../Models/index");

const createPayment = async (req, res) => {
  try {
    const { invoice_id, amount, payment_method } = req.body;

    let sanitisedAmount = parseFloat(amount.toString().replace(",", ".")); // sanitize commas

    const invoice = await invoices.findOne({
      where: { invoice_id: `${invoice_id}` },
    });
    console.log("invoice: ", invoice);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const payment = await Payment.create({
      invoice_id,
      amount: sanitisedAmount,
      payment_method,
    });

    // calculate outstanding balance
    const results = await Payment.sequelize.query(
      `
      SELECT i.total_amount, COALESCE(SUM(p.amount), 0) as total_paid
      FROM invoices i
      LEFT JOIN payments p ON i.invoice_id = p.invoice_id
      WHERE i.invoice_id = ?
      GROUP BY i.invoice_id
      `,
      { replacements: [invoice_id] }
    );

    const outstanding = results[0].total_amount - results[0].total_paid;

    // update invoice status
    await invoice.update({
      status: outstanding === 0 ? "paid" : "unpaid",
    });

    res.status(201).json({
      message: "Payment recorded successfully",
      payment,
      outstanding_balance: outstanding,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// get payments for an invoice
const getPaymentsByInvoice = async (req, res) => {
  try {
    const { invoice_id } = req.params;
    const payments = await Payment.findAll({ where: { invoice_id } });
    res.status(200).json({ message: "Payments found", payments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

const getPayments = async (req, res) => {
  try {
    const allPayments = await Payment.findAll();
    console.log("all payments", allPayments);
    res.status(200).json({ message: "found Payments: ", allPayments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};
module.exports = { createPayment, getPaymentsByInvoice, getPayments };

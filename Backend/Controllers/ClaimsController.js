const { Claim, invoices } = require("../Models/index");

// create a claim
const createClaim = async (req, res) => {
  try {
    let { invoice_id, insurance_id, claim_amount, status, submitted_at,processed_at} = req.body;
    claim_amount = parseFloat(claim_amount.toString().replace(",", "."));

    // const invoice = await invoices.findByPk(invoice_id);
    // if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const claim = await Claim.create({
      invoice_id,
      insurance_id,
      claim_amount,
      status,
      submitted_at,
      processed_at
    });
console.log("claim", claim)
    res.status(201).json({ message: "Claim submitted successfully", claim });
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Error creating claim", error });
  }
};

// update claim status
const updateClaimStatus = async (req, res) => {
  try {
    const { claim_id } = req.params;
    const { status } = req.body;

    const claim = await Claim.findByPk(claim_id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    await claim.update({
      status,
      processed_at: new Date(),
    });
console.log("claims:", claim)
    res.status(200).json({ message: "Claim status updated", claim });
  } catch (error) {
    res.status(500).json({ message: "Error updating claim", error });
  }
};

// get all claims
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.status(200).json({ message: "Claims fetched", claims });
  } catch (error) {
    res.status(500).json({ message: "Error fetching claims", error });
  }
};

const getASingleClaim = async (req, res) => {
  const { claim_id} = req.params
  try {
    const claims = await Claim.findOne({where: {claim_id: `${claim_id}`}});
    console.log('claims', claims)
    res.status(200).json({ message: "Claims fetched", claims });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: "Error fetching claims", error });
  }
};

module.exports = { createClaim, updateClaimStatus, getAllClaims, getASingleClaim };
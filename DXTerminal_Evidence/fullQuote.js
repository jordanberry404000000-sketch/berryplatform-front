import { Router } from "express";
import axios from "axios";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const { sellToken, buyToken, amount, userAddress } = req.body;
        if (!sellToken || !buyToken || !amount || !userAddress) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        // STEP 1 — Quote
        const quoteUrl = "https://api.odos.xyz/sor/quote/v2";
        const quoteBody = {
            chainId: 8453,
            inputTokens: [
                {
                    tokenAddress: sellToken,
                    amount: amount
                }
            ],
            outputTokens: [
                {
                    tokenAddress: buyToken,
                    proportion: 1
                }
            ],
            userAddr: userAddress,
            slippageLimitPercent: 1,
            // ⭐ FEE SYSTEM — 0.15% fee routed to your Base wallet
            partnerFeePercent: 0.15,
            partnerFeeRecipient: "0x767fE3f2c844DB013E03DcfDd537B44b2Ba641Db",
            // ⭐ REQUIRED — RFQs ignore partner fees unless disabled
            disableRFQs: true,
            // ⭐ OPTION A — FORCE AGGREGATION (SOR) SO FEES ACTUALLY APPLY
            forceAggregation: true
        };
        const quoteResponse = await axios.post(quoteUrl, quoteBody);
        const quote = quoteResponse.data;
        const pathId = quote.pathId;
        // STEP 2 — Assemble
        const assembleUrl = "https://api.odos.xyz/sor/assemble";
        const assembleBody = {
            userAddr: userAddress,
            pathId,
            simulate: false
        };
        const assembleResponse = await axios.post(assembleUrl, assembleBody);
        const swapTx = assembleResponse.data;
        res.json({ quote, swapTx });
    }
    catch (err) {
        console.error("Full quote error:", err.response?.data || err.message);
        res.status(500).json({ error: "Full quote failed" });
    }
});
// ⭐ REQUIRED EXPORT
export default router;

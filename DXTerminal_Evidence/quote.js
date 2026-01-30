import { Router } from "express";
import axios from "axios";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const { sellToken, buyToken, amount } = req.query;
        if (!sellToken || !buyToken || !amount) {
            return res.status(400).json({ error: "Missing parameters" });
        }
        const url = "https://api.odos.xyz/sor/quote/v2";
        const body = {
            chainId: 8453, // Base
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
            userAddr: "0x0000000000000000000000000000000000000000",
            slippageLimitPercent: 1
        };
        const response = await axios.post(url, body);
        res.json(response.data);
    }
    catch (err) {
        console.error("Quote error:", err.response?.data || err.message);
        res.status(500).json({ error: "Quote failed" });
    }
});
export default router;

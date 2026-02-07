import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CurrenciesResource extends BaseResource {
    exchangeRates(params: RequestBody<"currencies.exchangeRates">): Promise<{
        data?: {
            code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR";
            symbol?: string;
            name?: string;
            exchange_rate?: number;
        }[];
    }>;
}
//# sourceMappingURL=currencies.d.ts.map
import type { RequestBody } from "../types/common.js";
import { BaseResource } from "./base.js";
export declare class CurrenciesResource extends BaseResource {
    exchangeRates(params: RequestBody<"currencies.exchangeRates">): Promise<{
        data?: {
            code?: "BAM" | "CAD" | "CHF" | "CLP" | "CNY" | "COP" | "CZK" | "DKK" | "EUR" | "GBP" | "INR" | "ISK" | "JPY" | "MAD" | "MXN" | "NOK" | "PEN" | "PLN" | "RON" | "SEK" | "TRY" | "USD" | "ZAR" | undefined;
            symbol?: string | undefined;
            name?: string | undefined;
            exchange_rate?: number | undefined;
        }[] | undefined;
    }>;
}
//# sourceMappingURL=currencies.d.ts.map
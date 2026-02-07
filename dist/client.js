import { TeamleaderAuthenticationError, TeamleaderError, TeamleaderNetworkError, TeamleaderRateLimitError, TeamleaderValidationError, } from "./errors.js";
import { refreshTokens } from "./oauth.js";
import { ActivityTypesResource } from "./resources/activity-types.js";
import { BookkeepingSubmissionsResource } from "./resources/bookkeeping-submissions.js";
import { BusinessTypesResource } from "./resources/business-types.js";
import { CallsResource } from "./resources/calls.js";
import { ClosingDaysResource } from "./resources/closing-days.js";
import { CommercialDiscountsResource } from "./resources/commercial-discounts.js";
import { CompaniesResource } from "./resources/companies.js";
import { ContactsResource } from "./resources/contacts.js";
import { CreditNotesResource } from "./resources/credit-notes.js";
import { CurrenciesResource } from "./resources/currencies.js";
import { CustomFieldDefinitionsResource } from "./resources/custom-field-definitions.js";
import { DayOffTypesResource } from "./resources/day-off-types.js";
import { DaysOffResource } from "./resources/days-off.js";
import { DealPhasesResource } from "./resources/deal-phases.js";
import { DealSourcesResource } from "./resources/deal-sources.js";
import { DealsResource } from "./resources/deals.js";
import { DepartmentsResource } from "./resources/departments.js";
import { DocumentTemplatesResource } from "./resources/document-templates.js";
import { EmailTrackingResource } from "./resources/email-tracking.js";
import { EventsResource } from "./resources/events.js";
import { ExpensesResource } from "./resources/expenses.js";
import { ExternalPartiesResource } from "./resources/external-parties.js";
import { FilesResource } from "./resources/files.js";
import { IncomingCreditNotesResource } from "./resources/incoming-credit-notes.js";
import { IncomingInvoicesResource } from "./resources/incoming-invoices.js";
import { InvoicesResource } from "./resources/invoices.js";
import { LostReasonsResource } from "./resources/lost-reasons.js";
import { MailTemplatesResource } from "./resources/mail-templates.js";
import { MeetingsResource } from "./resources/meetings.js";
import { MigrateResource } from "./resources/migrate.js";
import { NotesResource } from "./resources/notes.js";
import { OrdersResource } from "./resources/orders.js";
import { PaymentMethodsResource } from "./resources/payment-methods.js";
import { PaymentTermsResource } from "./resources/payment-terms.js";
import { PlannableItemsResource } from "./resources/plannable-items.js";
import { PriceListsResource } from "./resources/price-lists.js";
import { ProductCategoriesResource } from "./resources/product-categories.js";
import { ProductsResource } from "./resources/products.js";
import { ProjectLinesResource } from "./resources/project-lines.js";
import { ProjectMaterialsResource } from "./resources/project-materials.js";
import { ProjectTasksResource } from "./resources/project-tasks.js";
import { ProjectsResource } from "./resources/projects.js";
import { QuotationsResource } from "./resources/quotations.js";
import { ReceiptsResource } from "./resources/receipts.js";
import { ReservationsResource } from "./resources/reservations.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
import { TagsResource } from "./resources/tags.js";
import { TasksResource } from "./resources/tasks.js";
import { TaxRatesResource } from "./resources/tax-rates.js";
import { TeamsResource } from "./resources/teams.js";
import { TicketStatusResource } from "./resources/ticket-status.js";
import { TicketsResource } from "./resources/tickets.js";
import { TimeTrackingResource } from "./resources/time-tracking.js";
import { TimersResource } from "./resources/timers.js";
import { UserAvailabilityResource } from "./resources/user-availability.js";
import { UsersResource } from "./resources/users.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { WithholdingTaxRatesResource } from "./resources/withholding-tax-rates.js";
import { WorkTypesResource } from "./resources/work-types.js";
const DEFAULT_BASE_URL = "https://api.focus.teamleader.eu";
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_RETRIES = 3;
export class TeamleaderClient {
    accessToken;
    refreshToken;
    clientId;
    clientSecret;
    onTokenRefresh;
    baseUrl;
    fetchFn;
    timeout;
    maxRetries;
    // Mutex for token refresh — prevents multiple concurrent refreshes
    refreshPromise = null;
    // Resources
    activityTypes;
    bookkeepingSubmissions;
    businessTypes;
    calls;
    closingDays;
    commercialDiscounts;
    companies;
    contacts;
    creditNotes;
    currencies;
    customFieldDefinitions;
    dayOffTypes;
    daysOff;
    dealPhases;
    dealSources;
    deals;
    departments;
    documentTemplates;
    emailTracking;
    events;
    expenses;
    externalParties;
    files;
    incomingCreditNotes;
    incomingInvoices;
    invoices;
    lostReasons;
    mailTemplates;
    meetings;
    migrate;
    notes;
    orders;
    paymentMethods;
    paymentTerms;
    plannableItems;
    priceLists;
    productCategories;
    products;
    projectLines;
    projectMaterials;
    projectTasks;
    projects;
    quotations;
    receipts;
    reservations;
    subscriptions;
    tags;
    tasks;
    taxRates;
    teams;
    ticketStatus;
    tickets;
    timeTracking;
    timers;
    userAvailability;
    users;
    webhooks;
    withholdingTaxRates;
    workTypes;
    constructor(config) {
        this.accessToken = config.accessToken;
        this.refreshToken = config.refreshToken;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.onTokenRefresh = config.onTokenRefresh;
        this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
        this.fetchFn = config.fetch ?? globalThis.fetch.bind(globalThis);
        this.timeout = config.timeout ?? DEFAULT_TIMEOUT_MS;
        this.maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;
        // Warn if clientSecret is used in browser context
        if (config.clientSecret && typeof globalThis.window !== "undefined") {
            console.warn("[teamleader-focus-sdk] WARNING: clientSecret should not be used in browser environments. " +
                "Use server-side code for OAuth2 token exchange and refresh.");
        }
        // Initialize resources
        this.activityTypes = new ActivityTypesResource(this);
        this.bookkeepingSubmissions = new BookkeepingSubmissionsResource(this);
        this.businessTypes = new BusinessTypesResource(this);
        this.calls = new CallsResource(this);
        this.closingDays = new ClosingDaysResource(this);
        this.commercialDiscounts = new CommercialDiscountsResource(this);
        this.companies = new CompaniesResource(this);
        this.contacts = new ContactsResource(this);
        this.creditNotes = new CreditNotesResource(this);
        this.currencies = new CurrenciesResource(this);
        this.customFieldDefinitions = new CustomFieldDefinitionsResource(this);
        this.dayOffTypes = new DayOffTypesResource(this);
        this.daysOff = new DaysOffResource(this);
        this.dealPhases = new DealPhasesResource(this);
        this.dealSources = new DealSourcesResource(this);
        this.deals = new DealsResource(this);
        this.departments = new DepartmentsResource(this);
        this.documentTemplates = new DocumentTemplatesResource(this);
        this.emailTracking = new EmailTrackingResource(this);
        this.events = new EventsResource(this);
        this.expenses = new ExpensesResource(this);
        this.externalParties = new ExternalPartiesResource(this);
        this.files = new FilesResource(this);
        this.incomingCreditNotes = new IncomingCreditNotesResource(this);
        this.incomingInvoices = new IncomingInvoicesResource(this);
        this.invoices = new InvoicesResource(this);
        this.lostReasons = new LostReasonsResource(this);
        this.mailTemplates = new MailTemplatesResource(this);
        this.meetings = new MeetingsResource(this);
        this.migrate = new MigrateResource(this);
        this.notes = new NotesResource(this);
        this.orders = new OrdersResource(this);
        this.paymentMethods = new PaymentMethodsResource(this);
        this.paymentTerms = new PaymentTermsResource(this);
        this.plannableItems = new PlannableItemsResource(this);
        this.priceLists = new PriceListsResource(this);
        this.productCategories = new ProductCategoriesResource(this);
        this.products = new ProductsResource(this);
        this.projectLines = new ProjectLinesResource(this);
        this.projectMaterials = new ProjectMaterialsResource(this);
        this.projectTasks = new ProjectTasksResource(this);
        this.projects = new ProjectsResource(this);
        this.quotations = new QuotationsResource(this);
        this.receipts = new ReceiptsResource(this);
        this.reservations = new ReservationsResource(this);
        this.subscriptions = new SubscriptionsResource(this);
        this.tags = new TagsResource(this);
        this.tasks = new TasksResource(this);
        this.taxRates = new TaxRatesResource(this);
        this.teams = new TeamsResource(this);
        this.ticketStatus = new TicketStatusResource(this);
        this.tickets = new TicketsResource(this);
        this.timeTracking = new TimeTrackingResource(this);
        this.timers = new TimersResource(this);
        this.userAvailability = new UserAvailabilityResource(this);
        this.users = new UsersResource(this);
        this.webhooks = new WebhooksResource(this);
        this.withholdingTaxRates = new WithholdingTaxRatesResource(this);
        this.workTypes = new WorkTypesResource(this);
    }
    /**
     * Make an authenticated POST request to the Teamleader API.
     * Handles token refresh, rate limiting, and error mapping.
     */
    async request(endpoint, body) {
        return this.requestWithRetry(endpoint, body, false);
    }
    async requestWithRetry(endpoint, body, isRetryAfterRefresh, retryCount = 0) {
        const url = new URL(endpoint, this.baseUrl);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        let response;
        try {
            response = await this.fetchFn(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.accessToken}`,
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
        }
        catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new TeamleaderNetworkError(new Error(`Request timed out after ${this.timeout}ms`));
            }
            throw new TeamleaderNetworkError(error);
        }
        finally {
            clearTimeout(timeoutId);
        }
        // 204 No Content — success with no body (delete/update operations)
        if (response.status === 204) {
            return undefined;
        }
        // 401 Unauthorized — attempt token refresh (once)
        if (response.status === 401 && !isRetryAfterRefresh) {
            if (this.canRefreshToken()) {
                await this.performTokenRefresh();
                return this.requestWithRetry(endpoint, body, true, retryCount);
            }
            throw new TeamleaderAuthenticationError(await this.safeParseBody(response));
        }
        // 429 Rate Limited — retry with backoff
        if (response.status === 429 && retryCount < this.maxRetries) {
            const retryAfter = this.parseRetryAfter(response);
            const waitMs = retryAfter.getTime() - Date.now();
            if (waitMs > 0) {
                await this.sleep(waitMs);
            }
            return this.requestWithRetry(endpoint, body, isRetryAfterRefresh, retryCount + 1);
        }
        // 500/502/503 Server Error — retry with exponential backoff
        if ((response.status === 500 || response.status === 502 || response.status === 503) && retryCount < this.maxRetries) {
            const backoffMs = Math.min(1000 * 2 ** retryCount, 10_000);
            await this.sleep(backoffMs);
            return this.requestWithRetry(endpoint, body, isRetryAfterRefresh, retryCount + 1);
        }
        // Parse response body
        const contentType = response.headers.get("content-type") ?? "";
        if (!response.ok) {
            const errorBody = await this.safeParseBody(response);
            if (response.status === 429) {
                throw new TeamleaderRateLimitError(this.parseRetryAfter(response), errorBody);
            }
            if (response.status === 401) {
                throw new TeamleaderAuthenticationError(errorBody);
            }
            if (response.status === 400 || response.status === 422) {
                throw new TeamleaderValidationError(response.status, errorBody);
            }
            throw new TeamleaderError(`API request failed: ${response.status}`, response.status, errorBody);
        }
        if (!contentType.includes("application/json")) {
            return undefined;
        }
        return (await response.json());
    }
    canRefreshToken() {
        return !!(this.refreshToken && this.clientId && this.clientSecret);
    }
    /**
     * Performs token refresh with mutex — only one refresh at a time.
     * Concurrent requests that hit 401 will wait for the same refresh.
     */
    async performTokenRefresh() {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }
        this.refreshPromise = (async () => {
            try {
                const tokens = await refreshTokens({
                    refreshToken: this.refreshToken,
                    clientId: this.clientId,
                    clientSecret: this.clientSecret,
                    fetch: this.fetchFn,
                });
                this.accessToken = tokens.access_token;
                this.refreshToken = tokens.refresh_token;
                if (this.onTokenRefresh) {
                    try {
                        await this.onTokenRefresh(tokens);
                    }
                    catch (callbackError) {
                        // Log but don't fail the request — tokens are already updated in memory.
                        // The user's callback (e.g. DB write) failed, but the API request can still proceed.
                        console.error("[teamleader-focus-sdk] onTokenRefresh callback failed:", callbackError);
                    }
                }
            }
            finally {
                this.refreshPromise = null;
            }
        })();
        return this.refreshPromise;
    }
    parseRetryAfter(response) {
        const resetHeader = response.headers.get("X-RateLimit-Reset");
        if (resetHeader) {
            const resetTime = Number(resetHeader);
            if (!isNaN(resetTime)) {
                // Could be epoch seconds or ms — if < year 2000 in ms, treat as seconds
                return new Date(resetTime > 1e12 ? resetTime : resetTime * 1000);
            }
        }
        // Fallback: retry after 1 second
        return new Date(Date.now() + 1000);
    }
    async safeParseBody(response) {
        const contentType = response.headers.get("content-type") ?? "";
        try {
            if (contentType.includes("application/json")) {
                return await response.json();
            }
            return await response.text();
        }
        catch {
            return null;
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
//# sourceMappingURL=client.js.map
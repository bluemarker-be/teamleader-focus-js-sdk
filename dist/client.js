import { TeamleaderFocusAuthenticationError, TeamleaderFocusError, TeamleaderFocusNetworkError, TeamleaderFocusRateLimitError, TeamleaderFocusValidationError, } from "./errors.js";
import { refreshTokens } from "./oauth.js";
import { paginatePages, paginateItems } from "./paginator.js";
import { AccountsResource } from "./resources/accounts.js";
import { ActivityTypesResource } from "./resources/activity-types.js";
import { BookkeepingSubmissionsResource } from "./resources/bookkeeping-submissions.js";
import { BusinessTypesResource } from "./resources/business-types.js";
import { CallOutcomesResource } from "./resources/call-outcomes.js";
import { CallsResource } from "./resources/calls.js";
import { ClosingDaysResource } from "./resources/closing-days.js";
import { CloudPlatformsResource } from "./resources/cloud-platforms.js";
import { CommercialDiscountsResource } from "./resources/commercial-discounts.js";
import { CompaniesResource } from "./resources/companies.js";
import { ContactsResource } from "./resources/contacts.js";
import { CreditNotesResource } from "./resources/credit-notes.js";
import { CurrenciesResource } from "./resources/currencies.js";
import { CustomFieldDefinitionsResource } from "./resources/custom-field-definitions.js";
import { DayOffTypesResource } from "./resources/day-off-types.js";
import { DaysOffResource } from "./resources/days-off.js";
import { DealPhasesResource } from "./resources/deal-phases.js";
import { DealPipelinesResource } from "./resources/deal-pipelines.js";
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
import { LegacyMilestonesResource } from "./resources/legacy-milestones.js";
import { LegacyProjectsResource } from "./resources/legacy-projects.js";
import { LevelTwoAreasResource } from "./resources/level-two-areas.js";
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
import { ProjectGroupsResource } from "./resources/project-groups.js";
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
import { UnitsOfMeasureResource } from "./resources/units-of-measure.js";
import { UserAvailabilityResource } from "./resources/user-availability.js";
import { UsersResource } from "./resources/users.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { WithholdingTaxRatesResource } from "./resources/withholding-tax-rates.js";
import { WorkTypesResource } from "./resources/work-types.js";
const DEFAULT_BASE_URL = "https://api.focus.teamleader.eu";
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_RETRIES = 3;
/** Bumped in lockstep with package.json. Sent as the default User-Agent. */
export const SDK_VERSION = "1.0.0";
const DEFAULT_USER_AGENT = `teamleader-focus-js-sdk/${SDK_VERSION}`;
export class TeamleaderFocusClient {
    accessToken;
    refreshToken;
    clientId;
    clientSecret;
    onTokenRefresh;
    getTokensFn;
    baseUrl;
    fetchFn;
    timeout;
    maxRetries;
    apiVersion;
    userAgent;
    clientSignal;
    // Mutex for token refresh — prevents multiple concurrent refreshes
    refreshPromise = null;
    // Resources
    accounts;
    activityTypes;
    bookkeepingSubmissions;
    businessTypes;
    callOutcomes;
    calls;
    closingDays;
    cloudPlatforms;
    commercialDiscounts;
    companies;
    contacts;
    creditNotes;
    currencies;
    customFieldDefinitions;
    dayOffTypes;
    daysOff;
    dealPhases;
    dealPipelines;
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
    legacyMilestones;
    legacyProjects;
    levelTwoAreas;
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
    projectGroups;
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
    unitsOfMeasure;
    userAvailability;
    users;
    webhooks;
    withholdingTaxRates;
    workTypes;
    constructor(config) {
        this.accessToken = config.accessToken ?? "";
        this.refreshToken = config.refreshToken;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.onTokenRefresh = config.onTokenRefresh;
        this.getTokensFn = config.getTokens;
        this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
        this.fetchFn = config.fetch ?? globalThis.fetch.bind(globalThis);
        this.timeout = config.timeout ?? DEFAULT_TIMEOUT_MS;
        this.maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;
        this.apiVersion = config.apiVersion;
        this.userAgent = config.userAgent ?? DEFAULT_USER_AGENT;
        this.clientSignal = config.signal;
        // Warn if clientSecret is used in browser context
        if (config.clientSecret && typeof globalThis.window !== "undefined") {
            console.warn("[teamleader-focus-js-sdk] WARNING: clientSecret should not be used in browser environments. " +
                "Use server-side code for OAuth2 token exchange and refresh.");
        }
        // Initialize resources
        this.accounts = new AccountsResource(this);
        this.activityTypes = new ActivityTypesResource(this);
        this.bookkeepingSubmissions = new BookkeepingSubmissionsResource(this);
        this.businessTypes = new BusinessTypesResource(this);
        this.callOutcomes = new CallOutcomesResource(this);
        this.calls = new CallsResource(this);
        this.closingDays = new ClosingDaysResource(this);
        this.cloudPlatforms = new CloudPlatformsResource(this);
        this.commercialDiscounts = new CommercialDiscountsResource(this);
        this.companies = new CompaniesResource(this);
        this.contacts = new ContactsResource(this);
        this.creditNotes = new CreditNotesResource(this);
        this.currencies = new CurrenciesResource(this);
        this.customFieldDefinitions = new CustomFieldDefinitionsResource(this);
        this.dayOffTypes = new DayOffTypesResource(this);
        this.daysOff = new DaysOffResource(this);
        this.dealPhases = new DealPhasesResource(this);
        this.dealPipelines = new DealPipelinesResource(this);
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
        this.legacyMilestones = new LegacyMilestonesResource(this);
        this.legacyProjects = new LegacyProjectsResource(this);
        this.levelTwoAreas = new LevelTwoAreasResource(this);
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
        this.projectGroups = new ProjectGroupsResource(this);
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
        this.unitsOfMeasure = new UnitsOfMeasureResource(this);
        this.userAvailability = new UserAvailabilityResource(this);
        this.users = new UsersResource(this);
        this.webhooks = new WebhooksResource(this);
        this.withholdingTaxRates = new WithholdingTaxRatesResource(this);
        this.workTypes = new WorkTypesResource(this);
    }
    /**
     * Make an authenticated POST request to the Teamleader API.
     * Handles token refresh, rate limiting, and error mapping.
     *
     * Pass `{ signal }` to cancel the request via AbortController. The signal
     * is combined with the client-level signal (if any) and the timeout — whichever
     * aborts first wins.
     */
    async request(endpoint, body, options) {
        return this.requestWithRetry(endpoint, body, 0, 0, options?.signal);
    }
    /**
     * Async iterator that yields each page of a paginated endpoint.
     *
     * @example
     * ```ts
     * for await (const page of client.paginatePages("/contacts.list", { filter: { term: "John" } })) {
     *   console.log(page.data);   // array of contacts
     *   console.log(page.meta);   // { page: { size, number }, matches }
     * }
     * ```
     */
    paginatePages(endpoint, params, options) {
        return paginatePages(this, endpoint, params, options);
    }
    /**
     * Async iterator that yields each item across all pages of a paginated endpoint.
     * Page size is clamped to the API maximum (100). The iterator stops naturally
     * when the API returns an empty / short page; pass `maxPages` to cap earlier.
     *
     * @example
     * ```ts
     * for await (const contact of client.paginateItems("/contacts.list")) {
     *   console.log(contact.first_name);
     * }
     * ```
     */
    paginateItems(endpoint, params, options) {
        return paginateItems(this, endpoint, params, options);
    }
    // authRetryState tracks where we are in the 401 recovery flow:
    // 0 = first attempt
    // 1 = retrying after getTokens returned changed tokens
    // 2 = retrying after OAuth refresh
    // 3 = retrying after fallback getTokens (post-failed-refresh)
    async requestWithRetry(endpoint, body, authRetryState, retryCount = 0, externalSignal) {
        const url = new URL(endpoint, this.baseUrl);
        // Compose external signals (client-level + per-request) with the timeout controller.
        // If any aborts, we forward to `controller` so fetch() aborts. We use addEventListener
        // rather than AbortSignal.any() to stay compatible with Node 18.
        const parentSignals = [];
        if (this.clientSignal)
            parentSignals.push(this.clientSignal);
        if (externalSignal)
            parentSignals.push(externalSignal);
        const alreadyAborted = parentSignals.find((s) => s.aborted);
        if (alreadyAborted) {
            // Throw synchronously — don't start a fetch we're going to cancel immediately
            throw alreadyAborted.reason instanceof Error
                ? alreadyAborted.reason
                : new DOMException("The operation was aborted.", "AbortError");
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        const abortHandler = () => controller.abort();
        for (const s of parentSignals) {
            s.addEventListener("abort", abortHandler, { once: true });
        }
        let response;
        try {
            const headers = {
                "Content-Type": "application/json",
                "User-Agent": this.userAgent,
                Authorization: `Bearer ${this.accessToken}`,
            };
            if (this.apiVersion) {
                headers["X-API-Version"] = this.apiVersion;
            }
            response = await this.fetchFn(url.toString(), {
                method: "POST",
                headers,
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
        }
        catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                // Distinguish timeout from user-initiated abort
                if (parentSignals.some((s) => s.aborted)) {
                    throw error; // propagate AbortError as-is
                }
                throw new TeamleaderFocusNetworkError(new Error(`Request timed out after ${this.timeout}ms`));
            }
            throw new TeamleaderFocusNetworkError(error);
        }
        finally {
            clearTimeout(timeoutId);
            for (const s of parentSignals) {
                s.removeEventListener("abort", abortHandler);
            }
        }
        // 204 No Content — success with no body (delete/update operations)
        if (response.status === 204) {
            return undefined;
        }
        // 401 Unauthorized — multi-step recovery: getTokens → refresh → fallback getTokens
        if (response.status === 401) {
            // Step 1: Try getTokens (re-read from shared store, e.g. another process refreshed)
            if (authRetryState === 0 && this.getTokensFn) {
                const changed = await this.fetchLatestTokens();
                if (changed) {
                    return this.requestWithRetry(endpoint, body, 1, retryCount, externalSignal);
                }
                // Not changed — fall through to refresh
            }
            // Step 2: OAuth token refresh
            if (authRetryState <= 1 && this.canRefreshToken()) {
                try {
                    await this.performTokenRefresh();
                    return this.requestWithRetry(endpoint, body, 2, retryCount, externalSignal);
                }
                catch (refreshError) {
                    // Step 3: Refresh failed — try getTokens one more time (another process may have refreshed)
                    if (this.getTokensFn) {
                        const changed = await this.fetchLatestTokens();
                        if (changed) {
                            return this.requestWithRetry(endpoint, body, 3, retryCount, externalSignal);
                        }
                    }
                    throw refreshError;
                }
            }
            throw new TeamleaderFocusAuthenticationError(await this.safeParseBody(response));
        }
        // 429 Rate Limited — retry with backoff
        if (response.status === 429 && retryCount < this.maxRetries) {
            const retryAfter = this.parseRetryAfter(response);
            const waitMs = Math.max(100, retryAfter.getTime() - Date.now());
            await this.sleep(waitMs);
            return this.requestWithRetry(endpoint, body, authRetryState, retryCount + 1, externalSignal);
        }
        // 500/502/503 Server Error — retry with exponential backoff
        if ((response.status === 500 || response.status === 502 || response.status === 503) && retryCount < this.maxRetries) {
            const backoffMs = Math.min(1000 * 2 ** retryCount, 10_000) * (0.5 + Math.random() * 0.5);
            await this.sleep(backoffMs);
            return this.requestWithRetry(endpoint, body, authRetryState, retryCount + 1, externalSignal);
        }
        // Parse response body
        const contentType = response.headers.get("content-type") ?? "";
        if (!response.ok) {
            const errorBody = await this.safeParseBody(response);
            if (response.status === 429) {
                throw new TeamleaderFocusRateLimitError(this.parseRetryAfter(response), errorBody);
            }
            if (response.status === 401) {
                throw new TeamleaderFocusAuthenticationError(errorBody);
            }
            if (response.status === 400 || response.status === 422) {
                throw new TeamleaderFocusValidationError(response.status, errorBody);
            }
            throw new TeamleaderFocusError(`API request failed: ${response.status}`, response.status, errorBody);
        }
        if (!contentType.includes("application/json")) {
            return undefined;
        }
        return (await response.json());
    }
    /**
     * Re-reads tokens from the shared store via getTokens callback.
     * Returns true if the access token changed (another process refreshed).
     */
    async fetchLatestTokens() {
        if (!this.getTokensFn)
            return false;
        const tokens = await this.getTokensFn();
        const changed = tokens.access_token !== this.accessToken;
        this.accessToken = tokens.access_token;
        if (tokens.refresh_token !== undefined) {
            this.refreshToken = tokens.refresh_token;
        }
        return changed;
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
                        console.error("[teamleader-focus-js-sdk] onTokenRefresh callback failed:", callbackError);
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
            // Teamleader returns an ISO 8601 datetime string (e.g. "2026-02-08T11:09:08+00:00")
            const parsed = new Date(resetHeader);
            if (!isNaN(parsed.getTime())) {
                return parsed;
            }
            // Fallback: try as epoch seconds/ms (for future compatibility)
            const resetTime = Number(resetHeader);
            if (!isNaN(resetTime)) {
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
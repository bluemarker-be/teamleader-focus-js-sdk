import type { OAuthTokens } from "./types/common.js";
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
interface TeamleaderFocusClientConfigBase {
    /** OAuth2 refresh token — required for auto-refresh */
    refreshToken?: string;
    /** OAuth2 client ID — required for auto-refresh */
    clientId?: string;
    /** OAuth2 client secret — required for auto-refresh */
    clientSecret?: string;
    /**
     * Called when tokens are refreshed so you can persist them.
     * The SDK never stores tokens itself.
     */
    onTokenRefresh?: (tokens: OAuthTokens) => void | Promise<void>;
    /** API base URL (default: https://api.focus.teamleader.eu) */
    baseUrl?: string;
    /** Custom fetch implementation for cross-runtime support */
    fetch?: typeof globalThis.fetch;
    /** Request timeout in ms (default: 30000) */
    timeout?: number;
    /** Max retries on rate-limit or server errors (429/500/502/503) (default: 3) */
    maxRetries?: number;
    /**
     * API version identifier (e.g. "2023-09-26").
     * Sent as `X-API-Version` header on every request.
     * When omitted, the version embedded in your OAuth token is used.
     *
     * @see https://developer.teamleader.eu/#/introduction/ap-i-versions
     */
    apiVersion?: string;
}
interface TeamleaderFocusClientConfigWithToken extends TeamleaderFocusClientConfigBase {
    /** OAuth2 access token */
    accessToken: string;
    /**
     * Callback to read the latest tokens from a shared store (DB, Redis).
     * Used in multi-process deployments where another process may have refreshed the token.
     */
    getTokens?: () => Promise<{
        access_token: string;
        refresh_token?: string;
    }> | {
        access_token: string;
        refresh_token?: string;
    };
}
interface TeamleaderFocusClientConfigWithGetTokens extends TeamleaderFocusClientConfigBase {
    /** OAuth2 access token — optional when getTokens is provided */
    accessToken?: string;
    /**
     * Callback to read the latest tokens from a shared store (DB, Redis).
     * Used in multi-process deployments where another process may have refreshed the token.
     * When provided without accessToken, the first request will trigger a 401 → getTokens flow.
     */
    getTokens: () => Promise<{
        access_token: string;
        refresh_token?: string;
    }> | {
        access_token: string;
        refresh_token?: string;
    };
}
export type TeamleaderFocusClientConfig = TeamleaderFocusClientConfigWithToken | TeamleaderFocusClientConfigWithGetTokens;
export declare class TeamleaderFocusClient {
    private accessToken;
    private refreshToken?;
    private readonly clientId?;
    private readonly clientSecret?;
    private readonly onTokenRefresh?;
    private readonly getTokensFn?;
    private readonly baseUrl;
    private readonly fetchFn;
    private readonly timeout;
    private readonly maxRetries;
    private readonly apiVersion?;
    private refreshPromise;
    readonly accounts: AccountsResource;
    readonly activityTypes: ActivityTypesResource;
    readonly bookkeepingSubmissions: BookkeepingSubmissionsResource;
    readonly businessTypes: BusinessTypesResource;
    readonly callOutcomes: CallOutcomesResource;
    readonly calls: CallsResource;
    readonly closingDays: ClosingDaysResource;
    readonly cloudPlatforms: CloudPlatformsResource;
    readonly commercialDiscounts: CommercialDiscountsResource;
    readonly companies: CompaniesResource;
    readonly contacts: ContactsResource;
    readonly creditNotes: CreditNotesResource;
    readonly currencies: CurrenciesResource;
    readonly customFieldDefinitions: CustomFieldDefinitionsResource;
    readonly dayOffTypes: DayOffTypesResource;
    readonly daysOff: DaysOffResource;
    readonly dealPhases: DealPhasesResource;
    readonly dealPipelines: DealPipelinesResource;
    readonly dealSources: DealSourcesResource;
    readonly deals: DealsResource;
    readonly departments: DepartmentsResource;
    readonly documentTemplates: DocumentTemplatesResource;
    readonly emailTracking: EmailTrackingResource;
    readonly events: EventsResource;
    readonly expenses: ExpensesResource;
    readonly externalParties: ExternalPartiesResource;
    readonly files: FilesResource;
    readonly incomingCreditNotes: IncomingCreditNotesResource;
    readonly incomingInvoices: IncomingInvoicesResource;
    readonly invoices: InvoicesResource;
    readonly legacyMilestones: LegacyMilestonesResource;
    readonly legacyProjects: LegacyProjectsResource;
    readonly levelTwoAreas: LevelTwoAreasResource;
    readonly lostReasons: LostReasonsResource;
    readonly mailTemplates: MailTemplatesResource;
    readonly meetings: MeetingsResource;
    readonly migrate: MigrateResource;
    readonly notes: NotesResource;
    readonly orders: OrdersResource;
    readonly paymentMethods: PaymentMethodsResource;
    readonly paymentTerms: PaymentTermsResource;
    readonly plannableItems: PlannableItemsResource;
    readonly priceLists: PriceListsResource;
    readonly productCategories: ProductCategoriesResource;
    readonly products: ProductsResource;
    readonly projectGroups: ProjectGroupsResource;
    readonly projectLines: ProjectLinesResource;
    readonly projectMaterials: ProjectMaterialsResource;
    readonly projectTasks: ProjectTasksResource;
    readonly projects: ProjectsResource;
    readonly quotations: QuotationsResource;
    readonly receipts: ReceiptsResource;
    readonly reservations: ReservationsResource;
    readonly subscriptions: SubscriptionsResource;
    readonly tags: TagsResource;
    readonly tasks: TasksResource;
    readonly taxRates: TaxRatesResource;
    readonly teams: TeamsResource;
    readonly ticketStatus: TicketStatusResource;
    readonly tickets: TicketsResource;
    readonly timeTracking: TimeTrackingResource;
    readonly timers: TimersResource;
    readonly unitsOfMeasure: UnitsOfMeasureResource;
    readonly userAvailability: UserAvailabilityResource;
    readonly users: UsersResource;
    readonly webhooks: WebhooksResource;
    readonly withholdingTaxRates: WithholdingTaxRatesResource;
    readonly workTypes: WorkTypesResource;
    constructor(config: TeamleaderFocusClientConfig);
    /**
     * Make an authenticated POST request to the Teamleader API.
     * Handles token refresh, rate limiting, and error mapping.
     */
    request<T>(endpoint: string, body?: unknown): Promise<T>;
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
    paginatePages<T>(endpoint: string, params?: {
        page?: {
            size?: number;
            number?: number;
        };
        [key: string]: unknown;
    }, options?: {
        maxPages?: number;
    }): AsyncGenerator<import("./paginator.js").PaginatedResponse<T>, void, undefined>;
    /**
     * Async iterator that yields each item across all pages of a paginated endpoint.
     * Page size is clamped to the API maximum (100). Defaults: size=100, maxPages=100.
     *
     * @example
     * ```ts
     * for await (const contact of client.paginateItems("/contacts.list")) {
     *   console.log(contact.first_name);
     * }
     * ```
     */
    paginateItems<T>(endpoint: string, params?: {
        page?: {
            size?: number;
            number?: number;
        };
        [key: string]: unknown;
    }, options?: {
        maxPages?: number;
    }): AsyncGenerator<T, void, undefined>;
    private requestWithRetry;
    /**
     * Re-reads tokens from the shared store via getTokens callback.
     * Returns true if the access token changed (another process refreshed).
     */
    private fetchLatestTokens;
    private canRefreshToken;
    /**
     * Performs token refresh with mutex — only one refresh at a time.
     * Concurrent requests that hit 401 will wait for the same refresh.
     */
    private performTokenRefresh;
    private parseRetryAfter;
    private safeParseBody;
    private sleep;
}
export {};
//# sourceMappingURL=client.d.ts.map
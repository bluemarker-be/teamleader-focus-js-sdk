import type { TeamleaderFocusClient } from "../client.js";

/**
 * Base class for all resource modules.
 * Provides the authenticated client reference for making API requests.
 */
export abstract class BaseResource {
  constructor(protected readonly client: TeamleaderFocusClient) {}
}

/**
 * Read a custom field value from an entity by its definition id.
 *
 * Custom fields on Teamleader entities are returned as an array of
 * `{ definition: { id }, value }` pairs. Looking up a specific field means
 * iterating that array and matching on the definition id — this helper does
 * that in one line and narrows the return type for you.
 *
 * @example
 * ```ts
 * const { data: contact } = await teamleader.contacts.info({ id: "abc" });
 * const birthday = customField<string>(contact, "bf6765de-56eb-40ec-ad14-9096c5dc5fe1");
 * ```
 *
 * @returns The field's value, or `undefined` when the field isn't set on this entity.
 */
export function customField(entity, fieldId) {
    const match = entity?.custom_fields?.find((f) => f.definition?.id === fieldId);
    return match?.value;
}
//# sourceMappingURL=custom-fields.js.map
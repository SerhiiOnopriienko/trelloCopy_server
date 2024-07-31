const CardEvent = {
  CREATE: "card:create",
  REORDER: "card:reorder",
  RENAME: "card:rename",
  DELETE: "card:delete",
  CHANGE_DESCRIPTION: "card:change-description",
  DUPLICATE: "card:duplicate",
} as const;

export { CardEvent };

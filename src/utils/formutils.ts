import type { ParsedField } from "../types";

export function getFieldsFromSchema(field_schema: any, ui_schema: any): ParsedField[] {
  if (!field_schema || !ui_schema?.elements) return [];

  return ui_schema.elements
    .filter((el: any) => el.type === 'Control' || el.type === 'Button')
    .map((el: any) => {
      const scope = el.scope ?? '';
      const path = scope.split('/').pop();
      const fieldDef = field_schema.properties?.[path];

      return {
        id: path,
        label: el.label ?? path,
        type: fieldDef?.type ?? 'string',
        avantos_type: fieldDef?.avantos_type ?? null,
        required: field_schema.required?.includes(path) ?? false
      };
    });
}

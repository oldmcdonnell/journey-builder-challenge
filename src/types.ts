export interface Field {
  id: string;
  name: string;     // Logical name of the field
  type: string;     // e.g., 'text', 'checkbox', etc.
  label?: string;   // Optional display label
}

export interface FormNode {
  id: string;
  name: string;
  fields: Field[]; // Using unified Field type
  dependencies: string[]; // IDs of forms this one depends on
  field_schema: any;
  ui_schema: any;
}

type FormPrefill = {
  sourceType: 'form';
  sourceFormId: string;
  sourceFieldId: string;
};

type GlobalPrefill = {
  sourceType: 'global';
  value: any;
  globalKey?: string;
};

export type FieldPrefill = FormPrefill | GlobalPrefill;

export type PrefillConfig = {
  [fieldId: string]: FieldPrefill;
};

export interface FormRendererProps {
  forms: FormNode[];
  selectedFormId: string | null;
  onFieldChange: (formId: string, fieldId: string, value: any) => void;
  prefillMap?: Record<string, PrefillConfig>;
  onClearPrefill: (formId: string, fieldId: string) => void;
  onOpenPrefillModal: (formId: string, fieldId: string) => void;
}

export interface FormData {
  id: string;
  name: string;
  fields: Field[]; // Optional if using schema-based generation
  field_schema?: any;
  ui_schema?: any;
}

export interface PrefillModalProps {
  availableForms: {
    id: string;
    name: string;
    fields: { id: string; label?: string }[];
  }[];
  onSelect: (prefill: { sourceType: 'form'; sourceFormId: string; sourceFieldId: string }) => void;
  onCancel: () => void;
}

export interface ParsedField {
  id: string;
  label: string;
  type: string;
  avantos_type: string | null;
  required: boolean;
}
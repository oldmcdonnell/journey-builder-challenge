export interface FormField {
  id: string;
  name: string;
  type: string;
}

export interface FormNode {
  id: string;
  name: string;
  fields: FormField[];
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
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
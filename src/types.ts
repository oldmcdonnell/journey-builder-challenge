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

export interface PrefillConfig {
  [fieldId: string]: {
    sourceType: 'form' | 'global';
    sourceFormId?: string;
    sourceFieldId?: string;
    globalKey?: string;
  };
}
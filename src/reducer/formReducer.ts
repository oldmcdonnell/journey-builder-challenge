import type { FormNode, PrefillConfig } from '../types';

export interface State {
  forms: FormNode[];
  selectedFormId: string | null;
  prefillMap: Record<string, PrefillConfig>; 
  modalFieldId: string | null;
}

export type Action =
  | { type: 'SET_FORMS'; payload: FormNode[] }
  | { type: 'SELECT_FORM'; payload: string }
  | { type: 'UPDATE_PREFILL'; formId: string; fieldId: string; config: PrefillConfig[string] }
  | { type: 'CLEAR_PREFILL'; formId: string; fieldId: string }
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'HIDE_MODAL' };

export const initialState: State = {
  forms: [],
  selectedFormId: null,
  prefillMap: {},
  modalFieldId: null,
};

export function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORMS':
      return { ...state, forms: action.payload };
    case 'SELECT_FORM':
      return { ...state, selectedFormId: action.payload };
    case 'UPDATE_PREFILL': {
      const { formId, fieldId, config } = action;
      const updated = {
        ...state.prefillMap[formId],
        [fieldId]: config,
      };
      return {
        ...state,
        prefillMap: { ...state.prefillMap, [formId]: updated },
      };
    }
    case 'CLEAR_PREFILL': {
      const { formId, fieldId } = action;
      const newMap = { ...state.prefillMap[formId] };
      delete newMap[fieldId];
      return {
        ...state,
        prefillMap: { ...state.prefillMap, [formId]: newMap },
      };
    }
    case 'SHOW_MODAL':
      return { ...state, modalFieldId: action.payload };
    case 'HIDE_MODAL':
      return { ...state, modalFieldId: null };
    default:
      return state;
  }
}

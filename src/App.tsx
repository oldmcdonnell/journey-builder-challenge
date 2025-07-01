import { useEffect, useReducer } from 'react';
import FormRenderer from './components/FormRenderer';
import { fetchActionBlueprintGraph } from './api/api';
import { formReducer, initialState } from './reducer/formReducer';

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    fetchActionBlueprintGraph()
      .then(data => {
        dispatch({ type: 'SET_FORMS', payload: data.forms });
      })
      .catch(error => console.error(error));
  }, []);

  const handleFieldChange = (formId: string, fieldId: string, value: any) => {
    dispatch({
      type: 'UPDATE_PREFILL',
      formId,
      fieldId,
      config: {
        sourceType: 'global' as const,
        value,
      },
    });
  };

  const handleClearPrefill = (formId: string, fieldId: string) => {
    dispatch({
      type: 'CLEAR_PREFILL',
      formId,
      fieldId,
    });
  };

  // Prompt-based version (good for testing)
  const handleOpenPrefillModal = (formId: string, fieldId: string) => {
    const sourceFormId = prompt('Enter source form ID:');
    const sourceFieldId = prompt('Enter source field ID:');
    if (sourceFormId && sourceFieldId) {
      const config = {
        sourceType: 'form' as const,
        sourceFormId,
        sourceFieldId,
      };
      console.log('Dispatching prefill config:', { formId, fieldId, config });
      dispatch({
        type: 'UPDATE_PREFILL',
        formId,
        fieldId,
        config,
      });
    } else {
      console.log('Source form ID and field ID are required to set prefill.');
    }
  };

  //placeholder for modal-based version
  const setPrefillFromField = (
    formId: string,
    fieldId: string,
    sourceFormId: string,
    sourceFieldId: string
  ) => {
    const config = {
      sourceType: 'form' as const,
      sourceFormId,
      sourceFieldId,
    };
    dispatch({
      type: 'UPDATE_PREFILL',
      formId,
      fieldId,
      config,
    });
  };

  return (
    <div>
      <h1>Dynamic Forms</h1>
      <select onChange={e => dispatch({ type: 'SELECT_FORM', payload: e.target.value })}>
        <option value="">Select a form</option>
        {state.forms.map(form => (
          <option key={form.id} value={form.id}>
            {form.name}
          </option>
        ))}
      </select>

      <FormRenderer
        forms={state.forms}
        selectedFormId={state.selectedFormId}
        prefillMap={state.prefillMap}
        onFieldChange={handleFieldChange}
        onClearPrefill={handleClearPrefill}
        onOpenPrefillModal={handleOpenPrefillModal}
      />
    </div>
  );
}

export default App;

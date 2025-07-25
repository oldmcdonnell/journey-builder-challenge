import { useEffect, useReducer } from 'react';
import FormRenderer from './components/FormRenderer';
import { fetchActionBlueprintGraph } from './api/api';
import { formReducer, initialState } from './reducer/formReducer';

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    fetchActionBlueprintGraph()
      .then((data) => {
        dispatch({ type: 'SET_FORMS', payload: data.forms });
      })
      .catch((error) => console.error(error));
  }, []);

  const selectedForm = state.forms.find((form) => form.id === state.selectedFormId);

  const handleClearPrefill = (formId: string, fieldId: string) => {
    dispatch({
      type: 'CLEAR_PREFILL',
      formId,
      fieldId,
    });
  };

  const handleOpenPrefillModal = (formId: string, fieldId: string) => {
    const sourceFormId = prompt('Enter source form ID:');
    const sourceFieldId = prompt('Enter source field ID:');
    if (sourceFormId && sourceFieldId) {
      dispatch({
        type: 'UPDATE_PREFILL',
        formId,
        fieldId,
        config: {
          sourceType: 'form',
          sourceFormId,
          sourceFieldId,
        },
      });
    }
  };

  return (
    <div>
      <h1>Dynamic Forms</h1>
      <select
        onChange={(e) =>
          dispatch({ type: 'SELECT_FORM', payload: e.target.value })
        }
        value={state.selectedFormId || ''}
      >
        <option value="">Select a form</option>
        {state.forms.map((form) => (
          <option key={form.id} value={form.id}>
            {form.name}
          </option>
        ))}
      </select>

      {selectedForm ? (
        <FormRenderer
          forms={state.forms}
          selectedFormId={selectedForm.id}
          onFieldChange={(formId, fieldId, value) => {
            dispatch({
              type: 'UPDATE_PREFILL',
              formId,
              fieldId,
              config: {
                sourceType: 'global',
                value,
              },
            });
          }}
          prefillMap={state.prefillMap}
          onClearPrefill={handleClearPrefill}
          onOpenPrefillModal={handleOpenPrefillModal}
          dispatch={dispatch}
        />
      ) : (
        <p>Please select a form to view.</p>
      )}
    </div>
  );
}

export default App;

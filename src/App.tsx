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
      sourceType: 'global', // or 'form' — depending on your use case
      value,
    },
  });
};

  return (
    <div>
      <h1>Dynamic Forms</h1>
      <select onChange={e => dispatch({ type: 'SELECT_FORM', payload: e.target.value })}>
        <option value="">Select a form</option>
        {state.forms.map(form => (
          <option key={form.id} value={form.id}>{form.name}</option>
        ))}
      </select>

      <FormRenderer
        forms={state.forms}
        selectedFormId={state.selectedFormId}
        prefillMap={state.prefillMap}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}

export default App;

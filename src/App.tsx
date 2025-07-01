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
    // You can dispatch this to store form values later
    console.log(`Changed ${fieldId} on ${formId} to ${value}`);
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
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}

export default App;

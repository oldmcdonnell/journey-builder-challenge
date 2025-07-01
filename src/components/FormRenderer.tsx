import React from "react";

interface Field {
  id: string;
  type: string;
  label?: string;
}

interface FormData {
  id: string;
  name: string;
  fields: Field[];
}

interface FormRendererProps {
  forms: FormData[];
  selectedFormId: string | null;
  onFieldChange: (formId: string, fieldId: string, value: any) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({ forms, selectedFormId, onFieldChange }) => {
  const selectedForm = forms.find(form => form.id === selectedFormId);

  if (!selectedForm) {
    return <div>Please select a form to view.</div>;
  }

  return (
    <div>
      <h2>{selectedForm.name}</h2>
      {selectedForm.fields.map(field => (
        <div key={field.id} style={{ marginBottom: '1rem' }}>
          <label htmlFor={field.id}>{field.label}</label><br />
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            onChange={(e) => onFieldChange(selectedForm.id, field.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default FormRenderer;

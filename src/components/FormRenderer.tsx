import React, { useState } from "react";
import type { FormRendererProps, FieldPrefill } from "../types";
import { getFieldsFromSchema } from "../utils/formutils";
import PrefillModal from "./PrefillModal"; 
import DependencySelector from "./DependencySelector";
import type { Action } from '../reducer/formReducer'; 


const FormRenderer: React.FC<FormRendererProps & { dispatch: React.Dispatch<Action> }> = ({
  forms,
  selectedFormId,
  onFieldChange,
  prefillMap,
  onClearPrefill,
  onOpenPrefillModal,
  dispatch, // ✅ From reducer
}) => {
  const [modalField, setModalField] = useState<{
    formId: string;
    fieldId: string;
  } | null>(null);

  const selectedForm = forms.find((form) => form.id === selectedFormId);

  if (!selectedForm) {
    console.warn("Selected form ID not found:", selectedFormId, "in", forms);
    return <div>Please select a form to view.</div>;
  }

  const fields = getFieldsFromSchema(
    selectedForm.field_schema,
    selectedForm.ui_schema
  );

  const handleSelect = (
    prefillData: FieldPrefill,
    formId: string,
    fieldId: string
  ) => {
    onFieldChange(formId, fieldId, prefillData);
  };

  return (
    <div>
      <h2>{selectedForm.name}</h2>

      {/* ✅ Proper dispatch passed here */}
      <DependencySelector
        dispatch={dispatch}
        availableForms={forms}
        selectedFormId={selectedForm.id}
      />

      {fields.map((field) => {
        const fieldPrefill = prefillMap?.[selectedForm.id]?.[field.id];

        return (
          <div key={field.id} style={{ marginBottom: "1rem" }}>
            <label htmlFor={field.id}>{field.label}</label>
            <br />
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              value={
                fieldPrefill?.sourceType === "global"
                  ? (fieldPrefill.value as string)
                  : ""
              }
              onChange={(e) =>
                onFieldChange(selectedForm.id, field.id, e.target.value)
              }
            />
            <div style={{ marginTop: "0.5rem" }}>
              {fieldPrefill ? (
                <button
                  onClick={() => onClearPrefill(selectedForm.id, field.id)}
                >
                  ❌ Clear Prefill
                </button>
              ) : (
                <button
                  onClick={() =>
                    setModalField({ formId: selectedForm.id, fieldId: field.id })
                  }
                >
                  ➕ Set Prefill
                </button>
              )}
            </div>
          </div>
        );
      })}

      {modalField && (
        <PrefillModal
          availableForms={forms}
          selectedForm={selectedForm}
          onSelect={(prefillData) => {
            handleSelect(prefillData, modalField.formId, modalField.fieldId);
            setModalField(null);
          }}
          onCancel={() => setModalField(null)}
        />
      )}
    </div>
  );
};

export default FormRenderer;

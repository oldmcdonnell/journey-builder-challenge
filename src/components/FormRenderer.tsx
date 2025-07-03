import React from "react";
import type { FormRendererProps } from "../types";
import { getFieldsFromSchema } from "../utils/formutils"; // ✅ Named import




const FormRenderer: React.FC<FormRendererProps> = ({
  forms,
  selectedFormId,
  onFieldChange,
  prefillMap,
  onClearPrefill,
  onOpenPrefillModal,
}) => {
  const selectedForm = forms.find((form) => form.id === selectedFormId);

  if (!selectedForm) {
    console.warn("Selected form ID not found:", selectedFormId, "in", forms);
    return <div>Please select a form to view.</div>;
  }

  const fields = getFieldsFromSchema(selectedForm.field_schema, selectedForm.ui_schema); // ✅ Compute fields

  return (
    <div>
      <h2>{selectedForm.name}</h2>
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
                  onClick={() => onOpenPrefillModal(selectedForm.id, field.id)}
                >
                  ➕ Set Prefill
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormRenderer;

import React from "react";
import type { PrefillModalProps } from "../types";


const PrefillModal: React.FC<PrefillModalProps> = ({
  availableForms,
  selectedForm,
  onSelect,
  onCancel
}) => {
console.log("selectedForm:", selectedForm);
console.log("selectedForm.dependencies:", selectedForm.dependencies);
console.log("availableForms:", availableForms);
  const allowedForms = availableForms.filter(form =>
  (selectedForm.dependencies || []).includes(form.id)
);
console.log("Allowed Forms:", allowedForms);
// const allowedForms =
//   selectedForm.dependencies?.length > 0
//     ? availableForms.filter((form) =>
//         selectedForm.dependencies.includes(form.id)
//       )
//     : availableForms;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select data element to map</h2>
        <ul>
          {allowedForms.map((form) => (
            <li key={form.id}>
              <strong>{form.name}</strong>
              <ul>
                {form.fields.map((field) => (
                  <li key={field.id}>
                    <button
                      onClick={() =>
                        onSelect({
                          sourceType: "form",
                          sourceFormId: form.id,
                          sourceFieldId: field.id,
                        })
                      }
                    >
                      {field.label || field.id}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PrefillModal;

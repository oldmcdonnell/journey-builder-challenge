// src/api/api.ts

const BASE_URL = 'https://admin-ui.dev-sandbox.workload.avantos-ai.net/api/v1';

const TENANT_ID = '123';
const ACTION_ID = 'bp_456';
const VERSION_ID = 'bpv_123';

export const fetchActionBlueprintGraph = async () => {
  const url = `${BASE_URL}/${TENANT_ID}/actions/blueprints/${ACTION_ID}/${VERSION_ID}/graph`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json, application/problem+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blueprint graph: ${response.status}`);
  }

  return response.json();
};

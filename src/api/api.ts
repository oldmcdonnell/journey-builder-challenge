// src/api/api.ts

// const BASE_URL = 'https://admin-ui.dev-sandbox.workload.avantos-ai.net/api/v1';

// const TENANT_ID = '123';
// const ACTION_ID = 'bp_456';
// const VERSION_ID = 'bpv_123';


export const fetchActionBlueprintGraph = async () => {
  const response = await fetch('http://localhost:3000/api/v1/123/actions/blueprints/bp_456/bpv_123/graph');
  if (!response.ok) throw new Error('Failed to load mock graph');
  return response.json();
};
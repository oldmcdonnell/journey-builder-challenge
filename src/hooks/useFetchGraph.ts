import { useEffect } from 'react';
import { fetchActionBlueprintGraph } from '../api/api';
// import type { FormNode } from '../types';

export function useFetchGraph(dispatch: React.Dispatch<any>) {
  useEffect(() => {
    fetchActionBlueprintGraph()
      .then((data) => {
        dispatch({ type: 'SET_FORMS', payload: data.forms });
        // You might also dispatch edges and nodes later if needed
      })
      .catch((err) => {
        console.error('Error fetching graph:', err);
      });
  }, []);
}

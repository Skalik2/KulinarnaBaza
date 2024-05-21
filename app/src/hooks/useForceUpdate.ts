import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [state, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return { forceUpdate, state };
}

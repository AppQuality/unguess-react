import { useEffect, useState } from 'react';

// Hook
const cachedScripts: string[] = [];
const scriptId = 'hubspot-cscript';

function useScript(
  src: string,
  async: boolean = true,
  addToHead: boolean = false,
  removeOnCleanup: boolean = false
): boolean[] {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If cachedScripts array already includes src that means another instance ...
    // ... of this hook already loaded this script, so no need to load again.
    if (cachedScripts.includes(src)) {
      setLoaded(true);
      setError(false);
    } else {
      cachedScripts.push(src);

      // Create script
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.id = scriptId;

      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        setLoaded(true);
        setError(false);
      };

      const removeCachedScript = () => {
        // Remove from cachedScripts we can try loading again
        const index = cachedScripts.indexOf(src);
        if (index >= 0) {
          cachedScripts.splice(index, 1);
        }
        script.remove();
      };

      const onScriptError = () => {
        removeCachedScript();
        setLoaded(true);
        setError(true);
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // Add script to document head if required, otherwise to the body
      if (addToHead) {
        document.head.appendChild(script);
      } else {
        document.body.appendChild(script);
      }

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);

        if (removeOnCleanup) removeCachedScript();
      };
    }

    return () => {};
  }, [src]); // Only re-run effect if script src changes

  return [loaded, error];
}

export default useScript;

import {
  useAsyncRunner,
  ImportResolvers,
  defaultImportsRevolver,
} from "./useAsyncRunner";

type FallbackRenderer = React.ReactNode | ((error: string) => React.ReactNode);

export type Props = {
  files: Record<string, string>;
  scope: Record<string, unknown>;
  disableCache?: boolean;
  resolveImports: ImportResolvers;
  errorFallback?: FallbackRenderer;
  loadingFallback?: React.ReactNode;
};

export function AsyncRunner({
  files,
  scope,
  disableCache,
  resolveImports = defaultImportsRevolver,
  loadingFallback = null,
  errorFallback = null,
}: Props) {
  const { element, styleSheets, error, isLoading } = useAsyncRunner({
    files,
    scope,
    disableCache,
    resolveImports,
  });

  if (isLoading) return loadingFallback;
  if (error)
    return typeof errorFallback === "function"
      ? errorFallback(error)
      : errorFallback;

  if (typeof document !== "undefined") {
    document.adoptedStyleSheets = styleSheets;
  }

  return element;
}

export default AsyncRunner;

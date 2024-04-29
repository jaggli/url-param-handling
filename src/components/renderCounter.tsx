import { useRef, ReactNode, FunctionComponent } from "react";

export const RenderCounter: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {children} render count: {renderCount.current}
    </div>
  );
};

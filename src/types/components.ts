export interface BaseComponentProps {
  className?: string;
}

export interface BaseComponentWithChildren extends BaseComponentProps {
  children?: React.ReactNode;
}

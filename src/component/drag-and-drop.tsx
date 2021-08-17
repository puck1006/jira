import React, { forwardRef, ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  <Droppable {...props}>
    {(provide) => {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          ref: provide.innerRef,
          ...provide.droppableProps,
          provide,
        });
      }
      return <div />;
    }}
  </Droppable>;
};

type DropChildProps = Partial<
  { provide: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref}>
        {children}
        {props.provide?.placeholder}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

export const Drag = ({ children, ...props }: DragProps) => {
  <Draggable {...props}>
    {(provide) => {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          ref: provide.innerRef,
          ...provide.dragHandleProps,
          ...provide.dragHandleProps,
        });
      }
      return <div />;
    }}
  </Draggable>;
};

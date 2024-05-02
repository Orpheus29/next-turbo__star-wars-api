import React from 'react';

import { useAtomValue } from 'jotai';

import { Position, NodeProps, Handle, useUpdateNodeInternals } from 'reactflow';

import { heroNodesLengthAtom, isHorizontalAtom } from '@/utils/atoms';

import 'reactflow/dist/style.css';

interface NodeData {
  label: string;
}

function getSourcePosition(dir: boolean) {
  if (dir) {
    return Position.Right;
  }
  return Position.Bottom;
}

function getTargetPosition(dir: boolean) {
  if (dir) {
    return Position.Left;
  }
  return Position.Top;
}

export const HeroNode: React.FC<NodeProps<NodeData>> = ({ data }) => {
  const direction = useAtomValue(isHorizontalAtom);
  const heroNodesLength = useAtomValue(heroNodesLengthAtom);
  const nodeCount = Array.from({ length: heroNodesLength }, (_, index) => (index + 1).toString());
  const updateNodeInternals = useUpdateNodeInternals();
  updateNodeInternals(nodeCount);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data.label }} />
      <Handle
        type="source"
        position={getSourcePosition(direction)}
        style={direction ? { translate: "6px" } : { translate: "0 6px" }}
      />
    </>
  );
};

export const FilmNode: React.FC<NodeProps<NodeData>> = ({ data }) => {
  const direction = useAtomValue(isHorizontalAtom);

  return (
    <>
      <Handle
        type="source"
        position={getSourcePosition(direction)}
        style={direction ? { translate: "12px" } : {}}
      />
      <Handle
        type="target"
        position={getTargetPosition(direction)}
        style={direction ? { translate: "-12px" } : {}}
      />
      <div dangerouslySetInnerHTML={{ __html: data.label }} />
    </>
  );
};

export const StarshipNode: React.FC<NodeProps<NodeData>> = ({ data }) => {
  const direction = useAtomValue(isHorizontalAtom);

  return (
    <>
      <Handle
        type="target"
        position={getTargetPosition(direction)}
        style={direction ? { translate: "-4px" } : { translate: "0 -4px" }}
      />
      <div dangerouslySetInnerHTML={{ __html: data.label }} />
    </>
  );
};

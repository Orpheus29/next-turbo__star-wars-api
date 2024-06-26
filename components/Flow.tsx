import React, { useCallback } from 'react';

import { useAtom } from 'jotai';

import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Edge,
  Controls,
  useStoreApi,
} from 'reactflow';

import dagre from '@dagrejs/dagre';

import { isHorizontalAtom } from '@/utils/atoms';
import { FilmNode, HeroNode, StarshipNode } from '@/types/customNodes';

import 'reactflow/dist/style.css';

const nodeWidth = 250;
const nodeHeight = 200;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const nodeTypes = { input: HeroNode, default: FilmNode, output: StarshipNode };

const LayoutFlow = ({ initialNodes, initialEdges }: { initialNodes: Node[], initialEdges: Edge[] }) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [dir, setDirection] = useAtom(isHorizontalAtom);

  //Fixing the "It looks like you have created a new nodeTypes or edgeTypes object..." bug
  const store = useStoreApi();

  if (process.env.NODE_ENV === "development") {
    store.getState().onError = (code, message) => {
      if (code === "002") {
        return;
      }
      console.warn(message);
    };
  }

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.Bezier, animated: true }, eds)
      ),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );

      const isHorizontal = direction === 'LR';

      setDirection(isHorizontal);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setDirection, setNodes, setEdges]
  );

  //Getting rid of React Flow attributions in the bottom right corner
  const proOptions = { hideAttribution: true };

  return (
    <div className="w-full h-[90vh] text-left">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        className="lowercase text-left"
        fitView
      >
        <Panel position="top-right" className="flex flex-col gap-y-2 bg-black p-3 rounded-xl">
          <button onClick={() => onLayout('LR')} className={"layout-btn" + (dir ? " active" : "")}>horizontal layout</button>
          <button onClick={() => onLayout('TB')} className={"layout-btn" + (!dir ? " active" : "")}>vertical layout</button>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export function Flow({ initialNodes, initialEdges }: { initialNodes: Node[], initialEdges: Edge[] }) {
  return (
    <ReactFlowProvider>
      <LayoutFlow initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
}

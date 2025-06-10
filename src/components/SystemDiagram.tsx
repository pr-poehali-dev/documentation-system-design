import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SystemNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  connections: string[];
}

const SystemDiagram = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: SystemNode[] = [
    {
      id: "cad",
      title: "CAD Модуль",
      description: "Система автоматизированного проектирования",
      icon: "Ruler",
      color: "bg-blue-500",
      position: { x: 100, y: 100 },
      connections: ["pdm", "workflow"],
    },
    {
      id: "pdm",
      title: "PDM Система",
      description: "Управление данными изделий",
      icon: "Database",
      color: "bg-purple-500",
      position: { x: 400, y: 100 },
      connections: ["erp", "archive", "workflow"],
    },
    {
      id: "workflow",
      title: "Система Workflows",
      description: "Управление процессами согласования",
      icon: "GitBranch",
      color: "bg-green-500",
      position: { x: 250, y: 250 },
      connections: ["users", "notifications"],
    },
    {
      id: "archive",
      title: "Архив Документов",
      description: "Хранилище технической документации",
      icon: "Archive",
      color: "bg-orange-500",
      position: { x: 600, y: 200 },
      connections: ["search", "backup"],
    },
    {
      id: "erp",
      title: "ERP Интеграция",
      description: "Связь с корпоративными системами",
      icon: "Network",
      color: "bg-indigo-500",
      position: { x: 500, y: 50 },
      connections: ["pdm"],
    },
    {
      id: "users",
      title: "Управление Пользователями",
      description: "Авторизация и права доступа",
      icon: "Users",
      color: "bg-cyan-500",
      position: { x: 50, y: 350 },
      connections: ["workflow"],
    },
    {
      id: "search",
      title: "Поисковая Система",
      description: "Индексация и поиск документов",
      icon: "Search",
      color: "bg-yellow-500",
      position: { x: 450, y: 350 },
      connections: ["archive"],
    },
    {
      id: "notifications",
      title: "Уведомления",
      description: "Система оповещений",
      icon: "Bell",
      color: "bg-red-500",
      position: { x: 300, y: 400 },
      connections: ["workflow", "users"],
    },
    {
      id: "backup",
      title: "Резервное Копирование",
      description: "Система бэкапов",
      icon: "HardDrive",
      color: "bg-gray-500",
      position: { x: 650, y: 350 },
      connections: ["archive"],
    },
  ];

  const getConnectionPath = (from: SystemNode, to: SystemNode) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const midX = from.position.x + dx / 2;
    const midY = from.position.y + dy / 2;

    return `M ${from.position.x + 50} ${from.position.y + 50} Q ${midX} ${midY} ${to.position.x + 50} ${to.position.y + 50}`;
  };

  const renderConnections = () => {
    const connections: JSX.Element[] = [];

    nodes.forEach((fromNode) => {
      fromNode.connections.forEach((toNodeId) => {
        const toNode = nodes.find((n) => n.id === toNodeId);
        if (toNode) {
          connections.push(
            <path
              key={`${fromNode.id}-${toNodeId}`}
              d={getConnectionPath(fromNode, toNode)}
              stroke="#0EA5E9"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="opacity-60"
            />,
          );
        }
      });
    });

    return connections;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Архитектура ИС Конструкторской Документации
        </h1>
        <p className="text-gray-600">
          Интерактивная схема основных компонентов системы
        </p>
      </div>

      <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ minHeight: "600px" }}
        >
          {renderConnections()}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute cursor-pointer transition-all duration-300 ${
              selectedNode === node.id
                ? "scale-110 z-20"
                : "hover:scale-105 z-10"
            }`}
            style={{
              left: node.position.x,
              top: node.position.y,
              width: "120px",
              height: "120px",
            }}
            onClick={() =>
              setSelectedNode(selectedNode === node.id ? null : node.id)
            }
          >
            <Card className="w-full h-full border-2 hover:border-blue-300 transition-colors">
              <CardHeader className="p-3">
                <div
                  className={`w-8 h-8 ${node.color} rounded-lg flex items-center justify-center mb-2`}
                >
                  <Icon
                    name={node.icon as any}
                    size={20}
                    className="text-white"
                  />
                </div>
                <CardTitle className="text-xs font-semibold text-gray-800 leading-tight">
                  {node.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}

        {selectedNode && (
          <div className="absolute bottom-6 left-6 right-6 z-30">
            <Card className="bg-white/95 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                {(() => {
                  const node = nodes.find((n) => n.id === selectedNode);
                  return node ? (
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {node.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{node.description}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Icon name="Link" size={16} />
                        Связей: {node.connections.length}
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemDiagram;

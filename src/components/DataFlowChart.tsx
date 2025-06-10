import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  next: string[];
}

const DataFlowChart = () => {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  const flowSteps: FlowStep[] = [
    {
      id: "create",
      title: "Создание",
      description: "Разработка документа в CAD системе",
      icon: "PlusCircle",
      color: "bg-blue-500",
      next: ["review"],
    },
    {
      id: "review",
      title: "Проверка",
      description: "Техническая экспертиза документа",
      icon: "Eye",
      color: "bg-orange-500",
      next: ["approve", "reject"],
    },
    {
      id: "approve",
      title: "Утверждение",
      description: "Официальное подтверждение",
      icon: "CheckCircle",
      color: "bg-green-500",
      next: ["archive", "publish"],
    },
    {
      id: "reject",
      title: "Отклонение",
      description: "Возврат на доработку",
      icon: "XCircle",
      color: "bg-red-500",
      next: ["create"],
    },
    {
      id: "archive",
      title: "Архивирование",
      description: "Долгосрочное хранение",
      icon: "Archive",
      color: "bg-purple-500",
      next: ["backup"],
    },
    {
      id: "publish",
      title: "Публикация",
      description: "Размещение в общем доступе",
      icon: "Share2",
      color: "bg-cyan-500",
      next: ["notify"],
    },
    {
      id: "backup",
      title: "Резервирование",
      description: "Создание резервных копий",
      icon: "HardDrive",
      color: "bg-gray-500",
      next: [],
    },
    {
      id: "notify",
      title: "Уведомления",
      description: "Информирование заинтересованных лиц",
      icon: "Bell",
      color: "bg-indigo-500",
      next: [],
    },
  ];

  const getStepPosition = (index: number) => {
    const positions = [
      { x: 50, y: 50 }, // create
      { x: 250, y: 50 }, // review
      { x: 450, y: 50 }, // approve
      { x: 250, y: 180 }, // reject
      { x: 350, y: 180 }, // archive
      { x: 550, y: 180 }, // publish
      { x: 350, y: 310 }, // backup
      { x: 550, y: 310 }, // notify
    ];
    return positions[index] || { x: 0, y: 0 };
  };

  const renderFlowArrows = () => {
    const arrows: JSX.Element[] = [];

    flowSteps.forEach((step, index) => {
      const fromPos = getStepPosition(index);
      step.next.forEach((nextId) => {
        const nextIndex = flowSteps.findIndex((s) => s.id === nextId);
        if (nextIndex !== -1) {
          const toPos = getStepPosition(nextIndex);
          const isActive = activeFlow === step.id || activeFlow === nextId;

          arrows.push(
            <g key={`${step.id}-${nextId}`}>
              <defs>
                <marker
                  id={`arrowhead-${step.id}-${nextId}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={isActive ? "#0EA5E9" : "#94A3B8"}
                  />
                </marker>
              </defs>
              <line
                x1={fromPos.x + 60}
                y1={fromPos.y + 40}
                x2={toPos.x + 60}
                y2={toPos.y + 40}
                stroke={isActive ? "#0EA5E9" : "#94A3B8"}
                strokeWidth={isActive ? "3" : "2"}
                markerEnd={`url(#arrowhead-${step.id}-${nextId})`}
                className="transition-all duration-300"
              />
            </g>,
          );
        }
      });
    });

    return arrows;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Поток Данных в Системе
        </h2>
        <p className="text-gray-600">
          Жизненный цикл конструкторского документа
        </p>
      </div>

      <div
        className="relative bg-white rounded-lg shadow-lg p-8"
        style={{ minHeight: "450px" }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 pointer-events-none"
          style={{ minHeight: "450px" }}
        >
          {renderFlowArrows()}
        </svg>

        {flowSteps.map((step, index) => {
          const position = getStepPosition(index);
          const isActive = activeFlow === step.id;

          return (
            <div
              key={step.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isActive ? "scale-110 z-20" : "hover:scale-105 z-10"
              }`}
              style={{
                left: position.x,
                top: position.y,
                width: "120px",
                height: "80px",
              }}
              onMouseEnter={() => setActiveFlow(step.id)}
              onMouseLeave={() => setActiveFlow(null)}
            >
              <Card
                className={`w-full h-full transition-all duration-300 ${
                  isActive
                    ? "border-blue-400 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardContent className="p-3 h-full flex flex-col justify-center">
                  <div
                    className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}
                  >
                    <Icon
                      name={step.icon as any}
                      size={16}
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800 text-center leading-tight">
                    {step.title}
                  </h3>
                </CardContent>
              </Card>
            </div>
          );
        })}

        {activeFlow && (
          <div className="absolute bottom-4 left-4 right-4 z-30">
            <Card className="bg-white/95 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4">
                {(() => {
                  const step = flowSteps.find((s) => s.id === activeFlow);
                  return step ? (
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}
                      >
                        <Icon
                          name={step.icon as any}
                          size={20}
                          className="text-white"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
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

export default DataFlowChart;

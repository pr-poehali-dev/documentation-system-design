import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const SystemDashboard = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const systemModules = [
    {
      id: "cad",
      title: "CAD Модуль",
      description: "Система автоматизированного проектирования",
      icon: "Ruler",
      color: "from-blue-500 to-blue-600",
      stats: "1,247 проектов",
      status: "active",
    },
    {
      id: "pdm",
      title: "PDM Система",
      description: "Управление данными изделий",
      icon: "Database",
      color: "from-purple-500 to-purple-600",
      stats: "856 изделий",
      status: "active",
    },
    {
      id: "workflow",
      title: "Workflow",
      description: "Управление процессами согласования",
      icon: "GitBranch",
      color: "from-green-500 to-green-600",
      stats: "423 процесса",
      status: "active",
    },
    {
      id: "archive",
      title: "Архив",
      description: "Хранилище документации",
      icon: "Archive",
      color: "from-orange-500 to-orange-600",
      stats: "3,027 документов",
      status: "active",
    },
  ];

  const documentStats = [
    { type: "Чертежи", count: 1247, icon: "FileImage", change: "+12%" },
    { type: "Спецификации", count: 856, icon: "FileText", change: "+8%" },
    { type: "Тех. условия", count: 423, icon: "FileCheck", change: "+15%" },
    { type: "Стандарты", count: 189, icon: "Shield", change: "+3%" },
  ];

  const workflowSteps = [
    { name: "Создание", count: 45, color: "bg-blue-500" },
    { name: "Проверка", count: 23, color: "bg-orange-500" },
    { name: "Утверждение", count: 12, color: "bg-green-500" },
    { name: "Архивирование", count: 67, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              ИС Конструкторской Документации
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Комплексная система управления техническими документами
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500 text-white px-4 py-2">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Система активна
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* System Modules */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Network" size={24} className="mr-2 text-blue-600" />
                Модули Системы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemModules.map((module) => (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      selectedModule === module.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() =>
                      setSelectedModule(
                        selectedModule === module.id ? null : module.id,
                      )
                    }
                  >
                    <CardContent className="p-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center mb-3`}
                      >
                        <Icon
                          name={module.icon as any}
                          size={24}
                          className="text-white"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {module.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          {module.stats}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Активно
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon
                  name="BarChart3"
                  size={20}
                  className="mr-2 text-purple-600"
                />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <p className="text-sm text-blue-600">Всего документов</p>
                  <p className="text-2xl font-bold text-blue-800">3,027</p>
                </div>
                <Icon name="FileText" size={32} className="text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div>
                  <p className="text-sm text-green-600">Активных процессов</p>
                  <p className="text-2xl font-bold text-green-800">147</p>
                </div>
                <Icon name="Activity" size={32} className="text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div>
                  <p className="text-sm text-orange-600">На проверке</p>
                  <p className="text-2xl font-bold text-orange-800">23</p>
                </div>
                <Icon name="Clock" size={32} className="text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon
                name="FolderOpen"
                size={20}
                className="mr-2 text-indigo-600"
              />
              Типы Документов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentStats.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                      <Icon
                        name={doc.icon as any}
                        size={16}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.type}</p>
                      <p className="text-sm text-gray-600">
                        {doc.count.toLocaleString()} документов
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {doc.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Workflow" size={20} className="mr-2 text-cyan-600" />
              Состояние Процессов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-600">{step.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${step.color}`}
                      style={{ width: `${(step.count / 80) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
              <div className="flex items-center">
                <Icon
                  name="TrendingUp"
                  size={20}
                  className="text-cyan-600 mr-2"
                />
                <div>
                  <p className="text-sm font-medium text-cyan-800">
                    Эффективность системы
                  </p>
                  <p className="text-xs text-cyan-600">
                    Обработано за месяц: 1,247 документов
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemDashboard;
